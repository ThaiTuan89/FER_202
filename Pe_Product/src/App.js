import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Products from './components/Products';
import Reviews from './components/Reviews';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </Router>
    );
}

export default App;