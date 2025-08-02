import axios from "axios";
import type { AirData } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_DECODING;

const getAirPollutinInfo = async (): Promise<AirData[]> => {
  const res = await axios.get(
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty",
    {
      params: {
        serviceKey: API_KEY,
        returnType: "json",
        numOfRows: 100,
        pageNo: 1,
        sidoName: "제주",
        ver: "1.0",
      },
    }
  );

  return res.data.response.body.items as AirData[];
};

export default getAirPollutinInfo;
