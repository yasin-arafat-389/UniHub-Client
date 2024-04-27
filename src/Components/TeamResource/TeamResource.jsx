/* eslint-disable react/prop-types */
import { IoIosWarning } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../Hooks/useAxios";
import successToast from "../SuccessToast/SuccessToast";

const TeamResource = ({ resources, teamOwner, refetch, teamId }) => {
  let { user } = useAuth();
  let axios = useAxios();

  // Handle update team rource modal
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (item) => {
    setOpen(!open);
    setItem(item);
  };

  const handleUpdateResource = (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let title = form.title.value;
    let link = form.link.value;

    axios
      .post("/update/team-resource", {
        teamId,
        title,
        link,
        identifier: item.identifier,
      })
      .then(() => {
        setLoading(false);
        handleOpen();
        refetch();
        successToast("Team resource updated!!");
      });
  };

  return (
    <div>
      <div className="w-[80%] mx-auto mt-10">
        <h1 className="text-2xl">Team Resources</h1>

        <div>
          {resources.teamResources.length === 0 ? (
            <div>
              <h1 className="text-lg mt-2 italic bg-yellow-500 p-2 rounded-lg flex items-center gap-3">
                <IoIosWarning className="text-3xl" />
                No Resources uploaded yet. Ask team leader to upload resources.
              </h1>
            </div>
          ) : (
            <div className="mb-14 mt-4 flex flex-col gap-4">
              {resources.teamResources.map((item, index) => (
                <div key={index} className="flex gap-10 items-center">
                  <div className="flex items-center gap-3">
                    <h1>
                      <FaCircleCheck className="text-green-600 text-xl" />
                    </h1>

                    <Link
                      to={item.link}
                      target="_blank"
                      className="text-xl underline hover:text-blue-500 transition-all"
                    >
                      {item.title}
                    </Link>
                  </div>

                  <button
                    onClick={() => handleOpen(item)}
                    className={`${
                      teamOwner !== user?.email ? "hidden" : ""
                    } outline-none`}
                  >
                    <FaEdit className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Update Team Resource modal */}
        <Dialog open={open} handler={handleOpen}>
          <div className="p-4">
            <h1 className="text-xl font-semibold text-teal-500">
              Upload team resources
            </h1>

            <form onSubmit={handleUpdateResource}>
              <div className="w-full mt-6">
                <div>
                  <label
                    htmlFor="inputname"
                    className="block text-gray-800 font-semibold text-lg"
                  >
                    Add a title (e.g. Presentation slide, Project Link etc.)
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={item?.title}
                      type="text"
                      name="title"
                      className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mt-6">
                <div>
                  <label
                    htmlFor="inputname"
                    className="block text-gray-800 font-semibold text-lg"
                  >
                    Add a link (e.g. google drive link, canva link etc.)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      defaultValue={item?.link}
                      name="link"
                      className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading ? true : false}
                fullWidth
                className="bg-teal-500 capitalize text-lg mt-5"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-4">
                    <ImSpinner9 className="animate-spin text-[20px]" />
                    Updating
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default TeamResource;
