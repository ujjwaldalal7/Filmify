import { Link } from "react-router-dom";
import "../styles/movie.css";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-genre">{movie.genre}</p>
      <Link to={`/movie/${movie.id}`} className="movie-btn">
        View Details
      </Link>
    </div>
  );
}
