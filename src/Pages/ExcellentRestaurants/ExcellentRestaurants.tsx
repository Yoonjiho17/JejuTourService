import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExcellentRestaurants } from "./hooks/useExcellentRestaurants";
import styles from "./ExcellentRestaurants.module.css";
import type { ExcellentRestaurantsType } from "./api/entity";
import { usePlan } from "../../component/PlanContext";

function ExcellentRestaurants() {
  const navigate = useNavigate();
  const { openModal } = usePlan();

  const itemsPerPage = 10;
  const pagesPerGroup = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState<ExcellentRestaurantsType | null>(null);

  const { data, isLoading, error } = useExcellentRestaurants(
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

  const handleDetailClick = (item: ExcellentRestaurantsType) => {
    setDetail(item);
  };

  const handleDetailDeleteClick = () => {
    setDetail(null);
  };

  const handleAddPlan = (업소명: string) => {
    openModal(업소명);
    handleDetailDeleteClick();
    navigate(`/여행일정계획`);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>제주 모범음식점 리스트</h2>

      <ul>
        {data.data.map((item, index) => (
          <div
            key={index}
            className={styles.listButton}
            onClick={() => handleDetailClick(item)}
          >
            <div className={styles.name}>
              <strong>{item.업소명}</strong>
            </div>
            <div>주소: {item["소재지(도로명)"]}</div>
            <div>전화번호: {item.전화번호}</div>
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
              <h2>{detail.업소명}</h2>
              <button
                className={styles.deleteButton}
                onClick={handleDetailDeleteClick}
              >
                &times;
              </button>
            </div>
            <p>전화번호: {detail.전화번호}</p>
            <p>주소: {detail["소재지(도로명)"]}</p>
            <p>행정시: {detail.행정시}</p>
            <p>데이터기준일자: {detail.데이터기준일자}</p>
            <button
              className={styles.addPlan}
              onClick={() => handleAddPlan(detail.업소명)}
            >
              일정에 추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcellentRestaurants;
