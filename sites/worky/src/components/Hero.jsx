import { ArrowRight, Check, Sparkles, Target, Shield } from "./Icon";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob b1" />
        <span className="hero__blob b2" />
        <span className="hero__blob b3" />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow"><Sparkles size={15} /> El banco de talento de Grupo Consiti</span>
          <h1 style={{ marginTop: 18 }}>
            Un perfil.<br />
            <span className="text-grad">Todas nuestras plazas.</span>
          </h1>
          <p className="hero__sub">
            Créalo una vez, en tres minutos. Cada vez que Grupo Consiti abre una
            vacante, revisamos quién encaja. Si eres tú, te escribimos.
          </p>

          <div className="hero__cta">
            <a href="#aplicar" className="btn btn--primary btn--lg">
              Crear mi perfil gratis <ArrowRight size={19} />
            </a>
            <a href="#plazas" className="btn btn--ghost btn--lg">Ver plazas abiertas</a>
          </div>

          <div className="hero__meta">
            <span className="chk"><Check size={18} /> Gratis, siempre</span>
            <span className="chk"><Check size={18} /> Tres minutos</span>
            <span className="chk"><Check size={18} /> Sin CV perfecto</span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="appcard">
            <div className="appcard__top">
              <div className="appcard__title">Plazas que encajan contigo</div>
              <span className="match-badge">Para ti</span>
            </div>

            <MatchRow color="#5216E7" initials="QA" name="Practicante de QA con IA" role="Híbrido o remoto · 3 meses" score="94%" />
            <MatchRow color="#12B886" initials="VF" name="Vendedor/a Freelance B2B" role="Remoto · Toda Latinoamérica" score="92%" />
            <MatchRow color="#350E96" initials="CG" name="Contador General" role="San Salvador · Presencial" score="89%" />

            <div className="appcard__foot">
              <Target size={15} /> Worky comparó tu perfil con cada plaza abierta.
            </div>
          </div>

          <div className="float-chip fc1 pulse">
            <span style={{ color: "var(--mint)" }}><Shield size={18} /></span>
            Perfil verificado
          </div>
          <div className="float-chip fc2 pulse d1">
            <span style={{ color: "var(--violet)" }}><Sparkles size={18} /></span>
            Nueva plaza para ti
          </div>
        </div>
      </div>
    </section>
  );
}

function MatchRow({ color, initials, name, role, score }) {
  return (
    <div className="match-row">
      <div className="match-row__ava" style={{ background: color, borderRadius: 12 }}>{initials}</div>
      <div className="match-row__body">
        <div className="match-row__name">{name}</div>
        <div className="match-row__role">{role}</div>
      </div>
      <span className="match-badge">{score}</span>
    </div>
  );
}
