import { useEffect, useRef, useState } from "react";

/**
 * useReveal: añade una clase "is-visible" cuando el elemento entra al viewport.
 * Respeta prefers-reduced-motion.
 */
export default function useReveal(options = { threshold: 0.15, rootMargin: "0px" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Si el usuario prefiere menos animaciones: mostrar directo
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                obs.disconnect(); // solo una vez
            }
        }, options);

        obs.observe(el);
        return () => obs.disconnect();
    }, [options]);

    return { ref, visible };
}
