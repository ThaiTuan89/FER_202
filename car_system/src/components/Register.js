import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Hiển thị thông báo đăng ký thành công
    alert(`Hello, ${username}! Your registration is successful.`);
    // Lưu trạng thái đăng ký (giả lập, không cần lưu thông tin người dùng)
    localStorage.setItem('isRegistered', 'true');
    // Chuyển hướng đến trang quản lý xe
    navigate('/cars');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;