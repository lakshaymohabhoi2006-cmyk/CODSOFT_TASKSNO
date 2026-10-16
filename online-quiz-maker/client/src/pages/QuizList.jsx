import { useEffect, useMemo, useState } from 'react';
import QuizCard from '../components/QuizCard';
import api from '../api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/quizzes')
      .then(({ data }) => setQuizzes(data.quizzes))
      .catch(() => setError('Could not load quizzes. Make sure the API is running.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return quizzes.filter((quiz) => `${quiz.title} ${quiz.description} ${quiz.createdBy}`.toLowerCase().includes(term));
  }, [quizzes, search]);

  return (
    <section className="wrap section page-section">
      <div className="page-heading">
        <span className="eyebrow">A little something to learn</span>
        <h1>Pick your next quiz.</h1>
        <p>Browse what people have made, pick a topic, and see where you land.</p>
      </div>
      <div className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by title or topic" aria-label="Search quizzes" /></div>
      {loading ? <p className="notice">Loading quizzes…</p> : error ? <p className="error-box">{error}</p> : filtered.length ? (
        <div className="quiz-grid">{filtered.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}</div>
      ) : (
        <div className="empty-card"><div className="empty-icon">⌕</div><h3>No quizzes found.</h3><p>Try a different search, or be the first to make one.</p></div>
      )}
    </section>
  );
}
