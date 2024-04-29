/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../Hooks/useAxios";
import successToast from "../SuccessToast/SuccessToast";

const UploadTeamResource = ({ open, handleOpen, refetch, id }) => {
  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState(id);
  let axios = useAxios();

  const handleAddResource = (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let title = form.title.value;
    let link = form.link.value;

    axios.post("/add/team-resource", { teamId, title, link }).then(() => {
      setLoading(false);
      handleOpen();
      refetch();
      successToast("Team resource added!!");
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="p-4">
        <h1 className="text-xl font-semibold text-teal-500">
          Upload team resources
        </h1>

        <form onSubmit={handleAddResource}>
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
                Adding
              </div>
            ) : (
              "Upload Resource"
            )}
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default UploadTeamResource;
