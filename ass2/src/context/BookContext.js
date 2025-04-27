import React, { createContext, useReducer, useEffect } from 'react';
import { BookReducer } from '../reducer/BookReducer';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookReducer, {
    books: [],
    filterPrice: 0,
    bookstoreInfo: {} 
  });

  useEffect(() => {
    fetch('http://localhost:3001/bookstore')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'SET_BOOKS', payload: data.books });
        dispatch({ type: 'SET_BOOKSTORE_INFO', payload: {storeName: data.bookstore.storeName, location: data.bookstore.location} });
      });
  }, []);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};