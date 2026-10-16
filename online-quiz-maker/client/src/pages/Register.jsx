import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DEMO_MODE } from '../api';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="wrap auth-page">
      <div className="auth-aside"><span className="eyebrow">A small start, a lot to learn</span><h1>Curiosity<br />looks good<br /><em>on you.</em></h1><p>Save your results, make your own quizzes, and learn a little every day.</p><span className="auth-doodle">✦</span></div>
      <form className="form-card auth-form" onSubmit={submit}>
        <span className="eyebrow">Come on in</span><h2>Create your account.</h2><p className="muted">Free to join. Always good to be curious.</p>
        {DEMO_MODE && <p className="success-box">Public demo: this account is saved only in your browser, not on a server.</p>}
        {error && <p className="error-box">{error}</p>}
        <label className="field-label">Your name<input name="name" autoComplete="name" maxLength="80" required value={form.name} onChange={change} placeholder="What should we call you?" /></label>
        <label className="field-label">Email address<input name="email" type="email" autoComplete="email" required value={form.email} onChange={change} placeholder="you@example.com" /></label>
        <label className="field-label">Password<input name="password" type="password" autoComplete="new-password" minLength="8" required value={form.password} onChange={change} placeholder="At least 8 characters" /></label>
        <button className="button auth-submit" disabled={loading}>{loading ? 'Making your account…' : 'Create account ↗'}</button>
        <p className="auth-switch">Already have an account? <Link className="text-link" to="/login">Log in</Link></p>
      </form>
    </section>
  );
}
