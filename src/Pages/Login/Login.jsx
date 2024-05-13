import { Button, Input } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LoginPageAnimation from "../../Assets/loginPageAnimation.json";
import Lottie from "lottie-react";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  let { login, user } = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  let handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    login(formData.email, formData.password)
      .then(() => {
        navigate(location?.state ? location?.state : "/", { replace: true });
        toast.success(`Successfully Logged In!`, {
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
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          toast.error(`Invalid email or password!!`, {
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
        }
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      {user ? (
        ""
      ) : (
        <div>
          <div className="bg-[#0A2540]">
            <div className="py-20">
              <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-gray-200 lg:flex lg:w-1/2">
                  <Lottie animationData={LoginPageAnimation} loop={true} />
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                  <div className="flex justify-center mx-auto">
                    <img className="w-[150px]" src="/logo.png" alt="" />
                  </div>

                  <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    Sign In to your account
                  </p>

                  <form onSubmit={handleLogin}>
                    <div className="mt-10">
                      <Input
                        value={formData.email}
                        onChange={handleInputChange}
                        color="blue"
                        name="email"
                        label="Enter your email"
                        type="email"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <Input
                        value={formData.password}
                        onChange={handleInputChange}
                        color="blue"
                        name="password"
                        label="Enter password"
                        type="password"
                        required
                      />
                    </div>

                    <div className="mt-6">
                      <Button
                        className={`w-full bg-[#0866ff] py-4`}
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        {loading ? (
                          <div className="flex justify-center items-center gap-5 ">
                            <ImSpinner9 className="animate-spin text-[20px]" />
                            Signing In
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </div>
                  </form>

                  <div className="flex items-center justify-center text-center py-4">
                    <span className="text-sm text-gray-900 dark:text-gray-200">
                      {`Don't`} have an account?
                    </span>

                    <Link
                      to="/sign-up"
                      className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
