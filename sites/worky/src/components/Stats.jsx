export default function Stats() {
  const items = [
    { num: "3 min", label: "Lo que toma crear tu perfil", cls: "v" },
    { num: "1 clic", label: "Para postularte a cualquier plaza", cls: "c" },
    { num: "$0", label: "Hoy, mañana y siempre", cls: "m" },
    { num: "24/7", label: "Tu perfil trabajando por ti", cls: "a" },
  ];
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="stats reveal">
          {items.map((s) => (
            <div className="stat" key={s.label}>
              <div className={`stat__num ${s.cls}`}>{s.num}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
