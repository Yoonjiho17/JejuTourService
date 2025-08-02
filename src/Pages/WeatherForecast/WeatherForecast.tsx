import useWeatherForecast from "./hooks/useWeatherForecast";

function WeatherForecast() {
  const { data, isLoading, error } = useWeatherForecast();

  if (isLoading) return <div>날씨 정보를 불러오는 중...</div>;
  if (error) return <div>날씨 정보를 불러오는 데 실패했습니다.</div>;

  const skyItem = data?.find((item) => item.category === "SKY"); //하늘상태
  const popItem = data?.find((item) => item.category === "POP"); //강수확률
  const tmpItem = data?.find((item) => item.category === "TMP"); //1시간 기온

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

  const popText = popItem?.fcstValue || "N/A";
  const tmpText = tmpItem?.fcstValue || "N/A";

  return (
    <div>
      <div>기온: {tmpText}℃</div>
      <div>현재 하늘 상태: {skyText}</div>
      <div>강수확률: {popText}%</div>
    </div>
  );
}

export default WeatherForecast;
