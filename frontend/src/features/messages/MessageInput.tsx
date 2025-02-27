import React, { useState } from "react";
import { useSendMessage } from "./useSendMessage";
import { HiPaperAirplane } from "react-icons/hi2";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage, isSending } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage({ body: message });
    setMessage("");
  };

  return (
    <form className="px-4 mb-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSending}
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {isSending ? (
            <span className="loading loading-spinner" />
          ) : (
            <HiPaperAirplane className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
