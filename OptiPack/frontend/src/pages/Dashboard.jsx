import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// Import the professional icons from Lucide
import { Package, Library, History, User, Info, TrendingUp } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    todayPackages: 0,
    monthPackages: 0,
    aiAccuracy: 0,
    aiAccuracyToday: 0,
    acceptedRecommendations: 0,
    overrides: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // NOTE: Remember to change localhost to your AWS URL tomorrow
        const response = await fetch("https://localhost:49331/api/History/analytics");
        if (response.ok) {
          const data = await response.json();
          setStats({
            todayPackages: data.todayCount || 0,
            monthPackages: data.monthCount || 0,
            aiAccuracy: data.acceptanceRate || 0,
            aiAccuracyToday: data.acceptanceRateToday || 0, 
            acceptedRecommendations: data.totalAccepted || 0,
            overrides: data.totalOverrides || 0
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header-flex">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          
        </div>
  
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-header">
            <Package size={20} color="#6366f1" />
            <p className="stat-label">Today's Packages</p>
          </div>
          <div className="stat-value">
            {loading ? "..." : stats.todayPackages.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <TrendingUp size={20} color="#10b981" />
            <p className="stat-label">Monthly Volume</p>
          </div>
          <div className="stat-value">
            {loading ? "..." : stats.monthPackages.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Info size={20} color="#f59e0b" />
            <p className="stat-label">Global AI Accuracy</p>
          </div>
          <div className="stat-value">{loading ? "..." : stats.aiAccuracy}%</div>
        </div>
      </div>

      <h2 className="quick-title">Quick Actions</h2>
      <div className="quick-grid">
        {/* Balanced 4-column layout */}
        <Link to="/app/product-details" className="quick-card blue">
          <div className="quick-card-icon">
            <Package size={28} />
          </div>
          <div className="quick-card-label">Product Details</div>
        </Link>

        <Link to="/app/inventory" className="quick-card green">
          <div className="quick-card-icon">
            <Library size={28} />
          </div>
          <div className="quick-card-label">Inventory</div>
        </Link>

        <Link to="/app/history" className="quick-card purple">
          <div className="quick-card-icon">
            <History size={28} />
          </div>
          <div className="quick-card-label">History Log</div>
        </Link>

        <Link to="/app/user-profile" className="quick-card orange">
          <div className="quick-card-icon">
            <User size={28} />
          </div>
          <div className="quick-card-label">User Profile</div>
        </Link>
      </div>

      <h2 className="insights-title">AI Performance Insights</h2>
      <div className="insights-card">
        <div className="insights-row">
          <div className="insights-info">
            <div className="insights-label">Daily Recommendation Precision</div>
            <p className="insights-desc">Based on today's accepted suggestions</p>
          </div>
          <div className="insights-value highlight">{loading ? "..." : stats.aiAccuracyToday}%</div>
        </div>

        <div className="insights-row">
          <div className="insights-info">
            <div className="insights-label">Successful AI Suggestions</div>
            <p className="insights-desc">Total count of auto-accepted values</p>
          </div>
          <div className="insights-value">{loading ? "..." : stats.acceptedRecommendations}</div>
        </div>

        <div className="insights-row border-none">
          <div className="insights-info">
            <div className="insights-label">Manual Overrides</div>
            <p className="insights-desc">Adjustments made by operators</p>
          </div>
          <div className="insights-value warn">{loading ? "..." : stats.overrides}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


/*import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// Import the professional icons from Lucide
import { Package, Lightbulb, Library, History, User } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    todayPackages: 0,
    monthPackages: 0,
    aiAccuracy: 0,
    aiAccuracyToday: 0,
    acceptedRecommendations: 0,
    overrides: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("https://localhost:49331/api/History/analytics");
        if (response.ok) {
          const data = await response.json();
          setStats({
            todayPackages: data.todayCount || 0,
            monthPackages: data.monthCount || 0,
            aiAccuracy: data.acceptanceRate || 0,
            aiAccuracyToday: data.acceptanceRateToday || 0, 
            acceptedRecommendations: data.totalAccepted || 0,
            overrides: data.totalOverrides || 0
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <p className="stat-label">Today's Packages</p>
          <div className="stat-box">
            <div className="stat-value">
              {loading ? "..." : stats.todayPackages.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">This Month's Packages</p>
          <div className="stat-box">
            <div className="stat-value">
              {loading ? "..." : stats.monthPackages.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">AI Recommendation Accuracy</p>
          <div className="stat-box">
            <div className="stat-value">{loading ? "..." : stats.aiAccuracy}%</div>
          </div>
        </div>
      </div>

      <h2 className="quick-title">Quick Actions</h2>
      <div className="quick-grid">
        <Link to="/app/product-details" className="quick-card">
          <div className="quick-card-icon">
            <Package size={32} color="#4f46e5" strokeWidth={1.5} />
          </div>
          <div className="quick-card-label">Product Details</div>
        </Link>

        

        <Link to="/app/inventory" className="quick-card">
          <div className="quick-card-icon">
            <Library size={32} color="#4f46e5" strokeWidth={1.5} />
          </div>
          <div className="quick-card-label">Inventory</div>
        </Link>

        <Link to="/app/history" className="quick-card">
          <div className="quick-card-icon">
            <History size={32} color="#4f46e5" strokeWidth={1.5} />
          </div>
          <div className="quick-card-label">History</div>
        </Link>

        <Link to="/app/user-profile" className="quick-card">
          <div className="quick-card-icon">
            <User size={32} color="#4f46e5" strokeWidth={1.5} />
          </div>
          <div className="quick-card-label">User Profile</div>
        </Link>
      </div>

      <h2 className="insights-title">AI Insights</h2>
      <div className="insights-card">
        <div className="insights-row">
          <div className="insights-label">AI Recommendation Accuracy Today:</div>
          <div className="insights-value">{loading ? "..." : stats.aiAccuracyToday}%</div>
        </div>

        <div className="insights-row">
          <div className="insights-label">Accepted Recommendations:</div>
          <div className="insights-value">{loading ? "..." : stats.acceptedRecommendations}</div>
        </div>

        <div className="insights-row">
          <div className="insights-label">Overrides:</div>
          <div className="insights-value">{loading ? "..." : stats.overrides}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;*/