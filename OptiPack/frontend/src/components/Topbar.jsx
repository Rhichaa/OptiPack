export default function Topbar({ title }) {
  return (
    <header className="topbar">
      <h2 className="topbar-title">{title}</h2>
      <div className="topbar-right">
        <span className="topbar-icon">🔔</span>
        <span className="topbar-icon">👤</span>
      </div>
    </header>
  );
}
