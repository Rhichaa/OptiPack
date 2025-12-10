//import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import "./styles/global.css";
//import "../styles/global.css";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/main-layout.css";
import "../styles/global.css";



// FIXED PATHS
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";





import Dashboard from "../pages/Dashboard";
import Packages from "../pages/Packages";
import ProductDetails from "../pages/ProductDetails";
import ProductAnalysis from "../pages/ProductAnalysis";
import Recommendations from "../pages/Recommendations";
import CostEstimation from "../pages/CostEstimation";
import Inventory from "../pages/Inventory";
import History from "../pages/History";
import UserProfile from "../pages/UserProfile";
import Settings from "../pages/Settings";
import ManualOverride from "../pages/ManualOverride";
import AICostEstimation from "../pages/AICostEstimation";

//import MainLayout from "./layouts/MainLayout";
//import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Pages */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/product-analysis" element={<ProductAnalysis />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/cost-estimation" element={<CostEstimation />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/history" element={<History />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/manual-override" element={<ManualOverride />} />
          <Route path="/ai-cost-estimation" element={<AICostEstimation />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
