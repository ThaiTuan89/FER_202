import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

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
            // Giả lập dữ liệu đăng nhập
            const mockUser = [
                {
                    email: 'user@example.com',
                    password: '123456',
                    name: 'Nguyễn Văn A',
                    role: 'User',
                    phone: '0123456789'
                },
                {
                    email: 'admin@example.com',
                    password: '123456',
                    name: 'Nguyễn Văn B',
                    role: 'Admin',
                    phone: '0123456789'
                }
            ];

            const foundUser = mockUser.find(user => 
                user.email === email && user.password === password
            );
    
            if (foundUser) {
                setUserData(foundUser);
                localStorage.setItem('userData', JSON.stringify(foundUser));
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

    const handleLogout = () => {
        setUserData(null);
        setEmail('');
        setPassword('');
        localStorage.removeItem('userData');
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
            {/* Nếu chưa login thì hiện form */}
            {!userData && (
                <Form onSubmit={handleSubmit}>
                    {error && <p className="text-danger">{error}</p>}
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
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
            )}

            {/* Nếu đã login thì hiện thông tin */}
            {userData && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                    <h4>Thông tin người dùng</h4>
                    <p><strong>Tên:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>Số điện thoại:</strong> {userData.phone}</p>
                    <Button variant="secondary" onClick={handleLogout} style={{ marginTop: '1rem' }}>
                        Đăng xuất
                    </Button>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
