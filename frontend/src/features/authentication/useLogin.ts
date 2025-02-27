import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, LoginArgs } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    data: user,
    error,
  } = useMutation({
    mutationFn: ({ username, password }: LoginArgs) => loginApi({ username, password }),
    onSuccess: (user: UserType) => {
      console.log(`successful login for ${user.username}`);
      queryClient.setQueryData(["user"], user);
      navigate("/messages", { replace: true });
    },
    onError: (err: unknown) => {
      console.error("Error in useLogin:", err);
    },
  });

  return { login, isPending, user, error };
};
