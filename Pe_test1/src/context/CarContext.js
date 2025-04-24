import React, { createContext, useReducer, useEffect } from 'react';
export const CarContext = createContext();

const carReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARS': return action.payload;
    case 'FILTER_BY_PRICE':
      return action.payload.fullList.filter(car => car.price <= action.payload.price);
    default: return state;
  }
};

export const CarProvider = ({ children }) => {
  const [cars, dispatch] = useReducer(carReducer, []);

  useEffect(() => {
    fetch("http://localhost:3001/Cars")
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_CARS', payload: data }));
  }, []);

  return (
    <CarContext.Provider value={{ cars, dispatch }}>
      {children}
    </CarContext.Provider>
  );
};
