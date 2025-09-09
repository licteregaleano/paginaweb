import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Card, Ratio } from "react-bootstrap";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import siteConfig from "../siteConfig";
import "../styles/Contact.css";

export default function Contacto() {
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(false);
    const [err, setErr] = useState("");
    const startedAtRef = useRef(Date.now());

    useEffect(() => { startedAtRef.current = Date.now(); }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setOk(false);
        setErr("");

        const form = new FormData(e.currentTarget);

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
            const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: form });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.errors?.[0]?.message || "No se pudo enviar el mensaje.");
            }
            setOk(true);
            e.currentTarget.reset();
            startedAtRef.current = Date.now();
        } catch (e) {
            setErr(e.message || "Error al enviar. Intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    const waHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
        "Hola Teresa, me gustaría agendar una consulta."
    )}`;

    return (
        <section className="py-5">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h1 style={{ color: "var(--primario-claro)" }}>Contacto</h1>
                        <p className="text-muted">Escribime para consultas, turnos o prensa. Te responderé a la brevedad.</p>
                    </Col>
                </Row>

                <Row className="g-4">
                    {/* FORMULARIO */}
                    <Col md={7}>
                        <Card className="p-4">
                            <Form onSubmit={handleSubmit} noValidate>
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
                                    <a className="btn btn-success" href={waHref} target="_blank" rel="noreferrer">
                                        WhatsApp
                                    </a>
                                </div>
                            </Form>
                        </Card>
                    </Col>

                    {/* PANEL DERECHO: INFO + MAPA + REDES */}
                    <Col md={5}>
                        <Card className="p-4 h-100">
                            <h5 className="mb-3" style={{ color: "var(--primario-oscuro)" }}>Información</h5>

                            <p className="mb-1"><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                            <p className="mb-1"><strong>Teléfono:</strong> <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></p>
                            <p className="mb-1"><strong>Dirección:</strong> <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">{siteConfig.address}</a></p>
                            <p className="mb-3"><strong>Horario:</strong> {siteConfig.hours}</p>

                            {/* EMBED MAPS (responsive). Si no hay embed, mostramos el botón. */}
                            {siteConfig.mapsEmbedSrc ? (
                                <div className="rounded overflow-hidden shadow-sm mb-3">
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
                                    <a className="btn btn-outline-secondary mb-3" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
                                        Ver en Google Maps
                                    </a>
                                )
                            )}

                            {/* CTA redes: más llamativos y anchos */}
                            <div className="row g-2">
                                {siteConfig.social.instagram && (
                                    <div className="col-12 col-sm-6">
                                        <a
                                            href={siteConfig.social.instagram}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-salmon w-100 d-flex align-items-center justify-content-center"
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
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
