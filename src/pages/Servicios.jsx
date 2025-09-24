import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import useReveal from "../hooks/useReveal";
import "../styles/Servicios.css";

function ServiceBlock({ item, reverse, altBg }) {
  const imgRev = useReveal({ threshold: 0.2 });
  const txtRev = useReveal({ threshold: 0.2 });

  const bgUrl = item.image ?? `/services/${item.id}.jpg`;

  return (
    <Row
      id={item.id}
      className={`service-block align-items-center g-4 ${reverse ? "flex-md-row-reverse" : ""} ${
        altBg ? "service-block--alt" : ""
      }`}
    >
      <Col md={6}>
        <div
          ref={imgRev.ref}
          className={`service-illustration reveal fade-up ${imgRev.visible ? "is-visible" : ""} rounded shadow-sm`}
          style={{ backgroundImage: `url('${bgUrl}')` }}
          role="img"
          aria-label={item.photoAlt}
        />
      </Col>

      <Col md={6}>
        <div
          ref={txtRev.ref}
          className={`reveal fade-up ${txtRev.visible ? "is-visible" : ""}`}
          style={{ "--d": "80ms" }}
        >
          <h3 className="mb-3" style={{ color: "var(--primario-oscuro)" }}>
            {item.title}
          </h3>
          {item.paragraphs.map((p, i) => (
            <p key={i} className={i === item.paragraphs.length - 1 ? "mb-0" : ""}>
              {p}
            </p>
          ))}
        </div>
      </Col>
    </Row>
  );
}

const data = [
  {
    id: "depresion",
    title: "🧠 Terapia para la Depresión",
    paragraphs: [
      "La depresión no es simplemente “estar triste”. Es una carga que roba energía, motivación y la capacidad de disfrutar la vida.",
      "En terapia trabajaremos juntos para que puedas comprender tus emociones, superar la sensación de vacío y recuperar tu fuerza vital. A través de técnicas basadas en la psicología clínica y el acompañamiento cercano, mi objetivo es ayudarte a reencontrarte con tu propósito y volver a conectar con la esperanza."
    ],
    photoHint: "persona disfrutando la vida",
    photoAlt: "Persona disfrutando de la vida."
  },
  {
    id: "ansiedad",
    title: "🌪️ Terapia para la Ansiedad",
    paragraphs: [
      "La ansiedad se manifiesta como pensamientos que no paran, insomnio, tensión en el cuerpo y una sensación constante de alerta.",
      "En las sesiones aprenderás a identificar los desencadenantes, regular tus emociones y entrenar tu mente para recuperar la calma. Con herramientas de psicología cognitiva, técnicas de regulación emocional y un enfoque integrador, te acompañaré a transformar la ansiedad en equilibrio y seguridad interior."
    ],
    photoHint: "alguien en contacto con la naturaleza",
    photoAlt: "Persona en la naturaleza."
  },
  {
    id: "pareja",
    title: "💞 Terapia de Pareja",
    paragraphs: [
      "Toda relación pasa por momentos difíciles: discusiones constantes, silencios que duelen, desconfianza o sensación de distancia.",
      "Mi enfoque es ayudar a la pareja a comunicarse mejor, comprender sus diferencias y construir nuevamente la confianza y el respeto. A través de la terapia aprenderán a transformar las crisis en oportunidades para fortalecer el vínculo, recuperando la complicidad y el amor."
    ],
    photoHint: "dos personas caminando",
    photoAlt: "Pareja caminando junta."
  },
  {
    id: "autoestima",
    title: "🌱 Autoestima y Desarrollo Personal",
    paragraphs: [
      "Tu autoestima es la base de tu bienestar emocional y de relaciones sanas. Si no te valorás, es difícil poner límites y elegir lo que realmente mereces.",
      "En terapia trabajaremos en fortalecer tu autoconfianza, derribar creencias limitantes y acompañarte en un proceso de crecimiento personal. El objetivo es que vuelvas a sentir seguridad en vos mismo y desarrolles la capacidad de construir la vida que deseás."
    ],
    photoHint: "persona en una montaña",
    photoAlt: "Persona en la cima de una montaña."
  },
  {
    id: "post-divorcio",
    title: "💔 Recuperación Pos Divorcio",
    paragraphs: [
      "Un divorcio es mucho más que una separación legal; implica duelo, cambios profundos y la reconstrucción de tu identidad personal.",
      "En las sesiones te acompaño a transitar el dolor, soltar la carga emocional y redescubrirte desde un lugar más fuerte y consciente. Juntos trabajaremos en recuperar tu estabilidad, abrirte a nuevas oportunidades y construir un futuro con esperanza y confianza."
    ],
    photoHint: "persona abrazándose y mirando hacia arriba",
    photoAlt: "Persona abrazándose con mirada esperanzada."
  },
  {
    id: "ansiedad-pos-ruptura",
    title: "🌊 Sanar la Ansiedad Pos Ruptura",
    paragraphs: [
      "Las rupturas dejan huellas: miedo a estar solo, pensamientos obsesivos y ansiedad por lo que vendrá.",
      "La terapia está diseñada para ayudarte a gestionar esas emociones intensas, procesar el duelo y recuperar la paz mental. A través de un acompañamiento cercano y técnicas psicológicas efectivas, te guiaré a superar la ansiedad y transformar la ruptura en un camino de crecimiento personal."
    ],
    photoHint: "persona caminando al lado del mar",
    photoAlt: "Persona caminando junto al mar."
  },
  {
    id: "pericial",
    title: "📑 Informe Pericial",
    paragraphs: [
      "En procesos legales o judiciales, un informe psicológico pericial puede ser clave para esclarecer situaciones y brindar respaldo técnico.",
      "Con más de 25 años de experiencia clínica y formación especializada, elaboro informes periciales objetivos, éticos y con rigor profesional. El trabajo incluye evaluación exhaustiva, entrevistas, aplicación de test psicológicos y un dictamen fundamentado que pueda ser presentado en instancias legales."
    ],
    photoHint: "documentos o expediente en escritorio",
    photoAlt: "Documentos y expediente sobre un escritorio."
  }
];

export default function ServiciosPage() {
  return (
    <section className="py-5">
      <Container>
        <header className="services-header text-center mb-4">
          <h1 style={{ color: "var(--primario-claro)" }}>Servicios</h1>
          <p className="text-muted">
            Acompañamiento profesional, humano y basado en evidencia para cada etapa
            de tu proceso.
          </p>

        {/* Navegación interna */}
          <ul className="services-nav list-unstyled d-flex gap-2 flex-wrap justify-content-center mt-3">
            {data.map((s) => (
              <li key={s.id}>
                <a className="btn btn-light-pill" href={`#${s.id}`}>
                  {s.title.replace(/^[^\w]*\s*/, "") /* título sin emoji */}
                </a>
              </li>
            ))}
          </ul>
        </header>

        {/* Bloques: alternamos layout y fondo en el mismo patrón */}
        {data.map((item, i) => (
          <ServiceBlock
            key={item.id}
            item={item}
            reverse={i % 2 === 1}
            altBg={i % 2 === 1}   // <- mismos “pares” que van a la derecha
          />
        ))}

        {/* CTA final */}
        <div className="text-center mt-5">
          <Button variant="salmon" size="lg" href="/contacto">
            Agendar una consulta
          </Button>
        </div>
      </Container>
    </section>
  );
}
