import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
	
	if (loading) {
		return <p>logging out...</p>
	}

  return (
    <div className="mt-auto">
      <LogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout} />
    </div>
  );
};
export default LogoutButton;
