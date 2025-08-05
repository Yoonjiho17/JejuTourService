import Header from "../Header/Header";
import styles from "./Attractions.module.css";
import attractionsJson from "../../../public/jeju_tourism_spots.json";
import type { Attractions } from "./api/entity";

function Attractions() {
  const attractionsData = attractionsJson;

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>제주 관광지 리스트</h2>
        <ul>
          {attractionsData?.map((item) => (
            <div className={styles.listBox}>
              <div className={styles.name}>
                <strong>{item.관광지명}</strong> / {item.관광지유형}
              </div>
              <div>관광지소개: {item.관광지소개}</div>
              <div>주소: {item.소재지지번주소}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Attractions;
