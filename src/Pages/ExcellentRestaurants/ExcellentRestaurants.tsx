import { useExcellentRestaurants } from "./hooks/useExcellentRestaurants";
import styles from "./ExcellentRestaurants.module.css";

function ExcellentRestaurants() {
  const { data, isLoading, error } = useExcellentRestaurants();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <div className={styles.content}>
        <h2 className={styles.title}>제주 모범음식점 리스트</h2>
        <ul>
          {data?.map((item) => (
            <div className={styles.listBox}>
              <div className={styles.name}>
                <strong>{item.업소명}</strong>
              </div>
              <div>주소: {item["소재지(도로명)"]}</div>
              <div>전화번호: {item.전화번호}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExcellentRestaurants;
