import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import React from 'react';


function App() {
  return (
    <Router> {/* ✅ Bọc toàn bộ app trong Router */}
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/userinfo" element={<UserInfo />} />
            </Routes>
        </Router>
    );
}

export default App
