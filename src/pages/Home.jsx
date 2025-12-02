import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadAll() {
      const staticMovies = await fetch("/data/movies.json").then(r => r.json());
      const dynamicMovies = JSON.parse(localStorage.getItem("movies_dynamic")) || [];
      setMovies([...staticMovies, ...dynamicMovies]);
    }
    loadAll();
  }, []);

  return (
    <div className="home-container">

      <div className="hero-box">
        <h1 className="hero-title">Welcome to Filmify 🎬</h1>
        <p className="hero-subtitle">Your Online Movie Ticket Booking Platform</p>
        <Link to="/movies" className="browse-btn">Browse Movies →</Link>
      </div>

      <div className="featured-box">
        <img src={movies[0]?.poster || "/data/temp-poster.jpg"} alt="Featured" />
        <div className="featured-info">
          <h3>Featured This Week</h3>
          <p>Check out the most-watched movie trending right now!</p>
        </div>
      </div>

      <h2 className="section-title">Now Showing</h2>

      <div className="home-movie-grid">
        {movies.slice(0, 6).map(m => (
          <Link 
            to={`/movie/${m.id}`} 
            key={m.id} 
            className="home-movie-card"
          >
            <img src={m.poster} alt={m.title} />
            <p>{m.title}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}
