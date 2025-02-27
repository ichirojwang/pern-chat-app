import { createContext, ReactNode, useContext } from "react";
import { useUser } from "../features/authentication/useUser";

interface AuthUser {
  id: string;
  fullName: string;
  username: string;
  profilePic: string;
  gender: string;
}

interface ContextProps {
  user: AuthUser | null;
  isLoading: boolean;
  isFetching: boolean;
}

const AuthContext = createContext<ContextProps>({
  user: null,
  isLoading: false,
  isFetching: false,
});

interface ProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: ProviderProps) => {
  const { user, isLoading, isFetching } = useUser();

  return (
    <AuthContext.Provider value={{ user, isLoading, isFetching }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext used outside AuthContextProvider");
  }

  return context;
};

export default AuthContextProvider;
