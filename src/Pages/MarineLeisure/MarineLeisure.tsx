import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMarineLeisure } from "./hooks/useMarineLeisure";
import styles from "./MarineLeisure.module.css";
import type { MarineLeisureType } from "./api/entity";
import { usePlan } from "../../component/PlanContext";

function MarineLeisure() {
  const navigate = useNavigate();
  const { openModal } = usePlan();

  const itemsPerPage = 10;
  const pagesPerGroup = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState<MarineLeisureType | null>(null);

  const { data, isLoading, error } = useMarineLeisure(
    currentPage,
    itemsPerPage
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error instanceof Error) return <div>에러: {error.message}</div>;
  if (!data) return null;

  const totalPageCount = Math.ceil(data.totalCount / itemsPerPage);
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPageCount);

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

  const handleDetailClick = (item: MarineLeisureType) => {
    setDetail(item);
  };

  const handleDetailDeleteClick = () => {
    setDetail(null);
  };

  const handleAddPlan = (사업장명: string) => {
    openModal(사업장명);
    handleDetailDeleteClick();
    navigate(`/여행일정계획`);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>제주 해양레저스포츠 리스트</h2>

      <ul>
        {data.data.map((item, index) => (
          <div
            key={index}
            className={styles.listButton}
            onClick={() => handleDetailClick(item)}
          >
            <div className={styles.name}>
              <strong>{item.사업장명}</strong> / {item.해양레저스포츠유형}
            </div>
            <div>주소: {item.소재지도로명주소}</div>
            <div>전화번호: {item.소재지전화번호}</div>
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
              <h2>{detail.사업장명}</h2>
              <button
                className={styles.deleteButton}
                onClick={handleDetailDeleteClick}
              >
                &times;
              </button>
            </div>
            <p>전화번호: {detail.소재지전화번호}</p>
            <p>주소: {detail.소재지도로명주소}</p>
            <p>마을명: {detail.마을명}</p>
            <p>스포츠유형: {detail.해양레저스포츠유형}</p>
            <p>문화체육업종명: {detail.문화체육업종명}</p>
            <p>편익시설: {detail.편익시설현황}</p>
            <p>주변환경: {detail.주변환경유형}</p>
            <p>안전시설: {detail.안전시설현황}</p>
            <p>주차가능수: {detail.주차가능수}</p>
            <p>영업유무: {detail.상세영업상태명}</p>
            <button
              className={styles.addPlan}
              onClick={() => handleAddPlan(detail.사업장명)}
            >
              일정에 추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarineLeisure;
