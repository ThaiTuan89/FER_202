import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

const BookDetails = () => {
  const { id } = useParams();
  const { state } = useContext(BookContext);
  const book = state.books.find(b => b.id === id);

  if (!book) return <p>Book not found.</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.img} alt={book.title} />
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <p>Stock quantity: {book.stock}</p>
    </div>
  );
};

export default BookDetails;
