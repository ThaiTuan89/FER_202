import { createContext, useReducer, useEffect, useState } from 'react';

export const CarContext = createContext();

const initialState = {
  cars: [],
  filteredCars: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARS':
      return { ...state, cars: action.payload, filteredCars: action.payload };
    case 'FILTER_CARS':
      return { ...state, filteredCars: action.payload };
    default:
      return state;
  }
};

export const CarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3001/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        dispatch({ type: 'SET_CARS', payload: data });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CarContext.Provider value={{ state, dispatch }}>
      {children}
    </CarContext.Provider>
  );
};