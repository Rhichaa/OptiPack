import "../styles/userprofile.css";

function UserProfile() {
  return (
    <div className="profile-wrapper">
      {/* TOP CARD */}
      <div className="profile-header-card">
        <div className="profile-avatar">UN</div>

        <div className="profile-header-info">
          <h2 className="profile-name">User Name</h2>
          <p className="profile-email">user.name@optipack.com</p>
          <p className="profile-phone">+91 xxxxxxxx</p>
        </div>

        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      {/* PERSONAL INFO */}
      <div className="section-card">
        <h3 className="section-title">Personal Information</h3>

        <div className="info-row">
          <span className="info-label">Full Name</span>
          <span className="info-value">User Name</span>
        </div>
        <div className="info-row">
          <span className="info-label">Email</span>
          <span className="info-value">user.name@optipack.com</span>
        </div>
        <div className="info-row">
          <span className="info-label">Phone Number</span>
          <span className="info-value">+91 xxxxxxxx</span>
        </div>
        <div className="info-row">
          <span className="info-label">Joined Date</span>
          <span className="info-value">February 1, 2023</span>
        </div>
        <div className="info-row">
          <span className="info-label">Last Login</span>
          <span className="info-value">April 24, 2024 at 09:00 AM</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
