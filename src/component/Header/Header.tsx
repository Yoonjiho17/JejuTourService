import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">🍊제주도관광정보</Link>
        <Link to="/숙박업소">숙박업소</Link>
        <Link to="/관광지">관광지</Link>
        <Link to="/해양레저스포츠">해양레저스포츠</Link>
        <Link to="/안전시설">안전시설</Link>
        <Link to="/편의시설">편의시설</Link>
        <Link to="/마을특화자원">마을특화자원</Link>
        <Link to="/모범음식점">모범음식점</Link>
        <Link to="/여행일정계획">여행일정계획</Link>
      </nav>
    </header>
  );
}

export default Header;
