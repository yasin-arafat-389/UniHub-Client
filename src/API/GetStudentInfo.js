import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";

const GetStudentInfo = () => {
  let { user } = useAuth();
  let axios = useAxios();

  let {
    data: studentInfo = [],
    isLoading: studentInfoLoading,
    refetch: studentInfoRefetch,
  } = useQuery({
    queryKey: ["studentInformation"],
    queryFn: async () => {
      let result = await axios.get(`/student/info?email=${user?.email}`);

      return result.data;
    },
  });

  return [studentInfo, studentInfoLoading, studentInfoRefetch];
};

export default GetStudentInfo;
