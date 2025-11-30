import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import SelectTheatre from "./pages/SelectTheatre";
import SelectShow from "./pages/SelectShow";
import SeatSelection from "./pages/SeatSelection";
import BookingSummary from "./pages/BookingSummary";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAddMovie from "./admin/AdminAddMovie";
import AdminManageShows from "./admin/AdminManageShows";
import AdminAllBookings from "./admin/AdminAllBookings";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<ProtectedRoute> <MovieDetails /> </ProtectedRoute>} />
          <Route path="/booking-history" element={<ProtectedRoute> <BookingHistory /> </ProtectedRoute >} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/select-theatre/:movieId" element={<ProtectedRoute> <SelectTheatre /> </ProtectedRoute>} />
          <Route path="/select-show/:movieId/:theatreId" element={<ProtectedRoute> <SelectShow /> </ProtectedRoute>} />
          <Route path="/seat-selection/:showId" element={<ProtectedRoute> <SeatSelection /> </ProtectedRoute>} />
          <Route path="/booking-summary" element={<ProtectedRoute> <BookingSummary /> </ProtectedRoute>} />


          <Route path="/admin/dashboard" element={ <AdminRoute>  <AdminDashboard /> </AdminRoute>}/>
          <Route path="/admin/add-movie" element={<AdminRoute>  <AdminAddMovie /></AdminRoute>}/>
          <Route path="/admin/manage-shows" element={<AdminRoute>  <AdminManageShows /></AdminRoute>}/>
          <Route path="/admin/all-bookings" element={<AdminRoute>  <AdminAllBookings /></AdminRoute>}/>

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
