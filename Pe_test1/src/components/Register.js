// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello, ${form.username}! Your registration is successful.`);
    navigate('/cars'); // Chuyển sang trang danh sách xe
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
