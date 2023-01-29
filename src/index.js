import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Users from './pages/users/users';
import Products from './pages/products/products';
import 'bootstrap/dist/css/bootstrap.css';
import Landing from './pages/Landing/Landing';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/Home' />} />
        <Route path='/Home' element={<Landing />} />
        <Route path='/Home/users' element={<Users />} />
        <Route path='/Home/products' element={<Products />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
