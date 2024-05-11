import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import TeamResource from "../../Components/TeamResource/TeamResource";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import GetStudentInfo from "../../API/GetStudentInfo";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import successToast from "../../Components/SuccessToast/SuccessToast";
import toast from "react-hot-toast";
import EditTeamDetailsModal from "../../Components/EditTeamDetailsModal/EditTeamDetailsModal";
import UploadTeamResource from "../../Components/UploadTeamResource/UploadTeamResource";

const TeamDetails = () => {
  let teamId = useParams();
  let axios = useAxios();
  let { user } = useAuth();
  let [studentInfo, studentInfoLoading] = GetStudentInfo();

  // Get team details
  let {
    data: teamDetails = [],
    isLoading: teamDetailsLoading,
    refetch: teamDetailsRefetch,
  } = useQuery({
    queryKey: ["teamDetails", teamId],
    queryFn: async () => {
      let result = await axios.get(`/team/details?teamId=${teamId.id}`);
      return result.data;
    },
  });

  // Get member requests
  let {
    data: memberRequests = [],
    isLoading: memberRequestsLoading,
    refetch: memberRequestsRefetch,
  } = useQuery({
    queryKey: ["memberRequests", teamId],
    queryFn: async () => {
      let result = await axios.get(`/get/member-requests?teamId=${teamId.id}`);
      return result.data;
    },
  });

  // Get already joined data
  let [exists, setExists] = useState(false);

  useEffect(() => {
    axios
      .get(
        `/already/joined?email=${user?.email}&activityId=${teamDetails?.activityId}`
      )
      .then((res) => {
        if (res.data.exists) {
          setExists(true);
        }
      });
  }, [axios, teamDetails, user]);

  //Handle ask to join
  const [loading, setLoading] = useState(false);

  const handleAskToJoin = (activityId) => {
    setLoading(true);

    if (!teamDetails?.activityId) {
      setLoading(true);
      return;
    }

    if (exists) {
      setLoading(false);
      Swal.fire({
        icon: "warning",
        text: "You have either already joined a team or made a request to join a team. In first case, leave the team you are joined in. In second case, ask the team owner to reject your request to join this one.",
      });
      return;
    }

    let joiningDetails = {
      teamId: teamDetails._id,
      name: studentInfo.name,
      studentId: studentInfo.studentId,
      status: "pending",
      activityId,
      email: user?.email,
    };

    axios.post("/request/to/join", joiningDetails).then((res) => {
      if (res.data.exists) {
        setLoading(false);
        Swal.fire({
          icon: "warning",
          title: "Already Requested. Please await approval.",
        });
        return;
      }

      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Request sent successfully. Please await approval.",
      });
    });
  };

  // Reject member request
  let [rejectLoading, setRejectLoading] = useState(false);
  const rejectRequest = (id, name) => {
    Swal.fire({
      title: `Are you sure you want to reject ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        setRejectLoading(true);
        axios.post(`/reject/member-request?id=${id}`).then(() => {
          setRejectLoading(false);
          memberRequestsRefetch();
          teamDetailsRefetch();
          toast.error("request has been rejected!!");
        });
      }
    });
  };

  // Accept member request
  let [acceptLoading, setAcceptLoading] = useState(false);
  const acceptRequest = (id, teamId, activityId, email, name) => {
    Swal.fire({
      title: `Are you sure you want to accept ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAcceptLoading(true);
        axios
          .post(
            `/accept/member-request?id=${id}&teamId=${teamId}&activityId=${activityId}&email=${email}`
          )
          .then(() => {
            setAcceptLoading(false);
            memberRequestsRefetch();
            teamDetailsRefetch();
            successToast("Request has been accepted!!");
          });
      }
    });
  };

  // Handle leave team
  let [leaveLoading, setLeaveLoading] = useState(false);

  const handleLeaveTeam = (email, studentId, activityId) => {
    Swal.fire({
      title: `Are you sure you want to leave ${teamDetails?.teamName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Leave Now.",
    }).then((result) => {
      if (result.isConfirmed) {
        setLeaveLoading(true);
        axios.post("/leave/team", { email, studentId, activityId }).then(() => {
          setLeaveLoading(false);
          teamDetailsRefetch();

          successToast("You left the team!!");
        });
      }
    });
  };

  // Handle edit team details
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // Handle remove member
  const [removeMemberLoading, setRemoveMemberLoading] = useState(false);

  const handleRemoveMember = (email, studentId, activityId, name) => {
    Swal.fire({
      title: `Are you sure you want to remove ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setRemoveMemberLoading(true);
        axios
          .post("/remove/team-member", { email, studentId, activityId })
          .then(() => {
            setRemoveMemberLoading(false);
            teamDetailsRefetch();
          });
      }
    });
  };

  // Handle upload team resource
  const [openUploadResourceModal, setOpenUploadResourceModal] = useState(false);

  const handleOpenUploadResourceModal = () => {
    setOpenUploadResourceModal(!openUploadResourceModal);
  };

  if (teamDetailsLoading || studentInfoLoading || memberRequestsLoading) {
    return <Loading />;
  }

  console.log(teamDetails);

  return (
    <div className="bg-blue-gray-100 pb-20 pt-10">
      <div className="w-[70%] mx-auto bg-teal-400 rounded-lg py-4">
        <h1 className="text-4xl text-white text-center">
          {teamDetails.teamName}
        </h1>
      </div>

      <div>
        <div className="w-[80%] mx-auto mt-10 bg-white rounded-b-lg border-t-8 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md">
          <div>
            <h1 className="text-2xl text-center">
              {teamId.activityType} Title: {teamDetails.title}
            </h1>

            <div className="mt-8">
              <table className="w-[80%] border-collapse border border-blue-500 mx-auto">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="py-2 px-4 text-center text-xl" colSpan="3">
                      Team Members
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-2 px-4 text-center text-xl">Name</th>
                    <th className="py-2 px-4 text-center text-xl">
                      Student ID
                    </th>
                    <th className="py-2 px-4 text-center text-xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamDetails?.teamMembers.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-blue-500"
                    >
                      <td className="py-2 px-4 text-center text-lg font-bold text-gray-700">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 text-center text-lg font-bold text-gray-700">
                        {item.studentId}
                      </td>

                      <td className="py-2 px-4 text-center text-lg font-bold text-gray-700">
                        {index !== 0 && teamDetails.email === user?.email ? (
                          <Button
                            disabled={removeMemberLoading ? true : false}
                            onClick={() =>
                              handleRemoveMember(
                                item.email,
                                item.studentId,
                                item.activityId,
                                item.name
                              )
                            }
                            className="bg-red-500 capitalize"
                          >
                            Remove
                          </Button>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <TeamResource
                resources={teamDetails}
                teamOwner={teamDetails?.email}
                refetch={teamDetailsRefetch}
                teamId={teamDetails?._id}
              />
            </div>

            <div>
              {teamDetails.email === user?.email ? (
                <div className="w-[80%] flex flex-col justify-center gap-4 mx-auto mt-10">
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={handleOpen}
                      className="bg-teal-600 text-xl capitalize"
                    >
                      Edit Team Details
                    </Button>

                    <Button
                      onClick={handleOpenUploadResourceModal}
                      className="bg-indigo-500 text-xl capitalize"
                    >
                      Upload Team Resource
                    </Button>

                    <UploadTeamResource
                      open={openUploadResourceModal}
                      handleOpen={handleOpenUploadResourceModal}
                      refetch={teamDetailsRefetch}
                      id={teamDetails?._id}
                    />
                  </div>

                  <EditTeamDetailsModal
                    open={open}
                    handleOpen={handleOpen}
                    teamDetails={teamDetails}
                    teamDetailsRefetch={teamDetailsRefetch}
                  />

                  <div className="mt-4">
                    {memberRequests.length === 0 ? (
                      ""
                    ) : (
                      <div className="flex flex-col gap-6">
                        {memberRequests.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center gap-3 border-2 border-teal-500 p-2 rounded-lg"
                          >
                            <span className="text-lg font-semibold text-gray-700">
                              {item.name} ({item.studentId}) wants to join your
                              team.
                            </span>

                            <div className="flex gap-4">
                              <Button
                                onClick={() =>
                                  acceptRequest(
                                    item._id,
                                    item.teamId,
                                    item.activityId,
                                    item.email,
                                    item.name
                                  )
                                }
                                className="bg-green-600"
                                disabled={
                                  acceptLoading || rejectLoading ? true : false
                                }
                              >
                                Accept
                              </Button>

                              <Button
                                onClick={() =>
                                  rejectRequest(item._id, item.name)
                                }
                                className="bg-red-600"
                                disabled={
                                  rejectLoading || acceptLoading ? true : false
                                }
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-[80%] flex justify-center mx-auto mt-10">
                  {teamDetails.teamMembers.some(
                    (member) => member.name === user?.displayName
                  ) ? (
                    <Button
                      disabled={leaveLoading ? true : false}
                      onClick={() =>
                        handleLeaveTeam(
                          user?.email,
                          studentInfo?.studentId,
                          teamDetails?.activityId
                        )
                      }
                      className={`bg-red-600 text-xl capitalize`}
                    >
                      {leaveLoading ? (
                        <div className="flex items-center justify-center gap-4">
                          <ImSpinner9 className="animate-spin text-[20px]" />
                          Leaving
                        </div>
                      ) : (
                        "Leave This Team"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAskToJoin(teamDetails.activityId)}
                      className={`bg-teal-600 text-xl capitalize`}
                      disabled={
                        teamDetails.teamMembers.length ===
                        teamDetails.maximumTeamMate
                          ? true
                          : false
                      }
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-4">
                          <ImSpinner9 className="animate-spin text-[20px]" />
                          Requesting
                        </div>
                      ) : teamDetails.teamMembers.length ===
                        teamDetails.maximumTeamMate ? (
                        "Team is full"
                      ) : (
                        "Ask to join this team"
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
