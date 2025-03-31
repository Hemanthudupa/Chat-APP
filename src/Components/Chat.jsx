import "./Chat.css";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="parent-chat">
      <div className="profile-top">
        <p className="name">Hemanth</p>
        <p  className="status">Online</p>
      </div>
    </div>
  );
};
export default Chat;
