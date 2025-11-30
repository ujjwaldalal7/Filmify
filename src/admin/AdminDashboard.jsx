import { Link } from "react-router-dom";
import "../styles/admin.css"
export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="admin-card-container">

        <Link to="/admin/add-movie" className="admin-card">
          <span className="admin-icon">🎬</span>
          Add / Manage Movies
        </Link>

        <Link to="/admin/manage-shows" className="admin-card">
          <span className="admin-icon">📺</span>
          Manage Shows
        </Link>

        <Link to="/admin/all-bookings" className="admin-card">
          <span className="admin-icon">📖</span>
          View All Bookings
        </Link>

      </div>
    </div>
  );
}
