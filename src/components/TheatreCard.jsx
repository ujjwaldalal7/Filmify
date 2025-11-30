// src/components/TheatreCard.jsx
import { useNavigate } from "react-router-dom";
import "../styles/movie.css"; // reuse some styles

export default function TheatreCard({ theatre, movieId }) {
  const navigate = useNavigate();

  function handleSelect() {
    navigate(`/select-show/${movieId}/${theatre.id}`);
  }

  return (
    <div className="theatre-card">
      <h3 className="theatre-name">{theatre.name}</h3>
      <p className="theatre-loc">{theatre.city} — {theatre.location}</p>
      <p className="theatre-screens">Screens: {theatre.screens}</p>

      <button onClick={handleSelect} className="movie-btn">Select Shows</button>
    </div>
  );
}
