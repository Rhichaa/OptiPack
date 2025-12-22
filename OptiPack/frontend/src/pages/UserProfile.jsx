import { useState, useEffect } from "react";
import "../styles/userprofile.css";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    joinedDate: "",
    lastLogin: ""
  });

  // ROOT CAUSE FIX: Check if the ID actually exists in storage
  const storedId = localStorage.getItem("userId");
  const userId = storedId || 1; 

  useEffect(() => {
    console.log("Fetching profile for ID:", userId); // Debug this in your console!
    
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:49331/api/User/${userId}`);
        if (response.ok) {
          const data = await response.json();
          // Map PascalCase from C# to camelCase for React state
          setUserData({
            fullName: data.fullName || data.FullName || "",
            email: data.email || data.Email || "",
            phone: data.phone || data.Phone || "",
            joinedDate: data.createdAt || data.CreatedAt || "N/A",
            lastLogin: data.lastLogin || data.LastLogin || "N/A"
          });
        } else {
            console.error("Profile fetch failed with status:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (isEditing) {
      setIsSaving(true);
      try {
        const response = await fetch(`https://localhost:49331/api/User/${userId}/edit`, {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            FullName: userData.fullName,
            Phone: userData.phone,
            Email: userData.email // Sent to backend update model
          }),
        });

        if (response.ok) {
          alert("Profile updated successfully!");
          setIsEditing(false);
        } else {
          alert(`Server rejected update: ${response.status}`);
        }
      } catch (error) {
        alert("Cannot connect to server.");
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  if (loading) return <div className="profile-wrapper">Loading Profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-header-card">
        <div className="profile-avatar">
          {userData.fullName ? userData.fullName[0].toUpperCase() : "U"}
        </div>
        <div className="profile-header-info">
          <h2 className="profile-name">{userData.fullName}</h2>
          <p className="profile-email">{userData.email}</p>
          <p className="profile-phone">{userData.phone}</p>
        </div>
        <button 
          className={isEditing ? "save-profile-btn" : "edit-profile-btn"} 
          onClick={handleEditSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : (isEditing ? "Save Profile" : "Edit Profile")}
        </button>
      </div>

      <div className="section-card">
        <h3 className="section-title">Personal Information</h3>
        
        {/* Full Name */}
        <div className="info-row">
          <span className="info-label">Full Name</span>
          {isEditing ? (
            <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} className="profile-input" />
          ) : (
            <span className="info-value">{userData.fullName}</span>
          )}
        </div>

        {/* Email - Now editable */}
        <div className="info-row">
          <span className="info-label">Email</span>
          {isEditing ? (
            <input type="email" name="email" value={userData.email} onChange={handleChange} className="profile-input" />
          ) : (
            <span className="info-value">{userData.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="info-row">
          <span className="info-label">Phone Number</span>
          {isEditing ? (
            <input type="text" name="phone" value={userData.phone} onChange={handleChange} className="profile-input" />
          ) : (
            <span className="info-value">{userData.phone}</span>
          )}
        </div>

        {/* Read-only details preserved from state */}
        <div className="info-row">
          <span className="info-label">Joined Date</span>
          <span className="info-value gray-out">{userData.joinedDate}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Last Login</span>
          <span className="info-value gray-out">{userData.lastLogin}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;