import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';


import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import UserDashboard from './pages/userDashboard';

function App() {
 

  return (
    <div className='bg-black'>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/:mode" element={<AuthPage />} />
      <Route path="/user/dashboard" element={< UserDashboard/>} />
   
    </Routes>
    </div>
     
   
  )
}

export default App
