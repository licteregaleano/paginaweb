import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { getPostBySlug } from './postLoader';
import '../styles/Blog.css';

export default function Post() {
    const { slug } = useParams();
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <Container className="py-5">
                <h1>No encontrado</h1>
                <p>El artículo no existe.</p>
                <Link to="/blog" className="btn btn-outline-secondary">Volver al blog</Link>
            </Container>
        );
    }

    const html = marked.parse(post.content);

    return (
        <article className="post-section py-5">
            <Container>
                <h1 className="mb-2">{post.title}</h1>
                <div className="text-muted mb-4">
                    {post.dateObj.toLocaleDateString('es-AR', { year:'numeric', month:'long', day:'numeric' })}
                </div>
                <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
                <div className="mt-4">
                    <Link to="/blog" className="btn btn-salmon">← Volver al blog</Link>
                </div>
            </Container>
        </article>
    );
}
