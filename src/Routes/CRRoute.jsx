/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import GetCRStatus from "../API/GetCRStatus";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import toast from "react-hot-toast";
import AddActivity from "../Pages/AddActivity/AddActivity";

const CRRoute = () => {
  let [crStatus, crStatusLoading] = GetCRStatus();

  const { user, loading } = useAuth();
  let location = useLocation();

  if (loading || crStatusLoading) return <Loading />;

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

  if (crStatus.status !== "accepted") {
    toast.error(`You are not the CR!!`, {
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

  return (
    <div>
      <AddActivity section={crStatus?.section} />
    </div>
  );
};

export default CRRoute;
