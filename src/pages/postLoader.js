// src/pages/postLoader.js
import matter from "gray-matter";

import { Buffer } from "buffer";
window.Buffer = Buffer;

const modules = import.meta.glob("../posts/*.md", { as: "raw", eager: true });

function parseLocalDate(isoLike) {
    if (!isoLike) return new Date(0);
    const [y, m = 1, d = 1] = isoLike.split("-").map(Number);
    return new Date(y, m - 1, d); // fecha local (evita desfases)
}

export function getAllPosts() {
    const posts = Object.entries(modules).map(([path, raw]) => {
        const { data, content } = matter(raw); // <-- ahora 'raw' es string
        const slug = path.split("/").pop().replace(/\.md$/, "");
        return {
            slug,
            title: data.title ?? slug,
            date: data.date ?? "1970-01-01",
            dateObj: parseLocalDate(data.date),
            tags: data.tags ?? [],
            excerpt: data.excerpt ?? "",
            content,
        };
    });

    posts.sort((a, b) => b.dateObj - a.dateObj);
    return posts;
}

export function getPostBySlug(slug) {
    return getAllPosts().find(p => p.slug === slug) || null;
}
