import { useContext, useState } from 'react';
import { Form, Button, Container, Card, Row, Col, Modal } from 'react-bootstrap';
import { CarContext } from '../context/CarContext';

const CarManagement = () => {
  const { state, dispatch } = useContext(CarContext);
  const [priceFilter, setPriceFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handlePriceFilter = (e) => {
    e.preventDefault();
    const filtered = state.cars.filter(
      (car) => !priceFilter || car.price <= parseFloat(priceFilter)
    );
    dispatch({ type: 'FILTER_CARS', payload: filtered });
  };

  const handleShowDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Car Management</h2>

      {/* Form lọc theo giá */}
      <Form onSubmit={handlePriceFilter} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Filter by Price (less than or equal to)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {/* Danh sách xe (dạng card) */}
      <Row>
        {state.filteredCars.length > 0 ? (
          state.filteredCars.map((car) => (
            <Col key={car.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={process.env.PUBLIC_URL + car.image}
                  alt={`${car.make} ${car.model}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>
                    <Button
                      variant="link"
                      className="p-0 text-start"
                      onClick={() => handleShowDetails(car)}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {car.make} {car.model}
                    </Button>
                  </Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {car.year}
                    <br />
                    <strong>Price:</strong> ${car.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No cars found.</p>
          </Col>
        )}
      </Row>

      {/* Modal hiển thị thông tin chi tiết */}
      {selectedCar && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCar.make} {selectedCar.model} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <img
                  src={process.env.PUBLIC_URL + selectedCar.image}
                  alt={`${selectedCar.make} ${selectedCar.model}`}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </Col>
              <Col md={6}>
                <p><strong>Make:</strong> {selectedCar.make}</p>
                <p><strong>Model:</strong> {selectedCar.model}</p>
                <p><strong>Year:</strong> {selectedCar.year}</p>
                <p><strong>Price:</strong> ${selectedCar.price}</p>
                <p><strong>Color:</strong> {selectedCar.details?.color || 'N/A'}</p>
                <p><strong>Engine:</strong> {selectedCar.details?.engine || 'N/A'}</p>
                <p><strong>Seats:</strong> {selectedCar.details?.seats || 'N/A'}</p>
                <p><strong>Max Speed:</strong> {selectedCar.details?.maxSpeed || 'N/A'}</p>
                <p><strong>Fuel Type:</strong> {selectedCar.details?.fuelType || 'N/A'}</p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default CarManagement;