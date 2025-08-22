import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import siteConfig from "../siteConfig";

export default function Contact() {
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

        // Honeypot (campo oculto). Si viene con valor => bot.
        if (form.get("company")) {
            setErr("Error de validación.");
            setLoading(false);
            return;
        }

        // Time trap (si envió en < 3s, probablemente bot)
        const elapsed = (Date.now() - startedAtRef.current) / 1000;
        if (elapsed < 3) {
            setErr("Por favor, completá el formulario.");
            setLoading(false);
            return;
        }

        // Campos útiles para Formspree
        form.set("_subject", `Nuevo mensaje: ${form.get("subject") || "Contacto Web"}`);
        form.set("_replyto", form.get("email") || "");
        form.set("_gotcha", ""); // compat clásico (opcional)

        try {
            const endpoint = `https://formspree.io/f/${siteConfig.formspreeId}`;
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: form,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.errors?.[0]?.message || "No se pudo enviar el mensaje.");
            }

            setOk(true);
            (e.target).reset();
            startedAtRef.current = Date.now(); // reset para nuevo envío
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
                        <p className="text-muted">
                            Escribime para consultas, turnos o prensa. Te responderé a la brevedad.
                        </p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={7}>
                        <Card className="p-4">
                            <Form onSubmit={handleSubmit} noValidate>
                                {/* Honeypot (oculto) */}
                                <Form.Group className="d-none" controlId="company">
                                    <Form.Label>Empresa</Form.Label>
                                    <Form.Control name="company" autoComplete="off" tabIndex={-1} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Nombre y apellido</Form.Label>
                                    <Form.Control name="name" required placeholder="Tu nombre" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" required placeholder="tu@email.com" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Teléfono (opcional)</Form.Label>
                                    <Form.Control name="phone" placeholder="+595 ..." />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="subject">
                                    <Form.Label>Asunto</Form.Label>
                                    <Form.Control name="subject" required placeholder="Motivo de tu consulta" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="message">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="message" required placeholder="Contame brevemente..." />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="consent">
                                    <Form.Check
                                        name="consent"
                                        required
                                        label={<>Acepto la <a href={siteConfig.privacyUrl}>política de privacidad</a>.</>}
                                    />
                                </Form.Group>

                                {ok && <Alert variant="success">¡Gracias! Tu mensaje fue enviado.</Alert>}
                                {err && <Alert variant="danger">{err}</Alert>}

                                <div className="d-flex gap-3">
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

                    <Col md={5}>
                        <Card className="p-4 h-100">
                            <h5 className="mb-3" style={{ color: "var(--primario-oscuro)" }}>Información</h5>
                            <p className="mb-1"><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                            <p className="mb-1"><strong>Teléfono:</strong> <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></p>
                            <p className="mb-1"><strong>Dirección:</strong> <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">{siteConfig.address}</a></p>
                            <p className="mb-3"><strong>Horario:</strong> {siteConfig.hours}</p>

                            {siteConfig.mapsUrl && (
                                <a className="btn btn-outline-secondary mb-3" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
                                    Ver en Google Maps
                                </a>
                            )}

                            <div className="d-flex gap-3 flex-wrap">
                                {siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">Instagram</a>}
                                {siteConfig.social.facebook && <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">Facebook</a>}
                                {siteConfig.social.youtube && <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer">YouTube</a>}
                                {siteConfig.social.linkedin && <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
