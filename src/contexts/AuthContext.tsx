import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  role: 'recruitment' | 'committee' | 'business unit';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers: User[] = [
  { name: 'HR Team', email: 'hr@icesco.org', role: 'recruitment' },
  { name: 'Naoufal Chaouqi', email: 'naoufal.chaouqi@icesco.org', role: 'business unit' },
  { name: 'Sally Mabrouk', email: 'sally.mabrouk@icesco.org', role: 'committee' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('manpower_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('manpower_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('manpower_user');
    }
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - password is 123456 for all users
    if (password === '123456') {
      const foundUser = demoUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};