import { useEffect, useState } from "react";
import "../styles/admin.css";

export default function AdminManageShows() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const [movieId, setMovieId] = useState("");
  const [theatreId, setTheatreId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function loadAll() {
      const staticMovies = await fetch("/data/movies.json").then(res => res.json());
      const dynamicMovies = JSON.parse(localStorage.getItem("movies_dynamic")) || [];

      setMovies([...staticMovies, ...dynamicMovies]);

      const storedShows = JSON.parse(localStorage.getItem("shows_dynamic")) || [];
      setShows(storedShows);

      const theatreList = await fetch("/data/theatres.json").then(res => res.json());
      setTheatres(theatreList);
    }

    loadAll();
  }, []);

  function saveShows(updated) {
    localStorage.setItem("shows_dynamic", JSON.stringify(updated));
    setShows(updated);
  }

  function addShow(e) {
    e.preventDefault();

    const selectedTheatre = theatres.find(t => t.id === Number(theatreId));

    const newShow = {
      showId: Date.now(),
      movieId: Number(movieId),
      theatreId: selectedTheatre.id,
      theatreName: selectedTheatre.name,
      city: selectedTheatre.city,
      date,
      time,
      price: Number(price),
      totalSeats: [
        "A1","A2","A3","A4","A5",
        "B1","B2","B3","B4","B5",
        "C1","C2","C3"
      ]
    };

    saveShows([...shows, newShow]);

    setMovieId("");
    setTheatreId("");
    setDate("");
    setTime("");
    setPrice("");
  }

  function deleteShow(id) {
    const updated = shows.filter(s => s.showId !== id);
    saveShows(updated);
  }

  const getMovieName = (id) =>
    movies.find(m => m.id === id)?.title || "Unknown Movie";

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Manage Shows</h2>

      <form className="admin-card" onSubmit={addShow}>

        <select
          className="admin-select"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          required
        >
          <option value="">Select Movie</option>
          {movies.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>

        <select
          className="admin-select"
          value={theatreId}
          onChange={(e) => setTheatreId(e.target.value)}
          required
        >
          <option value="">Select Theatre</option>
          {theatres.map(t => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.city})
            </option>
          ))}
        </select>

        <input type="date" className="admin-input" value={date}
          onChange={(e) => setDate(e.target.value)} required />

        <input type="time" className="admin-input" value={time}
          onChange={(e) => setTime(e.target.value)} required />

        <input type="number" className="admin-input"
          placeholder="Ticket Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required />

        <button className="admin-submit-btn">Add Show</button>
      </form>

      <h3>Existing Shows</h3>

      {shows.length === 0 ? (
        <p>No dynamic shows added yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Theatre</th>
              <th>City</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shows.map(s => (
              <tr key={s.showId}>
                <td>{getMovieName(s.movieId)}</td>
                <td>{s.theatreName}</td>
                <td>{s.city}</td>
                <td>{s.date}</td>
                <td>{s.time}</td>
                <td>₹{s.price}</td>
                <td>
                  <button
                    className="admin-delete-btn"
                    onClick={() => deleteShow(s.showId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
