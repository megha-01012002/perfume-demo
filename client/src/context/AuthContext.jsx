import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

// This context talks to src/services/authService.js, which is written
// against the real POST /api/auth/login|register and GET /api/auth/me
// endpoints (see server/routes/authRoutes.js). In this offline preview
// build, authService falls back to a localStorage-backed mock so the
// full account flow (register, login, protected pages, logout) can be
// demoed without a running backend — see authService.js for the switch.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((u) => setUser(u))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const u = await authService.login(email, password);
    setUser(u);
    return u;
  };

  const register = async (data) => {
    const u = await authService.register(data);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
