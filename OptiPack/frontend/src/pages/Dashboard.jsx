import "../styles/dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  // Dummy stats (you can replace with real API data later)
  const todayPackages = 1245;
  const monthPackages = 28310;
  const aiAccuracy = 93.8;

  const aiAccuracyToday = 91;
  const acceptedRecommendations = 44;
  const overrides = 5;

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      {/* Stats Top Row */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <p className="stat-label">Today's Packages</p>
          <div className="stat-box">
            <div className="stat-value">
              {todayPackages.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">This Month's Packages</p>
          <div className="stat-box">
            <div className="stat-value">
              {monthPackages.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">AI Recommendation Accuracy</p>
          <div className="stat-box">
            <div className="stat-value">{aiAccuracy}%</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="quick-title">Quick Actions</h2>
      <div className="quick-grid">
        <Link to="/product-details" className="quick-card">
          <div className="quick-card-icon">📦</div>
          <div className="quick-card-label">Product Details</div>
        </Link>

        <Link to="/recommendations" className="quick-card">
          <div className="quick-card-icon">💡</div>
          <div className="quick-card-label">Recommendation</div>
        </Link>

        <Link to="/cost-estimation" className="quick-card">
          <div className="quick-card-icon">🧮</div>
          <div className="quick-card-label">Cost Estimation</div>
        </Link>

        <Link to="/inventory" className="quick-card">
          <div className="quick-card-icon">📚</div>
          <div className="quick-card-label">Inventory</div>
        </Link>

        <Link to="/history" className="quick-card">
          <div className="quick-card-icon">🕒</div>
          <div className="quick-card-label">History</div>
        </Link>

        <Link to="/user-profile" className="quick-card">
          <div className="quick-card-icon">👤</div>
          <div className="quick-card-label">User Profile</div>
        </Link>
      </div>

      {/* AI Insights Section */}
      <h2 className="insights-title">AI Insights</h2>
      <div className="insights-card">
        <div className="insights-row">
          <div className="insights-label">AI Recommendation Accuracy Today:</div>
          <div className="insights-value">{aiAccuracyToday}%</div>
        </div>

        <div className="insights-row">
          <div className="insights-label">Accepted Recommendations:</div>
          <div className="insights-value">{acceptedRecommendations}</div>
        </div>

        <div className="insights-row">
          <div className="insights-label">Overrides:</div>
          <div className="insights-value">{overrides}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
