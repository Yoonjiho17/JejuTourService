import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY_DECODING;

interface AirData {
  stationName: string;
  khaiValue: string; // 통합대기환경지수
  khaiGrade: string; // 좋음, 보통, 나쁨, 매우나쁨
}

const fetchAirQuality = async (): Promise<AirData[]> => {
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

function interpretKhaiGrade(grade: string | undefined) {
  switch (grade) {
    case "1":
      return "좋음 😊";
    case "2":
      return "보통 🙂";
    case "3":
      return "나쁨 😷";
    case "4":
      return "매우 나쁨 😱";
    default:
      return "정보 없음";
  }
}

function AirPollutinInfo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["airPollutin"],
    queryFn: fetchAirQuality,
  });

  if (isLoading) return <div>대기질 정보를 불러오는 중...</div>;
  if (error) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  const firstItem = data?.[0];

  const airQualityText = interpretKhaiGrade(firstItem?.khaiGrade);

  return (
    <div>
      <p>측정소: {firstItem?.stationName}</p>
      <p>통합대기환경지수: {firstItem?.khaiValue}</p>
      <p>현재 대기질: {airQualityText}</p>
    </div>
  );
}

export default AirPollutinInfo;
