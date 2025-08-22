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

// --------------------- Generador de versión offline (ZIP) ---------------------
function getOfflineFiles({ categories }) {
    const title = "Juego para parejas - Versión Offline";

    // SVG favicon/logo con colores del sitio y las iniciales "TG"
    const svgLogo = `
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7A3E71"/>
      <stop offset="100%" stop-color="#E76F51"/>
    </linearGradient>
  </defs>
  <rect rx="28" ry="28" width="128" height="128" fill="url(#g)"/>
  <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, Segoe UI, Arial" font-size="56" font-weight="800"
        fill="#ffffff">TG</text>
</svg>`.trim();
    const faviconDataUrl = "data:image/svg+xml;utf8," + encodeURIComponent(svgLogo);

    const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#4B2946" />
  <title>${title}</title>
  <link rel="icon" href="${faviconDataUrl}" sizes="any" />
  <link rel="apple-touch-icon" href="${faviconDataUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="Versión offline del juego de preguntas para parejas." />
  <meta property="og:image" content="${faviconDataUrl}" />
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <main class="container">
    <img class="brand" src="${faviconDataUrl}" alt="Logo Teresa Galeano" />
    <h1>${title}</h1>
    <div class="card">
      <div class="row">
        <label for="category">Categoría</label>
        <select id="category" aria-label="Seleccionar categoría"></select>
      </div>
      <div class="row">
        <div id="counter" class="muted"></div>
      </div>
      <div class="question" id="question" aria-live="polite"></div>
      <textarea id="answer" rows="3" placeholder="Escribí tu respuesta aquí..." aria-label="Respuesta"></textarea>
      <div class="actions">
        <button id="prev" type="button">Anterior</button>
        <button id="next" type="button">Siguiente</button>
        <button id="export" type="button">Exportar respuestas (.txt)</button>
      </div>
    </div>
    <p class="muted small">
      Funciona 100% offline. Tus respuestas quedan en este navegador (no se suben a ningún lado).
      Consejo: usá <strong>Ctrl/Cmd + Enter</strong> para avanzar.
    </p>
  </main>
  <script src="./game.js"></script>
</body>
</html>`.trim();

    // 🎨 estilos con colores de la web
    const css = `
:root{
  --bg:#faf7f5;
  --card:#ffffff;
  --text:#2d2130;
  --muted:#6c5a6f;
  --primario-oscuro:#4B2946;
  --primario-claro:#7A3E71;
  --salmon:#E76F51;
  --br:14px;
}
*{box-sizing:border-box}
html,body{
  margin:0;padding:0;
  background:var(--bg);color:var(--text);
  font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif
}
.container{max-width:820px;margin:40px auto;padding:0 16px}
.brand{width:56px;height:56px;border-radius:14px;display:block;margin:0 0 12px}
h1{font-weight:800;letter-spacing:.2px;margin:0 0 20px;color:var(--primario-oscuro)}
.card{background:var(--card);border-radius:var(--br);padding:20px;box-shadow:0 10px 30px rgba(0,0,0,.07)}
.row{margin:10px 0}
label{display:block;font-weight:600;margin-bottom:6px;color:var(--primario-claro)}
select,textarea,button{font:inherit}
select,textarea{width:100%;padding:10px 12px;border:1px solid #e3dfe6;border-radius:10px;background:#fff}
textarea{resize:vertical}
.question{padding:12px 0;font-size:18px;font-weight:600;color:var(--primario-oscuro)}
.actions{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
button{padding:10px 14px;border:none;border-radius:10px;background:var(--primario-claro);color:white;cursor:pointer;transition:.2s}
button#next{background:var(--salmon)}
button:hover{opacity:.92}
button:disabled{opacity:.6;cursor:not-allowed}
.muted{color:var(--muted)}
.small{font-size:12px}
`.trim();

    // JS offline: lógica completa + persistencia local
    const js = `
// ---- Datos del juego (desde tu web) ----
const CATEGORIES = ${JSON.stringify(categories, null, 2)};

// ---- Estado ----
let catIdx = 0;
let qIdx = 0;
let answers = CATEGORIES.map(() => []);

// Restaurar desde localStorage si existe
try {
  const saved = JSON.parse(localStorage.getItem('minijuego_answers') || 'null');
  const savedCat = Number(localStorage.getItem('minijuego_catIdx') || '0');
  const savedQ = Number(localStorage.getItem('minijuego_qIdx') || '0');
  if (Array.isArray(saved) && saved.length === CATEGORIES.length) {
    answers = saved;
    catIdx = isNaN(savedCat) ? 0 : savedCat;
    qIdx = isNaN(savedQ) ? 0 : savedQ;
  }
} catch(e){ /* ignore */ }

// ---- UI refs ----
const $cat = document.getElementById('category');
const $question = document.getElementById('question');
const $answer = document.getElementById('answer');
const $prev = document.getElementById('prev');
const $next = document.getElementById('next');
const $export = document.getElementById('export');
const $counter = document.getElementById('counter');

// Poblar categorías
CATEGORIES.forEach((c, i) => {
  const opt = document.createElement('option');
  opt.value = i; opt.textContent = c.name;
  $cat.appendChild(opt);
});

function persist(){
  try {
    localStorage.setItem('minijuego_answers', JSON.stringify(answers));
    localStorage.setItem('minijuego_catIdx', String(catIdx));
    localStorage.setItem('minijuego_qIdx', String(qIdx));
  } catch(e){ /* ignore */ }
}

function render(){
  $cat.value = String(catIdx);
  const cat = CATEGORIES[catIdx];
  const q = cat.questions[qIdx];
  $question.textContent = q;
  $answer.value = answers[catIdx][qIdx] ?? '';
  $counter.textContent = \`\${cat.name} (\${qIdx+1} / \${cat.questions.length})\`;
  $prev.disabled = (catIdx === 0 && qIdx === 0);
  $next.textContent = (catIdx === CATEGORIES.length-1 && qIdx === cat.questions.length-1) ? 'Finalizar' : 'Siguiente';
}

$cat.addEventListener('change', e => {
  catIdx = Number(e.target.value); qIdx = 0; persist(); render();
});

$prev.addEventListener('click', () => {
  if (qIdx > 0) { qIdx--; }
  else if (catIdx > 0) { catIdx--; qIdx = CATEGORIES[catIdx].questions.length - 1; }
  persist(); render();
});

$next.addEventListener('click', () => {
  const v = $answer.value.trim() || '—sin respuesta—';
  answers[catIdx][qIdx] = v;
  const cat = CATEGORIES[catIdx];
  if (qIdx + 1 < cat.questions.length) qIdx++;
  else if (catIdx + 1 < CATEGORIES.length) { catIdx++; qIdx = 0; }
  else alert('¡Juego completado! Podés exportar tus respuestas.');
  persist(); render();
});

$answer.addEventListener('input', () => {
  // guardado en vivo
  answers[catIdx][qIdx] = $answer.value;
  persist();
});

$answer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault(); $next.click();
  }
});

// Exporta respuestas (.txt)
$export.addEventListener('click', () => {
  const lines = [];
  CATEGORIES.forEach((cat, i) => {
    lines.push('## ' + cat.name);
    cat.questions.forEach((q, j) => {
      const a = (answers[i] && answers[i][j]) ? answers[i][j] : '';
      lines.push(\`Q\${j+1}. \${q}\\nR: \${a}\\n\`);
    });
    lines.push('');
  });
  const blob = new Blob([lines.join('\\n')], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'respuestas_minijuego.txt';
  a.click();
  URL.revokeObjectURL(a.href);
});

render();
`.trim();

    return { html, css, js };
}
// -----------------------------------------------------------------------------


// --------------------------- Datos del juego web ------------------------------
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
// -----------------------------------------------------------------------------


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
            const res = await fetch("/api/create-checkout-session", { method: "POST" });
            if (!res.ok) throw new Error("No se pudo crear la sesión de pago.");
            const { id } = await res.json();
            const { error } = await stripe.redirectToCheckout({ sessionId: id });
            if (error) throw error;
        } catch (err) {
            setPayError(
                err?.message ?? "Ocurrió un problema iniciando el pago. Intenta de nuevo más tarde."
            );
        }
    };

    // ----------------------- Descarga tras pago (ZIP offline) -------------------
    if (isPaid && totalAnswered >= FREE_LIMIT) {
        const handleDownloadOffline = async () => {
            const [{ default: JSZip }, { saveAs }] = await Promise.all([
                import("jszip"),
                import("file-saver"),
            ]);

            const zip = new JSZip();
            const { html, css, js } = getOfflineFiles({ categories });

            zip.file("index.html", html);
            zip.file("style.css", css);
            zip.file("game.js", js);

            const blob = await zip.generateAsync({ type: "blob" });
            saveAs(blob, "Minijuego_Offline.zip");
        };

        return (
            <Container className="mt-5 text-center">
                <h2>¡Gracias por suscribirte!</h2>
                <p>Descargá la versión <strong>offline</strong> del minijuego (funciona sin internet):</p>
                <Button variant="salmon" onClick={handleDownloadOffline}>
                    Descargar Minijuego Offline (.zip)
                </Button>
                <p className="mt-3 text-muted">
                    Incluye <code>index.html</code>, <code>style.css</code> y <code>game.js</code>.
                    Abrí <strong>index.html</strong> y jugá sin conexión.
                </p>
            </Container>
        );
    }
    // ---------------------------------------------------------------------------

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
                        (Modo dev) Stripe no está configurado: agregá <code>VITE_STRIPE_PK</code> o <code>VITE_STRIPE_KEY</code>.
                    </p>
                )}
                {payError && <p className="mt-2 text-danger">{payError}</p>}
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
