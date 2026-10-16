import { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('quiz-user') || 'null');
    } catch {
      localStorage.removeItem('quiz-user');
      return null;
    }
  });

  async function authenticate(path, form) {
    const response = await api.post(`/auth/${path}`, form);
    localStorage.setItem('quiz-token', response.data.token);
    localStorage.setItem('quiz-user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  }

  function logout() {
    localStorage.removeItem('quiz-token');
    localStorage.removeItem('quiz-user');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (form) => authenticate('login', form),
        register: (form) => authenticate('register', form),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
