import { Link } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  return (
    <article className="quiz-card">
      <div className="quiz-card-top">
        <span className="quiz-icon" aria-hidden="true">✳</span>
        <span className="eyebrow">{quiz.questionCount} questions</span>
      </div>
      <h3>{quiz.title}</h3>
      <p className="muted">{quiz.description || 'A little challenge to sharpen your knowledge.'}</p>
      <div className="quiz-card-bottom">
        <span className="muted">Made by {quiz.createdBy || 'you'}</span>
        <Link className="text-link" to={`/quizzes/${quiz.id}`}>Take quiz <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
