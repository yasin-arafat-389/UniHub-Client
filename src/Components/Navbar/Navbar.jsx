import { Link, NavLink, useLocation } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import "./Navbar.css";
import useAuth from "../../Hooks/useAuth";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Navbar = () => {
  let location = useLocation();
  let { user } = useAuth();

  return (
    <div className="bg-[#F9FBE7] sticky top-0 z-10 shadow-2xl">
      <nav className="w-[90%] mx-auto p-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo.png" className="w-[150px]" />
        </Link>

        <ul className="flex gap-9 items-center text-xl">
          <li>
            <NavLink
              to={"/"}
              className={` text-black font-semibold ${
                location.pathname === "/"
                  ? ""
                  : "hover:bg-gray-500 p-3 hover:text-white rounded-lg transition-colors duration-600"
              }`}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/view/activities"}
              className={` text-black font-semibold ${
                location.pathname === "/view/activities"
                  ? ""
                  : "hover:bg-gray-500 hover:text-white p-3 rounded-lg transition-colors duration-600"
              }`}
            >
              View Activity
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/become-cr"}
              className={` text-black font-semibold ${
                location.pathname === "/become-cr"
                  ? ""
                  : "hover:bg-gray-500 p-3 hover:text-white rounded-lg transition-colors duration-600"
              }`}
            >
              Become CR
            </NavLink>
          </li>

          <li>
            {user ? (
              <ProfileMenu />
            ) : (
              <Link to="/sign-in">
                <button className="loginBTN">
                  <BiLogInCircle className="text-[20px]" />
                  Sign In
                </button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
