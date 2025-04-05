import "./Chat.css";
import { CgProfile } from "react-icons/cg";
import { IoVideocamOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { RiAttachment2 } from "react-icons/ri";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { useSocket } from "../utils/socket";

const Chat = () => {
  const token = sessionStorage.getItem("token");
  const socket = useSocket();

  const { id } = useParams();

  const [userDetail, setUserDetail] = useState("");
  useEffect(() => {
    async function fetchSingleContact(id) {
      const res = await fetch(`${BASE_URL}contacts/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();

      setUserDetail(response);
    }
    fetchSingleContact(id);
  }, [id]);
  const [text, setText] = useState("");
  const [uiText, setUiText] = useState([]);
  function updateDataOnUI(uiText, text) {
    // let arr = [uiText];
    // arr.push(text);
    // setUiText(arr);
    setUiText((prev) => [...prev, text]);
    setText("");
  }
  const updateText = debounce((value) => {
    setText(value);
  }, 0);
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

      {/*  From now onwards we will be writting the code for showing up the messages  */}
      <div className="chat-ui">
        <div className="chat-area">
          {uiText.map((ele, index) => (
            <div className="chat-text" key={index}>
              <p key={index}>{ele}</p>
            </div>
          ))}
        </div>
      </div>

      {/*  from now onwards we will be writing the code to chat text area  */}
      <div className="type-message">
        <div className="send-files">
          <RiAttachment2 />
        </div>
        <div className="text-area-chat">
          <textarea
            name=""
            id=""
            rows="100"
            placeholder="Type your message here "
            className="text-area-field"
            value={text}
            onChange={(e) => {
              updateText(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="send-btn-div">
          <button
            className="send-btn"
            onClick={() => {
              {
                let to = id;
                socket.emit("register", { userId: to });
                socket.emit("private-message", { to, message: text });
                updateDataOnUI(uiText, text);
              }
            }}
          >
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
