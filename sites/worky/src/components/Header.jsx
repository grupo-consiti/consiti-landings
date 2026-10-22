"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Close } from "./Icon";

// El orden coincide con el orden de las secciones en la página, para que el
// indicador del menú avance de izquierda a derecha conforme se baja.
const LINKS = [
  { href: "#vacantes", label: "Vacantes" },
  { href: "#como-aplicar", label: "Cómo aplicar" },
  { href: "#por-que-consiti", label: "Por qué Consiti" },
  { href: "#faq", label: "Preguntas" },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activa, setActiva] = useState(null); // href de la sección en pantalla
  const [pill, setPill] = useState(null); // { left, width } del indicador
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Qué sección se está viendo. Se toma la última cuyo inicio ya pasó la línea
  // de lectura (un tercio de la pantalla), que es lo que se siente natural.
  useEffect(() => {
    const calcular = () => {
      const linea = window.scrollY + window.innerHeight / 3;
      let actual = null;
      for (const l of LINKS) {
        const el = document.querySelector(l.href);
        if (el && el.offsetTop <= linea) actual = l.href;
      }
      // Al final de la página, la última siempre gana.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        actual = LINKS[LINKS.length - 1].href;
      }
      setActiva(actual);
    };
    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return () => {
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
  }, []);

  // Posición del indicador, medida sobre el enlace activo.
  const moverPill = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const el = activa && nav.querySelector(`a[href="${activa}"]`);
    if (!el) { setPill(null); return; }
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activa]);

  useEffect(() => {
    moverPill();
    window.addEventListener("resize", moverPill);
    return () => window.removeEventListener("resize", moverPill);
  }, [moverPill]);

  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <header className={`header ${stuck ? "is-stuck" : ""}`}>
      <div className="container header__inner">
        <BrandMark onClick={() => setMenu(false)} />

        <nav className="nav" ref={navRef}>
          <span
            className={`nav__pill ${pill ? "is-on" : ""}`}
            aria-hidden="true"
            style={pill ? { transform: `translateX(${pill.left}px)`, width: pill.width } : undefined}
          />
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={activa === l.href ? "is-active" : ""}
              aria-current={activa === l.href ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__cta">
          <a href="#vacantes" className="btn btn--primary">
            Ver vacantes <ArrowRight size={18} />
          </a>
        </div>

        <button
          className={`nav-toggle ${menu ? "is-open" : ""}`}
          onClick={() => setMenu((v) => !v)}
          aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menu}
        >
          {menu ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menu && (
        <>
          <div className="nav-scrim" onClick={() => setMenu(false)} />
          <nav className="nav-mobile" aria-label="Menú principal">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={activa === l.href ? "is-active" : ""}
                onClick={() => setMenu(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="#vacantes" className="btn btn--primary btn--block btn--lg" onClick={() => setMenu(false)}>
              Ver vacantes <ArrowRight size={18} />
            </a>
          </nav>
        </>
      )}
    </header>
  );
}

// Logotipo de Consiti + el nombre del sitio. Se reutiliza en las páginas legales.
export function BrandMark({ href = "#top", onClick }) {
  return (
    <a href={href} className="brand" aria-label="Bolsa de Trabajo Grupo Consiti · inicio" onClick={onClick}>
      <img className="brand__logo" src="/consiti-logotipo-morado.svg" alt="Grupo Consiti" width={636} height={126} />
      <span className="brand__sep" aria-hidden="true" />
      <span className="brand__name">Bolsa de Trabajo</span>
    </a>
  );
}
