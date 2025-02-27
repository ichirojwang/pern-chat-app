import { createContext, ReactNode, useContext } from "react";
import { useUser } from "../features/authentication/useUser";

interface ContextProps {
  user: UserType | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

const AuthContext = createContext<ContextProps>({
  user: undefined,
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
