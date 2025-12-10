import { useState, useRef } from "react";
import "../styles/packages.css";
import { Link, useNavigate } from "react-router-dom";

function Packages() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Handle file upload
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Reset all fields
  const handleReset = () => {
    setImage(null);
    setName("");
    setCategory("");
    setWeight("");
    setDimensions("");
  };

  // Save
  const handleSave = () => {
    alert("Package saved (frontend only)");
  };

  // Next Step
  const handleNext = () => {
    navigate("/product-analysis");
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Packages</h1>

      <div className="packages-layout">
        {/* Left: Upload section */}
        <section className="upload-card">
          <h2 className="section-title">Upload Product Image</h2>

          <div className="upload-dropzone">
            {image ? (
              <img src={image} alt="preview" className="uploaded-preview" />
            ) : (
              <>
                <div className="upload-icon">📤</div>
                <div>Drag & drop image here</div>
                <div>or</div>
                <button
                  type="button"
                  className="upload-button"
                  onClick={handleBrowseClick}
                >
                  Browse Files
                </button>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </section>

        {/* Right: Package details section */}
        <section className="details-card">
          <h2 className="section-title">Package Details</h2>

          <div className="form-grid">
            <div className="form-field">
              <label>Product Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="form-field">
              <label>Category</label>
              <input
                type="text"
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </div>

            <div className="form-field">
              <label>Weight</label>
              <input
                type="text"
                className="form-input"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
              />
            </div>

            <div className="form-field">
              <label>Dimensions</label>
              <input
                type="text"
                className="form-input"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="Length x Width x Height"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={handleReset}>
              Reset
            </button>

            <button type="button" className="btn-primary" onClick={handleSave}>
              Save Package
            </button>

            <button type="button" className="btn-next" onClick={handleNext}>
              Next ➝
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Packages;
