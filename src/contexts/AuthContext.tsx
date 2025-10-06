import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'staff' | 'finance' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  { id: '1', name: 'ผู้ดูแลระบบ', email: 'admin@fixflow.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'พนักงานหน้าร้าน', email: 'staff@fixflow.com', password: 'staff123', role: 'staff' },
  { id: '3', name: 'ฝ่ายการเงิน', email: 'finance@fixflow.com', password: 'finance123', role: 'finance' },
  { id: '4', name: 'ผู้ดูข้อมูล', email: 'viewer@fixflow.com', password: 'viewer123', role: 'viewer' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('fixflow_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('fixflow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('fixflow_user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fixflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
