import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setError('');
    try {
      const [quizResponse, resultResponse] = await Promise.all([
        api.get('/quizzes/mine'),
        api.get('/results/mine'),
      ]);
      setQuizzes(quizResponse.data.quizzes);
      setResults(resultResponse.data.results);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load your dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  async function deleteQuiz(id) {
    if (!window.confirm('Delete this quiz? Its saved results will also be removed.')) return;
    try {
      await api.delete(`/quizzes/${id}`);
      setQuizzes((current) => current.filter((quiz) => quiz._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not delete this quiz.');
    }
  }

  return (
    <section className="wrap section page-section">
      <div className="dashboard-heading"><div><span className="eyebrow">Your corner of quizletto</span><h1>Hey, {user.name}.</h1><p>Here’s what you’ve been making and learning.</p></div><Link className="button" to="/create">Make a quiz ↗</Link></div>
      {location.state?.created && <p className="success-box">Your quiz is live. Send it to someone who’ll enjoy it!</p>}
      {error && <p className="error-box">{error}</p>}
      {loading ? <p className="notice">Loading your dashboard…</p> : (
        <>
          <div className="dashboard-columns">
            <section className="dashboard-panel"><div className="section-row"><div><span className="eyebrow">Your quizzes</span><h2>Things you’ve made.</h2></div><span className="count-pill">{quizzes.length}</span></div>
              {quizzes.length ? <div className="dashboard-list">{quizzes.map((quiz) => <article className="dashboard-item" key={quiz._id}><div className="item-icon">✳</div><div className="item-copy"><h3>{quiz.title}</h3><p>{quiz.questions.length} questions · {new Date(quiz.createdAt).toLocaleDateString()}</p></div><div className="item-actions"><Link className="text-link" to={`/quizzes/${quiz._id}`}>Preview</Link><button className="remove-link" type="button" onClick={() => deleteQuiz(quiz._id)}>Delete</button></div></article>)}</div> : <div className="dashboard-empty"><p>Your first quiz is waiting to happen.</p><Link className="text-link" to="/create">Make one now ↗</Link></div>}
            </section>
            <section className="dashboard-panel"><div className="section-row"><div><span className="eyebrow">Your attempts</span><h2>What you’ve learned.</h2></div><span className="count-pill">{results.length}</span></div>
              {results.length ? <div className="dashboard-list">{results.map((result) => <Link className="dashboard-item result-item" to={`/result/${result.id}`} key={result.id}><div className="item-icon item-icon-peach">↗</div><div className="item-copy"><h3>{result.quizTitle}</h3><p>{new Date(result.createdAt).toLocaleDateString()}</p></div><strong className="result-score">{result.score}<small> / {result.total}</small></strong></Link>)}</div> : <div className="dashboard-empty"><p>No quiz attempts yet. Find one that looks fun.</p><Link className="text-link" to="/quizzes">Explore quizzes ↗</Link></div>}
            </section>
          </div>
        </>
      )}
    </section>
  );
}
