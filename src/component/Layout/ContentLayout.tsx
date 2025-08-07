import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function ContentLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default ContentLayout;
