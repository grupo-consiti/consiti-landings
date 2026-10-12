"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Close } from "./Icon";

// El orden coincide con el orden de las secciones en la página, para que el
// indicador del menú avance de izquierda a derecha conforme se baja.
const LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#plazas", label: "Plazas" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#faq", label: "FAQ" },
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
        <a href="#top" className="brand" aria-label="Worky by Consiti · inicio" onClick={() => setMenu(false)}>
          <img className="brand__logo" src="/logo-worky.png" alt="Worky by Consiti" width={600} height={146} />
        </a>

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
          <a href="#plazas" className="btn btn--ghost">Ver plazas</a>
          <a href="#aplicar" className="btn btn--primary">
            Crear mi perfil <ArrowRight size={18} />
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
            <a href="#aplicar" className="btn btn--primary btn--block btn--lg" onClick={() => setMenu(false)}>
              Crear mi perfil <ArrowRight size={18} />
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
