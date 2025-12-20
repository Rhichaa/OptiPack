import { useState, useMemo, useEffect } from "react";
import "../styles/inventory.css";

function Inventory() {
  const [items, setItems] = useState([]); 
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Modal Input States
  const [materialId, setMaterialId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [stock, setStock] = useState("");
  const [cost, setCost] = useState("");

  const API_URL = "https://localhost:49331/api/inventory";

  // 1. Fetch Real Data from Database
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item.materialId,
          name: item.materialName,
          type: item.type,
          dimensions: item.dimensions,
          maxWeight: item.maxWeight,
          stock: item.stock,
          cost: item.cost,
          status: item.status
        }));
        setItems(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 2. Summary Stats Logic
  const stats = useMemo(() => {
    const totalBox = items.filter(i => i.type === "Box").length;
    const totalProtective = items.filter(i => i.type !== "Box").length;
    const lowStock = items.filter(i => i.status !== "In Stock").length;
    return { totalBox, totalProtective, lowStock };
  }, [items]);

  // --- NEW: Restock Logic ---
  const handleRestock = async (item) => {
    const amount = prompt(`Enter quantity to add for ${item.name}:`, "100");
    if (!amount || isNaN(amount) || parseInt(amount) <= 0) return;

    const newStock = parseInt(item.stock) + parseInt(amount);

    const payload = {
      MaterialId: item.id,
      MaterialName: item.name,
      Type: item.type,
      Dimensions: item.dimensions,
      MaxWeight: String(item.maxWeight),
      Stock: newStock, // Updated stock
      Cost: parseFloat(item.cost)
    };

    try {
      const response = await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchMaterials(); // Refresh UI with new stock levels
      } else {
        alert("Failed to restock item.");
      }
    } catch (error) {
      console.error("Restock error:", error);
    }
  };

  // 3. Save / Update Logic
  const handleSave = async () => {
    if (!materialId || !name || !type || !stock || !cost) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      MaterialId: materialId,
      MaterialName: name,
      Type: type,
      Dimensions: dimensions,
      MaxWeight: String(maxWeight),
      Stock: parseInt(stock),
      Cost: parseFloat(cost)
    };

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchMaterials(); // Refresh list from DB
        closeModal();
      } else {
        const err = await response.text();
        alert("Server Error: " + err);
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // 4. Delete Logic
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this material permanently?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setMaterialId(item.id);
    setName(item.name);
    setType(item.type);
    setDimensions(item.dimensions);
    setMaxWeight(item.maxWeight);
    setStock(item.stock);
    setCost(item.cost);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setMaterialId("");
    setName("");
    setType("");
    setDimensions("");
    setMaxWeight("");
    setStock("");
    setCost("");
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchSearch = item.id.toLowerCase().includes(search.toLowerCase()) || 
                          item.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" ? true : item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  return (
    <div className="inv-page">
      <div className="inv-header-row">
        <h1 className="inv-title">Inventory Dashboard</h1>
      </div>

      <div className="inv-main-layout">
        {/* Left Panel: Alerts */}
        <aside className="inv-left-panel">
          <h3 className="inv-left-title">Low Stock Alerts</h3>
          {items.filter(i => i.status !== "In Stock").length > 0 ? (
            items.filter(i => i.status !== "In Stock").map(item => (
              <div key={item.id} className="inv-alert-item">
                <div>
                  <div className="inv-alert-name">{item.name}</div>
                  <div className="inv-alert-meta">ID: {item.id} • Stock: {item.stock}</div>
                </div>
                {/* CONNECTED RESTOCK BUTTON HERE */}
                <button 
                  className="inv-alert-link" 
                  onClick={() => handleRestock(item)}
                >
                  Restock
                </button>
              </div>
            ))
          ) : (
            <p className="inv-alert-empty">All stock levels normal</p>
          )}
        </aside>

        {/* Right Panel: Content */}
        <section className="inv-right-panel">
          <div className="inv-summary-row">
            <div className="inv-summary-card">
              <div className="inv-summary-label">Total Box Types</div>
              <div className="inv-summary-value">{stats.totalBox}</div>
            </div>
            <div className="inv-summary-card">
              <div className="inv-summary-label">Protective Materials</div>
              <div className="inv-summary-value">{stats.totalProtective}</div>
            </div>
            <div className="inv-summary-card">
              <div className="inv-summary-label">Low Stock Items</div>
              <div className="inv-summary-value">{stats.lowStock}</div>
            </div>
          </div>

          <div className="inv-section-header">
            <h2 className="inv-section-title">Packaging Inventory</h2>
            <div className="inv-controls">
              <input 
                className="inv-search" 
                placeholder="Search by ID or name..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
              <select 
                className="inv-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <button className="inv-add-btn" onClick={() => setShowModal(true)}>+ Add New Material</button>
            </div>
          </div>

          <div className="inv-table-wrapper">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Material ID / Name</th>
                  <th>Type</th>
                  <th>Dimensions</th>
                  <th>Max Weight</th>
                  <th>Stock</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="inv-main-cell">
                        <div className="inv-main-id">{item.id}</div>
                        <div className="inv-main-name">{item.name}</div>
                      </div>
                    </td>
                    <td>{item.type}</td>
                    <td>{item.dimensions}</td>
                    <td>{item.maxWeight}</td>
                    <td>{item.stock}</td>
                    <td>{item.cost}</td>
                    <td>
                      <span className={`inv-status ${
                        item.status === 'In Stock' ? 'inv-status-green' : 
                        item.status === 'Low Stock' ? 'inv-status-yellow' : 'inv-status-red'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="inv-actions-cell">
                      <button className="inv-icon-btn" onClick={() => handleEditClick(item)}>✏️</button>
                      <button className="inv-icon-btn" onClick={() => handleDelete(item.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingId ? "Edit Material" : "Add New Material"}</h2>
              <div className="modal-grid">
                <input placeholder="Material ID" value={materialId} disabled={editingId} onChange={(e)=>setMaterialId(e.target.value)} />
                <input placeholder="Material Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input placeholder="Type (Box, Wrap, etc.)" value={type} onChange={(e)=>setType(e.target.value)} />
                <input placeholder="Dimensions" value={dimensions} onChange={(e)=>setDimensions(e.target.value)} />
                <input placeholder="Max Weight" value={maxWeight} onChange={(e)=>setMaxWeight(e.target.value)} />
                <input placeholder="Stock Quantity" type="number" value={stock} onChange={(e)=>setStock(e.target.value)} />
                <input placeholder="Unit Cost" type="number" value={cost} onChange={(e)=>setCost(e.target.value)} />
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button className="save-btn" onClick={handleSave}>Save Material</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;