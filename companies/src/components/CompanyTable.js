import { Table, Button } from 'react-bootstrap';

const CompanyTable = ({ companies, dispatch }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Start</th>
          <th>End</th>
          {dispatch && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td>{company.id}</td>
            <td>{company.name}</td>
            <td>{company.category}</td>
            <td>{company.start}</td>
            <td>{company.end}</td>
            {dispatch && (
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-3"
                  onClick={() => {
                    dispatch({ type: 'SET_EDIT_COMPANY', payload: company });
                    dispatch({ type: 'UPDATE_NEW_COMPANY', payload: {
                      name: company.name,
                      category: company.category,
                      start: company.start.toString(),
                      end: company.end.toString()
                    }});
                    dispatch({ type: 'SET_FORM_VISIBLE', payload: true });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch({ type: 'SHOW_DELETE_MODAL', payload: company.id })}
                >
                  Delete
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CompanyTable;
