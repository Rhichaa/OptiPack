import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/manual-entry.css";

function ManualEntry() {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    category: "",
    fragilityLevel: "",
    weightKg: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
  });

  /* ---------------- MOCK AI OPTIONS ---------------- */
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

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    if (
      !form.productName ||
      !form.category ||
      !form.fragilityLevel ||
      !form.weightKg ||
      !form.lengthCm ||
      !form.widthCm ||
      !form.heightCm
    ) {
      alert("⚠️ Please fill all product details before applying recommendation.");
      return;
    }

    setShowResults(true);
    setShowCost(false);
    setSelectedId(null);
  };

  const handleReset = () => {
    setShowResults(false);
    setShowCost(false);
    setSelectedId(null);
    setSelectedPackage(null);

    setForm({
      productName: "",
      category: "",
      fragilityLevel: "",
      weightKg: "",
      lengthCm: "",
      widthCm: "",
      heightCm: "",
    });
  };

  const handleSaveProduct = async () => {
    if (
      !form.productName ||
      !form.category ||
      !form.fragilityLevel ||
      !form.weightKg ||
      !form.lengthCm ||
      !form.widthCm ||
      !form.heightCm
    ) {
      alert("⚠️ Please fill all product details before saving.");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:49331/api/manual-products/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: form.productName,
            category: form.category,
            fragilityLevel: form.fragilityLevel,
            weightKg: Number(form.weightKg),
            lengthCm: Number(form.lengthCm),
            widthCm: Number(form.widthCm),
            heightCm: Number(form.heightCm),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Save failed");
      }

      const data = await response.json();
      alert(`✅ Product saved successfully (ID: ${data.id})`);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save product");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="manual-page-wrapper">
      <button onClick={() => navigate(-1)} className="reco-back-btn">
        ← Back
      </button>

      <div className="manual-title-row">
        <h1 className="manual-page-title">Manual Entry</h1>
        <Link to="/app" className="manual-back">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="manual-layout">
        {/* LEFT PANEL */}
        <section className="manual-card">
          <h2 className="manual-section-title">Product Details</h2>

          <div className="manual-field">
            <label className="manual-label">Product Name</label>
            <input
              type="text"
              name="productName"
              className="manual-input"
              value={form.productName}
              onChange={handleChange}
            />
          </div>

          <div className="manual-field">
            <label className="manual-label">Category</label>
            <input
              type="text"
              name="category"
              className="manual-input"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="manual-field">
            <label className="manual-label">Weight (Kg)</label>
            <input
              type="number"
              name="weightKg"
              className="manual-input"
              value={form.weightKg}
              onChange={handleChange}
            />
          </div>

          <div className="manual-field">
            <label className="manual-label">Length (Cm)</label>
            <input
              type="number"
              name="lengthCm"
              className="manual-input"
              value={form.lengthCm}
              onChange={handleChange}
            />
          </div>

          <div className="manual-field">
            <label className="manual-label">Width (Cm)</label>
            <input
              type="number"
              name="widthCm"
              className="manual-input"
              value={form.widthCm}
              onChange={handleChange}
            />
          </div>

          <div className="manual-field">
            <label className="manual-label">Height (Cm)</label>
            <input
              type="number"
              name="heightCm"
              className="manual-input"
              value={form.heightCm}
              onChange={handleChange}
            />
          </div>

          <div className="manual-field">
            <label className="manual-label">Fragility</label>
            <select
              name="fragilityLevel"
              className="manual-select"
              value={form.fragilityLevel}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

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

        {/* RIGHT PANEL */}
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