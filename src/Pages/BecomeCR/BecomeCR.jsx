import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import GetStudentInfo from "../../API/GetStudentInfo";
import Loading from "../../Components/Loading/Loading";

const BecomeCR = () => {
  let axios = useAxios();
  let { user } = useAuth();

  const [loading, setLoading] = useState(false);

  let [studentInfo, studentInfoLoading] = GetStudentInfo();

  const handleBecomeCR = (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let name = user?.displayName;
    let phone = form.name.phone;
    let section = studentInfo?.selectedSection;

    axios
      .post("/request/CR", {
        name,
        phone,
        section,
        email: user?.email,
        status: "pending",
      })
      .then((res) => {
        setLoading(false);
        form.reset();

        if (res.data.status === "pending") {
          return Swal.fire({
            icon: "warning",
            title: `${res.data.name} has already asked to be the CR from your section.`,
          });
        }

        if (res.data.status === "accepted") {
          return Swal.fire({
            icon: "warning",
            title: `${res.data.name} is the CR of your section.`,
          });
        }

        Swal.fire({
          icon: "success",
          title: "Requested successfully. Please await admin approval.",
        });
      });
  };

  if (studentInfoLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-blue-gray-100 py-36">
      <div className="w-[50%] mx-auto bg-white rounded-lg">
        <div className="p-4">
          <h1 className="text-xl text-gray-600 font-semibold">
            If you are CR of a section, please submit the following.
          </h1>

          <form onSubmit={handleBecomeCR}>
            <div className="w-full mt-4">
              <Input
                color="blue"
                label="Your Section"
                name="section"
                value={studentInfo?.selectedSection}
                readOnly
                className="cursor-not-allowed"
                required
              />
            </div>

            <div className="w-full mt-4">
              <Input
                label="Your Name"
                color="blue"
                name="name"
                className="cursor-not-allowed"
                defaultValue={user?.displayName}
                readOnly
                required
              />
            </div>

            <div className="w-full mt-4">
              <Input
                color="blue"
                label="Phone number"
                name="phone"
                type="number"
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

export default BecomeCR;
