import { useEffect, useState } from "react";
import "../styles/settings.css";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [notifications, setNotifications] = useState(true);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("optipack_settings") || "{}");
    if (saved.notifications !== undefined) setNotifications(!!saved.notifications);
  }, []);

  async function handleSaveSettings() {
    // Payload now only sends userId and notifications
    const payload = { userId: parseInt(userId), notifications };
    try {
      const response = await fetch(`https://localhost:49331/api/Auth/save-settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.setItem("optipack_settings", JSON.stringify(payload));
        alert("Settings synced successfully.");
      }
    } catch (err) {
      alert("Error saving settings.");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwdMsg("");

    if (newPwd !== confirmPwd) {
      setPwdMsg("Error: Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:49331/api/Auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(userId),
          currentPassword: currentPwd,
          newPassword: newPwd
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPwdMsg("Success: Password updated!");
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
      } else {
        setPwdMsg(`Error: ${data.message}`);
      }
    } catch (err) {
      setPwdMsg("Error: Server unreachable.");
    }
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p className="subtitle">Manage preferences and security</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/app")}>← Back</button>
      </div>

      <div className="settings-grid">
        <section className="settings-card">
          <div className="card-header"><h2>General</h2></div>
          <div className="card-body">
            <div className="setting-item">
              <div className="setting-info">
                <label>Notifications</label>
                <p>Receive inventory alerts</p>
              </div>
              <button className={`custom-toggle ${notifications ? "on" : "off"}`} onClick={() => setNotifications(!notifications)}>
                <span className="toggle-slider" />
              </button>
            </div>
            {/* Theme section removed from here */}
          </div>
          <div className="card-footer">
            <button className="save-btn" onClick={handleSaveSettings}>Save Settings</button>
          </div>
        </section>

        <section className="settings-card">
          <div className="card-header"><h2>Security</h2></div>
          <form className="card-body pwd-form" onSubmit={handleChangePassword}>
            <div className="input-group">
              <label>Current Password</label>
              <input type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
            </div>
            <div className="input-group">
              <label>New Password</label>
              <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
            </div>
            {pwdMsg && <div className={`status-msg ${pwdMsg.includes("Success") ? "success" : "error"}`}>{pwdMsg}</div>}
            <div className="form-actions">
              <button type="submit" className="change-pwd-btn">Change Password</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Settings;






















/*import { useEffect, useState } from "react";
import "../styles/settings.css";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("system");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("optipack_settings") || "{}");
    if (saved.notifications !== undefined) setNotifications(!!saved.notifications);
    if (saved.theme) {
      setTheme(saved.theme);
      applyTheme(saved.theme);
    }
  }, []);

  function applyTheme(value) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (value === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(value);
    }
  }

  async function handleSaveSettings() {
    const payload = { userId: parseInt(userId), notifications, theme };
    try {
      const response = await fetch(`https://localhost:49331/api/Auth/save-settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        applyTheme(theme);
        localStorage.setItem("optipack_settings", JSON.stringify(payload));
        alert("Settings synced successfully.");
      }
    } catch (err) {
      alert("Error saving settings.");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwdMsg("");

    if (newPwd !== confirmPwd) {
      setPwdMsg("Error: Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:49331/api/Auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(userId),
          currentPassword: currentPwd,
          newPassword: newPwd
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPwdMsg("Success: Password updated!");
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
      } else {
        setPwdMsg(`Error: ${data.message}`);
      }
    } catch (err) {
      setPwdMsg("Error: Server unreachable.");
    }
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p className="subtitle">Manage preferences and security</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/app")}>← Back</button>
      </div>

      <div className="settings-grid">
        <section className="settings-card">
          <div className="card-header"><h2>General</h2></div>
          <div className="card-body">
            <div className="setting-item">
              <div className="setting-info">
                <label>Notifications</label>
                <p>Receive inventory alerts</p>
              </div>
              <button className={`custom-toggle ${notifications ? "on" : "off"}`} onClick={() => setNotifications(!notifications)}>
                <span className="toggle-slider" />
              </button>
            </div>
            <div className="setting-item vertical">
              <label>Theme</label>
              <div className="theme-selector">
                {["system", "light", "dark"].map((t) => (
                  <label key={t} className={`theme-tab ${theme === t ? "active" : ""}`}>
                    <input type="radio" name="theme" value={t} checked={theme === t} onChange={() => setTheme(t)} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="save-btn" onClick={handleSaveSettings}>Save Settings</button>
          </div>
        </section>

        <section className="settings-card">
          <div className="card-header"><h2>Security</h2></div>
          <form className="card-body pwd-form" onSubmit={handleChangePassword}>
            <div className="input-group">
              <label>Current Password</label>
              <input type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
            </div>
            <div className="input-group">
              <label>New Password</label>
              <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
            </div>
            {pwdMsg && <div className={`status-msg ${pwdMsg.includes("Success") ? "success" : "error"}`}>{pwdMsg}</div>}
            <div className="form-actions">
              <button type="submit" className="change-pwd-btn">Change Password</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Settings;*/