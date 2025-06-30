import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { JobDashboard } from "./pages/JobDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/Auth";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();
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
        <Toaster richColors position="top-center" />
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
