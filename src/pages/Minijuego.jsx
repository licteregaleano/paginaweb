// src/components/Minijuego.jsx
import { Container, Button, Form, Card, ListGroup } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Lee la PK del entorno (por ejemplo VITE_STRIPE_PK o VITE_STRIPE_KEY)
const STRIPE_PK =
    import.meta.env.VITE_STRIPE_PK ?? import.meta.env.VITE_STRIPE_KEY ?? null;

// Solo crea la promesa si existe una PK válida
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : null;

// Límite gratuito de preguntas
const FREE_LIMIT = 15;

// Categorías y preguntas
const categories = [
    {
        name: "Divertidas",
        questions: [
            "¿Cuál fue tu primera impresión de mí?",
            "¿Creés en el amor a primera vista?",
            "¿Cuál es tu película favorita?",
            "¿Cuál es tu canción de karaoke favorita?",
            "¿Qué tipo de comida te gusta?",
            "¿Creés en los fantasmas?",
            "¿Cuál es tu color favorito?",
            "¿Cuál es tu libro favorito?",
            "¿Por qué terminó tu última relación?",
            "¿Qué es algo que realmente te asusta?",
            "¿Qué relación tenés con tu ex?",
            "¿Cuáles son las tareas del hogar que menos te gusta hacer?",
            "¿Cómo es un día perfecto para vos?",
            "¿Qué haces cuando te sentís estresado?",
            "¿Cuál es tu comida favorita para compartir en una cita nocturna?",
        ],
    },
    {
        name: "Pasado",
        questions: [
            "¿Quién fue tu primer amor y cómo era?",
            "¿Alguna vez te han engañado?",
            "¿Alguna vez has engañado a alguien?",
            "¿Sigues en contacto con algún amigo de la infancia?",
            "¿Tuviste una experiencia positiva en la escuela secundaria?",
            "¿Cuál fue el primer álbum que tuviste?",
            "¿Alguna vez has ganado un premio deportivo?",
            "¿Qué sientes por tus ex?",
            "¿Qué ha sido lo más atrevido que has hecho hasta ahora?",
            "¿Puedes describir cómo fue tu primer desamor?",
            "¿Qué es algo que solías creer sobre las relaciones pero que ya no crees?",
            "¿Eras 'popular' en la escuela secundaria?",
            "¿Qué es lo peor que te ha pasado?",
            "¿Qué es lo que más extrañas de la infancia?",
            "¿Cuál es tu mayor arrepentimiento en la vida hasta ahora?",
        ],
    },
    {
        name: "Futuro",
        questions: [
            "¿Es importante para vos formar una familia?",
            "¿Cómo ves nuestro futuro como pareja, tanto por separado como colectivamente?",
            "En cinco a diez años, ¿dónde te ves?",
            "¿Cómo te gustaría que sea nuestra futura casa?",
            "¿Cómo te sentís acerca de tener hijos?",
            "¿Querés ser dueño de una casa algún día?",
            "¿Hay algún lugar que te guste y que te gustaría mostrarme algún día?",
            "¿Alguna vez te mudarías para adaptarte a tu trabajo?",
            "¿Qué hay de nosotros que creés que funciona bien juntos? ¿Cómo nos equilibramos unos a otros?",
            "¿Hay algo que has soñado hacer durante mucho tiempo? ¿Por qué no lo has hecho?",
            "¿Cuáles son tus metas en la relación?",
            "¿Tenés algún hábito que quieras cambiar?",
            "¿Dónde te ves viviendo cuando te jubiles?",
            "¿Cuáles son sus prioridades y metas financieras?",
            "¿Tenés una corazonada secreta sobre cómo morirás?",
        ],
    },
    {
        name: "Valores",
        questions: [
            "Cuando tenés un mal día, ¿qué te hace sentir mejor?",
            "¿Cuáles son algunas de las cosas de mayor valor en su lista de deseos?",
            "Si pudieras adquirir una cualidad o habilidad, ¿cuál sería?",
            "¿Cuál creés que es tu mayor fortaleza en esta relación?",
            "¿Qué es algo de tu vida que nunca cambiarías por otra persona, incluyéndome a mí?",
            "¿Cuál es el lugar al que siempre has querido viajar?",
            "¿Sueles seguir tu cabeza o tu corazón cuando tomas decisiones?",
            "Si pudieras escribir una nota a tu yo más joven, ¿qué le dirías en solo cinco palabras?",
            "¿Qué es lo único que te hace sentir vivo?",
            "¿Crees que todo sucede por una razón, o simplemente encontramos razones después de que suceden las cosas?",
            "¿Qué es para vos una relación sana?",
            "¿Qué esperás aprender el próximo año?",
            "Si pudieras cambiar algo sobre la forma en que te criaron, ¿cuál sería?",
            "Si pudieras cambiar de vida con cualquiera, ¿a quién elegirías? ¿Y por qué?",
            "¿Cuál creés que fue tu momento más vulnerable en nuestra relación?",
        ],
    },
    {
        name: "Intimidad",
        questions: [
            "¿Cómo y qué aprendiste sobre el sexo mientras crecías?",
            "¿Dónde te gusta y no te gusta que te toquen?",
            "¿Cómo te sientes al ver porno?",
            "¿Cuál es tu mayor fantasía?",
            "¿Prefieres rapiditos o maratones?",
            "¿Cuál es tu parte favorita de mi cuerpo?",
            "¿Estás satisfecho con nuestra química e intimidad?",
            "¿Qué aprendiste sobre tu cuerpo en el último año que podría hacer tu vida sexual más divertida?",
            "¿En qué contexto te sientes más sexy?",
            "¿Qué es lo que nunca has hecho y te gustaría probar?",
            "¿Cuántas veces a la semana te gustaría tener sexo?",
            "¿Qué es lo mejor de nuestra vida sexual?",
            "¿Prefieres hacer el amor con las luces encendidas o en la oscuridad?",
            "Como pareja, ¿cuáles son nuestras fortalezas y debilidades sexuales?",
            "¿Cómo ves nuestra vida sexual cambiando a través de los años?",
        ],
    },
];

