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
  
  // New state for dynamic quantity
  const [quantity, setQuantity] = useState(1);
  
  // 1. Get the real AI product data from ProductDetails
  const stateProduct = location.state?.product;

  // 2. Fetch Inventory for live pricing
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://localhost:49331/api/inventory");
        if (response.ok) {
          const data = await response.json();
          setInventory(data);
        }
      } catch (error) {
        console.error("Error fetching inventory for pricing:", error);
      }
    };
    fetchInventory();
  }, []);

  // 3. Logic to match AI recommendations with Inventory costs
  const calculation = useMemo(() => {
    if (!stateProduct || inventory.length === 0) return null;

    // Match recommendation name with inventory materialName
    const boxItem = inventory.find(i => 
      i.materialName.toLowerCase() === stateProduct.recommendedBox.toLowerCase()
    );

    const materialItem = inventory.find(i => 
      i.materialName.toLowerCase() === stateProduct.protectiveMaterial.toLowerCase()
    );

    const boxUnitPrice = boxItem ? boxItem.cost : 0;
    const materialUnitPrice = materialItem ? materialItem.cost : 0;
    
    // Calculate totals based on the dynamic quantity state
    const boxTotal = boxUnitPrice * quantity;
    const materialTotal = materialUnitPrice * quantity;
    const labor = 15 * quantity; // Assuming ₹15 labor per unit
    const shipping = 50 * quantity; // Assuming ₹50 shipping per unit

    return {
      boxCost: boxTotal,
      protectiveCost: materialTotal,
      laborCost: labor,
      shippingCost: shipping,
      total: boxTotal + materialTotal + labor + shipping
    };
  }, [stateProduct, inventory, quantity]); // recalculates when quantity changes

  if (!stateProduct) {
    return <div className="ai-cost-page"><h2>No product data found. Please analyze an image first.</h2></div>;
  }

  return (
    <div className="ai-cost-page">
      <div className="ai-cost-header-row">
        <h1 className="ai-cost-title">Cost Estimation</h1>
        <button className="ai-cost-back-link" onClick={() => navigate("/app/product-details")}>
          ← Back to Analysis
        </button>
      </div>

      {/* Product & Packaging Summary */}
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
            {/* NEW QUANTITY INPUT FIELD */}
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

      {/* Cost Breakdown */}
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
        <button className="ai-primary-btn" onClick={() => {
           alert(`Packaging cost for ${quantity} units saved!`);
           navigate("/app/inventory");
        }}>
          Confirm &amp; Save Configuration
        </button>
      </div>
    </div>
  );
}

export default AICostEstimation;