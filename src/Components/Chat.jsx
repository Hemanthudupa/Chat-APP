import "./Chat.css";
import { CgProfile } from "react-icons/cg";
import { IoVideocamOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { RiAttachment2 } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { useSocket } from "../utils/socket";
import { useAuthUserDetails } from "../utils/UserDetails";

const Chat = () => {
  const token = sessionStorage.getItem("token");
  const { user } = useAuthUserDetails();
  const socket = useSocket();
  const { id } = useParams();

  const [userDetail, setUserDetail] = useState(null);
  const [text, setText] = useState("");
  const [uiText, setUiText] = useState([]);

  // Fetch contact details
  useEffect(() => {
    async function fetchSingleContact(id) {
      const res = await fetch(`${BASE_URL}contacts/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await res.json();
      setUserDetail(response);
    }
    if (id) fetchSingleContact(id);
  }, [id]);

  // Register the user on socket connect
  useEffect(() => {
    if (socket && user) {
      socket.emit("register", { userId: user.id });
    }
  }, [socket, user]);

  // Listen to response event
  useEffect(() => {
    if (!socket) return;

    const handleResponse = (data) => {
      console.log("Received message:", data);
      setUiText((prev) => [...prev, data]);
    };

    socket.on("response", handleResponse);

    return () => {
      socket.off("response", handleResponse); // cleanup
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!text.trim()) return;
    setUiText((prev) => [
      ...prev,
      {
        message: text,
        senderId: id,
      },
    ]);

    socket.emit("private-message", {
      to: id,
      message: text,
    });

    setText("");
  };

  return (
    <div className="parent-chat">
      <div className="profile-top">
        <div className="first">
          <div className="profile-pic">
            <CgProfile className="profile-photo" />
          </div>
          <div className="profile-details">
            <p className="name">{userDetail?.contactName || "loading"}</p>
            <p className="status">Online</p>
          </div>
        </div>
        <div className="second">
          <IoVideocamOutline />
          <CiCircleInfo />
        </div>
      </div>

      <div className="chat-ui">
        <div className="chat-area">
          {uiText.map((ele, index) => (
            <div className="chat-text" key={index}>
              {ele.senderId == id ? (
                <div className="chat-right">
                  <p className="chat-bubble">{ele.message}</p>
                </div>
              ) : (
                <div className="chat-left">
                  <p className="chat-bubble">{ele.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="type-message">
        <div className="send-files">
          <RiAttachment2 />
        </div>
        <div className="text-area-chat">
          <textarea
            placeholder="Type your message here"
            className="text-area-field"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="send-btn-div">
          <button className="send-btn" onClick={handleSendMessage}>
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
