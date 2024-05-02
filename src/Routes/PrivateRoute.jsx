/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  let location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    toast.error(`You must login first!`, {
      style: {
        border: "2px solid red",
        padding: "8px",
        color: "#713200",
      },
      iconTheme: {
        primary: "red",
        secondary: "#FFFAEE",
      },
    });
    return <Navigate state={location.pathname} to="/sign-in" replace={true} />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
