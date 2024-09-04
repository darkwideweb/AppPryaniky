import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверка аутентификации
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userInfo = await authService.validateToken(token);
          if (userInfo) {
            setUser({ token, ...userInfo });
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Ошибка проверки аутентификации:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const { token, userInfo } = await authService.login({ username, password });
      localStorage.setItem('token', token);
      setUser({ token, ...userInfo });
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? <div>Загрузка...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
