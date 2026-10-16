import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get(`/quizzes/${id}`)
      .then(({ data }) => {
        if (!active) return;
        setQuiz(data.quiz);
        setAnswers(Array(data.quiz.questions.length).fill(null));
      })
      .catch((requestError) => setError(requestError.response?.data?.message || 'Could not open this quiz.'))
      .finally(() => setLoading(false));
    return () => { active = false; };
  }, [id]);

  async function nextQuestion() {
    if (answers[current] === null) return;
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const { data } = await api.post(`/quizzes/${id}/submit`, { answers });
      navigate(`/result/${data.resultId}`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not submit your answers.');
      setSubmitting(false);
    }
  }

  if (loading) return <div className="wrap section notice">Opening your quiz…</div>;
  if (!quiz) return <section className="wrap section empty-state"><h1>Quiz not found.</h1><Link className="text-link" to="/quizzes">Back to quizzes</Link>{error && <p className="error-box">{error}</p>}</section>;

  const question = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;

  return (
    <section className="wrap section page-section quiz-taking">
      <Link className="back-link" to="/quizzes">← All quizzes</Link>
      <div className="quiz-taking-head"><div><span className="eyebrow">{quiz.createdBy} made this</span><h1>{quiz.title}</h1></div><span className="eyebrow">QUESTION {current + 1} OF {quiz.questions.length}</span></div>
      <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
      <div className="take-card">
        <span className="question-number">QUESTION {String(current + 1).padStart(2, '0')}</span>
        <h2>{question.text}</h2>
        <div className="take-options">
          {question.options.map((option, index) => (
            <button type="button" key={option + index} onClick={() => setAnswers((currentAnswers) => currentAnswers.map((answer, position) => position === current ? index : answer))} className={`take-option ${answers[current] === index ? 'take-option-selected' : ''}`}>
              <span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="option-check">{answers[current] === index ? '✓' : ''}</span>
            </button>
          ))}
        </div>
        {error && <p className="error-box">{error}</p>}
        <div className="take-actions">
          <button type="button" className="button button-outline" onClick={() => setCurrent(current - 1)} disabled={current === 0}>← Previous</button>
          <span className="muted">{answers.filter((answer) => answer !== null).length} of {quiz.questions.length} answered</span>
          <button type="button" className="button" disabled={answers[current] === null || submitting} onClick={nextQuestion}>{submitting ? 'Checking…' : current === quiz.questions.length - 1 ? 'See my score ↗' : 'Next question →'}</button>
        </div>
      </div>
    </section>
  );
}
