import LogoutButton from "../../components/LogoutButton";
import Conversations from "./Conversations";
import SearchConversation from "./SearchConversation";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2">
      <SearchConversation />
      <div className="divider px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
