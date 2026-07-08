import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // On first load, rehydrate the session from localStorage and verify
  // the token is still valid by fetching the current user.
  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!token) {
        setLoading(false);
        return;
      }

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore malformed cache
        }
      }

      try {
        const { user: freshUser } = await authService.getMe();
        setUser(freshUser);
        localStorage.setItem('user', JSON.stringify(freshUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const persistSession = (nextUser, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const register = useCallback(async (payload) => {
    setAuthError(null);
    try {
      const { user: newUser, token } = await authService.register(payload);
      persistSession(newUser, token);
      return newUser;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setAuthError(message);
      throw err;
    }
  }, []);

  const login = useCallback(async (payload) => {
    setAuthError(null);
    try {
      const { user: loggedInUser, token } = await authService.login(payload);
      persistSession(loggedInUser, token);
      return loggedInUser;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setAuthError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // even if the API call fails, clear local session
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const updateUserInContext = useCallback((updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem('user', JSON.stringify(next));
      return next;
    });
  }, []);

  const value = {
    user,
    loading,
    authError,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
    updateUserInContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
