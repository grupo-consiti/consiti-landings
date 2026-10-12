import { Clipboard, Eye, Clock, Search } from "./Icon";

const pains = [
  { ic: <Clipboard size={20} />, t: "El mismo formulario, otra vez", d: "Tus mismos datos, escritos por décima vez esta semana." },
  { ic: <Eye size={20} />, t: "Mandas el CV y no pasa nada", d: "Ni un acuse de recibo. Nunca sabes si alguien lo abrió." },
  { ic: <Clock size={20} />, t: "Te enteras tarde", d: "Cuando ves la plaza ideal, la convocatoria ya cerró." },
  { ic: <Search size={20} />, t: "Buscar te consume el día", d: "Horas entre portales, grupos y anuncios que se repiten." },
];

export default function Problem() {
  return (
    <section className="section">
      <div className="container">
        <div className="problem reveal">
          <div className="problem__grid">
            <div>
              <span className="eyebrow eyebrow--coral">Sabemos cómo se siente</span>
              <h2 style={{ marginTop: 18, fontSize: "clamp(28px,3.6vw,40px)" }}>
                Buscar trabajo no debería ser un trabajo.
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Hoy toca empezar de cero en cada lugar, repetir lo mismo y esperar una
                respuesta que casi nunca llega. En Worky lo escribes una vez y tu perfil
                se queda listo para cada plaza que abrimos.
              </p>
            </div>
            <div>
              {pains.map((p) => (
                <div className="pain" key={p.t}>
                  <div className="pain__ic">{p.ic}</div>
                  <div>
                    <div className="pain__t">{p.t}</div>
                    <div className="pain__d">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
