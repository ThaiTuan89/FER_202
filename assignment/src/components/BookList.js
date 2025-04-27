import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

const BookList = () => {
  const { state } = useContext(BookContext);
  const books = state.books.filter(book => book.price >= state.filterPrice);

  return (
    <div className="row">
      {books.map(book => (
        <div key={book.id} className="col-md-4">
          <div className="card mb-3">
            <img src={book.img} className="card-img-top" alt={book.title} />
            <div className="card-body">
              <Link to={`/book/${book.id}`}><h5>{book.title}</h5></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
