import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import siteConfig from "../siteConfig";
import "../styles/Privacidad.css";

export default function Privacidad() {
  const effectiveDate = "1 de octubre de 2025"; // cambiá cuando actualices la política

  return (
    <section className="privacy-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            <header className="mb-4 text-center">
              <h1 className="privacy-title">Política de Privacidad</h1>
              <p className="text-muted mb-0">Última actualización: {effectiveDate}</p>
            </header>

            <Card className="privacy-card shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <p className="lead mb-4">
                  En <strong>{siteConfig.brand}</strong> nos comprometemos a proteger tu privacidad.
                  Esta política explica qué datos recolectamos, para qué los usamos y tus opciones.
                </p>

                <h3 id="que-recolectamos" className="privacy-h3">Qué datos recolectamos</h3>
                <ul>
                  <li><strong>Datos que nos enviás:</strong> nombre, email, teléfono y mensaje, cuando completás el formulario de contacto.</li>
                  <li><strong>Datos técnicos:</strong> información del navegador/dispositivo, páginas visitadas y métricas de uso (a través de herramientas de analítica).</li>
                </ul>

                <h3 id="como-usamos" className="privacy-h3">Cómo usamos los datos</h3>
                <ul>
                  <li>Responder consultas, coordinar turnos y brindar atención al cliente.</li>
                  <li>Mejorar el contenido y la experiencia del sitio.</li>
                  <li>Medir alcance y rendimiento de nuestras campañas.</li>
                </ul>

                <hr className="my-4" />

                <h3 id="herramientas-terceros" className="privacy-h3">Herramientas de terceros que utilizamos</h3>

                <h4 className="privacy-h4">1) Google Ads / Google Analytics (Google LLC)</h4>
                <p>
                  Este sitio utiliza etiquetas de Google (por ejemplo, <em>Google Ads</em> y/o <em>Google Analytics</em>) para
                  medir visitas y el rendimiento de campañas. Estas herramientas pueden usar cookies u otros identificadores
                  para recolectar datos técnicos no identificables. Más info en la{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Política de Privacidad de Google</a>{" "}
                  y en{" "}
                  <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer">
                    Cookies de Google
                  </a>.
                </p>

                <h4 className="privacy-h4">2) Formspree (envío de formularios)</h4>
                <p>
                  El formulario de contacto se procesa a través de Formspree para enviarnos tu consulta por email. Al
                  enviar el formulario, los datos que ingresás (p. ej. nombre, email, mensaje) se transmiten de forma segura
                  a ese servicio. Podés consultar su política en{" "}
                  <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noreferrer">Formspree Privacy</a>.
                </p>

                <h4 className="privacy-h4">3) WhatsApp (enlaces de contacto)</h4>
                <p>
                  Al hacer clic en el botón de WhatsApp, se abrirá un chat con el número de contacto que definimos en{" "}
                  <code>siteConfig</code>. Si completaste el formulario, podemos prellenar el mensaje con tus datos,
                  <strong> pero no se envía nada automáticamente</strong>: solo al presionar enviar en WhatsApp.
                </p>

                <h4 className="privacy-h4">4) Google Maps (mapa incrustado)</h4>
                <p>
                  Mostramos un mapa de Google Maps para indicar la ubicación del consultorio. Google puede recoger datos
                  técnicos cuando se carga el iframe. Más info en la{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Política de Privacidad de Google</a>.
                </p>

                <h4 className="privacy-h4">5) Redes sociales (Instagram, Facebook, YouTube, LinkedIn)</h4>
                <p>
                  Enlazamos perfiles oficiales de redes sociales. Al salir de este sitio y visitar esas plataformas,
                  aplican sus propias políticas de privacidad.
                </p>

                <hr className="my-4" />

                <h3 id="cookies" className="privacy-h3">Cookies y tecnologías similares</h3>
                <p>
                  Usamos cookies necesarias para el funcionamiento del sitio y cookies de terceros (Google) para
                  analítica/medición. Podés bloquearlas desde la configuración de tu navegador.
                </p>

                <h3 id="base-legal" className="privacy-h3">Base legal</h3>
                <p>
                  Tratamos tus datos para prestarte el servicio solicitado (p. ej., responder consultas) y en nuestro
                  interés legítimo de mejorar el sitio y medir resultados. Nunca vendemos tus datos.
                </p>

                <h3 id="retencion" className="privacy-h3">Plazo de retención</h3>
                <p>
                  Conservamos los datos el tiempo necesario para responderte y gestionar tu consulta. Podés solicitar la
                  eliminación cuando quieras.
                </p>

                <h3 id="tus-derechos" className="privacy-h3">Tus derechos</h3>
                <ul>
                  <li>Acceder, actualizar o solicitar la eliminación de tus datos.</li>
                  <li>Oponerte a ciertos tratamientos o pedir limitación.</li>
                  <li>Si residís en una jurisdicción con autoridad de control (p. ej. UE), podés presentar una reclamación ante ella.</li>
                </ul>

                <h3 id="contacto" className="privacy-h3">Contacto</h3>
                <p className="mb-0">
                  Para ejercer tus derechos o hacer preguntas sobre esta política, escribinos a{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> o llamanos al{" "}
                  <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>. También podés visitarnos en{" "}
                  <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">{siteConfig.address}</a>.
                </p>
              </Card.Body>
            </Card>

            <p className="text-center mt-3 small text-muted">
              Si actualizamos esta política, publicaremos la nueva versión en esta página y cambiará la fecha de actualización.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
