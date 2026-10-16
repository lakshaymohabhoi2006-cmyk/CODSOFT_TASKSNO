import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import CreateQuiz from './pages/CreateQuiz';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import QuizList from './pages/QuizList';
import Register from './pages/Register';
import Result from './pages/Result';
import TakeQuiz from './pages/TakeQuiz';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/quizzes/:id" element={<RequireAuth><TakeQuiz /></RequireAuth>} />
            <Route path="/create" element={<RequireAuth><CreateQuiz /></RequireAuth>} />
            <Route path="/result/:id" element={<RequireAuth><Result /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div className="wrap empty-state"><h1>That page wandered off.</h1><Link className="text-link" to="/">Back home</Link></div>} />
          </Routes>
        </main>
        <footer className="site-footer">
          <div className="wrap footer-inner">
            <span className="brand"><span className="brand-mark">q.</span> quizletto</span>
            <span>Demo mode: your data stays in this browser.</span>
          </div>
        </footer>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
