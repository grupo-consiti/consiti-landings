import { departments } from "@/lib/positions";
import { ArrowRight, Check } from "./Icon";

const total = departments.reduce((n, d) => n + d.vacancies.length, 0);

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--dark">Bolsa de Trabajo · Grupo Consiti</span>
          <h1>
            Trabaja con el equipo que
            <span className="hero__accent"> construye la tecnología </span>
            de las empresas.
          </h1>
          <p className="hero__sub">
            Aquí publicamos cada vacante que abre Grupo Consiti. Elige la plaza que te
            interesa, llena su formulario y Recursos Humanos te contacta.
          </p>

          <div className="hero__cta">
            <a href="#vacantes" className="btn btn--primary btn--lg">
              Ver vacantes abiertas <ArrowRight size={19} />
            </a>
            <a href="#como-aplicar" className="btn btn--outline-light btn--lg">Cómo aplicar</a>
          </div>

          <div className="hero__meta">
            <span className="chk"><Check size={17} /> Sin crear cuenta</span>
            <span className="chk"><Check size={17} /> Un formulario por plaza</span>
            <span className="chk"><Check size={17} /> Postularte es gratis</span>
          </div>
        </div>

        <aside className="hero__board" aria-label="Resumen de vacantes">
          <div className="hero__count">
            <span className="hero__count-num">{total}</span>
            <span className="hero__count-label">
              vacante{total !== 1 ? "s" : ""} abierta{total !== 1 ? "s" : ""} hoy
            </span>
          </div>
          <ul className="hero__depts">
            {departments.map((d) => (
              <li key={d.id}>
                {/* Positions escucha data-dept y deja filtrada esa área */}
                <a href="#vacantes" data-dept={d.id}>
                  <span>{d.name}</span>
                  <strong>{d.vacancies.length}</strong>
                </a>
              </li>
            ))}
          </ul>
          <div className="hero__facts">
            <div><strong>+12</strong><span>años</span></div>
            <div><strong>+500</strong><span>clientes</span></div>
            <div><strong>+300</strong><span>proyectos</span></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
