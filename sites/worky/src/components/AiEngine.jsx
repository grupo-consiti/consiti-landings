import { Clipboard, Shield, Sparkles, Target, Bell, Bolt } from "./Icon";

const points = [
  { ic: <Sparkles size={19} />, t: "Tu perfil no se archiva", d: "Cada plaza nueva se compara contra él, aunque lo hayas creado hace meses." },
  { ic: <Target size={19} />, t: "Menos ruido, más encaje", d: "No te avisamos de todo: te avisamos de lo que tiene sentido para ti." },
  { ic: <Bolt size={19} />, t: "Sin estar pendiente", d: "Sigue con lo tuyo. La búsqueda corre de fondo." },
];

export default function AiEngine() {
  return (
    <section className="section">
      <div className="container">
        <div className="engine reveal">
          <div className="engine__grid">
            <div className="engine__left">
              <span className="eyebrow" style={{ background: "rgba(82,22,231,.30)", color: "#B49EF7" }}>
                <Sparkles size={15} /> Worky trabaja por ti
              </span>
              <h2 style={{ marginTop: 18 }}>
                Deja de buscar.<br />Que te encuentren.
              </h2>
              <p className="lead">
                Cuando Grupo Consiti abre una plaza, la inteligencia de Worky la compara
                con todos los perfiles del banco de talento. Si el tuyo encaja, llega
                primero a Recursos Humanos y te avisamos. No tienes que hacer nada más.
              </p>
              <div className="engine__pts">
                {points.map((p) => (
                  <div className="engine__pt" key={p.t}>
                    <div className="feat__ic">{p.ic}</div>
                    <div>
                      <div className="feat__t">{p.t}</div>
                      <div className="feat__d">{p.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="engine__right">
              <Wire color="#5216E7" icon={<Clipboard size={16} />} h="1 · Creas tu perfil" d="Tus habilidades, tu experiencia, lo que buscas." />
              <div className="wire__arrow">↓</div>
              <Wire color="#12B886" icon={<Shield size={16} />} h="2 · Queda guardado" d="Listo para cada plaza, sin repetir nada." />
              <div className="wire__arrow">↓</div>
              <Wire color="#FFC24B" icon={<Sparkles size={16} />} h="3 · La IA lo compara" d="Contra cada vacante que abrimos." />
              <div className="wire__arrow">↓</div>
              <Wire color="#FF6A5A" icon={<Bell size={16} />} h="4 · Te contactamos" d="Recursos Humanos te escribe por correo o WhatsApp." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Wire({ color, icon, h, d }) {
  return (
    <div className="wire">
      <div className="wire__h">
        <span className="wire__dot" style={{ background: color }} />
        <span style={{ color }}>{icon}</span> {h}
      </div>
      <div className="wire__d">{d}</div>
    </div>
  );
}
