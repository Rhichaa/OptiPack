import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "sidebar-item sidebar-item-active"
      : "sidebar-item";

  const handleLogout = () => {
    localStorage.clear(); // clears login/session data
    navigate("/login");   // redirect to login page
  };

  return (
    <aside className="sidebar">
      {/* TOP PART */}
      <div className="sidebar-top">
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

      {/* BOTTOM LOGOUT */}
      <div className="sidebar-logout">
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
console.log("SIDEBAR LOADED");

export default Sidebar;













/*import { Link, useLocation } from "react-router-dom";
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

export default Sidebar;*/
