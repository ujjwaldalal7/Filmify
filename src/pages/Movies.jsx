import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/data/movies.json");
        const staticMovies = await res.json();

        const dynamicMovies = JSON.parse(localStorage.getItem("movies_dynamic")) || [];
        setMovies([...staticMovies, ...dynamicMovies]);

      } catch (err) {
        console.log("Error loading movies:", err);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      <h2>Available Movies</h2>

      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
