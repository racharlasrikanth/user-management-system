import React from 'react';
import { Routes, Route } from "react-router-dom";
import {
    HomePage,
    Login,
    Signup,
    ForgotPassword,
    ResetPassword,
    VerifyEmail,
    NotFound
} from "./../pages";
import {
    Navbar
} from "./../components";

const ApplicationRoutes = () => {
  return (
      <>
        <Navbar />
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/reset-password' element={<ResetPassword />}></Route>
            <Route path='/verify-email' element={<VerifyEmail />}></Route>
            <Route path='/*' element={<NotFound />}></Route>
        </Routes>
      </>
  )
}

export default ApplicationRoutes;