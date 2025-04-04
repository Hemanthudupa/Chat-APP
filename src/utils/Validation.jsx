import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const Validation = ({ children }) => {
  const nav = useNavigate();
  const { token } = useAuth();
  console.log(localStorage.getItem("token"), " is the token in local storage");
  useEffect(() => {
    if (!token && !localStorage.getItem("token")) {
      console.log(" nvigating to login page");
      nav("/login");
    }
  }, [token, nav]);

  // Render nothing while redirecting (optional)
  // if (!token) return null;

  return children;
};

export default Validation;
