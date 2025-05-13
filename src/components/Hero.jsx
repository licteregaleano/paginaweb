import { Button } from 'react-bootstrap';
import doctoraImage from '../assets/doctora1.jpg';
import '../styles/hero.css';
import { BiBorderRadius } from 'react-icons/bi';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-inner
                      d-flex
                      flex-column
                      align-items-center
                      flex-lg-row
                      align-items-lg-stretch">
        {/* Imagen */}
        <div className="hero-img
                        mb-4
                        mb-lg-0
                        mx-auto
                        mx-lg-0
                        me-lg-5
                        align-self-lg-stretch">
          <img
            src={doctoraImage}
            alt="Doctora Teresa Galeano"
            className="hero-img__inner img-fluid rounded shadow"
          />
        </div>

        {/* Texto */}
        <div className="hero-text d-flex flex-column justify-content-center">
          <h1>Te acompaño en tu camino hacia el bienestar emocional</h1>
          <p>
            Más de 25 años ayudando a personas a superar momentos difíciles y reconectar con su equilibrio interno.
          </p>
          <Button variant="salmon" size="lg" href="/contacto">
            Agendar una consulta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
