import "./Navbar.css";
import { CiGlobe } from "react-icons/ci";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import { CiMusicNote1 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
const Navbar = () => {
  const [contacts, setContacts] = useState([]);
  let { token } = useAuth();
  if (!token) {
    token = sessionStorage.getItem("token");
  }
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${BASE_URL}contacts/contact`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);
  return (
    <div className="navbar">
      <div className="nav-1">
        <div className="navbar-content">
          <img
            src="https://icon-library.com/images/chat-app-icon/chat-app-icon-12.jpg"
            alt=""
            className="icon"
          />
          <CgProfile />

          <hr style={{ width: "60%" }} />
          <CiGlobe />
          <BsFillChatTextFill />
          <IoVideocamOutline />
          <CiMusicNote1 />
          <SlCalender />
        </div>
        <div className="navbar-logout">
          <CiSettings />

          <CiLogout />
        </div>
      </div>
      <div className="nav-2">
        <div className="contact-list">
          <div className="header">
            <div className="message-div">
              <p className="p-message-div">Messages</p>
            </div>
            <div className="form-div">
              <div className="search-tab">
                <div className="search-img-div">
                  <CiSearch className="search-img" />
                </div>
                <input
                  type="text"
                  name=""
                  placeholder="Search"
                  className="search-form"
                />
              </div>
            </div>
          </div>
          <div className="contact">
            {contacts.map((contact) => (
              <Link to={`/chat/${contact.id}`} className="link-tag-contact"  key={contact.id}>
                <Contact key={contact.id} data={contact} />
              </Link>
            ))}
            {/* <Contact /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
