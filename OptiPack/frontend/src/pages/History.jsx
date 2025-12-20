import { useState, useMemo } from "react";
import "../styles/history.css";

function History() {
  const [range, setRange] = useState("weekly");
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Trend data (dummy) - kept as per note
  const dailyData = [
    { label: "Mon", value: 230 },
    { label: "Tue", value: 250 },
    { label: "Wed", value: 210 },
    { label: "Thu", value: 340 },
    { label: "Fri", value: 300 },
    { label: "Sat", value: 280 },
    { label: "Sun", value: 360 },
  ];

  const weeklyData = [
    { label: "Week 1", value: 1350 },
    { label: "Week 2", value: 1480 },
    { label: "Week 3", value: 1620 },
    { label: "Week 4", value: 1750 },
  ];

  const monthlyData = [
    { label: "Jan", value: 4200 },
    { label: "Feb", value: 4500 },
    { label: "Mar", value: 4800 },
    { label: "Apr", value: 5100 },
    { label: "May", value: 4950 },
  ];

  const activeData = useMemo(() => {
    if (range === "daily") return dailyData;
    if (range === "monthly") return monthlyData;
    return weeklyData; // default weekly
  }, [range]);

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

  // Dummy table records removed as requested
  const records = []; 

  return (
    <div className="hist-page">
      <h1 className="hist-title">Packaging History &amp; Analytics</h1>

      {/* TOP ROW */}
      <div className="hist-top-row">
        <div className="hist-card chart-card">
          <div className="hist-card-header">
            <h2 className="hist-card-title">Time-Based Packaging Trends</h2>
            <div className="hist-range-tabs">
              <button
                className={range === "daily" ? "range-btn active" : "range-btn"}
                onClick={() => setRange("daily")}
              >
                Daily
              </button>
              <button
                className={range === "weekly" ? "range-btn active" : "range-btn"}
                onClick={() => setRange("weekly")}
              >
                Weekly
              </button>
              <button
                className={range === "monthly" ? "range-btn active" : "range-btn"}
                onClick={() => setRange("monthly")}
              >
                Monthly
              </button>
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
                    key={d.label}
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
            <div className="hist-chart-legend">
              <span className="legend-dot" /> Total Packages
            </div>
            {selectedPoint && (
              <div className="hist-selected-point">
                Selected: <span>{selectedPoint.label}</span> – <span>{selectedPoint.value}</span> packages
              </div>
            )}
          </div>
        </div>

        <div className="hist-card insights-card">
          <h2 className="hist-card-title">AI Acceptance Insights</h2>
          <div className="hist-insight-main">
            <div className="hist-insight-label">AI Recommendation Acceptance Rate:</div>
            <div className="hist-insight-value">89%</div>
          </div>
          <div className="hist-insight-row">
            <span>Accepted Recommendations:</span>
            <span>3210</span>
          </div>
          <div className="hist-insight-row">
            <span>Overrides:</span>
            <span>320</span>
          </div>
          <div className="hist-insight-row">
            <span>AI Usage Rate:</span>
            <span>93%</span>
          </div>
        </div>
      </div>

      {/* BOTTOM: TABLE */}
      <div className="hist-card records-card">
        <div className="hist-card-header">
          <h2 className="hist-card-title">Packaging Records</h2>
          <div className="hist-pagination">
            <button className="page-btn" disabled>&lt; Previous</button>
            <span className="page-indicator">1 / 1</span>
            <button className="page-btn" disabled>Next &gt;</button>
          </div>
        </div>

        <div className="hist-table-wrapper">
          <table className="hist-table">
            <thead>
              <tr>
                <th>Date &amp; Time</th>
                <th>Product Name</th>
                <th>Box Used</th>
                <th>Protective Material Used</th>
                <th>Qty</th>
                {/* Packed By and Risk Level columns removed */}
                <th>AI Used?</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.datetime}</td>
                    <td>{r.product}</td>
                    <td>{r.box}</td>
                    <td>{r.material}</td>
                    <td>{r.qty}</td>
                    <td>
                      <span className={r.aiUsed ? "pill pill-yes" : "pill pill-no"}>
                        {r.aiUsed ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;