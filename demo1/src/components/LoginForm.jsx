import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3001/users?email=${email}`);
            const data = await res.json();

            if (data.length > 0 && data[0].password === password) {
                // Đăng nhập thành công
                navigate('/UserInfo', { state: { email } });
            } else {
                setError('Email hoặc mật khẩu không đúng');
            }
        } catch (err) {
            console.error('Lỗi fetch:', err);
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
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
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
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

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;
