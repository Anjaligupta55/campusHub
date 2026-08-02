import React from 'react';

export default function AdminDashboard({ adminActiveTab, setAdminActiveTab }) {
  return (
    <div className="admin-dashboard-container container">
      <div className="admin-dashboard-sidebar">
        <button className={`admin-tab-btn ${adminActiveTab === 'revenue' ? 'active' : ''}`} onClick={() => setAdminActiveTab('revenue')}>📈 Revenue & Analytics</button>
        <button className={`admin-tab-btn ${adminActiveTab === 'orders' ? 'active' : ''}`} onClick={() => setAdminActiveTab('orders')}>📦 Active Orders</button>
        <button className={`admin-tab-btn ${adminActiveTab === 'delivery' ? 'active' : ''}`} onClick={() => setAdminActiveTab('delivery')}>🏃 Delivery Partners</button>
        <button className={`admin-tab-btn ${adminActiveTab === 'inventory' ? 'active' : ''}`} onClick={() => setAdminActiveTab('inventory')}>📋 Inventory Stock</button>
        <button className={`admin-tab-btn ${adminActiveTab === 'users' ? 'active' : ''}`} onClick={() => setAdminActiveTab('users')}>👥 Users Status</button>
      </div>
      
      <div className="admin-dashboard-content">
        {adminActiveTab === 'revenue' && (
          <div className="admin-panel-fade">
            <h3 className="admin-section-title">Revenue & Analytics Dashboard</h3>
            <div className="admin-stats-grid">
              <div className="stat-card">
                <span>Daily Revenue</span>
                <strong>₹42,850</strong>
                <span className="trend positive">↑ 18% from yesterday</span>
              </div>
              <div className="stat-card">
                <span>Active Customers Today</span>
                <strong>312</strong>
                <span className="trend positive">↑ 8% from yesterday</span>
              </div>
              <div className="stat-card">
                <span>Average Basket Value</span>
                <strong>₹480</strong>
                <span className="trend negative">↓ 2% from last week</span>
              </div>
              <div className="stat-card">
                <span>Total Items In Stock</span>
                <strong>1,420</strong>
                <span className="trend normal">Steady</span>
              </div>
            </div>
            
            <div className="dashboard-chart-mock">
              <h4>Order Volume (Last 24 Hours)</h4>
              <div className="bar-chart-mock">
                <div className="chart-bar" style={{ height: '40%' }}><span>8 AM</span></div>
                <div className="chart-bar" style={{ height: '55%' }}><span>12 PM</span></div>
                <div className="chart-bar" style={{ height: '85%' }}><span>4 PM</span></div>
                <div className="chart-bar" style={{ height: '95%' }}><span>8 PM</span></div>
                <div className="chart-bar" style={{ height: '70%' }}><span>12 AM</span></div>
              </div>
            </div>
          </div>
        )}

        {adminActiveTab === 'orders' && (
          <div className="admin-panel-fade">
            <h3 className="admin-section-title">Active Orders Status</h3>
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Hostel / Block</th>
                  <th>Runner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#CH-83920</td>
                  <td>Trimax Pens, Classmate Notebooks</td>
                  <td>₹430</td>
                  <td>Hostel H-4, Room 302</td>
                  <td>Sarah M. (Junior)</td>
                  <td><span className="status-pill shipping">Out for Delivery</span></td>
                </tr>
                <tr>
                  <td>#CH-83921</td>
                  <td>Scientific Calculator, Files</td>
                  <td>₹1374</td>
                  <td>Hostel H-1, Room 104</td>
                  <td>Daniel T. (Sophomore)</td>
                  <td><span className="status-pill pending">Packing</span></td>
                </tr>
                <tr>
                  <td>#CH-83922</td>
                  <td>Laundry Basket, Bed Sheet</td>
                  <td>₹698</td>
                  <td>Hostel H-2, Room 410</td>
                  <td>Pooja V. (Senior)</td>
                  <td><span className="status-pill completed">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {adminActiveTab === 'delivery' && (
          <div className="admin-panel-fade">
            <h3 className="admin-section-title">Delivery Partner Runners</h3>
            <div className="runner-profiles-grid">
              <div className="runner-card">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Daniel" />
                <div className="runner-info">
                  <strong>Daniel T. (Sophomore)</strong>
                  <span>Active Orders: 1</span>
                  <span>Rating: 4.8★</span>
                  <span className="status active">Active on Shift</span>
                </div>
              </div>
              <div className="runner-card">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Sarah" />
                <div className="runner-info">
                  <strong>Sarah M. (Junior)</strong>
                  <span>Active Orders: 1</span>
                  <span>Rating: 4.9★</span>
                  <span className="status active">On Delivery</span>
                </div>
              </div>
              <div className="runner-card">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Rajesh" />
                <div className="runner-info">
                  <strong>Rajesh K. (Senior)</strong>
                  <span>Active Orders: 0</span>
                  <span>Rating: 4.7★</span>
                  <span className="status inactive">Offline</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {adminActiveTab === 'inventory' && (
          <div className="admin-panel-fade">
            <h3 className="admin-section-title">Inventory Stock Logs</h3>
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Stock Count</th>
                  <th>Alert Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Classmate Pulse Registers</td>
                  <td>Study Essentials</td>
                  <td>85 units</td>
                  <td><span className="status-pill completed">In Stock</span></td>
                </tr>
                <tr>
                  <td>Casio Scientific Calculator FX-991EX</td>
                  <td>Study Essentials</td>
                  <td>12 units</td>
                  <td><span className="status-pill pending">Low Stock</span></td>
                </tr>
                <tr>
                  <td>Trimax Gel Pens (Blue)</td>
                  <td>Study Essentials</td>
                  <td>150 units</td>
                  <td><span className="status-pill completed">In Stock</span></td>
                </tr>
                <tr>
                  <td>Plastic Wash Bucket (18L)</td>
                  <td>Hostel Essentials</td>
                  <td>4 units</td>
                  <td><span className="status-pill shipping">Reorder Alert</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {adminActiveTab === 'users' && (
          <div className="admin-panel-fade">
            <h3 className="admin-section-title">Verified Student Users</h3>
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Department & Year</th>
                  <th>Active Address</th>
                  <th>Verification Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rajesh Kumar</td>
                  <td>Computer Science, Junior</td>
                  <td>Hostel Block H-4 Room 302</td>
                  <td><span className="status-pill completed">Verified ID</span></td>
                </tr>
                <tr>
                  <td>Sarah Morris</td>
                  <td>Computer Science, Junior</td>
                  <td>Hostel Block H-1 Room 204</td>
                  <td><span className="status-pill completed">Verified ID</span></td>
                </tr>
                <tr>
                  <td>Daniel Taneja</td>
                  <td>Bio-Technology, Sophomore</td>
                  <td>Hostel Block H-3 Room 102</td>
                  <td><span className="status-pill completed">Verified ID</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
