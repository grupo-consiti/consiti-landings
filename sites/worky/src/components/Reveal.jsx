"use client";

import { useEffect } from "react";

// Añade la clase .in a los elementos .reveal cuando entran en viewport.
// Robusto: revela de una lo que ya está a la vista y observa el resto con un
// umbral mínimo (funciona incluso con bloques más altos que la pantalla).
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;
    const show = (el) => el.classList.add("in");

    if (!("IntersectionObserver" in window)) {
      els.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        show(el); // ya está a la vista al cargar
      } else {
        io.observe(el);
      }
    });

    // Red de seguridad: nada debe quedar oculto permanentemente.
    const fallback = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      });
    }, 1600);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return null;
}
