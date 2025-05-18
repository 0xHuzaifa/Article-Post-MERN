import { Outlet } from "react-router-dom";
import { Sidebar } from "../dashboard/Sidebar";

function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
