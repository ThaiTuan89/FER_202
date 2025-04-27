import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const PriceFilter = () => {
  const { dispatch } = useContext(BookContext);

  const handleChange = (e) => {
    dispatch({ type: 'FILTER_BY_PRICE', payload: parseInt(e.target.value) || 0 });
  };

  return (
    <div className="mb-3">
      <label>Filter by Minimum Price:</label>
      <input type="number" className="form-control" onChange={handleChange} />
    </div>
  );
};

export default PriceFilter;
