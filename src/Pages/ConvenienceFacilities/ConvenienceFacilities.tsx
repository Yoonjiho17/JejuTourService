import Header from "../Header/Header";
import { useConvenienceFacilities } from "./hooks/useConvenienceFacilities";
import styles from "./ConvenienceFacilities.module.css";

function ConvenienceFacilities() {
  const { data, isLoading, error } = useConvenienceFacilities();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2>제주 편의시설 리스트</h2>
        <ul>
          {data?.map((item) => (
            <li>
              편의시설명: {item.편의시설명} [ 편의시설유형: {item.편의시설유형}{" "}
              ]
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConvenienceFacilities;
