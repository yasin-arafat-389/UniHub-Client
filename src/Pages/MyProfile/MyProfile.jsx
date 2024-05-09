import { useState } from "react";
import GetStudentInfo from "../../API/GetStudentInfo";
import useAuth from "../../Hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import SectionUpdateModal from "../../Components/SectionUpdateModal/SectionUpdateModal";
import Loading from "../../Components/Loading/Loading";

const MyProfile = () => {
  let { user } = useAuth();
  let [studentInfo, studentInfoLoading, studentInfoRefetch] = GetStudentInfo();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  if (studentInfoLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-blue-gray-50 py-20">
      {/* Profile Card */}
      <div className="p-10 max-w-xl mx-auto">
        <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          <div className="relative mx-auto w-36 rounded-full">
            <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
            <img
              className="mx-auto h-auto w-full rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <h1 className="my-3 text-center text-xl font-bold leading-8 text-gray-900">
            {studentInfo.name}
          </h1>

          <h3 className="text-lg text-semibold text-center leading-6 text-gray-600">
            Student ID:{" "}
            <span className="text-teal-500">{studentInfo.studentId}</span>
          </h3>

          <div className="text-lg mt-3 text-semibold text-center leading-6 text-gray-600 flex justify-center gap-4 items-center">
            <h1>
              Section:{" "}
              <span className="text-teal-500">
                {studentInfo.selectedSection}
              </span>
            </h1>
            <button onClick={handleOpen}>
              <FaEdit className="text-2xl" />
            </button>
          </div>

          <h3 className="text-lg mt-3 text-semibold text-center leading-6 text-gray-600">
            Email: <span className="text-teal-500">{studentInfo.email}</span>
          </h3>
        </div>
        <SectionUpdateModal
          open={open}
          handleOpen={handleOpen}
          section={studentInfo?.selectedSection}
          id={studentInfo?._id}
          refetch={studentInfoRefetch}
        />
      </div>
    </div>
  );
};

export default MyProfile;
