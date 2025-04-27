import { BookContext } from '../context/BookContext';
import React, { useContext } from 'react';

const Header = () => {
    
const { state } = useContext(BookContext);

    return (
      <div className="bg-primary text-white p-3">
        <h2>{state.storeName}</h2>
        <p>{state.location}</p>
      </div>
    );
  };
  
  export default Header;
  