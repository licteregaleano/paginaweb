// src/components/Testimonials.jsx
import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import reviews from '../data/googleReviews';
import '../styles/Testimonials.css';

const Testimonials = () => (
    <section className="testimonials-section py-5" id="testimonios">
        <Container>
            <h2 className="text-center mb-4" style={{ color: 'var(--primario-oscuro)' }}>
                Testimonios
            </h2>
            <Carousel
                variant="dark"
                controls={true}
                indicators={false}
            >
                {reviews.map((r, i) => {
                    const year = r.date.split('-')[0];

                    return (
                        <Carousel.Item key={i}>
                            <blockquote className="blockquote text-center">
                                <p className="mb-4">"{r.text}"</p>
                                <footer className="blockquote-footer">
                                    {r.author},{' '}
                                    <cite title="Año de la review">{year}</cite>{' '}
                                    - {' '}
                                    <span className="text-warning">
                    {'★'.repeat(r.rating)}
                  </span>
                                </footer>
                            </blockquote>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </Container>
    </section>
);

export default Testimonials;
