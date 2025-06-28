import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { JobDashboard } from "./pages/JobDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function AppRoutes() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null;
  }

  const { isAuthenticated, loading } = auth;
  if (loading) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/app" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/app" replace /> : <SignUp />}
      />
      <Route
        path="/app"
        element={
          isAuthenticated ? (
            <SidebarProvider>
              <JobDashboard />
            </SidebarProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster richColors position="top-center" closeButton />
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
