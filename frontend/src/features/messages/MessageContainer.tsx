import Spinner from "../../components/Spinner";
import NoConversationSelected from "../conversations/NoConversationSelected";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useMessages } from "./useMessages";

const MessageContainer = () => {
  const { messages, isLoading } = useMessages();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex flex-col">
      {!messages ? (
        <NoConversationSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:&nbsp;</span>
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
