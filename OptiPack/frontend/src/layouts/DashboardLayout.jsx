import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function DashboardLayout() {
  return (
    <div className="dashboard-page">
      <Sidebar />
      {/* Right side – each page (Dashboard, Inventory, History, etc.) */}
      <div className="dashboard-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
