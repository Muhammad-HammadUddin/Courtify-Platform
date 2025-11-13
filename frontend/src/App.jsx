import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';


import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
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
import RevenueReport from './components/owner/RevenueReport';
import AdminDashboard from './pages/AdminDashboard';


function App() {
 

  return (
    <div className='bg-black'>
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

  <Route path="/courts/:id" element={<BookingPage />} />


  <Route path="/owner/dashboard/" element={<OwnerDashboard />} >
 
   
          <Route index element={<MyCourts />} />
          <Route path="add-court" element={<AddCourt />} />
          <Route path="bookings" element={<OwnerBooking />} />
          <Route path="revenue" element={<RevenueReport />} />
       </Route>
<Route path="/admin/dashboard" element={<AdminDashboard />} />

  {/* Owner dashboard */}
 
</Routes>
    </div>
     
   
  )
}

export default App
