import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJSON } from "../utils/fetchJSON";
import "../styles/seat.css";

export default function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [pricePerSeat,setpricePerSeat] = useState(0);

  useEffect(() => {
  let dynamic = JSON.parse(localStorage.getItem("shows_dynamic")) || null;

  if (dynamic) {
    const found = dynamic.find(s => s.showId === Number(showId));
    if (found) {
      setShow(found);
      return;
    }
  }

  fetchJSON("/data/shows.json").then(data => {
    if (!data) return;

    const found = data.find(s => s.showId === Number(showId));
    setShow(found);
  });
}, [showId]);

useEffect(() => {
  if (show && show.price) {
    setpricePerSeat(show.price);
  }
}, [show]);

  function toggleSeat(seat) {
    setSelectedSeats(prev => {
      if (prev.includes(seat)) {
        return prev.filter(s => s !== seat);
      }
      return [...prev, seat];
    });
  }

  function handleProceed() {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate("/booking-summary", {
      state: {
        show,
        selectedSeats,
        total: selectedSeats.length * pricePerSeat,
      },
    });
  }

  if (!show) return <h2>Loading seats...</h2>;

  return (
  <div className="seat-page">

    <h2 className="seat-title">Select Seats</h2>
    <p className="seat-subtitle">
      <b>Date:</b> {show.date} | <b>Time:</b> {show.time}
    </p>

    <div className="screen-box">SCREEN THIS WAY</div>

    <div className="seat-grid">
      {show.totalSeats.map((seat) => {
        const isSelected = selectedSeats.includes(seat);

        return (
          <div
            key={seat}
            className={`seat ${isSelected ? "selected" : ""}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        );
      })}
    </div>

    <div className="legend">
      <div><span className="seat legend-box"></span> Available</div>
      <div><span className="seat selected legend-box"></span> Selected</div>
    </div>

    <h3 className="seat-info">
      Selected: {selectedSeats.length ? selectedSeats.join(", ") : "None"}
    </h3>

    <h3 className="seat-info">Total: ₹{selectedSeats.length * pricePerSeat}</h3>

    <button className="movie-btn proceed-btn" onClick={handleProceed}>
      Proceed to Summary
    </button>

  </div>
);
}
