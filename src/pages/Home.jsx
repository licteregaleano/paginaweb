import { Container, Row, Col, Button } from 'react-bootstrap';
import Hero from '../components/Hero';
import Presentation from '../components/Presentation';

const Home = () => {
  return (
    <Container className="mt-5">
      <Hero />
      <Presentation />

      {/* Servicios destacados */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center">Servicios</h2>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={4}>
          <h5>Tratamiento Individual</h5>
          <p>Atención personalizada para abordar diversas problemáticas emocionales y psicológicas.</p>
        </Col>
        <Col md={4}>
          <h5>Terapia de Parejas</h5>
          <p>Sesiones enfocadas en mejorar la comunicación y resolver conflictos en la relación.</p>
        </Col>
        <Col md={4}>
          <h5>Desarrollo Personal y Autoestima</h5>
          <p>Herramientas y acompañamiento para fortalecer la confianza y el crecimiento personal.</p>
        </Col>
      </Row>

      {/* Testimonios */}
      <Row className="mb-5" id="testimonios">
        <Col>
          <h2 className="text-center">Testimonios</h2>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={6}>
          <blockquote className="blockquote">
            <p>"Gracias a la Dra. Teresa, he logrado superar momentos muy difíciles en mi vida."</p>
            <footer className="blockquote-footer">Paciente anónimo</footer>
          </blockquote>
        </Col>
        <Col md={6}>
          <blockquote className="blockquote">
            <p>"Su profesionalismo y empatía me ayudaron a encontrar el equilibrio que necesitaba."</p>
            <footer className="blockquote-footer">Paciente anónimo</footer>
          </blockquote>
        </Col>
      </Row>

      {/* Llamado a la acción */}
      <Row className="text-center">
        <Col>
          <Button variant="salmon" size="lg" href="/contacto">
            Agendar una consulta
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
