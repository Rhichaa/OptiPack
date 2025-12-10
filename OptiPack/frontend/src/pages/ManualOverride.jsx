import { useLocation, useNavigate } from "react-router-dom";

function ManualOverride() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  function handleSubmit(e) {
    e.preventDefault();
    // later: send this data to backend
    alert("Manual override saved. (You can now go to cost estimation.)");
    navigate("/cost-estimation");
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
          <input className="input" placeholder="e.g. BX-001-MED" />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Protective Material</label>
          <input className="input" placeholder="e.g. Foam sheets" />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Box Dimensions</label>
          <input
            className="input"
            placeholder="e.g. 25cm x 20cm x 15cm"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Packaging Layers</label>
          <input className="input" type="number" min="1" />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Damage Risk Score (%)</label>
          <input className="input" type="number" min="0" max="100" />
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%" }}>
          Save Manual Override
        </button>
      </form>

      <button
        style={{ marginTop: "12px" }}
        onClick={() => navigate("/product-details")}
      >
        ← Cancel and go back
      </button>
    </div>
  );
}

export default ManualOverride;
