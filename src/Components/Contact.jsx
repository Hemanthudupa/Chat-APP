import { CgProfile } from "react-icons/cg";

import "./Contact.css";
const Contact = () => {
  return (
    <div className="parent">
      <div className="profile">
        <CgProfile />
      </div>
      <div className="details">
        <p className="name">hemanth</p>
        <p className="recent-message">how are you </p>
      </div>
    </div>
  );
};

export default Contact;
