import { Container, Row, Col, Button } from 'react-bootstrap';
import Servicios from '../components/Servicios';

const Home = () => {
  return (
    <Container className="mt-5">
      {/* Encabezado */}
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Dra. Teresa Galeano</h1>
          <h4 className="text-center text-muted">Psicóloga Clínica y Psicoterapeuta</h4>
        </Col>
      </Row>

      {/* Presentación breve */}
      <Row className="mb-5">
        <Col md={{ span: 8, offset: 2 }}>
          <p>
            Soy psicóloga por vocación y por pasión. Trabajo en mi consultorio privado desde hace 25 años, ayudando a cientos de pacientes a resolver 
            problemas como depresión, ansiedad, problemas de sueño, problemas de pareja, autoestima, recuperación pos separación, trastornos 
            alimenticios y entre otros. Soy Licenciada en Psicología por la Universidad Católica de Asunción. También tengo un Máster en Psicología 
            social con énfasis en Terapia Familiar y de Pareja. Tengo varios posgrados en el exterior y culminé un Doctorado en la Universidad 
            Interamericana.
          </p>
        </Col>
      </Row>

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
