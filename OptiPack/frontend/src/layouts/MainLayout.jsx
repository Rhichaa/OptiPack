import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Lightbulb, Library, History, User, Settings, LogOut } from "lucide-react";
import "../styles/main-layout.css";
import "../styles/global.css";
import "../styles/dashboard.css"; // Ensure this is imported for the sidebar styles

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      {/* Sidebar with professional icons and logout */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">🚀</span>
            <span>OptiPack</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink className={({ isActive }) => isActive ? "sidebar-item sidebar-item-active" : "sidebar-item"} to="/app" end>
              <LayoutDashboard size={18} className="sidebar-item-icon" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? "sidebar-item sidebar-item-active" : "sidebar-item"} to="/app/product-details">
              <Package size={18} className="sidebar-item-icon" />
              <span>Product Details</span>
            </NavLink>

            

            <NavLink className={({ isActive }) => isActive ? "sidebar-item sidebar-item-active" : "sidebar-item"} to="/app/inventory">
              <Library size={18} className="sidebar-item-icon" />
              <span>Inventory</span>
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? "sidebar-item sidebar-item-active" : "sidebar-item"} to="/app/history">
              <History size={18} className="sidebar-item-icon" />
              <span>History</span>
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? "sidebar-item sidebar-item-active" : "sidebar-item"} to="/app/user-profile">
              <User size={18} className="sidebar-item-icon" />
              <span>User Profile</span>
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? "sidebar-item sidebar-item-active" : "sidebar-item"} to="/app/settings">
              <Settings size={18} className="sidebar-item-icon" />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        {/* Logout Section at the bottom */}
        <div className="sidebar-logout">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
