import Header from "../Header/Header";
import { useMarineLeisure } from "./hooks/useMarineLeisure";
import styles from "./MarineLeisure.module.css";

function MarineLeisure() {
  const { data, isLoading, error } = useMarineLeisure();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>제주 해양레저스포츠 리스트</h2>
        <ul>
          {data?.map((item) => (
            <div className={styles.listBox}>
              <div className={styles.name}>
                <strong>{item.사업장명}</strong> / {item.해양레저스포츠유형}
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

export default MarineLeisure;
