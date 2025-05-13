import { Container, Row, Col, Button } from 'react-bootstrap';
import Servicios from '../components/Servicios';
import Hero from '../components/Hero';
import Presentation from '../components/Presentation';

const Home = () => {
  return (
    <Container className="mt-5">
      <Hero />
      <Presentation />

      <Servicios />

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
