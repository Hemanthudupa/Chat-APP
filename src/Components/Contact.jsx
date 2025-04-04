import { CgProfile } from "react-icons/cg";
import "./Contact.css";

const Contact = ({ data: contact }) => {
  return (
    <div className="parent">
      <div className="profile">
        <CgProfile />
      </div>
      <div className="details">
        <p className="name">{contact.contactName}</p>
        <p className="recent-message">how are you </p>
      </div>
    </div>
  );
};

export default Contact;
