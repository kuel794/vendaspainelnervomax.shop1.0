import { createContext, useState, useEffect } from 'react';
import { googleSheetsService } from '../services/googleSheetsService';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const newUser = { id: Date.now().toString(), email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const register = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const newUser = { id: Date.now().toString(), email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

    // Registrar usuário na planilha do Google Sheets
    try {
      await googleSheetsService.registerUser(email);
      console.log('Usuário registrado na planilha com sucesso');
    } catch (error) {
      console.error('Erro ao registrar usuário na planilha:', error);
      // Não falhar o registro local mesmo se a planilha falhar
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('salesData');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};