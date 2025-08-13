import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Attractions.module.css";
import attractionsJson from "../../data/jeju_tourism_spots.json";
import type { AttractionsType } from "./api/entity";
import { usePlan } from "../../component/PlanContext";

function Attractions() {
  const navigate = useNavigate();
  const { openModal } = usePlan();

  const itemsPerPage = 10;
  const pagesPerGroup = 10;

  const attractionsData: AttractionsType[] = attractionsJson;

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState<AttractionsType | null>(null);

  const totalPageCount = Math.ceil(attractionsData.length / itemsPerPage);
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPageCount);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = attractionsData.slice(startIndex, endIndex);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage
  );

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPageCount) {
      setCurrentPage(endPage + 1);
    }
  };

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
        {currentItems.map((item, index) => (
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

      <div className={styles.pagination}>
        <button
          onClick={handlePrevGroup}
          disabled={startPage === 1}
          className={styles.pageButton}
        >
          &lt;
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`${styles.pageButton} ${
              currentPage === pageNumber ? styles.active : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextGroup}
          disabled={endPage === totalPageCount}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div>

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
