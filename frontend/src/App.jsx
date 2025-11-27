import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/userDashboard';
import BookingPage from './pages/BookingPage';
import OwnerDashboard from './pages/OwnerDashboard';
import SearchCourts from './components/User/SearchCourts';
import UpcomingMatches from './components/User/UpcomingMatches';
import MyBookings from './components/User/MyBookings';
import FavoriteCourts from './components/User/FavoriteCourts';
import MyCourts from './components/owner/MyCourts';
import AddCourt from './components/owner/AddCourt';
import OwnerBooking from './components/owner/MyBookings';
import AdminDashboard from './pages/AdminDashboard';

import ProtectedRoute from './components/ProtectedRoute'; // tumhara component ka path adjust karo

function App() {
  return (
    <div className='bg-black'>
<<<<<<< Updated upstream
     <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/auth/:mode" element={<AuthPage />} />
      <Route path="/user/dashboard" element={<UserDashboard />}>
        <Route index element={<SearchCourts />} />
        <Route path="search" element={<SearchCourts />} />
        <Route path="matches" element={<UpcomingMatches />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="favorites" element={<FavoriteCourts />} />
      </Route>
=======
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/:mode" element={<AuthPage />} />

        {/* User Dashboard Routes */}
        <Route
          path="/user/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<SearchCourts />} />
          <Route path="search" element={<SearchCourts />} />
          <Route path="matches" element={<UpcomingMatches />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="favorites" element={<FavoriteCourts />} />
        </Route>
>>>>>>> Stashed changes

        <Route path="/courts/:id" element={<BookingPage />} />

        {/* Owner Dashboard Routes */}
        <Route
          path="/owner/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['court_owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyCourts />} />
          <Route path="add-court" element={<AddCourt />} />
          <Route path="bookings" element={<OwnerBooking />} />
        </Route>

<<<<<<< Updated upstream
  {/* Owner dashboard */}
 
</Routes>
=======
        {/* Admin Dashboard Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Success & Cancel */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
