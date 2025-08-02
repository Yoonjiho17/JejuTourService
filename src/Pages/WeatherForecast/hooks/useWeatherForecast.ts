import { useQuery } from "@tanstack/react-query";
import getWeatherForecast from "../api/getWeatherForecast";

const useWeatherForecast = () => {
  return useQuery({
    queryKey: ["WeatherForecast"],
    queryFn: getWeatherForecast,
  });
};

export default useWeatherForecast;