export default function Minijuego() {
    const [searchParams] = useSearchParams();
    const [isPaid, setIsPaid] = useState(false);
    const [catIdx, setCatIdx] = useState(0);
    const [qIdx, setQIdx] = useState(0);
    const [answers, setAnswers] = useState(categories.map(() => []));
    const [input, setInput] = useState("");
    const [finished, setFinished] = useState(false);
    const [payError, setPayError] = useState("");

    // Detecta pago exitoso via ?paid=true
    useEffect(() => {
        if (searchParams.get("paid") === "true") {
            setIsPaid(true);
        }
    }, [searchParams]);

    // Total de preguntas respondidas
    const totalAnswered = answers.reduce((sum, arr) => sum + arr.length, 0);

    const handleNext = () => {
        // Bloquea más allá del límite si no pagó
        if (totalAnswered >= FREE_LIMIT && !isPaid) return;

        const updated = answers.map((arr) => [...arr]);
        updated[catIdx].push(input.trim() || "—sin respuesta—");
        setAnswers(updated);
        setInput("");

        // Avanza pregunta o categoría
        if (qIdx + 1 < categories[catIdx].questions.length) {
            setQIdx(qIdx + 1);
        } else if (catIdx + 1 < categories.length) {
            setCatIdx(catIdx + 1);
            setQIdx(0);
        } else {
            setFinished(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleNext();
        }
    };

    // Inicia Stripe Checkout (protegido si no hay PK ni backend)
    const handleSubscribe = async () => {
        setPayError("");
        if (!stripePromise) {
            setPayError(
                "Pagos deshabilitados en desarrollo: falta VITE_STRIPE_PK/VITE_STRIPE_KEY."
            );
            return;
        }
        try {
            const stripe = await stripePromise;
            const res = await fetch("/api/create-checkout-session", {
                method: "POST",
            });
            if (!res.ok) {
                throw new Error("No se pudo crear la sesión de pago.");
            }
            const { id } = await res.json();
            const { error } = await stripe.redirectToCheckout({ sessionId: id });
            if (error) throw error;
        } catch (err) {
            setPayError(
                err?.message ??
                "Ocurrió un problema iniciando el pago. Intenta de nuevo más tarde."
            );
        }
    };

    // Paywall antes de terminar si no pagó
    if (!finished && totalAnswered >= FREE_LIMIT && !isPaid) {
        return (
            <Container className="mt-5 text-center">
                <h2>¡Has alcanzado el límite de preguntas gratuitas!</h2>
                <p>Realiza el pago para continuar con todo el juego completo.</p>

                <Button variant="primary" onClick={handleSubscribe}>
                    Comprar GS 30.000
                </Button>

                {!stripePromise && (
                    <p className="mt-3 text-warning">
                        (Modo dev) Stripe no está configurado: agrega{" "}
                        <code>VITE_STRIPE_PK</code> o <code>VITE_STRIPE_KEY</code> en tu
                        <code>.env.local</code>.
                    </p>
                )}
                {payError && <p className="mt-2 text-danger">{payError}</p>}
            </Container>
        );
    }

    // Descarga tras pago
    if (isPaid && totalAnswered >= FREE_LIMIT) {
        return (
            <Container className="mt-5 text-center">
                <h2>¡Gracias por suscribirte!</h2>
                <p>Pulsa para descargar el juego completo:</p>
                <a href="/Preguntas_Teresa_Completo.zip" download>
                    <Button variant="salmon">Descargar Minijuego Completo</Button>
                </a>
            </Container>
        );
    }

    // Vista final al terminar todas las preguntas
    if (finished) {
        return (
            <Container className="mt-5">
                <h1>¡Juego completado!</h1>
                {categories.map((cat, i) => (
                    <Card className="mb-4" key={i}>
                        <Card.Header as="h5">{cat.name}</Card.Header>
                        <ListGroup variant="flush">
                            {answers[i].map((resp, j) => (
                                <ListGroup.Item key={j}>
                                    <strong>Q{j + 1}:</strong> {cat.questions[j]}
                                    <br />
                                    <em>R:</em> {resp}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                ))}
            </Container>
        );
    }

    // Vista de pregunta activa
    const cat = categories[catIdx];
    const question = cat.questions[qIdx];

    return (
        <Container className="mt-5">
            <h2>
                {cat.name}{" "}
                <span style={{ color: "var(--primario-claro)" }}>
          ({qIdx + 1} / {cat.questions.length})
        </span>
            </h2>
            <Card className="p-3 mb-3">
                <Card.Text>{question}</Card.Text>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribí tu respuesta aquí..."
                />
            </Card>
            <Button variant="salmon" onClick={handleNext} className="me-3">
                {catIdx === categories.length - 1 &&
                qIdx === categories[catIdx].questions.length - 1
                    ? "Finalizar"
                    : "Siguiente"}
            </Button>
            <p className="mt-3 text-muted">
                Preguntas gratuitas restantes: {Math.max(FREE_LIMIT - totalAnswered, 0)}
            </p>
        </Container>
    );
}
