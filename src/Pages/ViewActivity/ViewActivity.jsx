import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";

const ViewActivity = () => {
  let axios = useAxios();
  let { user } = useAuth();

  let { data: allActivity = [], isLoading: allActivityLoading } = useQuery({
    queryKey: ["allActivities"],
    queryFn: async () => {
      let result = await axios.get(`/get/all-activity?email=${user?.email}`);
      return result.data;
    },
  });

  if (allActivityLoading) {
    return <Loading />;
  }

  console.log(allActivity);

  return (
    <div className="bg-blue-gray-100 pb-20 pt-10">
      <div className="w-[70%] mx-auto bg-teal-400 rounded-lg py-4">
        <h1 className="text-4xl text-white text-center">
          All Activities of{" "}
          <span className="text-amber-500">{allActivity.section}</span>
        </h1>
      </div>

      {/* All Activities */}
      {allActivity?.result.length === 0 ? (
        <div className="w-[90%] mx-auto mt-16">
          <NoDataFound message={"No upcoming activities. Have fun!!"} />
        </div>
      ) : (
        <div className="w-[90%] mx-auto mt-16 grid grid-cols-3 gap-8">
          {allActivity.result.map((item, index) => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <div
                key={index}
                className="bg-white rounded-b-lg border-t-8 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md"
              >
                <div>
                  <p className="text-xl font-bold font-sans">{item.activity}</p>
                  <h1 className="mt-3 text-lg">
                    Course Name: {item.courseName}
                  </h1>
                  <h1 className="mt-3 text-lg">Date: {formattedDate}</h1>
                  <h1 className="mt-3 text-lg">
                    Maximum TeamMate: {item.maximumTeamMate}
                  </h1>
                </div>

                <Link to={`/activity/details/${item._id}`}>
                  <Button
                    fullWidth
                    className="bg-teal-400 mt-4 text-lg capitalize"
                  >
                    See Details
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewActivity;
