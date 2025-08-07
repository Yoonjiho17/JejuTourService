import { useAccommodation } from "./hooks/useAccommodation";
import styles from "./Accommodation.module.css";

function Accommodation() {
  const { data, isLoading, error } = useAccommodation();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <div className={styles.content}>
        <h2 className={styles.title}>제주 숙박업소 리스트</h2>
        <ul>
          {data?.map((item) => (
            <div className={styles.listBox}>
              <div className={styles.name}>
                <strong>{item.숙박업소명}</strong>
              </div>
              <div>주소: {item.소재지도로명주소}</div>
              <div>전화번호: {item.숙박업소전화번호}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Accommodation;
