import { Link, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "sidebar-item sidebar-item-active" : "sidebar-item";

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🚀</span>
          <span>OptiPack</span>
        </div>

        <nav className="sidebar-menu">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            <span className="sidebar-item-icon">🏠</span>
            <span>Dashboard</span>
          </Link>

          <Link to="/packages" className={isActive("/packages")}>
            <span className="sidebar-item-icon">📦</span>
            <span>Packages</span>
          </Link>

          <Link to="/recommendations" className={isActive("/recommendations")}>
            <span className="sidebar-item-icon">💡</span>
            <span>Recommendations</span>
          </Link>

          

          <Link to="/inventory" className={isActive("/inventory")}>
            <span className="sidebar-item-icon">📚</span>
            <span>Inventory</span>
          </Link>

          <Link to="/history" className={isActive("/history")}>
            <span className="sidebar-item-icon">🕒</span>
            <span>History</span>
          </Link>

          <Link to="/user-profile" className={isActive("/user-profile")}>
            <span className="sidebar-item-icon">👤</span>
            <span>User Profile</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
