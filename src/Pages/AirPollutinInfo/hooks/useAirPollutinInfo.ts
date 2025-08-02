import { useQuery } from "@tanstack/react-query";
import getAirPollutinInfo from "../api/getAirPollutinInfo";

const useAirPollutinInfo = () => {
  return useQuery({
    queryKey: ["airPollutin"],
    queryFn: getAirPollutinInfo,
  });
};

export default useAirPollutinInfo;
