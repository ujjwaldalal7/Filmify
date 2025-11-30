import { useEffect, useState } from "react";

export default function AdminAllBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto" }}>
      <h2>All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="film-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Theatre</th>
              <th>User ID</th>
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
                <td>{b.theatre}</td>
                <td>{b.userId}</td>
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
