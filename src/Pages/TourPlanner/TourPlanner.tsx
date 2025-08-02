import Header from "../Header/Header";
import styles from "./TourPlanner.module.css";

function TourPlanner() {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2>여행 계획</h2>
      </div>
    </div>
  );
}

export default TourPlanner;
