import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import doctoraImage from '../assets/doctora7.jpg';

const Presentation = () => {
  return (
    <section className="presentation-section py-5" id="presentacion">
      <Container>
        <Row className="align-items-center">
          {/* Texto primero en md+ */}
          <Col xs={12} md={8} className="order-md-1">
            <h2 className="mb-3" style={{ color: 'var(--azul-oscuro)' }}>
              Dra. Teresa Galeano
            </h2>
            <h5 className="text-muted mb-4">
              Psicóloga Clínica · Psicoterapeuta · Máster en Psicología
            </h5>
            <p>
              Soy licenciada en Psicología por la Universidad Católica de Asunción,
              con más de 25 años de experiencia ayudando a pacientes a superar
              depresión, ansiedad, trastornos de sueño, conflictos de pareja y
              desarrollo personal. Completé mi Doctorado en la Universidad Interamericana
              y varios posgrados en el exterior, especializándome en Terapia Familiar
              y de Pareja.
            </p>
          </Col>

          {/* Foto a la derecha en md+ */}
          <Col
            xs={12}
            md={4}
            className="text-center mb-4 mb-md-0 order-md-2"
          >
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
