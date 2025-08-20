// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => (
    <footer className="site-footer py-4">
        <Container>
            <Row>
                <Col md={3} className="mb-3 mb-md-0">
                    <h5>Contacto</h5>
                    <p>Teresa Galeano</p>
                    <p>+595 981 123 456</p>
                    <p>contacto@teresagaleano.net</p>
                </Col>
                <Col md={3} className="mb-3 mb-md-0">
                    <h5>Ubicación</h5>
                    <p>Asunción, Paraguay</p>
                    <p>Av. Principal 1234</p>
                </Col>
                <Col md={3} className="mb-3 mb-md-0">
                    <h5>Síguenos</h5>
                    <a href="#" className="me-3">Facebook</a>
                    <a href="#" className="me-3">Instagram</a>
                    <a href="#">LinkedIn</a>
                </Col>
                <Col md={3} className="text-md-end">
                    <h5>Desarrollado por</h5>
                    <a
                        href="https://portfolio-fedebarriosd.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="developer-credit"
                    >
                        Fede Barrios
                    </a>
                </Col>
            </Row>
            <hr className="mt-4 border-light" />
            <Row className="mt-3">
                <Col className="text-center">
                    <small>
                        &copy; {new Date().getFullYear()} Dra. Teresa Galeano. Todos los derechos reservados.&nbsp;
                        <br className="d-block d-md-none" />
                        <span className="d-none d-md-inline">|</span>&nbsp;
                        Diseñado por <a
                        href="https://portfolio-fedebarriosd.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="developer-credit"
                    >
                        Fede Barrios
                    </a>
                    </small>
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;
