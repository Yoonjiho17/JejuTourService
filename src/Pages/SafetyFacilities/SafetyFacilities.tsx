import { useSafetyFacilities } from "./hooks/useSafetyFacilities";

function SafetyFacilities() {
  const { data, isLoading, error } = useSafetyFacilities();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <h2>제주 안전시설 리스트</h2>
      <ul>
        {data?.map((item) => (
          <li>
            안전시설명: {item.안전시설명} [ 안전시설유형: {item.안전시설유형} ]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SafetyFacilities;
