// contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { tokenManager } from "@/utils/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    tokenManager.isAuthenticated()
  );

  const login = (token: string) => {
    tokenManager.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    tokenManager.removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
