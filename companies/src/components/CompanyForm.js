import { Form, Button } from 'react-bootstrap';

const CompanyForm = ({ newCompany, editCompany, dispatch, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={newCompany.name}
          onChange={(e) => dispatch({ type: 'UPDATE_NEW_COMPANY', payload: { name: e.target.value } })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          value={newCompany.category}
          onChange={(e) => dispatch({ type: 'UPDATE_NEW_COMPANY', payload: { category: e.target.value } })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Start Year</Form.Label>
        <Form.Control
          type="number"
          value={newCompany.start}
          onChange={(e) => dispatch({ type: 'UPDATE_NEW_COMPANY', payload: { start: e.target.value } })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End Year</Form.Label>
        <Form.Control
          type="number"
          value={newCompany.end}
          onChange={(e) => dispatch({ type: 'UPDATE_NEW_COMPANY', payload: { end: e.target.value } })}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {editCompany ? 'Save' : 'Add'}
      </Button>
      <Button
        variant="secondary"
        className="ms-2"
        onClick={() => {
          dispatch({ type: 'SET_EDIT_COMPANY', payload: null });
          dispatch({ type: 'RESET_NEW_COMPANY' });
          dispatch({ type: 'SET_FORM_VISIBLE', payload: false });
        }}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default CompanyForm;