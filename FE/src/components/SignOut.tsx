import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Button onClick={handleSignOut} className="w-fit">
      Sign Out
    </Button>
  )
}