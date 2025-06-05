import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

interface User {
  id: string;
  email: string;
  role: string;
  nome: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  nascimento: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@LisModas:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('@LisModas:token');
    if (token && !user) {
      // Aqui você pode adicionar uma chamada para validar o token
      // e obter os dados atualizados do usuário
    }
  }, [user]);

  const login = async (email: string, senha: string) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await authApi.login(email, senha);

      localStorage.setItem('@LisModas:token', token);
      localStorage.setItem('@LisModas:user', JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao fazer login';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await authApi.register(data);

      localStorage.setItem('@LisModas:token', token);
      localStorage.setItem('@LisModas:user', JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao fazer cadastro';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('@LisModas:token');
    localStorage.removeItem('@LisModas:user');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      isAuthenticated: !!user,
      loading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 