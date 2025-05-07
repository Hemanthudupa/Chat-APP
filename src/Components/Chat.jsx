import "./Chat.css";
import { CgProfile } from "react-icons/cg";
import { IoVideocamOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { RiAttachment2 } from "react-icons/ri";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const chatAreaRef = useRef(null);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth", // remove "behavior" if you want instant scroll
      });
    }
  };

  // Scroll chat on new message
  useEffect(() => {
    scrollToBottom();
  }, [uiText]);

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
    console.log("📦 Generated roomId:", generatedRoomId);
    return generatedRoomId;
  }, [user?.id, userDetail]);

  // Register and join room
  useEffect(() => {
    if (!socket || !user?.id || !id || !roomId) return;

    const joinRoom = () => {
      console.log("🚪 Joining room from FE:", roomId);
      socket.emit("register", { userId: user.id });
      socket.emit("create-room", {
        senderUserId: userDetail.userId,
        contactId: userDetail.contactUserId,
      });
    };

    if (socket.connected) {
      joinRoom();
    }

    socket.on("connect", joinRoom);

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [socket, user?.id, id, roomId, userDetail]);

  // Clear chat UI on ID change
  useEffect(() => {
    async function getMessages() {
      let res = await fetch(
        `${BASE_URL}message/messages?from=${user.id}&to=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      res = await res.json();
      setUiText((prev) => [prev, ...res]);
    }
    getMessages();
  }, [user, id, userDetail]);

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
    if (!text.trim()) return;

    const sendMessage = {
      roomId,
      senderUserId: userDetail.userId,
      contactId: userDetail.contactUserId,
      message: text,
    };

    socket.emit("send-message", sendMessage);

    setUiText((prev) => [
      ...prev,
      {
        message: text,
        senderUserId: userDetail.userId,
        contactId: userDetail.contactUserId,
      },
    ]);

    setText("");
  };

  // Debug socket connection
  useEffect(() => {
    if (!socket) return;

    console.log("🔌 Socket connected:", socket.connected);

    socket.on("connect", () => {
      console.log("✅ Socket reconnected");
    });

    return () => {
      socket.off("connect");
    };
  }, [socket]);

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
        <div className="chat-area" ref={chatAreaRef}>
          {uiText.map((ele, index) => {
            const currentRoom = ele.roomId;
            if (currentRoom && currentRoom !== roomId) return null;

            return (
              <div className="chat-text" key={index}>
                {ele.senderUserId === user.id ? (
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
