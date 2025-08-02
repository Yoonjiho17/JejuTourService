import Header from "../Header/Header";
import { useAccommodation } from "./hooks/useAccommodation";
import styles from "./Accommodation.module.css";

function Accommodation() {
  const { data, isLoading, error } = useAccommodation();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2>제주 숙박업소 리스트</h2>
        <ul>
          {data?.map((item) => (
            <li>숙박업소명: {item.숙박업소명}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Accommodation;
