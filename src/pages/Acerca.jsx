// src/pages/SobreMi.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Acerca.css';

const SobreMi = () => (
  <Container className="mt-5">
    <h1 className="titulo-sobremi">Quién soy</h1>

    {/* SOBRE MÍ */}
    <section className="mb-5">
      <h2>SOBRE MÍ</h2>
      <p>
        Psicóloga por vocación y pasión. Desde hace más de 25 años acompaño a
        personas en su camino hacia la salud emocional y la reconstrucción de
        sus vidas. A través de mi consultorio privado y mis espacios digitales,
        he ayudado a cientos de pacientes a superar la ansiedad, la depresión,
        los conflictos de pareja, el insomnio, los trastornos alimenticios, y
        las heridas que dejan las separaciones y la baja autoestima.
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
    </section>

    {/* PROPUESTA DE VALOR */}
    <section className="mb-5">
      <h2>PROPUESTA DE VALOR</h2>
      <p>
        Acompaño procesos reales de transformación. Mi enfoque integra lo clínico
        con lo humano, lo académico con lo vivencial, y la terapia tradicional
        con herramientas de coaching y crecimiento personal. Mi propósito: ayudarte
        a dejar de sobrevivir y empezar a vivir con sentido, conexión y bienestar.
      </p>
    </section>

    {/* EXPERIENCIA PROFESIONAL */}
    <section className="mb-5">
      <h2>EXPERIENCIA PROFESIONAL</h2>

      <h5>Psicóloga Clínica – Consultorio Privado</h5>
      <p><em>1999 – Actualidad</em></p>
      <ul>
        <li>Más de 8.000 sesiones realizadas en terapia individual, de pareja y familiar.</li>
        <li>Casos abordados: depresión, ansiedad, insomnio, trastornos alimenticios, autoestima, duelos, separaciones, conflictos de pareja y relaciones tóxicas.</li>
        <li>Reconocida por mi estilo terapéutico cercano, profundo y transformacional.</li>
      </ul>

      <h5>Emprendedora Digital en Psicología y Bienestar Emocional</h5>
      <p><em>2019 – Actualidad</em></p>
      <ul>
        <li>Desarrollo de cursos, mentorías y programas online de salud mental y relaciones conscientes.</li>
        <li>Comunidad digital activa que busca crecer emocionalmente y sanar sus vínculos.</li>
        <li>Educación emocional accesible, humana y basada en ciencia.</li>
      </ul>

      <h5>Coach Profesional Certificada – International Coaching Community</h5>
      <ul>
        <li>Asesorías personalizadas en el ámbito de la salud mental con herramientas de coaching.</li>
        <li>Enfoque complementario a la psicoterapia para potenciar cambios concretos en la vida del paciente.</li>
      </ul>
    </section>

    {/* FORMACIÓN ACADÉMICA */}
    <section className="mb-5">
      <h2>FORMACIÓN ACADÉMICA</h2>
      <ul>
        <li>Licenciada en Psicología – Universidad Católica de Asunción</li>
        <li>Máster en Psicología Social con énfasis en Terapia Familiar y de Pareja</li>
        <li>Doctorado en Psicología – Universidad Interamericana</li>
        <li>Coach Profesional Certificada – International Coaching Community</li>
        <li>Posgrados internacionales en Terapia Sistémica, Comunicación Emocional, Trastornos del Estado de Ánimo, Psicología del Vínculo y Trauma</li>
      </ul>
    </section>

    {/* LÍNEAS DE ESPECIALIZACIÓN */}
    <section className="mb-5">
      <h2>LÍNEAS DE ESPECIALIZACIÓN</h2>
      <ul>
        <li>Psicoterapia para adultos</li>
        <li>Crisis y conflictos de pareja</li>
        <li>Comunicación emocional y vínculos sanos</li>
        <li>Ansiedad, depresión y estrés crónico</li>
        <li>Dependencia emocional y autoestima</li>
        <li>Trastornos del sueño y síntomas psicosomáticos</li>
        <li>Coaching emocional y desarrollo personal</li>
      </ul>
    </section>

    {/* FILOSOFÍA TERAPÉUTICA */}
    <section className="mb-5">
      <h2>MI FILOSOFÍA TERAPÉUTICA</h2>
      <p>
        Creo profundamente que sanar es posible. Y no se trata solo de entender
        el pasado, sino de reconstruir el presente con nuevas herramientas, nuevos
        vínculos y una nueva relación con uno mismo. Te acompaño a recorrer ese
        camino con profesionalismo, humanidad y una visión integradora.
      </p>
    </section>
  </Container>
);

export default SobreMi;
