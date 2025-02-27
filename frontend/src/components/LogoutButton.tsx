import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";

const LogoutButton = () => {
  const { logout, isPending } = useLogout();

  if (isPending) {
    return <p>logging out...</p>;
  }

  return (
    <button className="mt-auto">
      <HiArrowLeftEndOnRectangle
        className="w-6 h-6 text-white cursor-pointer"
        onClick={() => logout()}
      />
    </button>
  );
};
export default LogoutButton;
