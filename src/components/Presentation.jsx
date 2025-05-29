// src/components/Presentation.jsx
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
            <h2 className="mb-3" style={{ color: 'var(--primario-oscuro)' }}>
              Dra. Teresa Galeano
            </h2>
            <h5 className="text-muted mb-4">
              Psicóloga Clínica · Psicoterapeuta · Máster en Psicología
            </h5>
            {/* Pega aquí el texto “SOBRE MÍ” del CV */}
            <p>
              Psicóloga por vocación y pasión. Desde hace más de 25 años acompaño a
              personas en su camino hacia la salud emocional y la reconstrucción de
              sus vidas. A través de mi consultorio privado y mis espacios digitales,
              he ayudado a cientos de pacientes a superar la ansiedad, la depresión,
              los conflictos de pareja, el insomnio, los trastornos alimenticios, y las
              heridas que dejan las separaciones y la baja autoestima.
            </p>
            <p>
              Soy Licenciada en Psicología por la Universidad Católica de Asunción,
              Máster en Psicología Social con énfasis en Terapia Familiar y de Pareja,
              y Doctora por la Universidad Interamericana. Me he especializado en el
              exterior y, más allá de los títulos, lo que me define es una combinación
              de profesionalismo, calidez, empatía y una escucha que transforma.
            </p>
            <p>
              Como madre de tres varones, la vida me mostró que el caos puede ser hermoso
              y que sanar no es un lujo, es una urgencia emocional.
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
