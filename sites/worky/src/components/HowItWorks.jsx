import { Clipboard, Search, Bolt, Chat } from "./Icon";

const steps = [
  { n: "1", ic: <Clipboard size={22} />, t: "Crea tu perfil", d: "Quién eres, qué sabes hacer y qué buscas. Una vez y gratis." },
  { n: "2", ic: <Search size={22} />, t: "Mira las plazas", d: "Las vacantes abiertas hoy en Grupo Consiti, filtradas por área." },
  { n: "3", ic: <Bolt size={22} />, t: "Postúlate con un clic", d: "Solo respondes lo puntual de esa plaza. Tus datos ya están." },
  { n: "4", ic: <Chat size={22} />, t: "Te escribimos", d: "Si tu perfil encaja, Recursos Humanos te contacta por correo o WhatsApp." },
];

export default function HowItWorks() {
  return (
    <section className="section" id="como-funciona">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Cómo funciona</span>
          <h2>Cuatro pasos y listo</h2>
          <p>Sin cuentas que confirmar ni formularios interminables.</p>
        </div>
        <div className="steps reveal">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="step__n">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
