import { ArrowRight } from "./Icon";

export default function FinalCta() {
  return (
    <section className="section" id="contacto">
      <div className="container">
        <div className="finalcta reveal">
          <h2>La próxima plaza<br />puede ser tuya.</h2>
          <p>Crea tu perfil hoy. Gratis, y en tres minutos estás dentro.</p>
          <div className="finalcta__cta">
            <a href="#aplicar" className="btn btn--light btn--lg">
              Crear mi perfil gratis <ArrowRight size={19} />
            </a>
            <a href="#plazas" className="btn btn--light btn--lg">Ver plazas abiertas</a>
          </div>
        </div>
      </div>
    </section>
  );
}
