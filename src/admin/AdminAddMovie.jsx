import { useEffect, useState } from "react";
import "../styles/admin.css"
export default function AdminAddMovie() {
  const [movies, setMovies] = useState([]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("movies_dynamic")) || [];
    setMovies(stored);
  }, []);

  function saveMovies(data) {
    localStorage.setItem("movies_dynamic", JSON.stringify(data));
    setMovies(data);
  }

  function addMovie(e) {
    e.preventDefault();

    if (!title || !poster) {
      alert("Title & Poster URL are required!");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title,
      genre,
      duration: Number(duration) || 120,
      rating: Number(rating) || 0,
      poster,
      description,
      trailer: trailer.trim() === "" ? "/data/temp.mp4" : trailer
    };

    saveMovies([...movies, newMovie]);

    // Reset
    setTitle("");
    setGenre("");
    setDuration("");
    setRating("");
    setPoster("");
    setDescription("");
    setTrailer("");
  }

  function deleteMovie(id) {
    const updated = movies.filter((m) => m.id !== id);
    saveMovies(updated);
  }

  return (
    <div className="admin-add-container">
      <h2 className="admin-title">Add Movie</h2>

      <form onSubmit={addMovie} className="admin-form-card">
        <input 
          type="text" 
          className="admin-input"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input 
          type="text"
          className="admin-input"
          placeholder="Genre (Action/Thriller)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <input 
          type="number"
          className="admin-input"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input 
          type="number"
          className="admin-input"
          placeholder="Rating (e.g., 7.5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input 
          type="text"
          className="admin-input"
          placeholder="Poster Image URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
        />

        <textarea
          className="admin-textarea"
          placeholder="Movie Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input 
          type="text"
          className="admin-input"
          placeholder="Trailer URL (or leave empty for temp.mp4)"
          value={trailer}
          onChange={(e) => setTrailer(e.target.value)}
        />

        <button className="admin-submit-btn">Add Movie</button>
      </form>

      <h3 style={{ marginBottom: 10 }}>Existing Movies</h3>

      {movies.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td><img src={m.poster} width="60" /></td>
                <td>{m.title}</td>
                <td>{m.genre}</td>
                <td>{m.rating}</td>
                <td>
                  <button 
                    className="admin-delete-btn"
                    onClick={() => deleteMovie(m.id)}
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
