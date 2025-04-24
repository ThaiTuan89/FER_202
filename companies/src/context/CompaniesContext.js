import { createContext, useContext, useReducer } from 'react';
import { initialState, companiesReducer } from '../reducers/companiesReducer';

const CompaniesContext = createContext();

export const CompaniesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companiesReducer, initialState);
  return (
    <CompaniesContext.Provider value={{ state, dispatch }}>
      {children}
    </CompaniesContext.Provider>
  );
};

export const useCompaniesContext = () => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error('useCompaniesContext must be used within a CompaniesProvider');
  }
  return context;
};
