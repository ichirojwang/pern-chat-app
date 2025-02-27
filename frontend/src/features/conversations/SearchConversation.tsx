import React, { useState } from "react";
import { useConversations } from "./useConversations";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchConversation = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const { conversations } = useConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = conversations?.find((c: ConversationType) => {
      return c.fullName.toLowerCase().includes(search.trim().toLowerCase());
    });

    if (conversation) {
      navigate(`/messages/${conversation.id}`);
      setSearch("");
    } else {
      console.error("User not found");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  ">
        <HiMagnifyingGlass className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchConversation;
