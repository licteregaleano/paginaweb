// src/pages/Blog.jsx
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllPosts } from './postLoader';
import '../styles/Blog.css';

export default function Blog() {
    const posts = getAllPosts();

    return (
        <section className="blog-section py-5">
            <Container>
                <h1 className="mb-4" style={{ color: 'var(--primario-oscuro)' }}>Artículos</h1>
                <Row xs={1} md={2} className="g-4">
                    {posts.map(p => (
                        <Col key={p.slug}>
                            <Card className="blog-card h-100">
                                <Card.Body>
                                    <Card.Title className="mb-2">{p.title}</Card.Title>
                                    <div className="text-muted small mb-2">
                                        {p.dateObj.toLocaleDateString('es-AR', { year:'numeric', month:'long', day:'numeric' })}
                                    </div>
                                    <Card.Text className="mb-3">{p.excerpt}</Card.Text>
                                    <div className="mb-3">
                                        {p.tags.map(t => (
                                            <Badge bg="secondary" className="me-2" key={t}>{t}</Badge>
                                        ))}
                                    </div>
                                    <Link to={`/blog/${p.slug}`} className="btn btn-salmon">Leer más</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}
