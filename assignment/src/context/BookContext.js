import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer } from './bookReducer';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, {
    books: [],
    filterPrice: 0,
    libraryInfo: {} 
  });

  useEffect(() => {
    fetch('http://localhost:3001/library')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'SET_BOOKS', payload: data.books });
        dispatch({ type: 'SET_LIBRARY_INFO', payload: { libraryName: data.libraryName, location: data.location } });
      });
  }, []);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
