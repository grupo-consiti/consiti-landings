"use client";

import { useEffect, useMemo, useState } from "react";
import { departments } from "@/lib/positions";
import ApplyModal from "./ApplyModal";
import { ArrowRight, Globe, Clock, Search, Close } from "./Icon";

const tagClass = { remote: "tag--remote", hybrid: "tag--hybrid", onsite: "tag--onsite" };

// Busca una plaza por su id o por un id viejo (`aliases`), para que los enlaces
// de anuncios anteriores sigan abriendo la plaza correcta.
function buscarPlaza(id) {
  for (const dept of departments) {
    const vacancy = dept.vacancies.find((v) => v.id === id || v.aliases?.includes(id));
    if (vacancy) return { vacancy, dept };
  }
  return null;
}

const normalizar = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function Positions() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null); // { vacancy, departamento }

  // Enlace directo desde la pauta: /?plaza=encargado-contable abre el formulario
  // de esa plaza. Así cada anuncio lleva a su vacante y no a la página entera.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const area = params.get("area");
    if (area && departments.some((d) => d.id === area)) setActive(area);

    const id = params.get("plaza");
    if (!id) return;
    const found = buscarPlaza(id);
    if (found) {
      setActive(found.dept.id);
      setSelected({ vacancy: found.vacancy, departamento: found.dept.name });
      return;
    }
    // Si la plaza ya cerró, al menos lo dejamos frente a las abiertas.
    document.getElementById("vacantes")?.scrollIntoView();
  }, []);

  // Las áreas del hero filtran el listado al tocarlas.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("[data-dept]");
      if (a) { setActive(a.dataset.dept); setQuery(""); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const shown = useMemo(() => {
    const q = normalizar(query.trim());
    return departments
      .filter((d) => active === "all" || d.id === active)
      .map((d) => ({
        ...d,
        vacancies: d.vacancies.filter((v) =>
          !q || normalizar([v.role, v.desc, v.location, v.modality, d.name, ...(v.tags || [])].join(" ")).includes(q)
        ),
      }))
      .filter((d) => d.vacancies.length);
  }, [active, query]);

  const encontradas = shown.reduce((n, d) => n + d.vacancies.length, 0);

  return (
    <section className="section section--white" id="vacantes">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Vacantes abiertas</span>
          <h2>Elige la plaza a la que quieres aplicar</h2>
          <p>Cada vacante tiene su propio formulario, con las preguntas que importan para ese puesto.</p>
        </div>

        <div className="board-tools reveal">
          <label className="board-search">
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por puesto, área o modalidad"
              aria-label="Buscar vacantes"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">
                <Close size={16} />
              </button>
            )}
          </label>

          <div className="dept-filters" role="tablist" aria-label="Filtrar por área">
            <button className={`dept-chip ${active === "all" ? "is-active" : ""}`} onClick={() => setActive("all")}>
              Todas
            </button>
            {departments.map((d) => (
              <button key={d.id} className={`dept-chip ${active === d.id ? "is-active" : ""}`} onClick={() => setActive(d.id)}>
                {d.name}
              </button>
            ))}
          </div>
        </div>

        <p className="board-count" aria-live="polite">
          {encontradas} vacante{encontradas !== 1 ? "s" : ""}
          {active !== "all" || query ? " con este filtro" : " publicadas"}
        </p>

        {shown.length === 0 && (
          <div className="board-empty">
            <p>No encontramos vacantes con ese filtro.</p>
            <button className="btn btn--ghost" onClick={() => { setActive("all"); setQuery(""); }}>
              Ver todas las vacantes
            </button>
          </div>
        )}

        {shown.map((dept) => (
          <div className="dept-block" key={dept.id}>
            <div className="dept-head">
              <h3 className="dept-head__name">{dept.name}</h3>
              <span className="dept-head__count">{dept.vacancies.length} plaza{dept.vacancies.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="pos-grid">
              {dept.vacancies.map((p) => (
                <article className="pos" key={p.id}>
                  <div className="pos__body">
                    <div className="pos__head">
                      <h3>{p.role}</h3>
                      <span className={`tag ${tagClass[p.modalityTag] || ""}`}>{p.modality}</span>
                    </div>

                    <div className="pos__meta">
                      <span><Globe size={13} /> {p.location}</span>
                      <span><Clock size={13} /> {p.type}</span>
                    </div>

                    <p className="pos__desc">{p.desc}</p>

                    <div className="pos__tags">
                      {p.tags.map((t) => <span key={t}>{t}</span>)}
                    </div>

                    {p.closes && (
                      <p className="pos__closes">
                        <Clock size={12} /> Recibimos postulaciones hasta el {p.closes}
                      </p>
                    )}
                  </div>

                  <div className="pos__side">
                    {p.highlight && <span className="pos__highlight">{p.highlight}</span>}
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
        ))}

        <p className="board-foot reveal">
          ¿No ves una plaza para ti? Vuelve pronto: aquí publicamos cada vacante nueva que abre Grupo Consiti.
        </p>
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
