import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContext";
import { formatTime } from "../../utils/formatTime";
import { useConversations } from "../conversations/useConversations";

const Message = ({ message }: { message: MessageType }) => {
  const { user } = useAuth();
  const { conversations, isLoading } = useConversations();
  const { id } = useParams();

  if (isLoading) {
    return <Spinner />;
  }

  const selectedConversation = conversations?.find((convo) => id === convo.id);

  const fromMe = message?.senderId === user?.id;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const img = fromMe ? user?.profilePic : selectedConversation?.profilePic;

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClass}`}>
      <div className="md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img} />
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}>
        {message.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
};
export default Message;
