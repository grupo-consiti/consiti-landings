import { Plus } from "./Icon";

const faqs = [
  {
    q: "¿Quién está detrás de Worky?",
    a: "Grupo Consiti S.A. de C.V., empresa salvadoreña de transformación digital con más de 12 años de trayectoria. Worky es nuestro banco de talento: las plazas que ves son vacantes reales de Consiti y tu perfil lo revisa nuestro equipo de Recursos Humanos.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Nada. Crear tu perfil y postularte es gratis, hoy y siempre. Consiti no cobra por participar en un proceso de selección, ni por capacitaciones, ni por nada. Si alguien te pide dinero a nombre nuestro, no somos nosotros.",
  },
  {
    q: "¿Qué pasa después de registrarme?",
    a: "Recibes un correo de confirmación y tu perfil queda en el banco de talento. Cuando abrimos una plaza, tu perfil entra en la comparación automáticamente: no tienes que volver a postularte.",
  },
  {
    q: "¿Necesito un CV perfecto?",
    a: "No. El CV es opcional. Con tu contacto, tus habilidades y un resumen breve ya quedas dentro. Si quieres destacar, agrega tu CV o un video de presentación, pero nadie queda fuera por no tenerlos.",
  },
  {
    q: "¿Cómo eligen a quién contactar?",
    a: "Worky ordena el banco de talento según lo que pide el perfil de puesto, y Recursos Humanos revisa primero a quienes mejor encajan. La decisión final siempre la toma una persona, no un algoritmo.",
  },
  {
    q: "¿Puedo postularme a varias plazas?",
    a: "Sí, a todas las que quieras. Con tu perfil creado solo respondes lo puntual de cada vacante; tus datos ya están.",
  },
  {
    q: "¿Qué hacen con mis datos?",
    a: "Se usan solo para procesos de selección de Grupo Consiti. No los vendemos ni los compartimos con terceros. Si quieres que borremos tu perfil, lo borramos: basta con escribirnos.",
  },
];

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Lo que solemos responder</h2>
        </div>
        <div className="faq reveal">
          {faqs.map((f, i) => (
            <details className="qa" key={f.q} open={i === 0}>
              <summary className="qa__q">
                {f.q}
                <span className="ic"><Plus size={20} /></span>
              </summary>
              <div className="qa__a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
