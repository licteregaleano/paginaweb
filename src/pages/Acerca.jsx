// src/pages/SobreMi.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Acerca.css';

const Acerca = () => (
  <Container className="mt-5">
    <h1 className="titulo-sobremi">Quién soy</h1>

    {/* PRESENTACIÓN CORTA */}
    <section className="mb-5">
      <p>
        Soy <strong>Teresa Galeano</strong>, psicóloga clínica formada en la
        Universidad Católica de Asunción (UCA) con más de <strong>25 años de
        experiencia</strong>. Desde 2003 soy <strong>docente</strong> en la UCA y
        en 2008 culminé mi <strong>Máster en Terapia Familiar</strong>.
        Atiendo en consultorio, doy conferencias y creo contenidos educativos
        en redes sociales desde 2014.
      </p>
    </section>

    {/* TRAYECTORIA ACADÉMICA */}
    <section className="mb-5">
      <h2>Trayectoria académica</h2>
      <ul>
        <li>
          <strong>Psicóloga clínica – UCA (1997)</strong>.
        </li>
        <li>
          <strong>Docente universitaria – UCA (desde 2003)</strong>.
        </li>
        <li>
          <strong>Máster en Terapia Familiar (2008)</strong>.
        </li>
        <li>
          Diplomada en <em>Psicología Cognitiva y Neurociencias</em>.
        </li>
      </ul>
    </section>

    {/* EXPERIENCIA PROFESIONAL Y DIVULGACIÓN */}
    <section className="mb-5">
      <h2>Experiencia profesional y divulgación</h2>
      <ul>
        <li>
          <strong>Consultorio clínico</strong> en diferentes temáticas: depresión,
          ansiedad, trastornos alimenticios, dificultades de pareja, terapia
          familiar y desarrollo personal.
        </li>
        <li>
          <strong>Más de 20.000 pacientes</strong> atendidos a lo largo de mi carrera,
          lo que me brindó una profunda comprensión de los desafíos actuales.
        </li>
        <li>
          <strong>Disertaciones y conferencias</strong> desde 1997 en congresos de
          Psicología, Nutrición y Psiquiatría, además de charlas para padres y
          alumnos en instituciones educativas.
        </li>
        <li>
          <strong>Psicóloga digital</strong> desde 2014: publicaciones y videos
          educativos en Facebook e Instagram.
        </li>
      </ul>
    </section>

    {/* ENFOQUE TERAPÉUTICO */}
    <section className="mb-5">
      <h2>Enfoque terapéutico</h2>
      <p>
        Mi práctica se apoya en una combinación de <strong>terapia sistémica</strong>,
        <strong> psicología positiva</strong> y <strong>análisis interpersonal</strong>,
        integrando el trabajo <strong>mente-cuerpo</strong> y técnicas
        <strong> cognitivo-conductuales</strong> para realizar evaluaciones precisas y
        tratamientos efectivos.
      </p>
      <p className="mb-0">
        En los últimos 10 años profundicé especialmente en los <strong>vínculos de
        pareja</strong>: autoestima, dependencias emocionales, relaciones tóxicas,
        rupturas, ansiedad y depresión asociadas.
      </p>
    </section>

    {/* LÍNEAS DE ATENCIÓN */}
    <section className="mb-5">
      <h2>Áreas de atención</h2>
      <ul>
        <li>Psicoterapia para adultos</li>
        <li>Crisis y conflictos de pareja</li>
        <li>Autoestima, dependencia emocional y vínculos sanos</li>
        <li>Ansiedad, depresión y estrés</li>
        <li>Trastornos alimenticios</li>
        <li>Trastornos del sueño y síntomas psicosomáticos</li>
        <li>Terapia familiar y desarrollo personal</li>
      </ul>
    </section>

    {/* METODOLOGÍA Y PROPÓSITO */}
    <section className="mb-5">
      <h2>Metodología y propósito</h2>
      <p>
        Mi enfoque hacia el tratamiento integra una <strong>ruta psicológica</strong> con
        <strong> integración corporal</strong> y un <strong>asesoramiento cercano y
        personal</strong>. El objetivo es acompañarte a encontrar equilibrio físico y
        mental, clarificar propósitos y <strong>canalizar tus emociones</strong> con una
        mirada positiva de la vida, fomentando la <strong>paz mental</strong> y la
        <strong> tranquilidad emocional</strong>.
      </p>
    </section>

    {/* MISIÓN PERSONAL */}
    <section className="mb-5">
      <h2>Misión personal</h2>
      <p className="mb-0">
        Desde muy joven tuve claro que la psicología no es solo una vocación: es
        mi <strong>misión</strong>. Acompañar a las personas en su proceso de
        transformación y crecimiento humano es el centro de mi trabajo.
      </p>
    </section>
  </Container>
);

export default Acerca;
