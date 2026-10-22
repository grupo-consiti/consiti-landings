import { ArrowRight } from "./Icon";

export default function FinalCta() {
  return (
    <section className="section section--white section--flush">
      <div className="container">
        <div className="finalcta reveal">
          <h2>Tu próxima plaza puede estar aquí.</h2>
          <p>Revisa las vacantes abiertas y aplica a la que encaje contigo.</p>
          <a href="#vacantes" className="btn btn--light btn--lg">
            Ver vacantes abiertas <ArrowRight size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}
