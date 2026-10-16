import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

export default function Result() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/results/${id}`)
      .then(({ data }) => setResult(data.result))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Could not load your result.'));
  }, [id]);

  if (error) return <section className="wrap section page-section"><p className="error-box">{error}</p><Link className="text-link" to="/dashboard">Go to dashboard</Link></section>;
  if (!result) return <div className="wrap section notice">Checking your answers…</div>;

  const percent = Math.round((result.score / result.total) * 100);
  const message = percent === 100 ? 'Perfect score. You really know your stuff.' : percent >= 70 ? 'Nicely done. You know your way around this topic.' : percent >= 40 ? 'Good start. You picked up a few new things.' : 'Every answer is a chance to learn something new.';

  return (
    <section className="wrap section page-section result-page">
      <div className="result-hero">
        <span className="score-spark">✳</span>
        <span className="eyebrow">You finished the quiz</span>
        <h1>{result.score}<span> / {result.total}</span></h1>
        <div className="score-ring"><span>{percent}%</span><small>YOUR SCORE</small></div>
        <h2>{message}</h2>
        <p className="muted">{result.quizTitle}</p>
        <div className="hero-actions centered"><Link className="button" to="/quizzes">Try another quiz ↗</Link><Link className="button button-outline" to="/dashboard">My dashboard</Link></div>
      </div>
      <div className="review-list">
        <div className="section-row"><div><span className="eyebrow">The answer key</span><h2>Let’s go through them.</h2></div></div>
        {result.questions.map((question, index) => {
          const correct = question.selectedIndex === question.correctIndex;
          return (
            <article className="review-card" key={`${question.text}-${index}`}>
              <div className="review-heading"><span className="question-number">QUESTION {String(index + 1).padStart(2, '0')}</span><span className={`review-status ${correct ? 'status-correct' : 'status-wrong'}`}>{correct ? 'That’s right ✓' : 'Not quite'}</span></div>
              <h3>{question.text}</h3>
              <p className={correct ? 'review-answer answer-correct' : 'review-answer answer-wrong'}>Your answer: {question.options[question.selectedIndex]}</p>
              {!correct && <p className="review-answer answer-correct">Correct answer: {question.options[question.correctIndex]}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
