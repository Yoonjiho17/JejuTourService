import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import AirPollutinInfo from "../AirPollutinInfo/AirPollutinInfo";
import styles from "./MainPage.module.css";
import Footer from "../Footer/Footer";

const pages = [
  "숙박업소",
  "관광지",
  "해양레저스포츠",
  "안전시설",
  "편의시설",
  "마을특화자원",
  "모범음식점",
  "여행일정계획",
];

function MainPage() {
  const navigate = useNavigate();

  const handleClick = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <div className={styles.mainBox}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.btnBox}>
          {pages.map((page) => (
            <button
              className={styles.btn}
              key={page}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <div className={styles.weatherAirInfo}>
          <WeatherForecast />
          <AirPollutinInfo />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
