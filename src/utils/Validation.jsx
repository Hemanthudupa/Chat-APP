import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const Validation = ({ children }) => {
  const nav = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      nav("/login");
    }
  }, [token, nav]);

  // Render nothing while redirecting (optional)
  if (!token) return null;

  return children;
};

export default Validation;
