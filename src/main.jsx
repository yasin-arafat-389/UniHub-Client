import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { ThemeProvider } from "@material-tailwind/react/context/theme";
import { Toaster } from "react-hot-toast";
import AuthContext from "./Contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContext>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContext>
    </ThemeProvider>
  </React.StrictMode>
);
