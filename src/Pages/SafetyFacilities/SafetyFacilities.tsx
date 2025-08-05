import Header from "../Header/Header";
import { useSafetyFacilities } from "./hooks/useSafetyFacilities";
import styles from "./SafetyFacilities.module.css";

function SafetyFacilities() {
  const { data, isLoading, error } = useSafetyFacilities();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>제주 안전시설 리스트</h2>
        <ul>
          {data?.map((item) => (
            <div className={styles.listBox}>
              <div className={styles.name}>
                <strong>{item.안전시설명}</strong> / {item.안전시설유형}
              </div>
              <div>주소: {item.소재지도로명주소}</div>
              <div>전화번호: {item.소재지전화번호}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SafetyFacilities;
