import useAirPollutinInfo from "./hooks/useAirPollutinInfo";
import getPm10Grade from "./hooks/getPm10Grade";
import getPm25Grade from "./hooks/getPm25Grade";

function AirPollutinInfo() {
  const { data, isLoading, error } = useAirPollutinInfo();

  if (isLoading) return <div>대기질 정보를 불러오는 중...</div>;
  if (error) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  const firstItem = data?.[0];

  const pm10Text = getPm10Grade(firstItem?.pm10Grade);
  const pm25Text = getPm25Grade(firstItem?.pm25Grade);

  return (
    <div>
      <p>측정소명: {firstItem?.stationName}</p>
      <p>
        미세먼지농도: {firstItem?.pm10Value} ({pm10Text})
      </p>
      <p>
        초미세먼지농도: {firstItem?.pm25Value} ({pm25Text})
      </p>
    </div>
  );
}

export default AirPollutinInfo;
