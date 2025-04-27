import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import PriceFilter from './components/PriceFilter';
import { BookProvider } from './context/BookContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <Header />
        <div className="container mt-4">
          <PriceFilter />
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </BookProvider>
  );
}

export default App;
