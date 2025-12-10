import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/product-details.css";

const MOCK_AI_RESULT = {
  name: "Premium Wireless Headphones",
  quantity: 1,
  dimensions: "20cm x 15cm x 10cm",
  weight: "0.25 kg",
  fragility: "Fragile",
  category: "Electronics",
  recommendedBox: "BX-001-MED (Medium)",
  protectiveMaterial: "Bubble Wrap (2 layers)",
  vehicle: "Mini-Van",
  boxDimensions: "25cm x 20cm x 15cm",
  layers: 2,
  damageRisk: "2%",
  confidence: "98%",
  alternatives: [
    { code: "BX-002-SMALL (Small)", material: "Foam Sheets", diff: "4%" },
    { code: "BX-003-LARGE (Large)", material: "Thermocol Inserts", diff: "3%" },
  ],
};

function ProductDetails() {
  const [file, setFile] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreviewName(selected.name);
    setError("");
  }

  async function handleAnalyze() {
    if (!file) {
      setError("Please select a product image first.");
      return;
    }
    setError("");
    setIsAnalyzing(true);

    try {
      // TODO: replace with real backend call later
      await new Promise((r) => setTimeout(r, 1500));
      setProduct(MOCK_AI_RESULT);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

 function handleGoToCost() {
  navigate("/ai-cost-estimation", { state: { product } });
}

  function handleOverride() {
    navigate("/manual-override", { state: { product } });
  }

  return (
    <div className="pd-page">
      <header className="pd-header">
        <span className="pd-header-title">Product Image Upload</span>
        <div className="pd-logo">OptiPack</div>
        <button className="pd-menu-btn">≡</button>
      </header>

      <main className="pd-main">
        {/* Upload Section */}
        <section className="pd-upload-card">
          <h2 className="pd-title">Upload Product Image for Analysis</h2>
          <p className="pd-subtitle">
            Upload or capture a photo of the product. AI will automatically
            detect product type and estimate dimensions.
          </p>

          <label className="pd-dropzone">
            <div className="pd-camera-icon">📷</div>
            <p className="pd-drop-main">
              {previewName || "Upload or capture a photo of the product"}
            </p>
            <p className="pd-drop-sub">Click here to select an image</p>
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </label>

          {error && <p className="pd-error">{error}</p>}

          <button
            className="btn-primary pd-analyze-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing with AI..." : "Analyze Product Image"}
          </button>
        </section>

        {/* AI Result Section */}
        {product && (
          <section className="pd-result-grid">
            {/* Product Summary */}
            <div className="pd-panel">
              <h3 className="pd-panel-title">Product Summary</h3>
              <ul className="pd-summary-list">
                <li>
                  <span>Product Name</span>
                  <strong>{product.name}</strong>
                </li>
                <li>
                  <span>Quantity</span>
                  <strong>{product.quantity}</strong>
                </li>
                <li>
                  <span>Dimensions (L×W×H)</span>
                  <strong>{product.dimensions}</strong>
                </li>
                <li>
                  <span>Weight</span>
                  <strong>{product.weight}</strong>
                </li>
                <li>
                  <span>Fragility Level</span>
                  <strong>{product.fragility}</strong>
                </li>
                <li>
                  <span>Category</span>
                  <strong>{product.category}</strong>
                </li>
              </ul>

              <h4 className="pd-alt-title">Alternative Options</h4>
              <div className="pd-alt-list">
                {product.alternatives.map((alt) => (
                  <div key={alt.code} className="pd-alt-card">
                    <div className="pd-alt-top">
                      <span className="pd-alt-code">{alt.code}</span>
                      <span className="pd-alt-diff">{alt.diff}</span>
                    </div>
                    <p className="pd-alt-material">{alt.material}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommended Packaging */}
            <div className="pd-panel">
              <div className="pd-panel-header">
                <h3 className="pd-panel-title">AI Recommended Packaging</h3>
                <span className="pd-badge">AI Recommended</span>
              </div>

              <div className="pd-rec-rows">
                <div className="pd-row">
                  <span>Recommended Box</span>
                  <strong>{product.recommendedBox}</strong>
                </div>
                <div className="pd-row">
                  <span>Protective Material</span>
                  <strong>{product.protectiveMaterial}</strong>
                </div>
                <div className="pd-row">
                  <span>Recommended Vehicle</span>
                  <strong>{product.vehicle}</strong>
                </div>
                <div className="pd-row">
                  <span>Box Dimensions</span>
                  <strong>{product.boxDimensions}</strong>
                </div>
                <div className="pd-row">
                  <span>Packaging Layers</span>
                  <strong>{product.layers}</strong>
                </div>
                <div className="pd-row">
                  <span>Damage Risk Score</span>
                  <strong className="pd-danger">{product.damageRisk}</strong>
                </div>
                <div className="pd-row">
                  <span>AI Confidence Score</span>
                  <strong className="pd-link">{product.confidence}</strong>
                </div>
              </div>

              <div className="pd-actions">
                <button className="btn-primary" onClick={handleGoToCost}>
                  Proceed to Cost Estimation
                </button>
                <button className="pd-secondary-btn" onClick={handleOverride}>
                  Override Manually
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="pd-footer">
        © 2025 OptiPack. All rights reserved.
      </footer>
    </div>
  );
}

export default ProductDetails;
