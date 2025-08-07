import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../../component/Layout/MainLayout";
import MainPage from "../MainPage/MainPage";
import ContentLayout from "../../component/Layout/ContentLayout";
import Accommodation from "../Accommodation/Accommodation";
import Attractions from "../Attractions/Attractions";
import MarineLeisure from "../MarineLeisure/MarineLeisure";
import SafetyFacilities from "../SafetyFacilities/SafetyFacilities";
import ConvenienceFacilities from "../ConvenienceFacilities/ConvenienceFacilities";
import SpecialResources from "../SpecialResources/SpecialResources";
import ExcellentRestaurants from "../ExcellentRestaurants/ExcellentRestaurants";
import TourPlanner from "../TourPlanner/TourPlanner";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<ContentLayout />}>
          <Route path="/숙박업소" element={<Accommodation />} />
          <Route path="/관광지" element={<Attractions />} />
          <Route path="/해양레저스포츠" element={<MarineLeisure />} />
          <Route path="/안전시설" element={<SafetyFacilities />} />
          <Route path="/편의시설" element={<ConvenienceFacilities />} />
          <Route path="/마을특화자원" element={<SpecialResources />} />
          <Route path="/모범음식점" element={<ExcellentRestaurants />} />
          <Route path="/여행일정계획" element={<TourPlanner />} />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
