/* eslint-disable react/prop-types */
import { Button, Dialog, Input } from "@material-tailwind/react";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import successToast from "../../Components/SuccessToast/SuccessToast";
import Swal from "sweetalert2";

const CreateTeamModal = ({
  open,
  handleOpen,
  activity,
  refetchAllTeams,
  studentId,
  name,
}) => {
  const [loading, setLoading] = useState(false);
  let axios = useAxios();
  let { user } = useAuth();

  const handleCreateTeam = (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let teamName = form.teamName.value;
    let title = form.title.value;

    let teamData = {
      teamName,
      title,
      email: user?.email,
      activityId: activity._id,
      teamMembers: [{ studentId, name }],
      teamResources: [],
      maximumTeamMate: activity.maximumTeamMate,
    };

    axios.post(`/add/new-team`, teamData).then((res) => {
      if (res.data.exists) {
        form.reset();
        setLoading(false);
        handleOpen();
        Swal.fire({
          icon: "warning",
          title: "You have alreade added a team for this activity!!",
        });

        return;
      }

      form.reset();
      setLoading(false);
      handleOpen();
      successToast("Team added successfully!!");
      refetchAllTeams();
    });
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div>
        <div className="p-4">
          <h1 className="text-xl font-semibold text-teal-500">
            Create your team
          </h1>

          <form onSubmit={handleCreateTeam}>
            <div className="w-full mt-5">
              <Input
                color="blue"
                label="Enter Team Name"
                name="teamName"
                required
              />
            </div>

            <div className="w-full mt-4">
              <Input
                color="blue"
                label={`${activity?.activity} Title`}
                name="title"
                required
              />
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
                  Creating
                </div>
              ) : (
                "Create Team"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateTeamModal;
