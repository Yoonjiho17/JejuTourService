import { useState } from "react";
import { useSafetyFacilities } from "./hooks/useSafetyFacilities";
import styles from "./SafetyFacilities.module.css";
import type { SafetyFacilitiesType } from "./api/entity";

function SafetyFacilities() {
  const itemsPerPage = 10;
  const pagesPerGroup = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState<SafetyFacilitiesType | null>(null);

  const { data, isLoading, error } = useSafetyFacilities(
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

  const handleDetailClick = (item: SafetyFacilitiesType) => {
    setDetail(item);
  };

  const handleDetailDeleteClick = () => {
    setDetail(null);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>제주 안전시설 리스트</h2>

      <ul>
        {data.data.map((item, index) => (
          <div
            key={index}
            className={styles.listButton}
            onClick={() => handleDetailClick(item)}
          >
            <div className={styles.name}>
              <strong>{item.안전시설명}</strong> / {item.안전시설유형}
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
              <h2>{detail.안전시설명}</h2>
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
            <p>유형: {detail.안전시설유형}</p>
            <p>운영시간: {detail.운영시간}</p>
            <p>휴무일: {detail.휴무일}</p>
            <p>영업유무: {detail.상세영업상태명}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SafetyFacilities;
