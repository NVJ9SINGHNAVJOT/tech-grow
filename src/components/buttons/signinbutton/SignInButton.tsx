import { useNavigate } from "react-router-dom";
import "@/components/buttons/signinbutton/SignInButton.css";

const SignInButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="signButton px-2 py-1 text-richblack-25 sm:px-[1rem] sm:py-[0.5rem]"
      onClick={() => navigate("/login")}
    >
      Log In
    </button>
  );
};

export default SignInButton;
