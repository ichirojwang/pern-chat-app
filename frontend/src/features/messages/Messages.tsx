import { useChatScroll } from "../../hooks/useChatScroll";
import { useListenMessages } from "./useListenMessages";
import { useMessages } from "./useMessages";
import MessageSkeleton from "./MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, isLoading } = useMessages();
  useListenMessages();

  const ref = useChatScroll(messages) as React.RefObject<HTMLDivElement>;

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {isLoading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}
      {!isLoading && messages?.map((message) => <Message key={message.id} message={message} />)}
      {!isLoading && messages?.length === 0 && (
        <p className="text-center text-white">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
