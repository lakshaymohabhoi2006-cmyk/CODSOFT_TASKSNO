import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DEMO_MODE } from '../api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not log in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="wrap auth-page">
      <div className="auth-aside"><span className="eyebrow">Good to have you back</span><h1>Your next<br />good idea is<br /><em>one quiz away.</em></h1><p>Pick up where you left off, or find something new to learn.</p><span className="auth-doodle">✳</span></div>
      <form className="form-card auth-form" onSubmit={submit}>
        <span className="eyebrow">Welcome back</span><h2>Log in to quizletto.</h2><p className="muted">Your quizzes and results are right where you left them.</p>
        {DEMO_MODE && <p className="success-box">Public demo: sign-in is stored only in this browser. Use any email and password to try it.</p>}
        {error && <p className="error-box">{error}</p>}
        <label className="field-label">Email address<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
        <label className="field-label">Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" /></label>
        <button className="button auth-submit" disabled={loading}>{loading ? 'Logging in…' : 'Log in ↗'}</button>
        <p className="auth-switch">New around here? <Link className="text-link" to="/register">Make an account</Link></p>
      </form>
    </section>
  );
}
