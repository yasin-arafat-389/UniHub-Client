import { Link, NavLink, useLocation } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import "./Navbar.css";

const Navbar = () => {
  let location = useLocation();
  return (
    <div className="bg-[#EFBC9B] sticky top-0 z-10 shadow-2xl">
      <nav className="w-[90%] mx-auto p-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo.png" className="w-[150px]" />
        </Link>

        <ul className="flex gap-9 items-center text-xl">
          <li>
            <NavLink
              to={"/"}
              className={` text-black font-bold ${
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
              className={` text-black font-bold ${
                location.pathname === "/view/activities"
                  ? ""
                  : "hover:bg-gray-500 hover:text-white p-3 rounded-lg transition-colors duration-600"
              }`}
            >
              Create Assignment
            </NavLink>
          </li>

          <li>
            <Link to="/sign-in">
              <button className="loginBTN">
                <BiLogInCircle className="text-[20px]" />
                Sign In
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
