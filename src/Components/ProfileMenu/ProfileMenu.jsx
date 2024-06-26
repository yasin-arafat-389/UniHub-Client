import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import GetCRStatus from "../../API/GetCRStatus";
import { MdAddCircleOutline } from "react-icons/md";

const ProfileMenu = () => {
  let { user, logOut } = useAuth();
  let navigate = useNavigate();
  let [crStatus] = GetCRStatus();

  let handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/sign-in");
        toast.success(`Successfully Logged Out!!`, {
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
  };

  let goToProfile = () => {
    navigate("/profile");
  };

  let goToAddActivity = () => {
    navigate("/add-activity");
  };

  const profileMenuItems = [
    {
      label: "Profile",
      icon: <AiOutlineUser fontSize={"20px"} />,
      action: goToProfile,
    },
    {
      label: crStatus?.status === "accepted" ? "Add Activity" : "Sign Out",
      icon:
        crStatus?.status === "accepted" ? (
          <MdAddCircleOutline fontSize={"20px"} />
        ) : (
          <AiOutlinePoweroff fontSize={"20px"} />
        ),

      action: crStatus?.status === "accepted" ? goToAddActivity : handleLogOut,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto outline-none"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://i.ibb.co/HN9NtYY/user.png"
            }
          />
          <BsChevronDown
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {profileMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.action}
            className="flex items-center gap-4 text-[15px] font-bold"
          >
            <span>{item.icon}</span>
            {item.label}
          </MenuItem>
        ))}

        {crStatus?.status === "accepted" && (
          <MenuItem
            className="flex items-center gap-4 text-[15px] font-bold"
            onClick={handleLogOut}
          >
            <AiOutlinePoweroff fontSize={"20px"} />
            <span>Log Out</span>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
