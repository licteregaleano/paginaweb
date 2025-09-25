import React, { useMemo, useState } from "react";
import { Container, Card, Badge, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { getAllPosts } from "./postLoader";
import "../styles/Blog.css";

function normalize(str = "") {
  return str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .toLowerCase()
    .trim();
}

export default function Blog() {
  const posts = getAllPosts();

  // Permite leer/escribir ?q= en la URL (opcional pero útil)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [q, setQ] = useState(initialQ);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return posts;

    return posts.filter((p) => {
      const haystack = [
        p.title,
        p.excerpt,
        ...(p.tags || []),
      ]
        .map(normalize)
        .join(" ");

      return haystack.includes(nq);
    });
  }, [q, posts]);

  const handleChange = (e) => {
    const v = e.target.value;
    setQ(v);
    // Sin recargar, actualizamos ?q= para compartir búsqueda
    if (v) setSearchParams({ q: v });
    else setSearchParams({});
  };

  const handleTagClick = (tag) => {
    const next = q ? `${q} ${tag}` : tag;
    setQ(next);
    setSearchParams({ q: next });
  };

  return (
    <section className="blog-section py-5">
      <Container>
        <h1 className="mb-3" style={{ color: "var(--primario-oscuro)" }}>
          Artículos
        </h1>

        {/* Buscador */}
        <Form className="mb-4">
          <Form.Control
            type="search"
            value={q}
            onChange={handleChange}
            placeholder="Buscar por título, resumen o etiquetas…"
            aria-label="Buscar artículos"
            className="blog-search"
          />
          {q && (
            <div className="small text-muted mt-2">
              Mostrando {filtered.length} resultado{s(filtered.length)} para “{q}”.
              <button
                type="button"
                className="btn btn-link btn-sm p-0 ms-2 align-baseline"
                onClick={() => { setQ(""); setSearchParams({}); }}
              >
                Limpiar
              </button>
            </div>
          )}
        </Form>

        {/* Masonry grid */}
        <div className="masonry">
          {filtered.length === 0 && (
            <div className="masonry-item">
              <Card className="blog-card">
                <Card.Body>
                  <Card.Title className="mb-2">Sin resultados</Card.Title>
                  <Card.Text>
                    No encontramos artículos que coincidan con tu búsqueda. Probá
                    con otras palabras clave o limpiá el filtro.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}

          {filtered.map((p) => (
            <article className="masonry-item" key={p.slug}>
              <Card className="blog-card lift">
                <Card.Body>
                  <Card.Title className="mb-2">{p.title}</Card.Title>

                  <div className="text-muted small mb-2">
                    {p.dateObj.toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <Card.Text className="mb-3">{p.excerpt}</Card.Text>

                  {p.tags?.length > 0 && (
                    <div className="mb-3">
                      {p.tags.map((t) => (
                        <Badge
                          bg="secondary"
                          className="me-2 tag-badge"
                          key={t}
                          onClick={() => handleTagClick(t)}
                          title={`Filtrar por "${t}"`}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Link to={`/blog/${p.slug}`} className="btn btn-salmon">
                    Leer más
                  </Link>
                </Card.Body>
              </Card>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function s(n) { return n === 1 ? "" : "s"; }
