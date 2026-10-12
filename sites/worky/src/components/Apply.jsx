import { ArrowRight, Check, Camera, Code, Globe, Link as LinkIcon } from "./Icon";

export default function Apply() {
  return (
    <section className="section" id="aplicar">
      <div className="container">
        <div className="join reveal">
          <span className="eyebrow eyebrow--mint">Súmate gratis</span>
          <h2>Tu perfil, en cuatro pasos</h2>
          <p>
            Vas agregando lo que quieras mostrar, paso por paso. Puedes dejar lo
            opcional para después: lo importante es quedar dentro.
          </p>

          <div className="join__chips">
            <span className="join__chip"><Camera size={15} /> Foto</span>
            <span className="join__chip"><Code size={15} /> Habilidades y stack</span>
            <span className="join__chip"><Globe size={15} /> Idiomas y nivel</span>
            <span className="join__chip"><LinkIcon size={15} /> Redes y enlaces</span>
          </div>

          <button className="btn btn--primary btn--lg" data-open-profile>
            Crear mi perfil gratis <ArrowRight size={19} />
          </button>

          <div className="join__meta">
            <span className="chk"><Check size={17} /> Tres minutos</span>
            <span className="chk"><Check size={17} /> Gratis, siempre</span>
            <span className="chk"><Check size={17} /> Sin CV perfecto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
