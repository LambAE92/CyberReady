import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDistrict, setActiveDistrict] = useState(null);

  useEffect(() => {
    api.me()
      .then(u => {
        setUser(u);
        // Admin overview mode = explicitly null district
        setActiveDistrict(u.adminOverview ? null : (u.district || null));
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => { setUser(null); setActiveDistrict(null); };
    window.addEventListener('hallmonitor:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('hallmonitor:unauthorized', handleUnauthorized);
  }, []);

  const login = async (username, password) => {
    const u = await api.login(username, password);
    setUser(u);
    setActiveDistrict(u.adminOverview ? null : (u.district || null));
    return u;
  };

  const logout = async () => {
    try { await api.logout(); } finally {
      setUser(null);
      setActiveDistrict(null);
    }
  };

  const switchDistrict = async (districtId) => {
    const d = await api.switchDistrict(districtId);
    // null / adminOverview response means admin-overview mode
    if (d?.adminOverview || districtId === null) {
      setActiveDistrict(null);
    } else {
      setActiveDistrict(d);
    }
    return d;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    activeDistrict,
    switchDistrict,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
