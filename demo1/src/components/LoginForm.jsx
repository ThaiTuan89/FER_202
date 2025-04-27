import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);

    // Đọc thông tin user từ localStorage khi component load
    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Giả lập dữ liệu đăng nhập (vì không dùng JSON Server)
            const mockUser = {
                email: 'user@example.com',
                password: '123456',
                name: 'Nguyễn Văn A',
                role: 'User',
                phone: '0123456789'
            };

            if (email === mockUser.email && password === mockUser.password) {
                setUserData(mockUser);
                localStorage.setItem('userData', JSON.stringify(mockUser));
                setError('');
            } else {
                setError('Email hoặc mật khẩu không đúng');
                setUserData(null);
                localStorage.removeItem('userData');
            }
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            setUserData(null);
        }
    };

    return (
        <>
            <Form className='ts1' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {error && <p className="text-danger">{error}</p>}
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>

            {userData && (
                <div style={{ padding: '2rem', marginTop: '2rem', border: '1px solid #ccc' }}>
                    <h4>Thông tin người dùng</h4>
                    <p><strong>Tên:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>Số điện thoại:</strong> {userData.phone}</p>
                </div>
            )}
        </>
    );
}

export default LoginForm;
