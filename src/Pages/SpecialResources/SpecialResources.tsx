import { useSpecialResources } from "./hooks/useSpecialResources";

function SpecialResources() {
  const { data, isLoading, error } = useSpecialResources();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <h2>제주 마을별 특화자원 리스트</h2>
      <ul>
        {data?.map((item) => (
          <li>
            마을명: {item.마을명} [ 특화자원명: {item.특화자원명}, 특화자원유형:{" "}
            {item.특화자원유형} ]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecialResources;
