import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import NoConversationSelected from "../conversations/NoConversationSelected";
import { useConversations } from "../conversations/useConversations";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useMessages } from "./useMessages";

const MessageContainer = () => {
  const { messages, isLoading: isLoadingMessages } = useMessages();
  const { conversations, isLoading: isLoadingConversations } = useConversations();
  const { id } = useParams();

  if (isLoadingMessages || isLoadingConversations) {
    return <Spinner />;
  }

  const selectedConversationUser = conversations?.find((convo) => id === convo.id);

  return (
    <div className="w-full flex flex-col">
      {!messages || !selectedConversationUser ? (
        <NoConversationSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:&nbsp;</span>
            <span className="text-gray-900 font-bold">{selectedConversationUser.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
