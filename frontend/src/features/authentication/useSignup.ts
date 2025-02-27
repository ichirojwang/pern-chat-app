import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi, SignupArgs } from "../../services/apiAuth";

export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    isPending,
    data: user,
    error,
  } = useMutation({
    mutationFn: ({ username, fullName, password, confirmPassword, gender }: SignupArgs) =>
      signupApi({ username, fullName, password, confirmPassword, gender }),
    onSuccess: (user: UserType) => {
      queryClient.setQueryData(["user"], user);
      navigate("/");
    },
    onError: (err: unknown) => {
      console.error("Error in useSignup:", err);
    },
  });

  return { signup, isPending, user, error };
};
