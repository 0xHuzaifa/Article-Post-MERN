import { Outlet } from "react-router-dom";
import Header from "../common/Header";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
