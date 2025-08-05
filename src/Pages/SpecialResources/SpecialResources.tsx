import Header from "../Header/Header";
import { useSpecialResources } from "./hooks/useSpecialResources";
import styles from "./SpecialResources.module.css";

function SpecialResources() {
  const { data, isLoading, error } = useSpecialResources();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>제주 마을별 특화자원 리스트</h2>
        <ul>
          {data?.map((item) => (
            <div className={styles.listBox}>
              <div className={styles.name}>
                <strong>{item.마을명}</strong>
              </div>
              <div>
                특화자원: {item.특화자원명} ({item.특화자원내용})
              </div>
              <div>주소: {item.소재지지번주소}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SpecialResources;
