/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Dialog, Input } from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../Hooks/useAxios";
import successToast from "../SuccessToast/SuccessToast";

const EditTeamDetailsModal = ({
  open,
  handleOpen,
  teamDetails,
  teamDetailsRefetch,
}) => {
  const [updatedTeamName, setUpdatedTeamName] = useState(teamDetails.teamName);
  const [updatedTitle, setUpdatedTitle] = useState(teamDetails.title);
  const [teamId, setTeamId] = useState(teamDetails._id);
  const [loading, setLoading] = useState(false);
  let axios = useAxios();

  // Change handler for team name input
  const handleTeamNameChange = (e) => {
    setUpdatedTeamName(e.target.value);
  };

  // Change handler for title input
  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  // Handle form submission
  const handleUpdateDetails = (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post("/update/team-details", {
        teamId,
        updatedTeamName,
        updatedTitle,
      })
      .then(() => {
        setLoading(false);
        handleOpen();
        teamDetailsRefetch();
        successToast("Team details updated successfully!!");
      });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="p-4">
        <h1 className="text-xl font-semibold text-teal-500">
          Edit Team Details
        </h1>

        <form onSubmit={handleUpdateDetails}>
          <div className="w-full mt-4">
            <Input
              color="blue"
              label="Team Name"
              name="teamName"
              value={updatedTeamName}
              onChange={handleTeamNameChange}
              required
            />
          </div>

          <div className="w-full mt-4">
            <Input
              color="blue"
              label="Title"
              name="title"
              value={updatedTitle}
              onChange={handleTitleChange}
              required
            />
          </div>

          <Button
            fullWidth
            type="submit"
            className="bg-teal-600 capitalize text-lg mt-4"
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
  );
};

export default EditTeamDetailsModal;
