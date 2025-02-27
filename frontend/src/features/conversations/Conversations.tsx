import Spinner from "../../components/Spinner";
import Conversation from "./Conversation";
import { useConversations } from "./useConversations";

const Conversations = () => {
  const { conversations, isLoading } = useConversations();

  if (isLoading) return <Spinner />;
  
  if (!conversations) {
    return <h1>No conversations</h1>
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};
export default Conversations;
