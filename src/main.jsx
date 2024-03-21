import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { ThemeProvider } from "@material-tailwind/react/context/theme";
import { Toaster } from "react-hot-toast";
import AuthContext from "./Contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContext>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthContext>
    </ThemeProvider>
  </React.StrictMode>
);
