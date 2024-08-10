import SignInButton from "@/components/buttons/signinbutton/SignInButton";
import { useAppSelector } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const MainNavbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div
      className="relative mx-auto flex h-[4rem] w-full min-w-minContent max-w-maxContent 
    items-center justify-between 
    bg-[radial-gradient(circle_at_24.1%_68.8%,_rgb(50,_50,_50)_0%,_rgb(0,_0,_0)_99.4%)] px-6 sm:px-10"
    >
      <span
        onClick={() => navigate("/")}
        className="cursor-pointer rounded-md bg-[#212121] px-6 py-1 font-be-veitnam-pro text-[1rem] 
        text-white [box-shadow:15px_15px_30px_rgb(25,_25,_25),_-15px_-15px_30px_rgb(60,_60,_60)] sm:text-2xl"
      >
        TechGrow
      </span>
      {user === null ? (
        <SignInButton />
      ) : (
        <img
          onClick={() => navigate("/dashboard")}
          alt="Loading.."
          src={user.image}
          className="size-10 cursor-pointer rounded-full ring-4 ring-blue-800"
        />
      )}
    </div>
  );
};

export default MainNavbar;
