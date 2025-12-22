import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function ManualOverride() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // Logic: Capture your manual inputs
  const [formData, setFormData] = useState({
    boxCode: "",
    protectiveMaterial: "",
    boxDimensions: "",
    layers: 1,
    damageRisk: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!product) return;

    // Logic: Pass manual data to estimation
    const manualProduct = {
      ...product,
      recommendedBox: formData.boxCode,
      protectiveMaterial: formData.protectiveMaterial,
      aiUsed: "No", // This fixes the analytics
      isManual: true
    };

    navigate("/app/ai-cost-estimation", { state: { product: manualProduct } });
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Manual Packaging Override</h1>

      {product && (
        <p style={{ marginBottom: "12px" }}>
          Overriding for product: <strong>{product.name}</strong>
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "480px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Box Code</label>
          <input name="boxCode" className="input" placeholder="e.g. BX001" onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Protective Material</label>
          <input name="protectiveMaterial" className="input" placeholder="e.g. BW001" onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Box Dimensions</label>
          <input name="boxDimensions" className="input" placeholder="e.g. 25cm x 20cm x 15cm" onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Packaging Layers</label>
          <input name="layers" className="input" type="number" min="1" onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Damage Risk Score (%)</label>
          <input name="damageRisk" className="input" type="number" min="0" max="100" onChange={handleChange} />
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%" }}>
          Proceed to Cost Estimation
        </button>
      </form>

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-start" }}>
  <button 
    className="cancel-btn" 
    onClick={() => navigate("/app/product-details")}
    style={{
      padding: "10px 18px",
      background: "transparent",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      color: "#4b5563",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s ease"
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#f9fafb";
      e.currentTarget.style.borderColor = "#9ca3af";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.borderColor = "#d1d5db";
    }}
  >
    ← Cancel and go back
  </button>
</div>
    </div>
  );
}

export default ManualOverride;