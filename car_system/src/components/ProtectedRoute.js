import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isRegistered = localStorage.getItem('isRegistered') === 'true';
  return isRegistered ? children : <Navigate to="/" />;
};

export default ProtectedRoute;