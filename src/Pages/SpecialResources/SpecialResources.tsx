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
        <h2>제주 마을별 특화자원 리스트</h2>
        <ul>
          {data?.map((item) => (
            <li>
              마을명: {item.마을명} [ 특화자원명: {item.특화자원명},
              특화자원유형: {item.특화자원유형} ]
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SpecialResources;
