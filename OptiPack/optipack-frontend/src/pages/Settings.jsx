import "../styles/settings.css";

function Settings() {
  return (
    <div className="settings-wrapper">
      <h1 className="settings-title">Settings</h1>

      {/* Profile Settings */}
      <div className="settings-card">
        <h2 className="settings-section-title">Profile Information</h2>

        <div className="settings-row">
          <label className="settings-label">Full Name</label>
          <input
            type="text"
            className="settings-input"
            placeholder="John Doe"
          />
        </div>

        <div className="settings-row">
          <label className="settings-label">Email Address</label>
          <input
            type="email"
            className="settings-input"
            placeholder="user@example.com"
          />
        </div>
      </div>

      {/* Account Settings */}
      <div className="settings-card">
        <h2 className="settings-section-title">Account Settings</h2>

        <div className="settings-row">
          <label className="settings-label">Change Password</label>
          <input
            type="password"
            className="settings-input"
            placeholder="New password"
          />
        </div>

        <div className="settings-row">
          <label className="settings-label">Confirm Password</label>
          <input
            type="password"
            className="settings-input"
            placeholder="Confirm new password"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-card">
        <h2 className="settings-section-title">Notifications</h2>

        <div className="settings-toggle-row">
          <label>Email Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="settings-toggle-row">
          <label>Package Status Alerts</label>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="settings-toggle-row">
          <label>AI Recommendation Alerts</label>
          <input type="checkbox" />
        </div>
      </div>

      {/* Theme */}
      <div className="settings-card">
        <h2 className="settings-section-title">Appearance</h2>

        <div className="settings-toggle-row">
          <label>Dark Mode </label>
          <input type="checkbox" disabled />
        </div>
      </div>

      {/* Save Button */}
      <button className="btn-primary settings-save-btn">Save Changes</button>
    </div>
  );
}

export default Settings;
