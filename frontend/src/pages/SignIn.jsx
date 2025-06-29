import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signIn } from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SignIn() {
  const location = useLocation();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["validateToken"]);
      showToast({ message: "Login Success", type: "SUCCESS" });
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "please provide a valid email" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "this field is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <span className="flex items-center justify-between">
          <span className="text-sm">
            Not Registered?{" "}
            <Link className="underline" to="/register">
              Create an acoount now
            </Link>
          </span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Login
          </button>
        </span>
      </form>
    </div>
  );
}

export default SignIn;
