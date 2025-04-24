import React, { useContext, useState, useEffect } from 'react';
import { CarContext } from '../context/CarContext';

export default function CarManagement() {
  const { cars, dispatch } = useContext(CarContext);
  const [price, setPrice] = useState('');
  const [fullList, setFullList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("http://localhost:3001/Cars")
      .then(res => res.json())
      .then(data => {
        setFullList(data);
        dispatch({ type: 'SET_CARS', payload: data });
      });
  }, [dispatch]);

  useEffect(() => {
    if (price === '') {
      dispatch({ type: 'SET_CARS', payload: fullList });
      setError('');
    } else {
      const maxPrice = Number(price);
      if (isNaN(maxPrice) || maxPrice < 0) {
        setError('Please enter a valid price.');
      } else {
        setError('');
        const filtered = fullList.filter(car => car.price <= maxPrice);
        dispatch({ type: 'SET_CARS', payload: filtered });
      }
    }
  }, [price, fullList, dispatch]);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/2/2f/FPT_Education_Logo.png"
          height="60"
          alt="FPT logo"
        />
        <h4 className="mt-2 text-uppercase text-warning">FPT University</h4>
      </div>
      <div className="row">
        {cars.map(car => (
          <div key={car.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={car.image}
                className="card-img-top"
                alt={`${car.make} ${car.model}`}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{car.make} {car.model}</h5>
                <p className="mb-1">Year: {car.year}</p>
                <p>Price: ${car.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <label htmlFor="searchPrice" className="form-label">Search Cars by Price</label>
        <input
          type="number"
          id="searchPrice"
          className="form-control"
          placeholder="Enter max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>

    </div>
  );
}
