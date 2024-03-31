import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";

const GetCRStatus = () => {
  let { user } = useAuth();
  let axios = useAxios();

  let { data: crStatus = [], isLoading: crStatusLoading } = useQuery({
    queryKey: ["crStatus"],
    queryFn: async () => {
      let result = await axios.get(`/cr/status?email=${user?.email}`);
      return result.data;
    },
  });

  return [crStatus, crStatusLoading];
};

export default GetCRStatus;
