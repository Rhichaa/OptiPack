import { useState, useMemo } from "react";
import "../styles/inventory.css";

function Inventory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample packaging inventory data (boxes, foam, wraps, etc.)
  const items = [
    {
      id: "BX001",
      name: "Small Shipping Box",
      type: "Box",
      dimensions: "20 × 15 × 10 cm",
      maxWeight: "5 kg",
      stock: 150,
      cost: "$0.50",
      status: "In Stock",
    },
    {
      id: "BX002",
      name: "Medium Shipping Box",
      type: "Box",
      dimensions: "30 × 20 × 15 cm",
      maxWeight: "10 kg",
      stock: 50,
      cost: "$0.80",
      status: "Low Stock",
    },
    {
      id: "BX003",
      name: "Large Heavy-Duty Box",
      type: "Box",
      dimensions: "45 × 30 × 25 cm",
      maxWeight: "15 kg",
      stock: 10,
      cost: "$1.20",
      status: "Low Stock",
    },
    {
      id: "FM001",
      name: "Foam Sheets Pack",
      type: "Foam",
      dimensions: "50 × 50 cm (pack)",
      maxWeight: "-",
      stock: 30,
      cost: "$0.30",
      status: "In Stock",
    },
    {
      id: "BW001",
      name: "Bubble Wrap Roll",
      type: "Wrap",
      dimensions: "100 m × 50 cm",
      maxWeight: "-",
      stock: 0,
      cost: "$0.65",
      status: "Out of Stock",
    },
    {
      id: "TP001",
      name: "Packing Tape Roll",
      type: "Tape",
      dimensions: "50 m × 5 cm",
      maxWeight: "-",
      stock: 80,
      cost: "$0.25",
      status: "In Stock",
    },
  ];

  // Summary counts
  const totalBoxTypes = items.filter((i) => i.type === "Box").length;
  const totalProtectiveTypes = items.filter(
    (i) => i.type !== "Box"
  ).length;
  const lowStockItems = items.filter(
    (i) => i.status === "Low Stock" || i.status === "Out of Stock"
  ).length;

  // Filtered list for table
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.dimensions.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  const lowStockAlerts = lowStockItems ? lowStockItems : 0;

  return (
    <div className="inv-page">
      {/* Top header */}
      <div className="inv-header-row">
        <h1 className="inv-title">Inventory Dashboard</h1>
      </div>

      <div className="inv-main-layout">
        {/* LEFT: Low stock alerts */}
        <aside className="inv-left-panel">
          <h3 className="inv-left-title">Low Stock Alerts</h3>

          {lowStockAlerts === 0 && (
            <p className="inv-left-empty">All materials are healthy.</p>
          )}

          {items
            .filter((i) => i.status === "Low Stock" || i.status === "Out of Stock")
            .map((item) => (
              <div key={item.id} className="inv-alert-item">
                <div>
                  <div className="inv-alert-name">{item.name}</div>
                  <div className="inv-alert-meta">
                    ID: {item.id} • Stock: {item.stock}
                  </div>
                </div>
                <button className="inv-alert-link">Restock</button>
              </div>
            ))}
        </aside>

        {/* RIGHT: Main content */}
        <section className="inv-right-panel">
          {/* Summary cards */}
          <div className="inv-summary-row">
            <div className="inv-summary-card">
              <div className="inv-summary-label">Total Box Types</div>
              <div className="inv-summary-value">{totalBoxTypes}</div>
              <div className="inv-summary-sub">Current available box types</div>
            </div>

            <div className="inv-summary-card">
              <div className="inv-summary-label">Total Protective Materials</div>
              <div className="inv-summary-value">{totalProtectiveTypes}</div>
              <div className="inv-summary-sub">
                Foam, wraps, tape and others
              </div>
            </div>

            <div className="inv-summary-card">
              <div className="inv-summary-label">Low Stock Items</div>
              <div className="inv-summary-value">{lowStockItems}</div>
              <div className="inv-summary-sub">Needs attention</div>
            </div>
          </div>

          {/* Boxes Inventory heading + controls */}
          <div className="inv-section-header">
            <h2 className="inv-section-title">Packaging Inventory</h2>

            <div className="inv-controls">
              <input
                type="text"
                className="inv-search"
                placeholder="Search by box ID, name or dimensions…"
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

              <button className="inv-add-btn">+ Add New Material</button>
            </div>
          </div>

          {/* Table */}
          <div className="inv-table-wrapper">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Material ID / Name</th>
                  <th>Type</th>
                  <th>Dimensions</th>
                  <th>Max Weight</th>
                  <th>Stock</th>
                  <th>Cost / Unit</th>
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
                      <span
                        className={
                          item.status === "In Stock"
                            ? "inv-status inv-status-green"
                            : item.status === "Low Stock"
                            ? "inv-status inv-status-yellow"
                            : "inv-status inv-status-red"
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="inv-actions-cell">
                      <button className="inv-icon-btn" title="Edit">
                        ✏️
                      </button>
                      <button className="inv-icon-btn" title="Delete">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 20 }}>
                      No materials match your search / filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Inventory;
