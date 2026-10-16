import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="nav wrap">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">q.</span>
          <span>quizletto</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/quizzes" onClick={closeMenu}>Explore quizzes</NavLink>
          {user ? (
            <>
              <NavLink to="/create" onClick={closeMenu}>Create a quiz</NavLink>
              <NavLink to="/dashboard" onClick={closeMenu}>My dashboard</NavLink>
              <button className="button button-small button-quiet" onClick={() => { logout(); closeMenu(); }}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>Log in</NavLink>
              <Link className="button button-small" to="/register" onClick={closeMenu}>Join free</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
