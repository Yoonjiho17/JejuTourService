import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>제주도 관광 정보</h2>
      <div>
        {pages.map((page) => (
          <button key={page} onClick={() => handleClick(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
