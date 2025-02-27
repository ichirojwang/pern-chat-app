import { Link } from "react-router-dom";
import "react-hook-form";
import { useLogin } from "../features/authentication/useLogin";
import { useForm } from "react-hook-form";
import { LoginArgs } from "../services/apiAuth";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";
import FormErrorMessage from "../components/FormErrorMessage";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<LoginArgs>();

  const { login, isPending, error } = useLogin();

  const onSubmit = ({ username, password }: LoginArgs) => {
    login({ username, password }, { onSettled: () => reset() });
  };

  const onError = (errors: unknown) => {
    console.error(errors);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login<span className="text-yellow-500"> LeBronChat</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              id="username"
              disabled={isPending}
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage message={formErrors.username} />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              id="password"
              disabled={isPending}
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage message={formErrors.password} />
          </div>
          <Link
            to="/signup"
            className="text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </button>
          </div>
          {isErrorWithMessage(error) && (
            <div className="mt-2 text-red-500 text-center">
              {error.message || "Login unsuccessful. Please try again"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;
