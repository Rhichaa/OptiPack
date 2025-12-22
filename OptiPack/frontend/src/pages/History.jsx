import { useState, useMemo, useEffect } from "react";
import "../styles/history.css";

function History() {
  const [range, setRange] = useState("daily"); 
  const [selectedPoint, setSelectedPoint] = useState(null);
  
  // States for real database data
  const [records, setRecords] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch both Records and Analytics from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [recRes, anaRes] = await Promise.all([
          fetch("https://localhost:49331/api/History/recent"),
          fetch("https://localhost:49331/api/History/analytics")
        ]);
        
        if (recRes.ok) {
          const recData = await recRes.json();
          setRecords(recData);
        }
        
        if (anaRes.ok) {
          const anaData = await anaRes.json();
          setAnalytics(anaData);
        }
      } catch (error) {
        console.error("Connection error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Dynamic Graph Logic based on selected range
  const activeData = useMemo(() => {
    if (analytics) {
      if (range === "daily") return analytics.daily || [];
      if (range === "weekly") return analytics.weekly || [];
      if (range === "monthly") return analytics.monthly || [];
    }
    return [{ label: "N/A", value: 0 }];
  }, [analytics, range]);

  // SVG Chart Math
  const minVal = Math.min(...activeData.map((d) => d.value));
  const maxVal = Math.max(...activeData.map((d) => d.value));
  const svgWidth = 300;
  const svgHeight = 120;
  const bottom = 100; 
  const top = 20; 

  const pointsString = activeData
    .map((d, idx) => {
      const x = (idx / (activeData.length - 1 || 1)) * svgWidth;
      const norm = (d.value - minVal) / (maxVal - minVal || 1);
      const y = bottom - norm * (bottom - top);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="hist-page">
      <h1 className="hist-title">Packaging History & Analytics</h1>

      <div className="hist-top-row">
        {/* CHART CARD */}
        <div className="hist-card chart-card">
          <div className="hist-card-header">
            <h2 className="hist-card-title">Time-Based Packaging Trends</h2>
            <div className="hist-range-tabs">
              {["daily", "weekly", "monthly"].map((r) => (
                <button 
                  key={r} 
                  className={range === r ? "range-btn active" : "range-btn"} 
                  onClick={() => setRange(r)}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="hist-chart-wrapper">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="hist-chart">
              <line x1="0" y1={bottom} x2={svgWidth} y2={bottom} stroke="#e5e7eb" strokeWidth="1" />
              <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={pointsString} />
              {activeData.map((d, idx) => {
                const x = (idx / (activeData.length - 1 || 1)) * svgWidth;
                const norm = (d.value - minVal) / (maxVal - minVal || 1);
                const y = bottom - norm * (bottom - top);
                return (
                  <circle 
                    key={idx} 
                    cx={x} 
                    cy={y} 
                    r={4} 
                    fill="#3b82f6" 
                    style={{ cursor: "pointer" }} 
                    onClick={() => setSelectedPoint({ label: d.label, value: d.value })} 
                  />
                );
              })}
            </svg>
            <div className="hist-chart-legend"><span className="legend-dot" /> Total Packages</div>
            {selectedPoint && (
              <div className="hist-selected-point">
                Selected: <span>{selectedPoint.label}</span> – <span>{selectedPoint.value}</span> packages
              </div>
            )}
          </div>
        </div>

        {/* RESTORED INSIGHTS CARD */}
        <div className="hist-card insights-card">
          <h2 className="hist-card-title">AI Acceptance Insights</h2>
          <div className="hist-insight-main">
            <div className="hist-insight-label">AI Recommendation Acceptance Rate:</div>
            <div className="hist-insight-value">
              {analytics ? `${analytics.acceptanceRate}%` : "0%"}
            </div>
          </div>
          <div className="hist-insight-row">
            <span>Accepted Recommendations:</span>
            <span>{analytics?.totalAccepted || 0}</span>
          </div>
          <div className="hist-insight-row">
            <span>Overrides:</span>
            <span>{analytics?.totalOverrides || 0}</span>
          </div>
          <div className="hist-insight-row">
            <span>AI Usage Rate:</span>
            <span>{analytics ? `${analytics.usageRate}%` : "0%"}</span>
          </div>
        </div>
      </div>

      {/* PACKAGING RECORDS TABLE */}
      <div className="hist-card records-card">
        <div className="hist-card-header">
          <h2 className="hist-card-title">Packaging Records</h2>
        </div>

        <div className="hist-table-wrapper">
          <table className="hist-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Product Name</th>
                <th>Box Used</th>
                <th>Protective Material Used</th>
                <th>Cost</th>
                <th>AI Used?</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Loading records...</td></tr>
              ) : records.length > 0 ? (
                records.map((r) => (
                  <tr key={r.id}>
                    <td>{new Date(r.packedAt).toLocaleString()}</td>
                    <td>{r.productName}</td>
                    <td>{r.boxUsed}</td>
                    <td>{r.protectiveMaterials}</td>
                    <td>₹{r.cost}</td>
                    <td>
                      <span className={r.aiUsed === "Yes" ? "pill pill-yes" : "pill pill-no"}>
                        {r.aiUsed}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;