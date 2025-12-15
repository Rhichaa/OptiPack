import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/product-details.css";

const CV_API = "http://localhost:49331/api";

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

    setIsAnalyzing(true);
    setError("");

    try {
      // 1️⃣ SEND IMAGE TO CV BACKEND
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(CV_API, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image analysis failed");
      }

      const data = await response.json();

      /**
       * Backend response structure:
       * {
       *   detected,
       *   dbMatchedProduct,
       *   recommendation
       * }
       */

      const db = data.dbMatchedProduct;
      const rec = data.recommendation;

      // 2️⃣ SET FINAL PRODUCT STATE
      setProduct({
        name: db.productName,
        quantity: 1,
        dimensions: $`{db.lengthCm}cm x ${db.widthCm}cm x ${db.heightCm}cm`,
        weight: $`{db.weightKg} kg`,
        fragility: db.fragilityLevel,
        category: db.category,

        recommendedBox: rec.recommendedBox,
        protectiveMaterial: rec.protectiveMaterials,
        vehicle: rec.vehicleType,
        layers: rec.packagingLayers,
        damageRisk: $`{rec.damageRiskScore}%`,
        confidence: $`{rec.aiConfidenceScore}%`,
      });
    } catch (err) {
      console.error(err);
      setError("AI analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleGoToCost() {
    navigate("/app/ai-cost-estimation", { state: { product } });
  }

  function handleOverride() {
    navigate("/app/manual-override", { state: { product } });
  }

  return (
    <div className="pd-page">
      <header className="pd-header">
        <div className="pd-logo">OptiPack</div>
      </header>

      <button onClick={() => navigate(-1)} className="pd-back-btn">
        ← Back
      </button>

      <main className="pd-main">
        <section className="pd-upload-card">
          <h2 className="pd-title">Upload Product Image for Analysis</h2>

          <label className="pd-dropzone">
            <div className="pd-camera-icon">📷</div>
            <p className="pd-drop-main">
              {previewName || "Upload or capture a photo of the product"}
            </p>
            <p className="pd-drop-sub">Click here to select an image</p>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
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

        {product && (
          <section className="pd-result-grid">
            <div className="pd-panel">
              <h3 className="pd-panel-title">Product Summary</h3>
              <ul className="pd-summary-list">
                <li><span>Product Name</span><strong>{product.name}</strong></li>
                <li><span>Dimensions</span><strong>{product.dimensions}</strong></li>
                <li><span>Weight</span><strong>{product.weight}</strong></li>
                <li><span>Fragility</span><strong>{product.fragility}</strong></li>
                <li><span>Category</span><strong>{product.category}</strong></li>
              </ul>
            </div>

            <div className="pd-panel">
              <h3 className="pd-panel-title">AI Recommended Packaging</h3>
              <div className="pd-row"><span>Box</span><strong>{product.recommendedBox}</strong></div>
              <div className="pd-row"><span>Material</span><strong>{product.protectiveMaterial}</strong></div>
              <div className="pd-row"><span>Vehicle</span><strong>{product.vehicle}</strong></div>
              <div className="pd-row"><span>Layers</span><strong>{product.layers}</strong></div>
              <div className="pd-row"><span>Risk</span><strong>{product.damageRisk}</strong></div>
              <div className="pd-row"><span>Confidence</span><strong>{product.confidence}</strong></div>

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
    </div>
  );
}

export default ProductDetails;