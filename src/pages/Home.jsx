import { Container, Row, Col, Button } from 'react-bootstrap';
import Servicios from '../components/Servicios';
import Hero from '../components/Hero';
import Presentation from '../components/Presentation';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <Container className="mt-5">
      <Hero />
      <Presentation />

      <Servicios />

      <Testimonials />

      {/* Llamado a la acción */}
      <Row className="text-center mb-5">
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
