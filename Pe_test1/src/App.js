import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import CarManagement from './context/CarManagement';
import { CarProvider } from './context/CarContext';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <CarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<CarManagement />} />
        </Routes>
      </BrowserRouter>
    </CarProvider>
  );
}

export default App;
