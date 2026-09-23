import {
  Shield, Target, Mail, Share, ArrowRight,
  Users, Chat, Globe, Cap, Heart, Code, FileText, Video, Clipboard,
} from "./Icon";

const benefits = [
  { ic: <Shield size={19} />, t: "Gratis, sin letra chica", d: "Registrarte y postularte no cuesta nada. Nunca." },
  { ic: <Target size={19} />, t: "Un perfil, todas las plazas", d: "Lo escribes una vez y sirve para cada vacante que abrimos." },
  { ic: <Mail size={19} />, t: "Respuesta inmediata", d: "Un correo de confirmación apenas terminas. Sin silencios raros." },
  { ic: <Share size={19} />, t: "Pasa el dato", d: "Comparte una plaza y ayuda a alguien a dar el salto." },
];

const fields = [
  { ic: <Users size={15} />, t: "Nombre completo" },
  { ic: <Mail size={15} />, t: "Correo" },
  { ic: <Chat size={15} />, t: "WhatsApp" },
  { ic: <Globe size={15} />, t: "País" },
  { ic: <Cap size={15} />, t: "Grado académico" },
  { ic: <Heart size={15} />, t: "Habilidades blandas" },
  { ic: <Code size={15} />, t: "Habilidades técnicas" },
  { ic: <FileText size={15} />, t: "Breve resumen" },
  { ic: <Video size={15} />, t: "Video de presentación", opt: true },
  { ic: <Clipboard size={15} />, t: "Tu CV", opt: true },
];

export default function Audience() {
  return (
    <section className="section" id="beneficios">
      <div className="container">
        <div className="split">
          {/* Beneficios para el candidato */}
          <div className="panel panel--cand reveal">
            <span className="panel__tag"><Heart size={14} /> Para ti</span>
            <h3>Lo que ganas con Worky</h3>
            <p className="panel__desc">
              Tu perfil queda guardado y visible para todas las plazas que abre Grupo
              Consiti. Muestra lo que sabes hacer y deja que las oportunidades lleguen.
            </p>
            <div className="panel__list">
              {benefits.map((f) => (
                <div className="feat" key={f.t}>
                  <div className="feat__ic">{f.ic}</div>
                  <div>
                    <div className="feat__t">{f.t}</div>
                    <div className="feat__d">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="#aplicar" className="btn btn--primary" style={{ marginTop: 26 }}>
              Crear mi perfil gratis <ArrowRight size={18} />
            </a>
          </div>

          {/* Datos del perfil */}
          <div className="panel panel--comp reveal">
            <span className="panel__tag"><Clipboard size={14} /> Tu perfil</span>
            <h3>Esto es todo lo que te pedimos</h3>
            <p className="panel__desc">
              Con lo esencial ya quedas dentro. El video y el CV son opcionales: suman,
              pero nadie se queda fuera por no tenerlos.
            </p>
            <div className="fields" style={{ marginTop: 20 }}>
              {fields.map((f) => (
                <span className={`field-chip ${f.opt ? "opt" : ""}`} key={f.t}>
                  {f.ic} {f.t}{f.opt ? " · opcional" : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
