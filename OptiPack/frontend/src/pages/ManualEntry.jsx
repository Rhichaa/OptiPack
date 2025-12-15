import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/manual-entry.css";

function ManualEntry() {
  const [selectedId, setSelectedId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    fragility: "",
    distance: "",
    priority: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const options = [
    {
      id: 1,
      name: "Standard Corrugated Box",
      tag: "Balanced choice",
      desc: "Provides moderate cost and strong protection.",
      boxCost: 20,
      protectiveCost: 10,
      shippingCost: 30,
    },
    {
      id: 2,
      name: "Premium Protective Packaging",
      tag: "High protection",
      desc: "Extra safe for fragile items.",
      boxCost: 30,
      protectiveCost: 20,
      shippingCost: 40,
    },
    {
      id: 3,
      name: "Eco-Friendly Minimal Packaging",
      tag: "Sustainable",
      desc: "Uses recycled materials with reduced cost.",
      boxCost: 15,
      protectiveCost: 5,
      shippingCost: 25,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    if (
      !form.productName ||
      !form.fragility ||
      !form.distance ||
      !form.priority ||
      !form.weight ||
      !form.length ||
      !form.width ||
      !form.height
    ) {
      alert("⚠️ Please fill all product details before applying recommendation.");
      return;
    }

    setShowResults(true);
    setShowCost(false);
    setSelectedId(null);
  };

  const handleReset = () => {
    setSelectedId(null);
    setShowResults(false);
    setShowCost(false);
    setSelectedPackage(null);

    setForm({
      productName: "",
      fragility: "",
      distance: "",
      priority: "",
      weight: "",
      length: "",
      width: "",
      height: "",
    });
  };

  const handleSaveProduct = () => {
    alert("Product saved to ProductMaster (backend integration pending).");
  };

  return (
    <div className="manual-page-wrapper">
      <button
      onClick={() => navigate(-1)}
      className="reco-back-btn"
    >
      ← Back
    </button>
      <div className="manual-title-row">
        <h1 className="manual-page-title">Manual Entry</h1>
        <Link
          to="/app"
          className="manual-back"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="manual-layout">
        {/* LEFT PANEL — FORM */}
        <section className="manual-card">
          <h2 className="manual-section-title">Product Details</h2>

          {/* Form Fields */}
          {["productName", "weight", "length", "width", "height"].map((field) => (
            <div className="manual-field" key={field}>
              <label className="manual-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                className="manual-input"
                value={form[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="manual-field">
            <label className="manual-label">Fragility</label>
            <select
              name="fragility"
              className="manual-select"
              value={form.fragility}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="manual-field">
            <label className="manual-label">Shipping Distance</label>
            <select
              name="distance"
              className="manual-select"
              value={form.distance}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="local">Local</option>
              <option value="regional">Regional</option>
            </select>
          </div>

          <div className="manual-field">
            <label className="manual-label">Priority</label>
            <select
              name="priority"
              className="manual-select"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="cost">Cost Optimization</option>
              <option value="protection">Maximum Protection</option>
              <option value="eco">Eco-Friendly</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="manual-actions">
            <button className="btn-outline" onClick={handleReset}>
              Reset
            </button>
            <button className="btn-primary" onClick={handleApply}>
              Apply Recommendation
            </button>
          </div>

          <button className="btn-save" onClick={handleSaveProduct}>
            Save Product
          </button>
        </section>

        {/* RIGHT PANEL — AI PACKAGING OPTIONS */}
        {showResults && (
          <section className="manual-card">
            <h2 className="manual-section-title">AI Recommended Packaging</h2>

            <div className="manual-list">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={
                    "manual-option" + (selectedId === opt.id ? " selected" : "")
                  }
                  onClick={() => {
                    setSelectedId(opt.id);
                    setSelectedPackage(opt);
                    setShowCost(true);
                  }}
                >
                  <div className="manual-option-header">
                    <span>{opt.name}</span>
                    <span className="manual-tag">{opt.tag}</span>
                  </div>
                  <p className="manual-option-body">{opt.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* COST ESTIMATION CARD */}
      {showCost && selectedPackage && (
        <section className="cost-card">
          <h3 className="cost-title">Cost Estimation Summary</h3>

          <div className="cost-row">
            <span>Box Cost</span>
            <strong>₹{selectedPackage.boxCost}</strong>
          </div>

          <div className="cost-row">
            <span>Protective Material</span>
            <strong>₹{selectedPackage.protectiveCost}</strong>
          </div>

          <div className="cost-row">
            <span>Estimated Shipping</span>
            <strong>₹{selectedPackage.shippingCost}</strong>
          </div>

          <div className="cost-total">
            <span>Total Cost</span>
            <strong>
              ₹
              {selectedPackage.boxCost +
                selectedPackage.protectiveCost +
                selectedPackage.shippingCost}
            </strong>
          </div>

          <button className="btn-primary">Save Packaging</button>
        </section>
      )}
    </div>
  );
}

export default ManualEntry;
