/* eslint-disable react/prop-types */
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import successToast from "../../Components/SuccessToast/SuccessToast";

const AddActivity = ({ section }) => {
  let axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState("");
  let navigate = useNavigate();

  const handleSubmitActivity = (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let date = form.date.value;
    let maxTeamMate = form.maxTeamMate.value;
    let courseName = form.courseName.value;

    if (!activity) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select activity.",
      });
      setLoading(false);
      return;
    }

    let maximumTeamMate = parseInt(maxTeamMate);

    let activityInfo = {
      date,
      maximumTeamMate,
      courseName,
      section: section,
      activity,
    };

    axios.post("/add/activity", activityInfo).then(() => {
      setLoading(false);
      navigate("/view/activities");
      successToast("Activity Has Been Added!!");
    });
  };

  return (
    <div className="bg-blue-gray-100 py-36 shadow-2xl">
      <div className="w-[50%] mx-auto bg-white rounded-lg">
        <div className="p-4">
          <h1 className="text-xl text-gray-600 font-semibold">
            Fillup the following form to add an activity.
          </h1>

          <form onSubmit={handleSubmitActivity}>
            <div className="w-full mt-4">
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full p-2 rounded-lg outline-none border border-blue-gray-200"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Activity
                </option>
                <option value="Presentation">Presentation</option>
                <option value="Group Project">Group Project</option>
              </select>
            </div>

            <div className="w-full mt-4">
              <Input
                color="blue"
                label="Date"
                name="date"
                type="date"
                required
              />
            </div>

            <div className="w-full mt-4">
              <Input
                color="blue"
                label="Maximum Team Member"
                name="maxTeamMate"
                type="number"
                required
              />
            </div>

            <div className="w-full mt-4">
              <Input
                color="blue"
                label="Course Name"
                name="courseName"
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
                  Submitting
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
