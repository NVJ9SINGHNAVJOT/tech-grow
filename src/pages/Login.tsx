import { setAuthUser, setUser, CurrentUser } from "@/redux/slices/authSlice";
import { logInApi } from "@/services/operations/authApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type LogInData = {
  username: string;
  password: string;
};

const Login = () => {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInData>();

  const loginFormHandler = async (data: LogInData) => {
    setLoginLoading(true);

    // NOTE: this website is using dummyjson.com api's so username and password required as defaults
    // data.username = "emilys";
    // data.password = "emilyspass";
    const response = await logInApi(data);
    setLoginLoading(false);

    if (!response) {
      toast.error("Log In failed, try again");
      setLoginLoading(false);
      return;
    }

    dispatch(setAuthUser(true));
    const userData: CurrentUser = {
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      gender: response.gender,
      image: response.image,
    };
    dispatch(setUser(userData));
    setTimeout(() => navigate("/dashboard"), 0);
  };

  return (
    <div
      className="ct-login-bg flex h-[calc(100vh-4rem)] w-full flex-col items-center 
      justify-center gap-8"
    >
      <form
        onSubmit={handleSubmit(loginFormHandler)}
        className="w-72 overflow-hidden rounded-2xl border-4 border-blue-800 bg-zinc-900 
        shadow-2xl md:w-96"
      >
        <div className="px-10 py-10">
          <h2 className="mb-8 text-center text-4xl font-semibold text-white">Log In</h2>
          <div className="relative">
            <label className="mb-3 block text-sm font-medium text-zinc-200">User Name</label>
            <input
              required
              {...register("username", {
                required: true,
              })}
              placeholder="emilys"
              className="mt-2 block w-full rounded-lg border-2 border-zinc-600 bg-zinc-800 px-4 
              py-3 text-zinc-200 focus:border-blue-400 focus:outline-none focus:ring 
              focus:ring-blue-400 focus:ring-opacity-50"
              type="text"
            />
            {errors.username && <span className="absolute text-[0.7rem] text-red-600">Invalid format</span>}
          </div>
          <div className="mt-6">
            <label className="mb-3 block text-sm font-medium text-zinc-200">Password</label>
            <input
              required
              {...register("password", {
                required: true,
              })}
              placeholder="emilyspass"
              className="mt-2 block w-full rounded-lg border-2 border-zinc-600 bg-zinc-800 px-4 
              py-3 text-zinc-200 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 
              focus:ring-opacity-50"
              type="password"
            />
          </div>
          <div className="mt-10">
            <button
              disabled={loginLoading}
              className={`${loginLoading === true ? "animate-pulse" : ""} w-full transform rounded-lg 
                bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 tracking-wide text-white
                 transition-colors duration-200 hover:from-blue-700 hover:to-cyan-700 focus:outline-none 
                 focus:ring-4 focus:ring-blue-800`}
              type="submit"
            >
              {loginLoading === true ? "Logging..." : `Let's Go`}
            </button>
          </div>
        </div>
        <div className="bg-zinc-800 px-8 py-4 text-center text-sm text-blue-300">Don't have an account? Sign up</div>
      </form>
    </div>
  );
};

export default Login;
