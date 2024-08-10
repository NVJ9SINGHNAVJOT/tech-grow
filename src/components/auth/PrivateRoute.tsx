import { useAppSelector } from "@/redux/store";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const authUser = useAppSelector((state) => state.auth.authUser);

  if (authUser === true) {
    return props.children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
