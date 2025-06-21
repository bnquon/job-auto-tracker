import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { JobDashboard } from "./pages/JobDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/app" element={<JobDashboard />} />
    </Routes>
  );
}

export default App;
