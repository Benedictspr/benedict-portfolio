'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  adminPass: string | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState<string | null>(null);

  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    const savedPass = localStorage.getItem('admin_pass');
    if (adminSession === 'authorized' && savedPass) {
      setIsAdmin(true);
      setAdminPass(savedPass);
    }
  }, []);

  const login = async (username: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, pass }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        setAdminPass(pass);
        localStorage.setItem('admin_session', 'authorized');
        localStorage.setItem('admin_pass', pass);
        return true;
      }
    } catch (e) {
      console.error('Login error:', e);
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminPass(null);
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_pass');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminPass, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
