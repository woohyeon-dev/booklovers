import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Register, Home, Error, Forgot } from '@pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/*" element={<Home />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
