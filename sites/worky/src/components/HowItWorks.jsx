const steps = [
  { n: "01", t: "Elige la vacante", d: "Revisa las plazas abiertas, lo que pide cada una y sus condiciones." },
  { n: "02", t: "Llena su formulario", d: "Tus datos de contacto, tu CV si lo tienes y las preguntas propias de esa plaza." },
  { n: "03", t: "Recursos Humanos te contacta", d: "Revisamos cada postulación. Si avanzas, te escribimos por correo o WhatsApp." },
];

export default function HowItWorks() {
  return (
    <section className="section section--black" id="como-aplicar">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow--dark">Cómo aplicar</span>
          <h2>Tres pasos, sin crear cuenta</h2>
          <p>Te postulas directo a la plaza que te interesa. Si quieres aplicar a otra, llenas el formulario de esa otra.</p>
        </div>
        <ol className="steps reveal">
          {steps.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
