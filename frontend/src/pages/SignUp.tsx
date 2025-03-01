import { Link } from "react-router-dom";
import { useSignup } from "../features/authentication/useSignup";
import { useForm } from "react-hook-form";
import { SignupArgs } from "../services/apiAuth";
import CheckboxGroup from "../components/CheckboxGroup";
import { GenderOptions } from "../constants";
import FormErrorMessage from "../components/FormErrorMessage";
import BlurBox from "../components/BlurBox";

const SignUp = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors },
    getValues,
  } = useForm<SignupArgs>();
  const { onChange } = register("gender", { required: "Select a gender" });

  const { signup, isPending } = useSignup();

  const onSubmit = ({ fullName, username, password, confirmPassword, gender }: SignupArgs) => {
    signup({ fullName, username, password, confirmPassword, gender }, { onSettled: () => reset() });
  };

  const onError = (errors: unknown) => {
    console.error(errors);
  };

  return (
    <BlurBox>
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Sign Up<span className="text-yellow-500"> LeBronChat</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <label className="label p-2">
            <span className="text-base label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full input input-bordered  h-10"
            id="fullName"
            {...register("fullName", { required: "Name is required" })}
          />
          <FormErrorMessage message={formErrors.fullName} />
        </div>

        <div>
          <label className="label p-2 ">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="johndoe"
            className="w-full input input-bordered h-10"
            id="username"
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
            {...register("password", { required: "Password is required" })}
          />
          <FormErrorMessage message={formErrors.password} />
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full input input-bordered h-10"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value: string) =>
                getValues().password === value || "Passwords don't match",
            })}
          />
          <FormErrorMessage message={formErrors.confirmPassword} />
        </div>

        <div>
          <CheckboxGroup
            options={GenderOptions}
            onCheckboxChange={(option) => onChange({ target: { name: "gender", value: option } })}
          />
          <FormErrorMessage message={formErrors.gender} />
        </div>

        <Link
          to={"/login"}
          className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
        >
          Already have an account?
        </Link>

        <div>
          <button className="btn btn-block btn-sm mt-2 border border-slate-700">
            {isPending ? "Loading..." : "Sign up"}
          </button>
        </div>
      </form>
    </BlurBox>
  );
};

export default SignUp;
