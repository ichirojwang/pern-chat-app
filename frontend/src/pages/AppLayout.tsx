import { Outlet } from "react-router-dom";
import Sidebar from "../features/conversations/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
