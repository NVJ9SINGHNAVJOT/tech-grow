import { setAuthUser, setUser } from "@/redux/slices/authSlice";
import { setProducts } from "@/redux/slices/productSlice";
import { setUsers } from "@/redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="ct-settings flex h-full w-full items-center justify-center">
      <button
        onClick={() => {
          navigate("/");
          dispatch(setAuthUser(false));
          dispatch(setUser(null));
          dispatch(setProducts([]));
          dispatch(setUsers([]));
        }}
        className="bg-black px-11 py-4 text-white transition-all ease-linear hover:scale-125"
      >
        Log Out
      </button>
    </div>
  );
};

export default Settings;
