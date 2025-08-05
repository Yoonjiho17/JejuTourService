import useAirPollutinInfo from "./hooks/useAirPollutinInfo";
import styles from "./AirPollutinInfo.module.css";

function AirPollutinInfo() {
  const { data, isLoading, error } = useAirPollutinInfo();

  if (isLoading) return <div className={styles.loading}></div>;
  if (error) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  const firstItem = data?.[0];

  const pm10Text = (() => {
    switch (firstItem?.pm10Grade) {
      case "1":
        return (
          <div className={styles.iconBox}>
            <div className={styles.icon}>😊</div>
            <div>{firstItem?.pm10Value}(좋음)</div>
          </div>
        );
      case "2":
        return (
          <div className={styles.iconBox}>
            <div className={styles.icon}>🙂</div>
            <div>{firstItem?.pm10Value}(보통)</div>
          </div>
        );
      case "3":
        return (
          <div className={styles.iconBox}>
            <div className={styles.icon}>😷</div>
            <div>{firstItem?.pm10Value}(나쁨)</div>
          </div>
        );
      case "4":
        return (
          <div className={styles.iconBox}>
            <div className={styles.icon}>😱</div>
            <div>{firstItem?.pm10Value}(매우 나쁨)</div>
          </div>
        );
      default:
        return "정보 없음";
    }
  })();

  const pm25Text = (() => {
    switch (firstItem?.pm25Grade) {
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
  })();

  return (
    <div className={styles.AirInfo}>
      <div>미세먼지농도</div>
      {pm10Text}
      <div>초미세먼지농도: {firstItem?.pm25Value}</div>
      <div>({pm25Text})</div>
      <div>측정소명: {firstItem?.stationName}</div>
    </div>
  );
}

export default AirPollutinInfo;
