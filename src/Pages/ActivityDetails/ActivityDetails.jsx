import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import GetStudentInfo from "../../API/GetStudentInfo";

const ActivityDetails = () => {
  let id = useParams();
  let axios = useAxios();
  let [studentInfo, studentInfoLoading] = GetStudentInfo();

  // Get activity details
  let {
    data: activityDetails,
    isLoading: activityDetailsLoading,
    isFetching,
  } = useQuery({
    queryKey: ["activityDetails", id],
    queryFn: async () => {
      let result = await axios.get(`/activity/details?id=${id.id}`);
      return result.data;
    },
  });

  // Get all the teams
  let {
    data: allTeams = [],
    isLoading: allTeamsLoading,
    refetch: refetchAllTeams,
  } = useQuery({
    queryKey: ["allTeams"],
    queryFn: async () => {
      let result = await axios.get(
        `/get/all-teams?activityId=${activityDetails?._id}`
      );
      return result.data;
    },
    enabled: !!activityDetails,
  });

  // Handling Create team modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  if (
    activityDetailsLoading ||
    isFetching ||
    allTeamsLoading ||
    studentInfoLoading
  ) {
    return <Loading />;
  }

  // console.log(studentInfo);

  return (
    <div className="bg-blue-gray-100 pb-20 pt-10">
      <div className="w-[70%] mx-auto bg-teal-400 rounded-lg py-4">
        <h1 className="text-4xl text-white text-center">
          {activityDetails.activity}{" "}
          <span className="text-amber-500">({activityDetails.courseName})</span>
        </h1>
      </div>

      <div className="w-[90%] mx-auto mt-10">
        <Button
          onClick={handleOpen}
          className="w-[30%] p-3 rounded-lg shadow-xl text-2xl mx-auto bg-white flex justify-center items-center gap-3 font-bold text-gray-700 capitalize"
        >
          <IoIosAddCircle className="text-3xl text-black" />
          <span>Create your team</span>
        </Button>

        <CreateTeamModal
          open={open}
          handleOpen={handleOpen}
          activity={activityDetails}
          refetchAllTeams={refetchAllTeams}
          studentId={studentInfo.studentId}
          name={studentInfo.name}
        />

        {/* All teams */}
        <div className="mt-10">
          {allTeams.length === 0 ? (
            <div>
              <NoDataFound message={"No teams yet. Create your team!!"} />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-3 gap-8">
                {allTeams.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-b-lg border-t-8 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md"
                  >
                    <div>
                      <p className="text-xl font-bold font-sans">
                        {item.teamName}
                      </p>
                      <h1 className="mt-3 text-lg">
                        {activityDetails.activity} Title: {item.title}
                      </h1>
                    </div>

                    <Link
                      to={`/team/details/${item._id}/${activityDetails.activity}`}
                    >
                      <Button
                        fullWidth
                        className="bg-teal-400 mt-4 text-lg capitalize"
                      >
                        See Team Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
