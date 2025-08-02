import Header from "../Header/Header";
import { useAttractions } from "./hooks/useAttractions";
import styles from "./Attractions.module.css";

function Attractions() {
  const { data, isLoading, error } = useAttractions();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2>제주 관광지 리스트</h2>
        <ul>
          {data?.map((item) => (
            <li>관광지명: {item.관광지명}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Attractions;
