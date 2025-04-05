/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import "./Sign-up.css";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { BASE_URL } from "../utils/Constants";
const SignUp = () => {
  let [userDetails, setUserDetails] = useState({});
  const nav = useNavigate();
  const updateDetails = useCallback(
    debounce((propertyName, value) => {
      setUserDetails((prev) => ({ ...prev, [propertyName]: value }));
    }, 400),
    [] // Empty dependency array ensures it is created only once
  );
  return (
    <div className="signup-parent">
      <div className="signup-image">
        <div className="signup-image-content">
          {/* <h1 style={{fontSize:"1.4rem"}}>Welcome to The CHAT APP</h1> */}
        </div>
      </div>
      <div className="signup-content">
        <div className="signup-content-parent">
          <div className="signup-header">
            <h1>Sign Up</h1>
          </div>
          <div className="first-form">
            <div>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={(e) => {
                  updateDetails(e.target.name, e.target.value);
                }}
                placeholder="Enter The First Name"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter The Last Name"
                onChange={(e) => {
                  updateDetails(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
          <div className="second-form">
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
            <div>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter Phonenumber"
                onChange={(e) => {
                  updateDetails(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
          <div className="signup-footer">
            <div className="signup-footer-1">
              <input type="checkbox" name="" id="" />{" "}
              <p style={{ fontSize: "0.7rem" }}>
                by signing up you accept the{" "}
                <span style={{ color: "blue" }}>Terms of Service</span> and{" "}
                <span style={{ color: "blue" }}>Privacy Policy</span>
              </p>
            </div>
            <div>
              <button
                className="signup-button"
                onClick={async () => {
                  let obj = {
                    userName:
                      userDetails.firstName + "  " + userDetails.lastName,
                    password: userDetails.password,
                    phoneNumber: userDetails.phoneNumber,
                    email: userDetails.email,
                  };
                  const data = await fetch(`${BASE_URL}user/signup`, {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                      "Content-Type": "application/json", // Important to tell the API that it's JSON
                    },
                  });
                  const response = await data.text(); // Parse JSON response
                  if (data.status === 201 || data) {
                    nav("/login"); // Redirect to login page on success
                  } else {
                    alert("Signup failed, please try again!"); // Handle failure
                  }
                }}
              >
                Sign up
              </button>
            </div>
            <div className="signup-footer-3">
              <p style={{ fontSize: "0.9rem" }}>
                Already have an Account?{" "}
                <span className="sign-up-login" style={{ color: "blue" }}>
                  <Link to="/login" className="credential-link">
                    Login
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

export default SignUp;
