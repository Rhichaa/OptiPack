import { useEffect, useState } from "react";
import "../styles/settings.css";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  // UI state
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("system"); // 'light' | 'dark' | 'system'
  const [themePreview, setThemePreview] = useState("system");

  // Password change fields
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("optipack_settings") || "{}");
    if (saved.notifications !== undefined) setNotifications(!!saved.notifications);
    if (saved.theme) {
      setTheme(saved.theme);
      setThemePreview(saved.theme);
      applyTheme(saved.theme);
    }
  }, []);

  // helper: apply theme to document (light/dark)
  function applyTheme(value) {
    // 'system' = remove explicit class; let OS/browser decide
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    if (value === "light") root.classList.add("theme-light");
    else if (value === "dark") root.classList.add("theme-dark");
  }

  // Save settings to localStorage (replace with API call later)
  function handleSaveSettings() {
    const payload = { notifications, theme };
    localStorage.setItem("optipack_settings", JSON.stringify(payload));
    applyTheme(theme);
    setThemePreview(theme);
    alert("Settings saved.");
    // TODO: call backend API: axios.post('/api/user/settings', payload)
  }

  function handleResetSettings() {
    setNotifications(true);
    setTheme("system");
    setThemePreview("system");
    localStorage.removeItem("optipack_settings");
    applyTheme("system");
  }

  // Password change (client-side demo; hook to API)
  async function handleChangePassword(e) {
    e.preventDefault();
    setPwdMsg("");
    if (!currentPwd || !newPwd || !confirmPwd) {
      setPwdMsg("Please fill all password fields.");
      return;
    }
    if (newPwd.length < 6) {
      setPwdMsg("New password must be at least 6 characters.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg("New password and confirm password do not match.");
      return;
    }

    // Demo response - replace with backend call
    try {
      // Example:
      // await axios.post('/api/auth/change-password', { currentPwd, newPwd });
      setPwdMsg("Password changed successfully (demo).");
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } catch (err) {
      console.error(err);
      setPwdMsg("Failed to change password. Try again.");
    }
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="settings-actions">
          <button className="btn-outline" onClick={() => navigate("/app")}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="settings-grid">
        {/* Left column: General */}
        <section className="settings-card">
          <h2>General</h2>

          <div className="setting-row">
            <label>Notifications</label>
            <div className="toggle-wrapper">
              <button
                className={`toggle ${notifications ? "on" : "off"}`}
                onClick={() => setNotifications((s) => !s)}
                aria-pressed={notifications}
              >
                <span className="toggle-knob" />
                <span className="toggle-label">{notifications ? "On" : "Off"}</span>
              </button>
            </div>
          </div>

          <div className="setting-row">
            <label>Theme / Appearance</label>
            <div className="theme-options">
              <label>
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={theme === "system"}
                  onChange={() => setTheme("system")}
                />
                System
              </label>
              <label>
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={() => setTheme("light")}
                />
                Light
              </label>
              <label>
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={() => setTheme("dark")}
                />
                Dark
              </label>
            </div>

          </div>

          <div className="settings-card-footer">
            <button className="btn-secondary" onClick={handleResetSettings}>
              Reset to Defaults
            </button>
            <button className="btn-primary" onClick={handleSaveSettings}>
              Save Settings
            </button>
          </div>
        </section>

        {/* Right column: Security */}
        <section className="settings-card">
          <h2>Security</h2>
          

          <form className="pwd-form" onSubmit={handleChangePassword}>
            <label className="form-label">Current Password</label>
            <input
              type="password"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              className="form-input"
            />

            <label className="form-label">New Password</label>
            <input
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className="form-input"
            />

            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              className="form-input"
            />

            {pwdMsg && <div className="pwd-msg">{pwdMsg}</div>}

            <div className="pwd-actions">
              <button type="button" className="btn-outline" onClick={() => {
                setCurrentPwd(""); setNewPwd(""); setConfirmPwd(""); setPwdMsg("");
              }}>
                Reset
              </button>
              <button type="submit" className="btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Settings;
