import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { getCurrentUser, logoutUser } from "../utils/auth";

export default function Navbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">Filmify 🎬</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/booking-history">Bookings</Link></li>
      </ul>

      <div>
        {!user ? (
          <Link to="/login" className="nav-btn">Login</Link>
        ) : (
          <button onClick={handleLogout} className="nav-btn logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
