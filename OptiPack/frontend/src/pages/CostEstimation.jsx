import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/cost-estimation.css";

function CostEstimation() {
  const [form, setForm] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    material: "",
    distance: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm({
      weight: "",
      length: "",
      width: "",
      height: "",
      material: "",
      distance: "",
    });
    setResult("");
  };

  const handleEstimate = () => {
    // simple front-end only "fake" estimate
    if (!form.weight || !form.length || !form.width || !form.height) {
      alert("Please fill at least weight and all dimensions.");
      return;
    }

    // Dummy logic just to show some change
    const base = 50;
    const w = parseFloat(form.weight) || 0;
    const volume =
      (parseFloat(form.length) || 0) *
      (parseFloat(form.width) || 0) *
      (parseFloat(form.height) || 0);

    const estimated = base + w * 2 + volume * 0.0001;

    setResult(`₹ ${estimated.toFixed(2)} (placeholder estimate)`);
  };

  return (
    <div className="cost-page-wrapper">
      <div className="cost-title-row">
        <h1 className="cost-page-title">Cost Estimation</h1>
        <Link
          to="/dashboard"
          style={{ fontSize: 13, color: "#4f46e5", textDecoration: "none" }}
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="cost-layout">
        {/* Left: Input form */}
        <section className="cost-card">
          <h2 className="cost-section-title">Package Inputs</h2>

          <div className="cost-grid">
            <div className="cost-field">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                className="cost-input"
                placeholder="e.g., 2.5"
                value={form.weight}
                onChange={handleChange}
              />
            </div>

            <div className="cost-field">
              <label>Length (cm)</label>
              <input
                type="number"
                name="length"
                className="cost-input"
                placeholder="e.g., 30"
                value={form.length}
                onChange={handleChange}
              />
            </div>

            <div className="cost-field">
              <label>Width (cm)</label>
              <input
                type="number"
                name="width"
                className="cost-input"
                placeholder="e.g., 20"
                value={form.width}
                onChange={handleChange}
              />
            </div>

            <div className="cost-field">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                className="cost-input"
                placeholder="e.g., 15"
                value={form.height}
                onChange={handleChange}
              />
            </div>

            <div className="cost-field">
              <label>Material Type</label>
              <select
                name="material"
                className="cost-select"
                value={form.material}
                onChange={handleChange}
              >
                <option value="">Select material</option>
                <option value="corrugated">Corrugated Box</option>
                <option value="plastic">Plastic Container</option>
                <option value="metal">Metal Box</option>
                <option value="eco">Eco-friendly (Recycled)</option>
              </select>
            </div>

            <div className="cost-field">
              <label>Shipping Distance</label>
              <select
                name="distance"
                className="cost-select"
                value={form.distance}
                onChange={handleChange}
              >
                <option value="">Select distance</option>
                <option value="local">Local</option>
                <option value="regional">Regional</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>

          <div className="cost-actions">
            <button
              type="button"
              className="cost-btn-outline"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="cost-btn-primary"
              onClick={handleEstimate}
            >
              Estimate Cost
            </button>
          </div>
        </section>

        {/* Right: Result */}
        <section className="cost-result-card">
          <h2 className="cost-result-title">Estimated Packaging Cost</h2>

          <div className="cost-result-box">
            {result ? (
              <>
                <div className="cost-result-value">{result}</div>
                <div className="cost-note">
                  This is a UI-only placeholder estimation for demo purposes. 
                  Real calculations would come from the backend.
                </div>
              </>
            ) : (
              <div className="cost-note">
                Fill in the details and click{" "}
                <strong>&quot;Estimate Cost&quot;</strong> to see a sample
                cost.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CostEstimation;
