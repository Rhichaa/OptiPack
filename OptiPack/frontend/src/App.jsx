import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import CostEstimation from "./pages/CostEstimation";
import Inventory from "./pages/Inventory";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="product-details" element={<ProductDetails />} />
        <Route path="cost-estimation" element={<CostEstimation />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;
