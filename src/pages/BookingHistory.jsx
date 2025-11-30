import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";

export default function BookingHistory() {
  const user = getCurrentUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (user) {
      const userBookings = storedBookings.filter(
        (bk) => bk.userId === user.userId
      );
      setBookings(userBookings);
    }
  }, []);

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Please login to view bookings.</h2>;
  }

  return (
    <div style={{ maxWidth: "850px", margin: "30px auto" }}>
      <h2>Your Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="film-table" style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Theatre</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.bookingId}>
                <td>{b.movie}</td>
                <td>{b.theatre} ({b.city})</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.seats.join(", ")}</td>
                <td>₹{b.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
