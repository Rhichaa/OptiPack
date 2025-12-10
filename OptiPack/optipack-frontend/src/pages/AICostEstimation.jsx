import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ai-cost-estimation.css";

const DEFAULT_DATA = {
  productName: "Smartwatch X-Pro",
  sku: "SWX-P-001",
  quantity: 50,
  selectedBox: "Standard Carton (10×10×8 inches)",
  boxVisual: "View Image",
  protectiveMaterial: "Bubble Wrap (2 layers)",
  materialVisual: "View Image",
  costs: {
    box: 2500,
    protective: 1250,
    labor: 750,
    shipping: 1500,
  },
};

function formatINR(value) {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function AICostEstimation() {
  const location = useLocation();
  const navigate = useNavigate();

  // if ProductDetails passed product data through state, you can use it here
  const stateProduct = location.state?.product;
  const data = DEFAULT_DATA; // for now static; later you can merge with stateProduct

  const total =
    data.costs.box +
    data.costs.protective +
    data.costs.labor +
    data.costs.shipping;

  function handleBack() {
    navigate("/recommendations"); // or "/product-details" if you prefer
  }

  function handleConfirm() {
    // later: send final cost & config to backend
    alert("Packaging cost saved (demo).");
    navigate("/dashboard");
  }

  return (
    <div className="ai-cost-page">
      <div className="ai-cost-header-row">
        <h1 className="ai-cost-title">Cost Estimation</h1>
        <button className="ai-cost-back-link" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Product & Packaging Summary */}
      <section className="ai-card ai-summary-card">
        <h2 className="ai-section-title">Product &amp; Packaging Summary</h2>

        <div className="ai-summary-grid">
          <div className="ai-summary-col">
            <div className="ai-summary-item">
              <span>Product Name:</span>
              <strong>{data.productName}</strong>
            </div>
            <div className="ai-summary-item">
              <span>SKU Code:</span>
              <strong>{data.sku}</strong>
            </div>
            <div className="ai-summary-item">
              <span>Quantity:</span>
              <strong>{data.quantity} units</strong>
            </div>
          </div>

          <div className="ai-summary-col">
            <div className="ai-summary-item">
              <span>Selected Box:</span>
              <strong>{data.selectedBox}</strong>
            </div>
            <div className="ai-summary-item">
              <span>Box Visual:</span>
              <button className="ai-link-button">{data.boxVisual}</button>
            </div>
            <div className="ai-summary-item">
              <span>Protective Material:</span>
              <strong>{data.protectiveMaterial}</strong>
              <button className="ai-link-button ai-link-inline">
                {data.materialVisual}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="ai-card ai-breakdown-card">
        <h2 className="ai-section-title">Cost Breakdown</h2>

        <div className="ai-table">
          <div className="ai-table-header">
            <span>Item</span>
            <span>Cost</span>
          </div>
          <div className="ai-table-row">
            <span>Box Cost (₹ per box × quantity)</span>
            <span>{formatINR(data.costs.box)}</span>
          </div>
          <div className="ai-table-row">
            <span>Protective Material Cost</span>
            <span>{formatINR(data.costs.protective)}</span>
          </div>
          <div className="ai-table-row">
            <span>Labor Cost</span>
            <span>{formatINR(data.costs.labor)}</span>
          </div>
          <div className="ai-table-row">
            <span>Shipping / Volumetric Weight Estimate</span>
            <span>{formatINR(data.costs.shipping)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="ai-total-box">
          <div className="ai-total-label">Total Estimated Packaging Cost</div>
          <div className="ai-total-value">{formatINR(total)}</div>
        </div>
      </section>

      {/* Additional Notes */}
      <section className="ai-card ai-notes-card">
        <h2 className="ai-section-title">Additional Notes</h2>

        <div className="ai-notes-block">
          <div className="ai-notes-label">Volumetric Weight Formula:</div>
          <div className="ai-notes-formula">
            Volumetric Weight (kg) = (Length × Width × Height in cm) / 5000
          </div>
        </div>

        <div className="ai-notes-block">
          <div className="ai-notes-label">Packaging Category Notes:</div>
          <ul className="ai-notes-list">
            <li>Fragile items require additional cushioning and void fill.</li>
            <li>Consider eco-friendly alternatives for bulk orders.</li>
            <li>Optimize box dimensions to reduce shipping costs.</li>
          </ul>
        </div>
      </section>

      {/* Footer Buttons */}
      <div className="ai-footer-actions">
        <button className="ai-secondary-btn" onClick={handleBack}>
          Back to Recommendation
        </button>
        <button className="ai-primary-btn" onClick={handleConfirm}>
          Confirm &amp; Save Packaging Cost
        </button>
      </div>
    </div>
  );
}

export default AICostEstimation;
