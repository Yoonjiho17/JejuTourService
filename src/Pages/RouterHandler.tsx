import { useParams } from "react-router-dom";
import Accommodation from "../Pages/Accommodation/Accommodation";
import Attractions from "../Pages/Attractions/Attractions";
import MarineLeisure from "../Pages/MarineLeisure/MarineLeisure";
import SafetyFacilities from "../Pages/SafetyFacilities/SafetyFacilities";
import ConvenienceFacilities from "../Pages/ConvenienceFacilities/ConvenienceFacilities";
import SpecialResources from "../Pages/SpecialResources/SpecialResources";
import ExcellentRestaurants from "../Pages/ExcellentRestaurants/ExcellentRestaurants";
import TourPlanner from "../Pages/TourPlanner/TourPlanner";

function RouterHandler() {
  const { page } = useParams();

  switch (page) {
    case "숙박업소":
      return <Accommodation />;
    case "관광지":
      return <Attractions />;
    case "해양레저스포츠":
      return <MarineLeisure />;
    case "안전시설":
      return <SafetyFacilities />;
    case "편의시설":
      return <ConvenienceFacilities />;
    case "마을특화자원":
      return <SpecialResources />;
    case "모범음식점":
      return <ExcellentRestaurants />;
    case "여행일정계획":
      return <TourPlanner />;
    default:
      return <div>페이지를 찾을 수 없습니다.</div>;
  }
}

export default RouterHandler;
