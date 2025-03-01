import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

interface Props {
  conversation: ConversationType;
}

const Conversation = ({ conversation }: Props) => {
  const navigate = useNavigate();
  const { onlineUsers } = useSocket();

  const { id: selectedConversationId } = useParams();
  const conversationUserId = conversation.id

  const isSelected = selectedConversationId === conversationUserId

  const isOnline = onlineUsers.includes(conversationUserId);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => navigate(`/messages/${conversationUserId}`)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 md:w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-md">{conversation.fullName}</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
