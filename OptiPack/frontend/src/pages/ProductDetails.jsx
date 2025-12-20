import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/product-details.css";

// Ensure this matches your Python terminal address exactly
const CV_API = "http://127.0.0.1:5001/analyze";

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
    setProduct(null); // Reset previous results when new file is picked
  }

  async function handleAnalyze() {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    console.log("--- AI Analysis Started ---");

    try {
      const formData = new FormData();
      formData.append("image", file);

      // We use 127.0.0.1 instead of localhost to avoid IPv6 resolution issues
      const response = await fetch(CV_API, {
        method: "POST",
        body: formData,
        mode: "cors", // Explicitly enable CORS
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Backend Response Received:", data);

      const db = data.dbMatchedProduct;
      const rec = data.recommendation;

      // Map backend response to the frontend UI state
      setProduct({
        name: db ? db.productName : data.label,
        category: db ? db.category : "General",
        weight: db ? `${db.weightKg} kg` : "1.0 kg",
        dimensions: db ? `${db.lengthCm} x ${db.widthCm} x ${db.heightCm} cm` : "20 x 10 x 8 cm",
        fragility: db ? db.fragilityLevel : "Medium",
        
        recommendedBox: rec.recommendedBox,
        protectiveMaterial: rec.protectiveMaterials,
        vehicle: rec.vehicleType,
        layers: rec.packagingLayers,
        damageRisk: `${rec.damageRiskScore}%`,
        confidence: `${rec.aiConfidenceScore}%`,
      });

      console.log("UI Updated with Product Data");

    } catch (err) {
      console.error("Fetch Error:", err);
      setError(`Connection failed: ${err.message}. Ensure your Python backend is running on Port 5001.`);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleGoToCost() {
    if (!product) {
      setError("Product data missing. Please analyze again.");
      return;
    }
    navigate("/app/ai-cost-estimation", { state: { product } });
  }

  function handleOverride() {
    if (!product) {
      setError("Product data missing. Please analyze again.");
      return;
    }
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

          {error && <p className="pd-error" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <button
            className="btn-primary pd-analyze-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !file}
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