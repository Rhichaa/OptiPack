import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
// Professional icons for a cleaner look
import { LayoutDashboard, Package, Lightbulb, Library, History, User, LogOut } from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "sidebar-item sidebar-item-active"
      : "sidebar-item";

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");   
  };

  return (
    <aside className="sidebar">
      {/* Container for top links */}
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🚀</span>
          <span>OptiPack</span>
        </div>

        <nav className="sidebar-menu">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            <LayoutDashboard size={18} className="sidebar-item-icon" />
            <span>Dashboard</span>
          </Link>

          <Link to="/packages" className={isActive("/packages")}>
            <Package size={18} className="sidebar-item-icon" />
            <span>Packages</span>
          </Link>

          <Link to="/recommendations" className={isActive("/recommendations")}>
            <Lightbulb size={18} className="sidebar-item-icon" />
            <span>Recommendations</span>
          </Link>

          <Link to="/inventory" className={isActive("/inventory")}>
            <Library size={18} className="sidebar-item-icon" />
            <span>Inventory</span>
          </Link>

          <Link to="/history" className={isActive("/history")}>
            <History size={18} className="sidebar-item-icon" />
            <span>History</span>
          </Link>

          <Link to="/user-profile" className={isActive("/user-profile")}>
            <User size={18} className="sidebar-item-icon" />
            <span>User Profile</span>
          </Link>
        </nav>
      </div>

      {/* Logout button pinned to the bottom */}
      <div className="sidebar-logout">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;












