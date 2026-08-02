import React from 'react';

export default function StudentProfileSection({
  currentUser,
  setCurrentUser,
  studentDept,
  setStudentDept,
  studentSem,
  setStudentSem,
  studentBlock,
  setStudentBlock,
  studentRoom,
  setStudentRoom,
  walletBalance,
  profileAddresses,
  setProfileAddresses,
  newProfileAddress,
  setNewProfileAddress,
  orders,
  addToast,
  setLoginOpen
}) {
  return (
    <div className="student-profile-container container">
      <div className="profile-wrapper-split">
        {/* Left sidebar card */}
        <div className="profile-details-card">
          {currentUser ? (
            <div className="profile-avatar-block">
              <img 
                src={(currentUser?.avatar && !currentUser.avatar.includes('unsplash')) 
                  ? currentUser.avatar 
                  : `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(currentUser?.name || 'student')}`} 
                alt="Cartoon Bitmoji user avatar" 
                style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid var(--primary)', backgroundColor: '#f0f4ff', objectFit: 'cover', padding: '4px' }}
              />
              <span className="verified-student-badge">✓ Verified Student ID</span>
              <h3>{currentUser?.name}</h3>
              <p>Department: {studentDept} • {studentSem}</p>
              <button className="btn btn-secondary" onClick={() => {
                setCurrentUser(null);
                addToast('Logged out successfully');
              }} style={{marginTop: '0.5rem'}}>
                Logout
              </button>
            </div>
          ) : (
            <div className="profile-login-prompt" style={{textAlign: 'center', padding: '2rem'}}>
              <p>Please sign in to view your profile.</p>
              <button className="btn btn-primary" onClick={() => setLoginOpen(true)}>Sign In / Sign Up</button>
            </div>
          )}

          {/* Info Preferences forms */}
          <div className="profile-pref-form">
            <h4>Preference Setup</h4>
            
            <div className="pref-row">
              <div className="pref-group">
                <label>Hostel Block</label>
                <select value={studentBlock} onChange={(e) => setStudentBlock(e.target.value)}>
                  <option value="H-1">H-1 Block</option>
                  <option value="H-2">H-2 Block</option>
                  <option value="H-3">H-3 Block</option>
                  <option value="H-4">H-4 Block</option>
                  <option value="PG-1">PG-1 Block</option>
                </select>
              </div>
              <div className="pref-group">
                <label>Room Number</label>
                <input type="text" value={studentRoom} onChange={(e) => setStudentRoom(e.target.value)} placeholder="302" />
              </div>
            </div>

            <div className="pref-group">
              <label>Department Selection</label>
              <select value={studentDept} onChange={(e) => setStudentDept(e.target.value)}>
                <option value="Computer Science">Computer Science & Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Bio-Technology">Bio-Technology</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </div>

            <div className="pref-group">
              <label>Semester Selection</label>
              <select value={studentSem} onChange={(e) => setStudentSem(e.target.value)}>
                <option value="Semester 1">Semester 1 (Freshman)</option>
                <option value="Semester 3">Semester 3 (Sophomore)</option>
                <option value="Semester 5">Semester 5 (Junior)</option>
                <option value="Semester 7">Semester 7 (Senior)</option>
              </select>
            </div>

            <button 
              className="btn btn-primary save-pref-btn" 
              onClick={() => {
                if (currentUser) {
                  setCurrentUser({
                    ...currentUser,
                    block: studentBlock,
                    room: studentRoom,
                    dept: studentDept,
                    sem: studentSem
                  });
                }
                addToast('Profile settings saved successfully!');
              }}
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Right sidebar profile content */}
        <div className="profile-content-panel">
          {/* Wallet and balances */}
          <div className="profile-points-box">
            <div className="points-info-text">
              <h3>CampusHub Student Wallet Balance</h3>
              <p>Use student wallet points for one-tap payments on services & prints.</p>
            </div>
            <div className="points-display">
              <strong>₹{walletBalance}</strong>
              <span>Campus Wallet</span>
            </div>
          </div>

          {/* Saved Dorm Addresses */}
          <div className="profile-saved-addresses">
            <h4>Saved Delivery Locations</h4>
            <div className="addresses-list-deck">
              {profileAddresses.map((addr, idx) => (
                <div key={idx} className="address-card-row">
                  <span>📍 {addr}</span>
                  <button 
                    className="remove-address-btn"
                    onClick={() => {
                      setProfileAddresses(profileAddresses.filter((_, i) => i !== idx));
                      addToast('Address deleted');
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="add-address-row">
              <input 
                type="text" 
                placeholder="Add custom dorm delivery spot..." 
                value={newProfileAddress}
                onChange={(e) => setNewProfileAddress(e.target.value)}
              />
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  if (!newProfileAddress.trim()) return;
                  setProfileAddresses([...profileAddresses, newProfileAddress.trim()]);
                  setNewProfileAddress('');
                  addToast('New delivery point saved!');
                }}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Order History */}
          <div className="profile-order-history">
            <h4>Your Campus Orders</h4>
            <table className="profile-orders-table-custom">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total Cost</th>
                  <th>Delivery Location</th>
                  <th>Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.date}</td>
                    <td>₹{o.total}</td>
                    <td>{o.location}</td>
                    <td>
                      <span className={`status-pill ${o.status}`}>
                        {o.status === 'shipping' ? 'Out for Delivery' : o.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
