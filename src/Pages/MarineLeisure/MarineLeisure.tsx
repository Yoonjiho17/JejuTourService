import { useMarineLeisure } from "./hooks/useMarineLeisure";

function MarineLeisure() {
  const { data, isLoading, error } = useMarineLeisure();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <h2>제주 해양레저스포츠 리스트</h2>
      <ul>
        {data?.map((item) => (
          <li>사업장명: {item.사업장명}</li>
        ))}
      </ul>
    </div>
  );
}

export default MarineLeisure;
