import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Servicios.css';
import useReveal from '../hooks/useReveal';

const IMG_BASE = '../src/assets/services';

const serviciosHome = [
  {
    id: 'depresion',
    titulo: 'Terapia para la Depresión',
    desc: 'Recuperá energía, motivación y esperanza con un abordaje clínico cercano.',
    img: `${IMG_BASE}/depresion.jpg`,
  },
  {
    id: 'ansiedad',
    titulo: 'Terapia para la Ansiedad',
    desc: 'Identificá disparadores, regulá emociones y entrená tu mente para la calma.',
    img: `${IMG_BASE}/ansiedad.jpg`,
  },
  {
    id: 'pareja',
    titulo: 'Terapia de Pareja',
    desc: 'Mejorá la comunicación, reconstruí la confianza y fortalecé el vínculo.',
    img: `${IMG_BASE}/pareja.jpg`,
  },
  {
    id: 'autoestima',
    titulo: 'Autoestima y Desarrollo Personal',
    desc: 'Fortalecé tu autoconfianza y derribá creencias limitantes.',
    img: `${IMG_BASE}/autoestima.jpg`,
  },
  {
    id: 'post-divorcio',
    titulo: 'Recuperación Pos Divorcio',
    desc: 'Acompañamiento para transitar el duelo y reconstruir tu proyecto de vida.',
    img: `${IMG_BASE}/post-divorcio.jpg`,
  },
  {
    id: 'ansiedad-pos-ruptura',
    titulo: 'Ansiedad Pos Ruptura',
    desc: 'Gestioná emociones intensas y convertí la ruptura en crecimiento personal.',
    img: `${IMG_BASE}/ansiedad-pos-ruptura.jpg`,
  },
  {
    id: 'pericial',
    titulo: 'Informe Pericial',
    desc: 'Evaluaciones e informes psicológicos con rigor técnico para instancias legales.',
    img: `${IMG_BASE}/pericial.jpg`,
  },
];

// Card clickeable con imagen de fondo
function ServicioCard({ item, delay = 0 }) {
  const { ref, visible } = useReveal();
  return (
    <Col
      md={6}
      lg={4}
      className={`mb-4 reveal fade-up ${visible ? 'is-visible' : ''}`}
      ref={ref}
      style={{ '--d': `${delay}ms` }}
    >
      <a href={`/servicios#${item.id}`} className="servicio-link">
        <Card className="servicio-card h-100 shadow-sm lift">
          <div
            className="servicio-thumb"
            style={{ backgroundImage: `url('${item.img}')` }}
            role="img"
            aria-label={item.titulo}
          />
          <Card.Body>
            <Card.Title className="mb-2" style={{ color: 'var(--primario-oscuro)' }}>
              {item.titulo}
            </Card.Title>
            <Card.Text className="text-muted mb-0">{item.desc}</Card.Text>
          </Card.Body>
        </Card>
      </a>
    </Col>
  );
}

const Servicios = () => {
  return (
    <section className="servicios-section py-5" id="servicios">
      <Container>
        <h2 className="text-center mb-4" style={{ color: 'var(--azul-oscuro)' }}>
          Servicios
        </h2>
        <p className="text-center text-muted mb-5">
          Abordajes profesionales para distintos momentos de tu vida emocional.
        </p>
        <Row className='justify-content-center'>
          {serviciosHome.map((s, i) => (
            <ServicioCard key={s.id} item={s} delay={i * 100} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Servicios;
