import { useState } from "react";
import { useSpecialResources } from "./hooks/useSpecialResources";
import styles from "./SpecialResources.module.css";
import type { SpecialResourcesType } from "./api/entity";

function SpecialResources() {
  const itemsPerPage = 10;
  const pagesPerGroup = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState<SpecialResourcesType | null>(null);

  const { data, isLoading, error } = useSpecialResources(
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

  const handleDetailClick = (item: SpecialResourcesType) => {
    setDetail(item);
  };

  const handleDetailDeleteClick = () => {
    setDetail(null);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>제주 마을별 특화자원 리스트</h2>

      <ul>
        {data.data.map((item, index) => (
          <div
            key={index}
            className={styles.listButton}
            onClick={() => handleDetailClick(item)}
          >
            <div className={styles.name}>
              <strong>{item.마을명}</strong>
            </div>
            <div>특화자원: {item.특화자원명}</div>
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
              <h2>{detail.마을명}</h2>
              <button
                className={styles.deleteButton}
                onClick={handleDetailDeleteClick}
              >
                &times;
              </button>
            </div>
            <p>특화자원: {detail.특화자원명}</p>
            <p>유형: {detail.특화자원유형}</p>
            <p>특화자원상세: {detail.특화자원내용}</p>
            <p>전화번호: {detail.소재지전화번호}</p>
            <p>주소: {detail.소재지지번주소}</p>
            <p>요금: {detail.요금정보}</p>
            <p>편의시설: {detail.편의시설}</p>
            <p>이용시간: {detail.이용시간}</p>
            <p>휴무일: {detail.휴무일}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecialResources;
