import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/movie.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      try {
        const staticMovies = await fetch("/data/movies.json").then(r => r.json());
        const dynamicMovies = JSON.parse(localStorage.getItem("movies_dynamic")) || [];
        const all = [...staticMovies, ...dynamicMovies];

        setMovie(all.find(m => m.id === Number(id)));
      } catch (err) {
        console.log("Error loading movie:", err);
      }
    }
    loadMovie();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-details-wrapper">
      
      <div className="left-column">
        <img src={movie.poster} alt={movie.title} className="details-poster" />

        {movie.trailer && movie.trailer.endsWith(".mp4") && (
          <video 
            src={movie.trailer} 
            controls 
            className="embedded-trailer"
          />
        )}
      </div>

      <div className="details-info">

        <h1>{movie.title}</h1>

        <p><b>Genre:</b> {movie.genre || "N/A"}</p>
        <p><b>Duration:</b> {movie.duration || 120} mins</p>

        <p><b>Rating:</b> ⭐ {movie.rating || "N/A"}</p>

        <p className="details-desc">
          {movie.description || "No description available."}
        </p>

        <div className="details-buttons">
          <button
            className="details-btn"
            onClick={() => navigate(`/select-theatre/${movie.id}`)}
          >
            🎟 Book Tickets
          </button>
        </div>
      </div>

    </div>
  );
}
