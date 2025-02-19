import { Search } from "lucide-react";
import React, { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = conversations.find((c: ConversationType) => {
      return c.fullName.toLowerCase().includes(search.trim().toLowerCase());
    });

    if (conversation) {
      setSelectedConversation(conversation);
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
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
