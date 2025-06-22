import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { JobDashboard } from "./pages/JobDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<JobDashboard />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
