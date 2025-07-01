import { Routes, Route, Navigate } from "react-router-dom";
import { JobDashboard } from "./pages/JobDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/Auth";
import React from "react";

const queryClient = new QueryClient();

const LoginPage = React.lazy(() => import('../src/pages/Login'));
const SignUpPage = React.lazy(() => import('../src/pages/SignUp'));

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/app" replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/app" replace /> : <SignUpPage />}
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
        <Toaster richColors position="top-center" />
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
