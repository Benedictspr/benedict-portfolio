'use client';

import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

interface AdminModalProps {
  onClose: () => void;
}

export default function AdminModal({ onClose }: AdminModalProps) {
  const { isAdmin, login, logout } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      onClose();
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-xs shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-655 dark:hover:text-zinc-200 text-xs font-mono"
        >
          ✖
        </button>

        {isAdmin ? (
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest mb-6 text-zinc-500">Admin Mode</h2>
            <p className="text-sm mb-6 text-emerald-600 dark:text-emerald-400 font-medium">✓ Currently authorized</p>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-600 text-white font-bold text-xs rounded-lg uppercase tracking-wider hover:bg-red-700 transition"
            >
              Deauthorize (Logout)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="font-mono text-xs uppercase tracking-widest mb-6 text-zinc-500">Admin Access</h2>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 pb-2 outline-none text-sm focus:border-zinc-500 transition-colors"
                required
                disabled={loading}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 pb-2 outline-none text-sm focus:border-zinc-500 transition-colors"
                required
                disabled={loading}
              />
            </div>

            {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-xs rounded-lg uppercase tracking-wider disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Authorizing...' : 'Authorize'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
