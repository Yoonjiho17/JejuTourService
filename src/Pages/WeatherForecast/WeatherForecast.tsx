import useWeatherForecast from "./hooks/useWeatherForecast";
import styles from "./WeatherForecast.module.css";

function WeatherForecast() {
  const { data, isLoading, error } = useWeatherForecast();

  if (isLoading) return <div className={styles.loading}></div>;
  if (error) return <div>날씨 정보를 불러오는 데 실패했습니다.</div>;

  const skyItem = data?.find((item) => item.category === "SKY"); //하늘상태
  const popItem = data?.find((item) => item.category === "POP"); //강수확률
  const tmpItem = data?.find((item) => item.category === "TMP"); //1시간 기온
  const ptyItem = data?.find((item) => item.category === "PTY"); //강수형태

  const skyText = (() => {
    if (ptyItem?.fcstValue === "0") {
      switch (skyItem?.fcstValue) {
        case "1":
          return (
            <div className={styles.iconBox}>
              <div className={styles.icon}>☀️</div>
              <div>현재 하늘: 맑음</div>
            </div>
          );
        case "3":
          return (
            <div className={styles.iconBox}>
              <div className={styles.icon}>⛅</div>
              <div>현재 하늘: 구름많음</div>
            </div>
          );
        case "4":
          return (
            <div className={styles.iconBox}>
              <div className={styles.icon}>☁️</div>
              <div>현재 하늘: 흐림</div>
            </div>
          );
        default:
          return "알 수 없음";
      }
    } else {
      switch (ptyItem?.fcstValue) {
        case "1":
          return (
            <div className={styles.iconBox}>
              <div className={styles.icon}>🌧️</div>
              <div>현재 하늘: 비</div>
            </div>
          );
        case "2":
          return (
            <div className={styles.iconBox}>
              <div className={styles.icon}>🌧️🌨️</div>
              <div>현재 하늘: 비/눈</div>
            </div>
          );
        case "3":
          return (
            <div className={styles.iconBox}>
              <div className={styles.icon}>☃️</div>
              <div>현재 하늘: 눈</div>
            </div>
          );
        case "4":
          return (
            <div className={styles.iconBox}>
              <div className={styles.icon}>☔</div>
              <div>현재 하늘: 소나기</div>
            </div>
          );
        default:
          return "알 수 없음";
      }
    }
  })();

  const popText = popItem?.fcstValue || "N/A";
  const tmpText = tmpItem?.fcstValue || "N/A";

  return (
    <div className={styles.weatherInfo}>
      <div>날씨</div>
      {skyText}
      <div>기온: {tmpText}℃</div>
      <div>강수확률: {popText}%</div>
    </div>
  );
}

export default WeatherForecast;
