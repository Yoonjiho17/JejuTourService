import { useExcellentRestaurants } from "./hooks/useExcellentRestaurants";

function ExcellentRestaurants() {
  const { data, isLoading, error } = useExcellentRestaurants();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <h2>제주 모범음식점 리스트</h2>
      <ul>
        {data?.map((item) => (
          <li>
            모범음식점명: {item.업소명} [ 주소: {item["소재지(도로명)"]} ]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExcellentRestaurants;
