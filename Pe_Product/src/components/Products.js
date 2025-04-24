import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reviewer, setReviewer] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [validationError, setValidationError] = useState({});
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        fetch('http://localhost:9999/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);

                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    const getAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };
 
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setReviewer('');
        setComment('');
        setRating(1);
        setValidationError({});
        setSuccessMessage('');
    };

    const handleSubmitReview = () => {

        const errors = {};
        if (!reviewer.trim()) errors.reviewer = 'Reviewer Name is required';
        if (!comment.trim()) errors.comment = 'Comment is required';
        
        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }

        const newReview = {
            reviewerName: reviewer,
            comment: comment,
            rating: parseInt(rating),
            date: new Date().toISOString()
        };


        const updatedProduct = {
            ...selectedProduct,
            reviews: [...(selectedProduct.reviews || []), newReview]
        };

        fetch(`http://localhost:9999/products/${selectedProduct.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reviews: updatedProduct.reviews })
        })
            .then(response => response.json())
            .then(data => {

                const updatedProducts = products.map(p => 
                    p.id === selectedProduct.id ? { ...p, reviews: data.reviews } : p
                );
                setProducts(updatedProducts);
                setSuccessMessage('Thanks for your review!');
                
                //reset form
                setReviewer('');
                setComment('');
                setRating(1);
                setValidationError({});
            })
            .catch(error => console.error('Error submitting review:', error));
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Products Review System</h1>
            
            <Row className="mb-4">
                <Col xs={12} md={4}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {selectedCategory ? selectedCategory : '-- Select all category --'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedCategory('')}>
                                All categories
                            </Dropdown.Item>
                            {categories.map((category, index) => (
                                <Dropdown.Item 
                                    key={index} 
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={12} md={8} className="text-end">
                    <Button variant="success" onClick={() => window.location.href = '/reviews'}>
                        Show Review List
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={8}>
                    <Row>
                        {filteredProducts.map(product => (
                            <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                                <Card className="h-100">
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            <div>Price: {product.price}</div>
                                            <div>Category: {product.category}</div>
                                            <div>Average Rate: {getAverageRating(product.reviews)}</div>
                                        </Card.Text>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleProductSelect(product)}
                                            className="mt-auto"
                                        >
                                            Add New Review
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
                
                <Col xs={12} md={4}>
                    <div className="border rounded p-3">
                        <h5>Reviews details:</h5>
                        {selectedProduct ? (
                            <>
                                <div>Product: {selectedProduct.id}</div>
                                <div>Title: {selectedProduct.title}</div>
                                <div>Category: {selectedProduct.category}</div>
                                <div>Price: {selectedProduct.price}</div>
                                
                                {successMessage ? (
                                    <div className="mt-3 text-success">
                                        {successMessage}
                                    </div>
                                ) : (
                                    <>
                                        <h6 className="mt-3">Add a new Review</h6>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Reviewer Name</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={reviewer}
                                                    onChange={(e) => setReviewer(e.target.value)}
                                                    isInvalid={!!validationError.reviewer}
                                                />
                                                {validationError.reviewer && (
                                                    <Form.Text className="text-danger">
                                                        {validationError.reviewer}
                                                    </Form.Text>
                                                )}
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    rows={3}
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    isInvalid={!!validationError.comment}
                                                />
                                                {validationError.comment && (
                                                    <Form.Text className="text-danger">
                                                        {validationError.comment}
                                                    </Form.Text>
                                                )}
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label>Rating</Form.Label>
                                                <div className="d-flex">
                                                    {[1, 2, 3, 4, 5].map(value => (
                                                        <Form.Check
                                                            key={value}
                                                            inline
                                                            type="radio"
                                                            label={value}
                                                            name="rating"
                                                            value={value}
                                                            checked={rating === value}
                                                            onChange={() => setRating(value)}
                                                            className="me-3"
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                            
                                            <Button 
                                                variant="warning" 
                                                onClick={handleSubmitReview}
                                            >
                                                Send Review
                                            </Button>
                                        </Form>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="text-danger">Select a product to Review!</div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Products; 