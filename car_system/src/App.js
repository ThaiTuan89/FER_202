import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarProvider } from './context/CarContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import CarManagement from './components/CarManagement';

function App() {
  return (
    <Router>
      <CarProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CarProvider>
    </Router>
  );
}

export default App;