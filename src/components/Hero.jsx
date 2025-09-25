import { Button } from 'react-bootstrap';
import doctoraImage from '../assets/doctora1.jpg';
import '../styles/hero.css';
import useReveal from '../hooks/useReveal';

const Hero = () => {
    const imgReveal = useReveal();
    const txtReveal = useReveal();

    return (
        <div className="hero-section">
            <div className="hero-inner d-flex flex-column align-items-center flex-lg-row align-items-lg-stretch">

                {/* Imagen (slide-right sutil) */}
                <div
                    ref={imgReveal.ref}
                    className={`hero-img mb-4 mb-lg-0 mx-auto mx-lg-0 me-lg-5 align-self-lg-stretch reveal slide-right ${imgReveal.visible ? "is-visible" : ""}`}
                    style={{ '--d': '60ms' }}
                >
                    <img
                        src={doctoraImage}
                        alt="Doctora Teresa Galeano"
                        className="hero-img__inner img-fluid rounded shadow"
                    />
                </div>

                {/* Texto (fade-up) */}
                <div
                    ref={txtReveal.ref}
                    className={`hero-text d-flex flex-column justify-content-center reveal fade-up ${txtReveal.visible ? "is-visible" : ""}`}
                    style={{ '--d': '140ms' }}
                >
                    <h1>Te acompaño en tu camino hacia el bienestar emocional</h1>
                    <p>
                        Más de 25 años ayudando a personas a superar momentos difíciles y reconectar con su equilibrio emocional.
                    </p>
                    <Button variant="salmon" size="lg" href="/contacto" className="hero-cta lift">
                        Agendar una consulta
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
