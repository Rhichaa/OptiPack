import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/recommendations.css";

function Recommendations() {
  const [selectedId, setSelectedId] = useState(null);

  // form state for the left panel
  const [form, setForm] = useState({
    productName: "",
    fragility: "",
    distance: "",
    priority: "",
  });

  const options = [
    {
      id: 1,
      name: "Standard Corrugated Box",
      tag: "Balanced choice",
      desc: "Good protection for most consumer products with moderate cost.",
      material: "3-ply corrugated",
      note: "Suitable for e-commerce shipping and retail.",
    },
    {
      id: 2,
      name: "Premium Protective Packaging",
      tag: "Higher protection",
      desc: "Extra cushioning for fragile or high-value items.",
      material: "5-ply corrugated + inserts",
      note: "Recommended for glass, electronics, or delicate items.",
    },
    {
      id: 3,
      name: "Eco-Friendly Minimal Packaging",
      tag: "Sustainable",
      desc: "Reduced material usage with recyclable components.",
      material: "Recycled cardboard",
      note: "Best for eco-conscious brands and local shipping.",
    },
  ];

  // handle input / select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    if (!selectedId) {
      alert("Please select a recommendation to apply.");
      return;
    }
    const selected = options.find((o) => o.id === selectedId);
    alert(`Applied recommendation: ${selected?.name}`);
    console.log("Applied recommendation with form data:", form, selected);
  };

  const handleReset = () => {
    // clear selected card
    setSelectedId(null);
    // clear all input fields
    setForm({
      productName: "",
      fragility: "",
      distance: "",
      priority: "",
    });
  };

  return (
    <div className="reco-page-wrapper">
      <div className="reco-title-row">
        <h1 className="reco-page-title">Recommendations</h1>
        <Link
          to="/dashboard"
          style={{ fontSize: 13, color: "#4f46e5", textDecoration: "none" }}
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="reco-layout">
        {/* Left: product / constraints */}
        <section className="reco-card">
          <h2 className="reco-section-title">Product & Constraints</h2>

          <div className="reco-field">
            <label className="reco-label">Product Name</label>
            <input
              type="text"
              name="productName"
              className="reco-input"
              placeholder="e.g., Glass water bottle"
              value={form.productName}
              onChange={handleChange}
            />
          </div>

          <div className="reco-field">
            <label className="reco-label">Fragility</label>
            <select
              name="fragility"
              className="reco-select"
              value={form.fragility}
              onChange={handleChange}
            >
              <option value="">Select fragility</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="reco-field">
            <label className="reco-label">Shipping Distance</label>
            <select
              name="distance"
              className="reco-select"
              value={form.distance}
              onChange={handleChange}
            >
              <option value="">Select distance</option>
              <option value="local">Local</option>
              <option value="regional">Regional</option>
              <option value="international">International</option>
            </select>
          </div>

          <div className="reco-field">
            <label className="reco-label">Priority</label>
            <select
              name="priority"
              className="reco-select"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="">Select priority</option>
              <option value="cost">Cost Optimization</option>
              <option value="protection">Maximum Protection</option>
              <option value="eco">Eco-Friendly</option>
            </select>
          </div>

          <div className="reco-actions">
            <button
              type="button"
              className="reco-btn-outline"
              onClick={handleReset}
            >
              Reset Selection
            </button>
            <button
              type="button"
              className="reco-btn-primary"
              onClick={handleApply}
            >
              Apply Recommendation
            </button>
          </div>
        </section>

        {/* Right: recommendation list */}
        <section className="reco-card">
          <div className="reco-list-heading">
            <h2 className="reco-section-title">AI Recommended Packaging</h2>
            <span className="reco-subtext">
              Click an option to select (UI only)
            </span>
          </div>

          <div className="reco-list">
            {options.map((opt) => (
              <div
                key={opt.id}
                className={
                  "reco-option" + (selectedId === opt.id ? " selected" : "")
                }
                onClick={() => setSelectedId(opt.id)}
              >
                <div className="reco-option-header">
                  <span className="reco-option-name">{opt.name}</span>
                  <span className="reco-tag">{opt.tag}</span>
                </div>
                <div className="reco-option-body">{opt.desc}</div>
                <div className="reco-option-footer">
                  <span>{opt.material}</span>
                  <span>{opt.note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Recommendations;
