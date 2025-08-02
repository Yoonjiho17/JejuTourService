import Header from "../Header/Header";
import { useExcellentRestaurants } from "./hooks/useExcellentRestaurants";
import styles from "./ExcellentRestaurants.module.css";

function ExcellentRestaurants() {
  const { data, isLoading, error } = useExcellentRestaurants();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2>제주 모범음식점 리스트</h2>
        <ul>
          {data?.map((item) => (
            <li>
              모범음식점명: {item.업소명} [ 주소: {item["소재지(도로명)"]} ]
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExcellentRestaurants;
