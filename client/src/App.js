import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  Home,
  Dashboard,
  Error,
  Register,
  Login,
  Verify,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }></Route>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/user/verify-email' element={<Verify />} />
        <Route path='/user/reset-password' element={<ResetPassword />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;