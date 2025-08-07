import axios from "axios";
import getToday from "../../../utils/getToday";
import getBaseTime from "../../../utils/getBaseTime";
import type { ForecastItem } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_DECODING;

const getWeatherForecast = async () => {
  const baseDate = getToday();
  const baseTime = getBaseTime();
  const nx = 52;
  const ny = 38;

  const response = await axios.get(
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`,
    {
      params: {
        serviceKey: API_KEY,
        pageNo: 1,
        numOfRows: 1000,
        dataType: "JSON",
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny,
      },
    }
  );

  return response.data.response.body.items.item as ForecastItem[];
};

export default getWeatherForecast;
