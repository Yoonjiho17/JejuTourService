import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Attractions.module.css";
import attractionsJson from "../../data/jeju_tourism_spots.json";
import type { AttractionsType } from "./api/entity";
import { usePlan } from "../../component/PlanContext";

function Attractions() {
  const navigate = useNavigate();
  const { openModal } = usePlan();

  const attractionsData: AttractionsType[] = attractionsJson;

  const [detail, setDetail] = useState<AttractionsType | null>(null);

  const handleDetailClick = (item: AttractionsType) => {
    setDetail(item);
  };

  const handleDetailDeleteClick = () => {
    setDetail(null);
  };

  const handleAddPlan = (관광지명: string) => {
    openModal(관광지명);
    handleDetailDeleteClick();
    navigate(`/여행일정계획`);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>제주 관광지 리스트</h2>

      <ul>
        {attractionsData?.map((item, index) => (
          <div
            key={index}
            className={styles.listButton}
            onClick={() => handleDetailClick(item)}
          >
            <div className={styles.name}>
              <strong>{item.관광지명}</strong> / {item.관광지유형}
            </div>
            <div>관광지소개: {item.관광지소개}</div>
            <div>주소: {item.소재지지번주소}</div>
          </div>
        ))}
      </ul>

      {detail && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{detail.관광지명}</h2>
              <button
                className={styles.deleteButton}
                onClick={handleDetailDeleteClick}
              >
                &times;
              </button>
            </div>
            <p>
              관리기관: {detail.관리기관명}({detail.관리기관전화번호})
            </p>
            <p>주소: {detail.소재지지번주소}</p>
            <p>마을명: {detail.마을명}</p>
            <p>소개: {detail.관광지소개}</p>
            <p>유형: {detail.관광지유형}</p>
            <p>목적: {detail.주요목적}</p>
            <p>요금: {detail.요금정보}</p>
            <p>편의시설: {detail.편의시설}</p>
            <p>휴무일: {detail.휴무일}</p>
            <button
              className={styles.addPlan}
              onClick={() => handleAddPlan(detail.관광지명)}
            >
              일정에 추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attractions;
