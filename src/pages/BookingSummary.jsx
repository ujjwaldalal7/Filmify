import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJSON } from "../utils/fetchJSON";
import { getCurrentUser } from "../utils/auth";

export default function BookingSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { show, selectedSeats, total } = state || {};

  const [movie, setMovie] = useState(null);
  const [theatre, setTheatre] = useState(null);

  useEffect(() => {
    if (!show) return;

    fetchJSON("/data/movies.json").then((data) => {
      const m = data.find((x) => x.id === show.movieId);
      setMovie(m);
    });

    fetchJSON("/data/theatres.json").then((data) => {
      const t = data.find((x) => x.id === show.theatreId);
      setTheatre(t);
    });
  }, [show]);

  function handleConfirmBooking() {
    const user = getCurrentUser();
    if (!user) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      bookingId: Date.now(),
      userId: user.userId,
      movie: movie.title,
      theatre: theatre.name,
      city: theatre.city,
      date: show.date,
      time: show.time,
      seats: selectedSeats,
      total,
    };

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    let dynamicShows = JSON.parse(localStorage.getItem("shows_dynamic")) || [];
    const updatedShows = dynamicShows.length ? dynamicShows : [show];

    const index = updatedShows.findIndex((s) => s.showId === show.showId);

    if (index !== -1) {
      updatedShows[index].totalSeats = updatedShows[index].totalSeats.filter(
        (s) => !selectedSeats.includes(s)
      );
    }

    localStorage.setItem("shows_dynamic", JSON.stringify(updatedShows));

    alert("Booking Confirmed!");
    navigate("/booking-history");
  }

  if (!show || !movie || !theatre) return <h2>Loading...</h2>;

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <h2>Booking Summary</h2>
      <p><b>Movie:</b> {movie.title}</p>
      <p><b>Theatre:</b> {theatre.name} ({theatre.city})</p>
      <p><b>Date:</b> {show.date}</p>
      <p><b>Time:</b> {show.time}</p>
      <p><b>Seats:</b> {selectedSeats.join(", ")}</p>
      <p><b>Total Amount:</b> ₹{total}</p>

      <button className="movie-btn" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
}
