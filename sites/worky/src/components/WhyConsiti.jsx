import { Code, Users, Rocket, Shield } from "./Icon";

// Solo lo que Consiti puede sostener: nada de beneficios que RR. HH. no confirmó.
const reasons = [
  { ic: <Code size={22} />, t: "Proyectos reales", d: "ERP, facturación electrónica, nube e inteligencia artificial para empresas de toda la región." },
  { ic: <Rocket size={22} />, t: "Tecnología de punta", d: "Trabajamos con Odoo, Google Cloud y Oracle, y aplicamos IA donde aporta valor medible." },
  { ic: <Users size={22} />, t: "Un equipo que acompaña", d: "Aprendes junto a especialistas con más de 12 años implementando sistemas empresariales." },
  { ic: <Shield size={22} />, t: "Un proceso claro", d: "Postularte no cuesta nada y cada plaza dice lo que pide antes de que llenes un solo dato." },
];

export default function WhyConsiti() {
  return (
    <section className="section section--lavender" id="por-que-consiti">
      <div className="container why">
        <div className="why__intro reveal">
          <span className="eyebrow">Por qué Consiti</span>
          <h2>Transformación digital con Software, IA y Cloud.</h2>
          <p>
            Grupo Consiti es una empresa salvadoreña que construye los sistemas con los que
            operan cientos de empresas. Cuando abrimos una plaza, buscamos personas que
            quieran crecer con nosotros.
          </p>
          <div className="why__facts">
            <div><strong>+12</strong><span>años de trayectoria</span></div>
            <div><strong>+500</strong><span>clientes</span></div>
            <div><strong>+300</strong><span>proyectos</span></div>
          </div>
        </div>
        <div className="why__grid reveal">
          {reasons.map((r) => (
            <div className="why__card" key={r.t}>
              <div className="why__ic">{r.ic}</div>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
