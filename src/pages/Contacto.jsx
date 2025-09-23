import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Card, Ratio } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import siteConfig from "../siteConfig";
import "../styles/Contact.css";

export default function Contacto() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const startedAtRef = useRef(Date.now());
  const formRef = useRef(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setOk(false);
    setErr("");

    const formEl = e.currentTarget; // <form>
    const form = new FormData(formEl);

    // Honeypot
    if (form.get("company")) {
      setErr("Error de validación.");
      setLoading(false);
      return;
    }

    // Time trap
    const elapsed = (Date.now() - startedAtRef.current) / 1000;
    if (elapsed < 3) {
      setErr("Por favor, completá el formulario.");
      setLoading(false);
      return;
    }

    // Campos Formspree
    form.set("_subject", `Nuevo mensaje: ${form.get("subject") || "Contacto Web"}`);
    form.set("_replyto", form.get("email") || "");
    form.set("_gotcha", "");

    try {
      const endpoint = `https://formspree.io/f/${siteConfig.formspreeId}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || "No se pudo enviar el mensaje.");
      }

      setOk(true);
      formEl.reset();
      startedAtRef.current = Date.now();
    } catch (e) {
      setErr(e.message || "Error al enviar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  // ---- WhatsApp: solo manda texto si hay datos en el formulario ----
  function handleWhatsApp(e) {
    e.preventDefault();

    const formEl = formRef.current;
    const waNumber = String(siteConfig.whatsapp || "").replace(/\D+/g, "");
    if (!waNumber) {
      alert("Número de WhatsApp no configurado.");
      return;
    }

    if (!formEl) {
      window.open(`https://wa.me/${waNumber}`, "_blank", "noopener,noreferrer");
      return;
    }

    const data = new FormData(formEl);
    const name = (data.get("name") || "").trim();
    const email = (data.get("email") || "").trim();
    const phone = (data.get("phone") || "").trim();
    const subject = (data.get("subject") || "").trim();
    const message = (data.get("message") || "").trim();

    const hasAny =
      name.length > 0 || email.length > 0 || phone.length > 0 || subject.length > 0 || message.length > 0;

    if (!hasAny) {
      window.open(`https://wa.me/${waNumber}`, "_blank", "noopener,noreferrer");
      return;
    }

    const parts = ["Nuevo contacto desde la web:"];
    if (name) parts.push(`\nNombre: ${name}`);
    if (email) parts.push(`\nEmail: ${email}`);
    if (phone) parts.push(`\nTel: ${phone}`);
    if (subject) parts.push(`\nAsunto: ${subject}`);
    if (message) parts.push(`\n\nMensaje:\n${message}`);

    const texto = parts.join("");

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(texto)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 style={{ color: "var(--primario-claro)" }}>Contacto</h1>
            <p className="text-muted">
              Escribime para consultas, turnos o prensa. Te responderé a la brevedad.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {/* FORMULARIO */}
          <Col md={7}>
            <Card className="p-4">
              <Form onSubmit={handleSubmit} noValidate ref={formRef}>
                {/* Honeypot oculto */}
                <Form.Group className="d-none" controlId="company">
                  <label className="form-label" htmlFor="company">Empresa</label>
                  <Form.Control id="company" name="company" autoComplete="off" tabIndex={-1} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                  <label className="form-label" htmlFor="name">Nombre y apellido</label>
                  <Form.Control id="name" name="name" required placeholder="Tu nombre" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <label className="form-label" htmlFor="email">Email</label>
                  <Form.Control id="email" name="email" type="email" required placeholder="tu@email.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <label className="form-label" htmlFor="phone">Teléfono (opcional)</label>
                  <Form.Control id="phone" name="phone" placeholder="+595 ..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="subject">
                  <label className="form-label" htmlFor="subject">Asunto</label>
                  <Form.Control id="subject" name="subject" required placeholder="Motivo de tu consulta" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                  <label className="form-label" htmlFor="message">Mensaje</label>
                  <Form.Control id="message" as="textarea" rows={5} name="message" required placeholder="Contame brevemente..." />
                </Form.Group>

                {ok && <Alert variant="success">¡Gracias! Tu mensaje fue enviado.</Alert>}
                {err && <Alert variant="danger">{err}</Alert>}

                <div className="d-flex gap-3 flex-wrap">
                  <Button type="submit" variant="salmon" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar mensaje"}
                  </Button>

                  {siteConfig.bookingUrl && (
                    <a className="btn btn-outline-secondary" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
                      Reservar un turno
                    </a>
                  )}

                  <Button className="btn btn-whatsapp" onClick={handleWhatsApp}>
                    WhatsApp
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>

          {/* PANEL DERECHO: INFO + MAPA + REDES */}
<Col md={5}>
  <Card className="h-100 d-flex flex-column">
    <Card.Body className="p-4">
      <h5 className="mb-3" style={{ color: "var(--primario-oscuro)" }}>Información</h5>

      <p className="mb-1">
        <strong>Email:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
      <p className="mb-1">
        <strong>Teléfono:</strong> <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
      </p>
      <p className="mb-1">
        <strong>Dirección:</strong> <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">{siteConfig.address}</a>
      </p>
      <p className="mb-3"><strong>Horario:</strong> {siteConfig.hours}</p>

      {/* MAPA sin margen extra abajo (lo aporta el footer) */}
      {siteConfig.mapsEmbedSrc ? (
        <div className="rounded overflow-hidden shadow-sm mb-0">
          <Ratio aspectRatio="16x9">
            <iframe
              src={siteConfig.mapsEmbedSrc}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación en Google Maps"
            />
          </Ratio>
        </div>
      ) : (
        siteConfig.mapsUrl && (
          <a className="btn btn-outline-secondary mb-0" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
            Ver en Google Maps
          </a>
        )
      )}
    </Card.Body>

    {/* Footer fijo al fondo con padding simétrico */}
    <Card.Footer className="bg-transparent border-0 px-4 pt-3 pb-3 mt-auto">
      <div className="row g-2">
        {siteConfig.social.instagram && (
          <div className="col-12 col-sm-6">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn btn-instagram w-100 d-flex align-items-center justify-content-center"
            >
              <FaInstagram className="me-2" /> Instagram
            </a>
          </div>
        )}

        {siteConfig.social.facebook && (
          <div className="col-12 col-sm-6">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="btn btn-facebook w-100 d-flex align-items-center justify-content-center"
            >
              <FaFacebook className="me-2" /> Facebook
            </a>
          </div>
        )}

        {siteConfig.social.youtube && (
          <div className="col-12 col-sm-6">
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="btn btn-youtube w-100 d-flex align-items-center justify-content-center"
            >
              <FaYoutube className="me-2" /> YouTube
            </a>
          </div>
        )}

        {siteConfig.social.linkedin && (
          <div className="col-12 col-sm-6">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-linkedin w-100 d-flex align-items-center justify-content-center"
            >
              <FaLinkedin className="me-2" /> LinkedIn
            </a>
          </div>
        )}
      </div>
    </Card.Footer>
  </Card>
</Col>

        </Row>
      </Container>
    </section>
  );
}
