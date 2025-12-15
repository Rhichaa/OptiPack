
import { NavLink, Outlet } from "react-router-dom";
import "../styles/main-layout.css";
import "../styles/global.css";

function MainLayout() {
  return (
    <div className="app-shell">   {/* <-- THIS FIXES THE WHOLE LAYOUT */}

      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <NavLink className="sidebar-link" to="/app">Dashboard</NavLink>
          <NavLink className="sidebar-link" to="/app/product-details">Product Details</NavLink>
          <NavLink className="sidebar-link" to="/app/manual-entry">Manual Entry</NavLink>
          <NavLink className="sidebar-link" to="/app/inventory">Inventory</NavLink>
          <NavLink className="sidebar-link" to="/app/history">History</NavLink>
          <NavLink className="sidebar-link" to="/app/user-profile">User Profile</NavLink>
          <NavLink to="/app/settings">Settings</NavLink>

        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;
