import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Reviews() {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:9999/products')
            .then(response => response.json())
            .then(data => {
                const productsWithReviews = data.filter(product => 
                    product.reviews && product.reviews.length > 0
                );
                setProducts(productsWithReviews);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = hours.toString().padStart(2, '0');
        
        return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    };
    
    return (
        <Container className="mt-4">
            <h1 className="mb-4">List of Reviews</h1>
            
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>Title</th>
                            <th colSpan="4">Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <React.Fragment key={product.id}>
                                <tr>
                                    <td rowSpan={product.reviews.length + 1}>{product.id}</td>
                                    <td rowSpan={product.reviews.length + 1}>{product.title}</td>
                                    <th>Date</th>
                                    <th>Reviewer</th>
                                    <th>Comment</th>
                                    <th>Rating</th>
                                </tr>
                                {product.reviews.map((review, reviewIndex) => (
                                    <tr key={`${product.id}-${reviewIndex}`}>
                                        <td>{formatDate(review.date)}</td>
                                        <td>{review.reviewerName}</td>
                                        <td>{review.comment}</td>
                                        <td>{review.rating}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}

export default Reviews;