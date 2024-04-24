/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { ImSpinner9 } from "react-icons/im";
import successToast from "../SuccessToast/SuccessToast";

const SectionUpdateModal = ({ open, handleOpen, section, id, refetch }) => {
  const [selectedSection, setSelectedSection] = useState(section);
  const [loading, setLoading] = useState(false);
  let axios = useAxios();

  const handleUpdateSection = () => {
    setLoading(true);
    if (!selectedSection) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select a section",
      });
      setLoading(false);
      return;
    }

    axios.post("/update/section", { id, selectedSection }).then(() => {
      setLoading(false);
      refetch();
      handleOpen(!open);
      successToast("Section Updated Successfully!!");
    });
  };

  return (
    <div>
      <Dialog size="sm" open={open} handler={handleOpen}>
        <div className="p-4">
          <h1 className="text-xl font-semibold text-teal-500">
            Update your section
          </h1>

          <div className="w-full mt-4">
            <select
              className="w-full p-2 rounded-lg outline-none border border-blue-gray-200"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="" disabled>
                Select Section
              </option>
              <option value="56_A">56_A</option>
              <option value="56_B">56_B</option>
              <option value="56_C">56_C</option>
            </select>
          </div>

          <Button
            onClick={handleUpdateSection}
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
        </div>
      </Dialog>
    </div>
  );
};

export default SectionUpdateModal;
