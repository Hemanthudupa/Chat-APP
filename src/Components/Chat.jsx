import "./Chat.css";
import { CgProfile } from "react-icons/cg";
import { IoVideocamOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { RiAttachment2 } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
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
      console.log("🔍 setting up contact response", response);
    }
    if (id) fetchSingleContact(id);
  }, [id]);

  // Create roomId
  const roomId = useMemo(() => {
    if (!user?.id || !userDetail?.contactUserId) return null;
    const generatedRoomId = [userDetail.userId, userDetail.contactUserId]
      .sort()
      .join("_");
    return generatedRoomId;
  }, [user?.id, userDetail]);

  // Register and join room
  useEffect(() => {
    if (!socket || !user?.id || !id || !roomId) return;

    const joinRoom = () => {
      console.log("🚪 Joining room from FE:", roomId);
      socket.emit("register", { userId: user.id });
      socket.emit("create-room", {
        senderId: userDetail.userId,
        contactId: userDetail.contactUserId,
      });
    };

    if (socket.connected) joinRoom();
    socket.on("connect", joinRoom);

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [socket, user?.id, id, roomId, userDetail]);

  // Clear chat UI on ID change
  useEffect(() => {
    setUiText([]);
  }, [id]);

  // Handle receiving messages
  useEffect(() => {
    if (!socket) return;

    const handleResponse = (data) => {
      console.log("📥 Received message:", data);
      setUiText((prev) => [...prev, data]);
    };

    socket.on("recive-message", handleResponse);

    return () => {
      socket.off("recive-message", handleResponse);
    };
  }, [socket]);

  // Send message
  const handleSendMessage = () => {
    if (!text.trim() || !userDetail) return;

    const sendMessage = {
      roomId,
      senderId: userDetail.userId,
      contactId: userDetail.contactUserId,
      message: text,
    };

    socket.emit("send-message", sendMessage);
    setText(""); // Don't update uiText here – let socket handle it
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
          {uiText.map((ele, index) => {
            if (ele.roomId !== roomId) return null;

            const isCurrentUser = ele.senderId === user?.id;

            return (
              <div className="chat-text" key={index}>
                {isCurrentUser ? (
                  <div className="chat-right">
                    <p className="chat-bubble">{ele.message}</p>
                  </div>
                ) : (
                  <div className="chat-left">
                    <p className="chat-bubble">{ele.message}</p>
                  </div>
                )}
              </div>
            );
          })}
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
