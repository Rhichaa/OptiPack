
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import ManualEntry from "./pages/ManualEntry";
import Inventory from "./pages/Inventory";
import History from "./pages/History";
import UserProfile from "./pages/UserProfile";   
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import ForgotPassword from "./pages/ForgotPassword";
import AICostEstimation from "./pages/AICostEstimation";
import ManualOverride from "./pages/ManualOverride";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="product-details" element={<ProductDetails />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="history" element={<History />} />
        <Route path="ai-cost-estimation" element={<AICostEstimation />} />
        <Route path="manual-override" element={<ManualOverride />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="manual-entry" element={<ManualEntry />} />
        <Route path="settings" element={<Settings />} />


      </Route>
    </Routes>
  );
}

export default App;
