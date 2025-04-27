import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';


function App() {
  return (
    <Router> {/* ✅ Bọc toàn bộ app trong Router */}
            <Routes>
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App
