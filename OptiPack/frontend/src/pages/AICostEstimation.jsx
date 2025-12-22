import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import "../styles/ai-cost-estimation.css";

function formatINR(value) {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function AICostEstimation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const stateProduct = location.state?.product;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://localhost:49331/api/inventory");
        if (response.ok) {
          const data = await response.json();
          setInventory(data);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const calculation = useMemo(() => {
    if (!stateProduct || inventory.length === 0) return null;

    const findItem = (id) => inventory.find(i => i.materialId?.toLowerCase() === id?.toLowerCase() || i.materialName?.toLowerCase() === id?.toLowerCase());

    const boxItem = findItem(stateProduct.recommendedBox);
    const materialItem = findItem(stateProduct.protectiveMaterial);

    const boxUnitPrice = boxItem ? boxItem.cost : 0;
    const materialUnitPrice = materialItem ? materialItem.cost : 0;
    
    const boxTotal = boxUnitPrice * quantity;
    const materialTotal = materialUnitPrice * quantity;
    const labor = 15 * quantity; 
    const shipping = 50 * quantity; 

    return {
      boxCost: boxTotal,
      protectiveCost: materialTotal,
      laborCost: labor,
      shippingCost: shipping,
      total: boxTotal + materialTotal + labor + shipping
    };
  }, [stateProduct, inventory, quantity]);

  const handleConfirm = async () => {
    if (!calculation || !stateProduct) return;

    // Payload updated to include Weight and Dimensions for History
    const historyData = {
      ProductName: stateProduct.name,
      ProductId: 0, 
      BoxUsed: stateProduct.recommendedBox,
      ProtectiveMaterials: stateProduct.protectiveMaterial, 
      Cost: Number(calculation.total.toFixed(2)),
      AiUsed: stateProduct.aiUsed || "Yes",
      PackedAt: new Date().toISOString() 
    };

    try {
      const response = await fetch("https://localhost:49331/api/History/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyData),
      });

      if (response.ok) {
        alert(`Packaging record for ${stateProduct.name} saved successfully!`);
        navigate("/app/history"); 
      } else {
        const errorMsg = await response.text();
        console.error("Server Error:", errorMsg);
        alert("Failed to save to history. Check console for details."); 
      }
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  if (!stateProduct) {
    return (
      <div className="ai-cost-page">
        <h2>No product data found. Please analyze an image first.</h2>
        <button onClick={() => navigate("/app/product-details")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="ai-cost-page">
      <div className="ai-cost-header-row">
        <h1 className="ai-cost-title">Cost Estimation</h1>
        <button className="ai-cost-back-link" onClick={() => navigate("/app/product-details")}>
          ← Back to Analysis
        </button>
      </div>

      <section className="ai-card ai-summary-card">
        <h2 className="ai-section-title">Product &amp; Packaging Summary</h2>
        <div className="ai-summary-grid">
          <div className="ai-summary-col">
            <div className="ai-summary-item">
              <span>Product Name:</span>
              <strong>{stateProduct.name}</strong>
            </div>
            <div className="ai-summary-item">
              <span>Dimensions:</span>
              <strong>{stateProduct.dimensions}</strong>
            </div>
            <div className="ai-summary-item">
              <span>Weight:</span>
              <strong>{stateProduct.weight}</strong>
            </div>
            <div className="ai-summary-item">
              <span>Quantity to Pack:</span>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="ai-quantity-input"
                style={{ width: '80px', marginLeft: '10px', padding: '4px' }}
              />
            </div>
          </div>

          <div className="ai-summary-col">
            <div className="ai-summary-item">
              <span>Selected Box:</span>
              <strong>{stateProduct.recommendedBox}</strong>
            </div>
            <div className="ai-summary-item">
              <span>Protective Material:</span>
              <strong>{stateProduct.protectiveMaterial}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-card ai-breakdown-card">
        <h2 className="ai-section-title">Cost Breakdown</h2>
        <div className="ai-table">
          <div className="ai-table-header">
            <span>Item</span>
            <span>Cost</span>
          </div>
          <div className="ai-table-row">
            <span>Box Cost ({stateProduct.recommendedBox} × {quantity})</span>
            <span>{calculation ? formatINR(calculation.boxCost) : "Loading..."}</span>
          </div>
          <div className="ai-table-row">
            <span>Protective Material ({stateProduct.protectiveMaterial} × {quantity})</span>
            <span>{calculation ? formatINR(calculation.protectiveCost) : "Loading..."}</span>
          </div>
          <div className="ai-table-row">
            <span>Total Labor Cost</span>
            <span>{calculation ? formatINR(calculation.laborCost) : "Loading..."}</span>
          </div>
          <div className="ai-table-row">
            <span>Total Shipping Estimate</span>
            <span>{calculation ? formatINR(calculation.shippingCost) : "Loading..."}</span>
          </div>
        </div>

        <div className="ai-total-box">
          <div className="ai-total-label">Total Estimated Packaging Cost</div>
          <div className="ai-total-value">
            {calculation ? formatINR(calculation.total) : "₹0"}
          </div>
        </div>
      </section>

      <div className="ai-footer-actions">
        <button className="ai-primary-btn" onClick={handleConfirm}>
          Confirm &amp; Save Configuration
        </button>
        {!stateProduct.isManual && (
          <button 
            className="ai-primary-btn" 
            style={{ marginLeft: '10px', backgroundColor: '#6c757d' }} 
            onClick={() => navigate("/app/manual-override", { state: { product: stateProduct } })}
          >
            Manual Override
          </button>
        )}
      </div>
    </div>
  );
}

export default AICostEstimation;