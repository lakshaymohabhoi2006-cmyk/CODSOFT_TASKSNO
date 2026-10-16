import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QuizCard from '../components/QuizCard';
import { useEffect, useState } from 'react';
import api from '../api';

export default function Home() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    api.get('/quizzes')
      .then(({ data }) => setQuizzes(data.quizzes.slice(0, 3)))
      .catch(() => setLoadError('Quiz previews are unavailable right now. Check that the API is running.'));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> A better kind of brain break</span>
            <h1>Make learning<br /><span>a little more fun.</span></h1>
            <p>Build a quick quiz about something you love, or find a new topic and see how much you know.</p>
            <div className="hero-actions">
              <Link className="button" to={user ? '/create' : '/register'}>Make a quiz <span aria-hidden="true">↗</span></Link>
              <Link className="button button-outline" to="/quizzes">Explore quizzes</Link>
            </div>
            <div className="hero-note"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span> Made by learners, for learners</div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="quiz-sheet">
              <div className="sheet-top"><span>QUICK QUIZ</span><span>02 / 05</span></div>
              <div className="sheet-progress"><span /></div>
              <p className="sheet-question">Which planet has the most moons?</p>
              <div className="sheet-option"><b>A</b> Earth</div>
              <div className="sheet-option selected"><b>B</b> Saturn <span>✓</span></div>
              <div className="sheet-option"><b>C</b> Jupiter</div>
              <div className="sheet-option"><b>D</b> Neptune</div>
              <div className="sheet-foot"><span>Nice one ✨</span><span>Next →</span></div>
            </div>
            <div className="floating-badge badge-star">✳</div>
            <div className="floating-badge badge-score"><span>YOUR SCORE</span><strong>8 / 10</strong><em>Nice work!</em></div>
            <div className="floating-badge badge-spark">✦</div>
          </div>
        </div>
      </section>

      <section className="wrap section how-section">
        <div className="section-heading">
          <span className="eyebrow">Simple by design</span>
          <h2>From curious to confident<br />in three little steps.</h2>
        </div>
        <div className="step-grid">
          <article className="step-card"><span className="step-number">01</span><div className="step-icon lavender">✎</div><h3>Make it yours</h3><p>Write a few questions about a topic you care about. Pick the right answer and you’re set.</p></article>
          <article className="step-card"><span className="step-number">02</span><div className="step-icon peach">⌕</div><h3>Take a new quiz</h3><p>Find something interesting, answer one question at a time, and trust your first instinct.</p></article>
          <article className="step-card"><span className="step-number">03</span><div className="step-icon mint">↗</div><h3>See what you know</h3><p>Get your score right away, then review each answer and pick up something new.</p></article>
        </div>
      </section>

      <section className="featured-section">
        <div className="wrap section">
          <div className="section-row">
            <div><span className="eyebrow">A good place to start</span><h2>Quizzes worth a try.</h2></div>
            <Link className="text-link" to="/quizzes">See all quizzes <span aria-hidden="true">↗</span></Link>
          </div>
          {loadError ? (
            <p className="error-box">{loadError}</p>
          ) : quizzes.length ? (
            <div className="quiz-grid">{quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}</div>
          ) : (
            <div className="empty-card"><div className="empty-icon">✳</div><h3>Make the first one.</h3><p>There are no quizzes yet. Start with something you know well and share it with everyone.</p><Link className="button" to={user ? '/create' : '/register'}>Create a quiz</Link></div>
          )}
        </div>
      </section>
      <section className="wrap callout">
        <div><span className="eyebrow">Your turn</span><h2>Got a topic in mind?</h2><p>It only takes a few minutes to make a quiz someone will love.</p></div>
        <Link className="button button-light" to={user ? '/create' : '/register'}>Start creating <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
