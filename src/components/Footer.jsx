import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import siteConfig from "../siteConfig";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="py-4 mt-5" style={{ background: "#f5edf3" }}>
            <Container>
                <Row className="gy-4">
                    <Col md={6}>
                        <h5 style={{ color: "var(--primario-oscuro)" }}>{siteConfig.brand}</h5>
                        <p className="mb-1"><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                        <p className="mb-1"><strong>Tel:</strong> <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></p>
                        <p className="mb-1"><strong>Dirección:</strong>{" "}
                            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">{siteConfig.address}</a>
                        </p>
                        <p className="mb-0"><strong>Horario:</strong> {siteConfig.hours}</p>
                    </Col>
                    <Col md={3}>
                        <h6 style={{ color: "var(--primario-claro)" }}>Enlaces</h6>
                        <ul className="list-unstyled">
                            <li><a href="/contacto">Contacto</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href={siteConfig.privacyUrl}>Privacidad</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h6 style={{ color: "var(--primario-claro)" }}>Seguime</h6>
                        <ul className="list-unstyled">
                            {siteConfig.social.instagram && <li><a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">Instagram</a></li>}
                            {siteConfig.social.facebook && <li><a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">Facebook</a></li>}
                            {siteConfig.social.youtube && <li><a href={siteConfig.social.youtube} target="_blank" rel="noreferrer">YouTube</a></li>}
                            {siteConfig.social.linkedin && <li><a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}
                        </ul>
                    </Col>
                </Row>
                <hr />
                <div className="d-flex justify-content-between small">
                    <span>© {year} {siteConfig.brand}. Todos los derechos reservados.</span>
                    <span>Hecho con ❤️ en Paraguay por <a
                        href="https://portfolio-fedebarriosd.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="developer-credit"
                    >
                        Fede Barrios
                    </a></span>
                </div>
            </Container>
        </footer>
    );
}
