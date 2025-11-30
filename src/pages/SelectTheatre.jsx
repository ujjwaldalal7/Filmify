import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJSON } from "../utils/fetchJSON";
import "../styles/movie.css";

export default function SelectTheatre() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
  async function loadData() {
    const staticMovies = await fetchJSON("/data/movies.json");
    const staticTheatres = await fetchJSON("/data/theatres.json");
    const staticShows = await fetchJSON("/data/shows.json");

    const dynamicMovies = JSON.parse(localStorage.getItem("movies_dynamic")) || [];
    const dynamicShows = JSON.parse(localStorage.getItem("shows_dynamic")) || [];

    setMovie(staticMovies.find(x => x.id === Number(movieId)) ||
             dynamicMovies.find(x => x.id === Number(movieId)));

    setTheatres(staticTheatres);
    setShows([...staticShows, ...dynamicShows]);
  }

  loadData();
}, [movieId]);


  const filteredTheatres = theatres.filter(t =>
    shows.some(s =>
      s.movieId === Number(movieId) && s.theatreId === t.id
    )
  );

  function handleSelect(theatreId) {
    navigate(`/select-show/${movieId}/${theatreId}`);
  }

  return (
    <div>
      <h2>Select Theatre — {movie?.title}</h2>

      <div className="table-wrapper">
  <table className="film-table">
    <thead>
      <tr>
        <th>Theatre Name</th>
        <th>City</th>
        <th>Total Screens</th>
        <th>Available Shows</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredTheatres.map(t => {
        const countShows = shows.filter(
          s => s.movieId === Number(movieId) && s.theatreId === t.id
        ).length;

        return (
          <tr key={t.id}>
            <td>{t.name}</td>
            <td>{t.city}</td>
            <td>{t.screens}</td>
            <td>{countShows}</td>
            <td>
              <button
                className="table-btn"
                onClick={() => handleSelect(t.id)}
              >
                View Shows
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    </div>
  );
}
