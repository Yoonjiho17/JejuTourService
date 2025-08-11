import { useState } from "react";
import { useAccommodation } from "./hooks/useAccommodation";
import styles from "./Accommodation.module.css";
import type { AccommodationType } from "./api/entity";

function Accommodation() {
  const itemsPerPage = 10;
  const pagesPerGroup = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState<AccommodationType | null>(null);

  const { data, isLoading, error } = useAccommodation(
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

  const handleDetailClick = (item: AccommodationType) => {
    setDetail(item);
  };

  const handleDetailDeleteClick = () => {
    setDetail(null);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>제주 숙박업소 리스트</h2>

      <ul>
        {data.data.map((item, index) => (
          <div
            key={index}
            className={styles.listButton}
            onClick={() => handleDetailClick(item)}
          >
            <div className={styles.name}>
              <strong>{item.숙박업소명}</strong>
            </div>
            <div>주소: {item.소재지도로명주소}</div>
            <div>전화번호: {item.숙박업소전화번호}</div>
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
              <h2>{detail.숙박업소명}</h2>
              <button
                className={styles.deleteButton}
                onClick={handleDetailDeleteClick}
              >
                &times;
              </button>
            </div>
            <p>전화번호: {detail.숙박업소전화번호}</p>
            <p>주소: {detail.소재지지번주소}</p>
            <p>마을명: {detail.마을명}</p>
            <p>객실수: {detail.객실수}</p>
            <p>영업유무: {detail.상세영업상태명}</p>
            <p>기타: {detail.업태구분명}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accommodation;
