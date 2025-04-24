import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function UserInfo() {
    const location = useLocation();
    const { email } = location.state || {};
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:3001/users?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log("email từ location.state:", email);
                    console.log("Kết quả fetch:", data);
                    if (data.length > 0) {
                        setUserData(data[0]);
                    }
                })  
                .catch(err => console.error('Lỗi khi fetch dữ liệu:', err));
        }
    }, [email]);

    if (!userData) return <p>Đang tải thông tin người dùng...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <img
            src="/img/fptu-banner-home.png"
            alt="FPTU Banner"
            className="img-fluid mb-4"
            style={{ width: '100%' }}
          />
            <h2>Thông tin người dùng</h2>
            <p><strong>Tên:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Số điện thoại:</strong> {userData.phone}</p>
        </div>
    );
}

export default UserInfo;
