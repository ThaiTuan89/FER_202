import { useReducer, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import CompanyForm from '../components/CompanyForm';
import CompanyTabs from '../components/CompanyTabs';
import DeleteModal from '../components/DeleteModal';
import { initialState, companiesReducer } from '../reducers/companiesReducer';
import { getCompanies, addCompany, updateCompany, deleteCompanyById } from '../services/companyService';
import { getNextId } from '../utils/idUtils';

const Companies = () => {
  const [state, dispatch] = useReducer(companiesReducer, initialState);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      dispatch({ type: 'SET_COMPANIES', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (e) => {
    e.preventDefault();
    const newId = getNextId(state.companies);
    const company = {
      ...state.newCompany,
      id: newId,
      start: parseInt(state.newCompany.start) || 0,
      end: parseInt(state.newCompany.end) || 0,
    };
    try {
      await addCompany(company);
      await fetchCompanies();
      dispatch({ type: 'RESET_NEW_COMPANY' });
      dispatch({ type: 'SET_FORM_VISIBLE', payload: false });
      dispatch({ type: 'SET_TAB', payload: 'all' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    const updatedCompany = {
      ...state.newCompany,
      id: state.editCompany.id,
      start: parseInt(state.newCompany.start) || 0,
      end: parseInt(state.newCompany.end) || 0,
    };
    try {
      await updateCompany(updatedCompany);
      await fetchCompanies();
      dispatch({ type: 'RESET_NEW_COMPANY' });
      dispatch({ type: 'SET_EDIT_COMPANY', payload: null });
      dispatch({ type: 'SET_FORM_VISIBLE', payload: false });
      dispatch({ type: 'SET_TAB', payload: 'all' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCompanyById(state.deleteId);
      await fetchCompanies();
      dispatch({ type: 'HIDE_DELETE_MODAL' });
      dispatch({ type: 'SET_TAB', payload: 'all' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  if (state.loading) return <div>Loading...</div>;
  if (state.error) {
    return (
      <div>
        Error: {state.error}
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
        >
          Clear Error
        </Button>
      </div>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Companies Management</h2>

      <div className="mb-4">
        <Button
          variant="primary"
          onClick={() => {
            dispatch({ type: 'SET_FORM_VISIBLE', payload: true });
            dispatch({ type: 'SET_EDIT_COMPANY', payload: null });
            dispatch({ type: 'RESET_NEW_COMPANY' });
          }}
        >
          Add Company
        </Button>
      </div>

      {state.showForm && (
        <CompanyForm
          newCompany={state.newCompany}
          editCompany={state.editCompany}
          dispatch={dispatch}
          handleSubmit={state.editCompany ? handleUpdateCompany : handleAddCompany}
        />
      )}

      <CompanyTabs state={state} dispatch={dispatch} />
      <DeleteModal show={state.showModal} onHide={() => dispatch({ type: 'HIDE_DELETE_MODAL' })} onConfirm={confirmDelete} />
    </Container>
  );
};

export default Companies;