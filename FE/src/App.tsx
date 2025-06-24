import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { JobDashboard } from "./pages/JobDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const queryClient = new QueryClient();

function AppRoutes() {
  const auth = useContext(AuthContext);

   if (!auth) {
    return null;
  }

  const { isAuthenticated, loading } = auth;
  console.log(isAuthenticated);
  if (loading) return null; // need spinner later

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/app" replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/app" replace /> : <SignUp />
        }
      />
      <Route
        path="/app"
        element={
          isAuthenticated ? <JobDashboard /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
