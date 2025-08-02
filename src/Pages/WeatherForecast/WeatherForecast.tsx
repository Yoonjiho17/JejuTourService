import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY_DECODING; // .env에 저장한 인코딩된 API 키 사용

function getToday() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

function getBaseTime() {
  const h = new Date().getHours();
  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
  const closest = baseTimes.reduce((prev, curr) =>
    Math.abs(curr - h) < Math.abs(prev - h) ? curr : prev
  );
  return String(closest).padStart(2, "0") + "00";
}

interface ForecastItem {
  category: string;
  fcstValue: string;
}

const fetchWeather = async () => {
  const baseDate = getToday();
  const baseTime = getBaseTime();
  const nx = 52;
  const ny = 38;

  const res = await axios.get(
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

  return res.data.response.body.items.item as ForecastItem[];
};

function WeatherForecast() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["weatherForecast"],
    queryFn: fetchWeather,
  });

  if (isLoading) return <div>날씨 정보를 불러오는 중...</div>;
  if (error) return <div>날씨 정보를 불러오는 데 실패했습니다.</div>;

  const skyItem = data?.find((item) => item.category === "SKY");

  const skyText = (() => {
    switch (skyItem?.fcstValue) {
      case "1":
        return "맑음";
      case "3":
        return "구름많음";
      case "4":
        return "흐림";
      default:
        return "알 수 없음";
    }
  })();

  return <div>현재 하늘 상태: {skyText}</div>;
}

export default WeatherForecast;
