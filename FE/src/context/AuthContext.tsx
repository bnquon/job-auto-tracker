import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      await api.get("/auth/me"); // Will send cookies
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/users/logout");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    checkAuth(); // only runs once on mount
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
