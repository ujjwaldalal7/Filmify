// src/components/ShowCard.jsx
import { useNavigate } from "react-router-dom";
import "../styles/movie.css";

export default function ShowCard({ show, theatre, movie }) {
  const navigate = useNavigate();

  function handleProceed() {
    navigate(`/seat-selection/${show.showId}`);
  }

  return (
    <div className="show-card">
      <div>
        <strong>{show.date}</strong> · <span>{show.time}</span>
      </div>
      <div>Price: ₹{show.price}</div>
      <div>Screen: {show.screen ?? "1"}</div>
      <div>Available: {show.totalSeats?.length ?? 0} seats</div>

      <div style={{ marginTop: 8 }}>
        <button className="movie-btn" onClick={handleProceed}>Select Seats</button>
      </div>
    </div>
  );
}
