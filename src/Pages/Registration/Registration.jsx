import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import signUpImage from "/sign-up.svg";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  let { createUser, update, logOut } = useAuth();
  let navigate = useNavigate();

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?/~`])(.{6,})$/;
    const validPassword = passRegex.test(password);
    const validGmail = gmailRegex.test(email);

    if (!validGmail) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Enter a valid gmail address",
      });
      setLoading(false);
      return;
    }
    if (!validPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Password must be at least 6 characters long, containing at least one upper case and special character",
      });
      setLoading(false);
      return;
    }

    createUser(email, password).then(() => {
      update(name, "https://i.ibb.co/HN9NtYY/user.png")
        .then(() => {
          logOut()
            .then(() => {
              setLoading(false);
              navigate("/sign-in");
              toast.success(`Account created successfully!!`, {
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
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <div>
        <div className="bg-[#0A2540]">
          <div className="py-20">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
              <div className="hidden bg-gray-200 lg:flex lg:w-1/2">
                <img src={signUpImage} alt="" />
              </div>

              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                  <img className="w-[150px]" src="/logo.png" alt="" />
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                  Sign Up to join UniHub.
                </p>

                <form onSubmit={handleRegister} id="regForm">
                  <div className="w-full mt-4">
                    <Input
                      color="blue"
                      label="Enter your Name"
                      name="name"
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <Input
                      color="blue"
                      label="Enter your Student ID"
                      name="id"
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <Select label="Select your section">
                      <Option>56_A</Option>
                      <Option>56_B</Option>
                      <Option>56_C</Option>
                    </Select>
                  </div>

                  <div className="w-full mt-4">
                    <Input
                      color="blue"
                      label="Enter your email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <Input
                      color="blue"
                      label="Enter a password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button
                      type="submit"
                      className="w-full my-4 bg-[#0866ff]"
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-4">
                          <ImSpinner9 className="animate-spin text-[20px]" />
                          Signing Up
                        </div>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="flex items-center justify-center text-center pb-2">
                  <span className="text-sm text-gray-900 dark:text-gray-200">
                    Already have an account?
                  </span>

                  <Link
                    to="/sign-in"
                    className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
