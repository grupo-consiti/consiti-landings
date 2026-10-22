import { Plus } from "./Icon";

const faqs = [
  {
    q: "¿Necesito crear una cuenta?",
    a: "No. Eliges la vacante, llenas su formulario y listo. No hay usuario ni contraseña que recordar.",
  },
  {
    q: "¿Puedo aplicar a más de una vacante?",
    a: "Sí. Cada plaza tiene su propio formulario: si te interesan dos, llenas los dos. Así Recursos Humanos ve tus respuestas a lo que pide cada puesto.",
  },
  {
    q: "¿Cuánto cuesta postularme?",
    a: "Nada. Grupo Consiti no cobra por participar en un proceso de selección, ni por capacitaciones, ni por nada. Si alguien te pide dinero a nombre nuestro, no somos nosotros.",
  },
  {
    q: "¿Es obligatorio el CV?",
    a: "No. Suma si lo adjuntas, pero con tus datos y las respuestas del formulario ya quedas postulado.",
  },
  {
    q: "¿Qué pasa después de aplicar?",
    a: "Te llega un correo de confirmación. Recursos Humanos revisa cada postulación y, si avanzas en el proceso, te contacta por correo o WhatsApp.",
  },
  {
    q: "¿Qué hacen con mis datos?",
    a: "Se usan solo para los procesos de selección de Grupo Consiti. No los vendemos ni los compartimos con terceros. Si quieres que los borremos, basta con escribirnos.",
  },
];

export default function Faq() {
  return (
    <section className="section section--white" id="faq">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Lo que más nos preguntan</h2>
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
