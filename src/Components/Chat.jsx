import "./Chat.css";
import { useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoVideocamOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { RiAttachment2 } from "react-icons/ri";
const Chat = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="parent-chat">
      <div className="profile-top">
        <div className="first">
          <div className="profile-pic">
            <CgProfile className="profile-photo" />
          </div>
          <div className="profile-details">
            <p className="name">Hemanth</p>
            <p className="status">Online</p>
          </div>
        </div>
        <div className="second">
          <IoVideocamOutline />
          <CiCircleInfo />
        </div>
      </div>

      <div className="chat-ui">
        <div className="chat-area"></div>
      </div>
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
          ></textarea>
        </div>
        <div className="send-btn-div">
          <button className="send-btn">Send message</button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
