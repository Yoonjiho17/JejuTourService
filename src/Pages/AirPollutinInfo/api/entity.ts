export interface AirData {
  stationName: string;
  pm10Value: string; // 미세먼지농도
  pm10Grade: string; // 좋음, 보통, 나쁨, 매우나쁨
  pm25Value: string; // 초미세먼지 농도
  pm25Grade: string; // 좋음, 보통, 나쁨, 매우나쁨
}
