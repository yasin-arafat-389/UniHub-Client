import toast from "react-hot-toast";

const successToast = (message) => {
  toast.success(message, {
    style: {
      border: "2px solid green",
      padding: "8px",
      color: "#713200",
    },
    iconTheme: {
      primary: "green",
      secondary: "#FFFAEE",
    },
  });
};

export default successToast;
