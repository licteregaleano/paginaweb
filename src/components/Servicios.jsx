import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserMd, FaHeart, FaLaptopMedical } from 'react-icons/fa';
import '../styles/Servicios.css';

const servicios = [
  {
    titulo: 'Terapia Individual',
    descripcion: 'Acompañamiento psicológico personalizado para trabajar ansiedad, depresión, autoestima, entre otros.',
    icono: <FaUserMd size={40} />
  },
  {
    titulo: 'Terapia de Pareja',
    descripcion: 'Sesiones centradas en la comunicación, el respeto y la reconstrucción del vínculo afectivo.',
    icono: <FaHeart size={40} />
  },
  {
    titulo: 'Consultas Online',
    descripcion: 'Atención a distancia por videollamada, con el mismo compromiso y calidez que en el consultorio.',
    icono: <FaLaptopMedical size={40} />
  }
];

const Servicios = () => {
  return (
    <section className="servicios-section py-5" id="servicios">
      <Container>
        <h2 className="text-center mb-5" style={{ color: 'var(--azul-oscuro)' }}>Servicios</h2>
        <Row>
          {servicios.map((servicio, i) => (
            <Col md={4} className="mb-4" key={i}>
              <Card className="servicio-card text-center h-100 p-3 shadow-sm">
                <div className="mb-3 text-salmon">{servicio.icono}</div>
                <Card.Title>{servicio.titulo}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Servicios;
