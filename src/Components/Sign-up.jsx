import "./Sign-up.css";
const SignUp = () => {
  return (
    <div className="signup-parent">
      <div className="signup-image">
        <div className="signup-image-content">
          <h1>Welcome to The CHAT APP</h1>
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
                name=""
                id=""
                placeholder="Enter The First Name"
              />
            </div>
            <div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter The Last Name"
              />
            </div>
          </div>
          <div className="second-form">
            <div>
              <input type="text" name="" id="" placeholder="Enter Email" />
            </div>
            <div>
              <input type="text" name="" id="" placeholder="Enter Password" />
            </div>
            <div>
              <input type="text" name="" id="" placeholder="Confirm Password" />
            </div>
          </div>
          <div className="signup-footer">
            <div className="signup-footer-1">
              <input type="checkbox" name="" id="" />{" "}
              <p>
                by signing up you accept the{" "}
                <span style={{ color: "blue" }}>Terms of Service</span> and{" "}
                <span style={{ color: "blue" }}>Privacy Policy</span>
              </p>
            </div>
            <div>
              <button className="signup-button">Sign up</button>
            </div>
            <div className="signup-footer-3">
              <p>
                Already have an Account?{" "}
                <span className="sign-up-login" style={{ color: "blue" }}>
                  Login
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
