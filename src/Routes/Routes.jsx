import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/MyProfile/MyProfile";
import BecomeCR from "../Pages/BecomeCR/BecomeCR";
import CRRoute from "./CRRoute";
import ViewActivity from "../Pages/ViewActivity/ViewActivity";
import ActivityDetails from "../Pages/ActivityDetails/ActivityDetails";
import TeamDetails from "../Pages/TeamDetails/TeamDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/view/activities",
        element: (
          <PrivateRoute>
            <ViewActivity />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/become-cr",
        element: (
          <PrivateRoute>
            <BecomeCR />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-activity",
        element: <CRRoute></CRRoute>,
      },
      {
        path: "/activity/details/:id",
        element: (
          <PrivateRoute>
            <ActivityDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/team/details/:id/:activityType",
        element: (
          <PrivateRoute>
            <TeamDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Registration />,
      },
    ],
  },
]);

export default router;
