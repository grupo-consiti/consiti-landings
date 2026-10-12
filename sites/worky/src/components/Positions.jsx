"use client";

import { useEffect, useState } from "react";
import { departments } from "@/lib/positions";
import ApplyModal from "./ApplyModal";
import {
  ArrowRight, Globe, Clock, Code, Rocket, Share, Chat, Sheet, Filter,
} from "./Icon";

const deptIcons = { Code, Rocket, Share, Chat, Sheet, Filter };
const tagClass = { remote: "tag--remote", hybrid: "tag--hybrid", onsite: "tag--onsite" };

export default function Positions() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState(null); // { vacancy, departamento }

  // Enlace directo desde la pauta: /?plaza=contador-general abre esa plaza.
  // Así cada anuncio de Meta lleva a su vacante y no a la página entera.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("plaza");
    if (!id) return;
    for (const dept of departments) {
      const vacancy = dept.vacancies.find((v) => v.id === id);
      if (vacancy) {
        setActive(dept.id);
        setSelected({ vacancy, departamento: dept.name });
        return;
      }
    }
    // Si la plaza ya cerró, al menos lo dejamos en el catálogo.
    document.getElementById("plazas")?.scrollIntoView();
  }, []);

  const shown = active === "all" ? departments : departments.filter((d) => d.id === active);

  return (
    <section className="section" id="plazas">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow eyebrow--mint">Plazas disponibles</span>
          <h2>Plazas abiertas</h2>
          <p>Las vacantes que Grupo Consiti tiene abiertas hoy. Te postulas con un clic y solo respondes lo puntual de cada una.</p>
        </div>

        {/* Filtros por departamento */}
        <div className="dept-filters reveal">
          <button className={`dept-chip ${active === "all" ? "is-active" : ""}`} onClick={() => setActive("all")}>
            Todas
          </button>
          {departments.map((d) => (
            <button key={d.id} className={`dept-chip ${active === d.id ? "is-active" : ""}`} onClick={() => setActive(d.id)}>
              {d.name}
            </button>
          ))}
        </div>

        {/* Departamentos */}
        {shown.map((dept) => {
          const Ic = deptIcons[dept.icon] || Code;
          return (
            <div className="dept-block" key={dept.id}>
              <div className="dept-head">
                <div className="dept-head__ic" style={{ background: dept.color }}><Ic size={22} /></div>
                <div>
                  <h3 className="dept-head__name">{dept.name}</h3>
                  <p className="dept-head__blurb">{dept.blurb}</p>
                </div>
                <span className="dept-head__count">{dept.vacancies.length} plaza{dept.vacancies.length !== 1 ? "s" : ""}</span>
              </div>

              <div className="pos-grid">
                {dept.vacancies.map((p) => (
                  <article className="pos" key={p.id}>
                    <div className="pos__logo" style={{ background: dept.color }}>{p.initials}</div>

                    <div className="pos__body">
                      <div className="pos__head">
                        <h3>{p.role}</h3>
                        <span className={`tag ${tagClass[p.modalityTag]}`}>{p.modality}</span>
                      </div>

                      <div className="pos__meta">
                        <span><Globe size={12} /> {p.location}</span>
                        <span><Clock size={12} /> {p.type}</span>
                      </div>

                      <p className="pos__desc">{p.desc}</p>

                      <div className="pos__tags">
                        {p.tags.map((t) => <span key={t}>{t}</span>)}
                      </div>

                      {p.closes && (
                        <p className="pos__closes">
                          <Clock size={12} /> Abierta hasta el {p.closes}
                        </p>
                      )}
                    </div>

                    <div className="pos__side">
                      <span className="pos__highlight">{p.highlight}</span>
                      <button
                        className="btn btn--primary"
                        onClick={() => setSelected({ vacancy: p, departamento: dept.name })}
                      >
                        Aplicar <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}

        <div style={{ textAlign: "center", marginTop: 40 }} className="reveal">
          <p style={{ color: "var(--muted)", fontSize: 14.5, marginBottom: 14 }}>
            ¿Todavía no está la tuya? Deja tu perfil y te avisamos cuando abra.
          </p>
          <a href="#aplicar" className="btn btn--dark btn--lg">
            Sumarme al banco de talento <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {selected && (
        <ApplyModal
          vacancy={selected.vacancy}
          departamento={selected.departamento}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
