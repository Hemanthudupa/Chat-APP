import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useAuth } from "../utils/AuthContext";
const Login = () => {
  const { login } = useAuth();

  let [userDetails, setUserDetails] = useState({});
  const nav = useNavigate();
  const updateDetails = useCallback(
    debounce((propertyName, value) => {
      setUserDetails((prev) => ({ ...prev, [propertyName]: value }));
    }, 400),
    [] // Empty dependency array ensures it is created only once
  );
  return (
    <div className="parent-login">
      <div className="login-image"></div>
      <div className="login-content">
        <div className="login-content-parent">
          <div className="login-header">
            <h1>Login In</h1>
          </div>
          <div className="login-first-form">
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  updateDetails(e.target.name, e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  updateDetails(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
          <div className="login-footer">
            <div className="login-footer">
              <div className="login-footer-1">
                <input type="checkbox" name="" id="" />{" "}
                <p style={{ fontSize: "0.7rem" }}>
                  by signing up you accept the{" "}
                  <span style={{ color: "blue" }}>Terms of Service</span> and{" "}
                  <span style={{ color: "blue" }}>Privacy Policy</span>
                </p>
              </div>
            </div>
            <div>
              <button
                className="login-button"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await fetch("http://localhost:5001/user/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userDetails),
                  });
                  const data = await res.json();
                  if (res.status == 200) {
                    login(data.token);
                    nav("/");
                  } else {
                    let code = data.code;
                    alert(code);
                  }
                }}
              >
                Login In
              </button>
            </div>

            <div className="login-footer-3">
              <p style={{ fontSize: "0.9rem" }}>
                create accout?{" "}
                <span className="login-signup" style={{ color: "blue" }}>
                  <Link to="/sign-up" className="credential-link">
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
