// src/components/Presentation.jsx
import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import doctoraImage from '../assets/doctora7.jpg';

const Presentation = () => {
  return (
    <section className="presentation-section py-5" id="presentacion">
      <Container>
        <Row className="align-items-center">
          {/* Texto */}
          <Col xs={12} md={8} className="order-md-1">
            <h2 className="mb-3" style={{ color: 'var(--primario-oscuro)' }}>
              Dra. Teresa Galeano
            </h2>
            <h5 className="text-muted mb-4">
              Psicóloga Clínica · Docente UCA · Máster en Terapia Familiar
            </h5>

            <p>
              Psicóloga clínica formada en la Universidad Católica de Asunción
              (1997), con más de <strong>25 años de experiencia</strong> y
              docente universitaria desde 2003. Máster en Terapia Familiar (2008).
            </p>
            <p>
              Acompañé a <strong>más de 20.000 pacientes</strong> en procesos de
              ansiedad, depresión, vínculos de pareja y desarrollo personal.
              Desde 2014 genero <strong>contenidos educativos</strong> en redes
              sociales (Facebook e Instagram).
            </p>
            <p className="mb-4">
              Mi enfoque integra <em>terapia sistémica</em>, <em>psicología positiva</em>,
              <em> análisis interpersonal</em> y trabajo <em>mente-cuerpo</em>, con
              herramientas <em>cognitivo-conductuales</em>.
            </p>

            <Button variant="outline-secondary" href="/acerca">
              Ver perfil completo
            </Button>
          </Col>

          {/* Foto */}
          <Col xs={12} md={4} className="text-center mb-4 mb-md-0 order-md-2">
            <Image
              src={doctoraImage}
              alt="Dra. Teresa Galeano"
              roundedCircle
              fluid
              style={{ maxWidth: '250px' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Presentation;
