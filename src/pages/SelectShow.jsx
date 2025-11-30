import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJSON } from "../utils/fetchJSON";
import ShowCard from "../components/ShowCard";

export default function SelectShow() {
  const { movieId, theatreId } = useParams();

  const [shows, setShows] = useState([]);
  const [movie, setMovie] = useState(null);
  const [theatre, setTheatre] = useState(null);

  useEffect(() => {
    async function loadAll() {
      const staticMovies = await fetchJSON("/data/movies.json");
      const staticTheatres = await fetchJSON("/data/theatres.json");
      const staticShows = await fetchJSON("/data/shows.json");

      const dynamicMovies = JSON.parse(localStorage.getItem("movies_dynamic")) || [];
      const dynamicShows = JSON.parse(localStorage.getItem("shows_dynamic")) || [];

      const allMovies = [...staticMovies, ...dynamicMovies];
      const allShows = [...staticShows, ...dynamicShows];

      setMovie(allMovies.find(m => m.id === Number(movieId)) || null);
      setTheatre(staticTheatres.find(t => t.id === Number(theatreId)) || null);

      const filteredShows = allShows.filter(
        (s) =>
          Number(s.movieId) === Number(movieId) &&
          Number(s.theatreId) === Number(theatreId)
      );

      setShows(filteredShows);
    }

    loadAll();
  }, [movieId, theatreId]);

  return (
    <div>
      <h2>Select Show {movie ? `— ${movie.title}` : ""}</h2>

      {theatre && (
        <p style={{ color: "#555" }}>
          Theatre: {theatre.name} ({theatre.city})
        </p>
      )}

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "500px",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {shows.length === 0 ? (
          <p>No shows available for this movie in this theatre.</p>
        ) : (
          <div style={{ minWidth: "500px" }}>
            {shows.map((s) => (
              <ShowCard key={s.showId} show={s} theatre={theatre} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
