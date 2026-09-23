"use client";

import { useEffect, useRef, useState } from "react";
import { countries, degrees } from "@/lib/formOptions";
import { techStack, softSkills, languages, languageLevels, linkTypes } from "@/lib/profileOptions";
import { Check, ArrowRight, Plus, Mail, Chat, Camera, Trash, Shield, Code, Heart, Globe, FileText, Link as LinkIcon } from "./Icon";
import { readCv, CV_ACCEPT } from "@/lib/cvFile";
import { getTracking } from "@/lib/tracking";
import { leerBorrador, guardarBorrador, borrarBorrador } from "@/lib/draft";

const STEPS = ["Datos básicos", "Sobre ti", "Experiencia laboral", "Habilidades técnicas", "Idiomas y enlaces"];

function resizeImage(file, max = 512, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > max) { height = Math.round((height * max) / width); width = max; }
        else if (height > max) { width = Math.round((width * max) / height); height = max; }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfileModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [foto, setFoto] = useState("");
  const [cv, setCv] = useState(null); // { nombre, tipo, dataUrl }
  const [d, setD] = useState({ nombre: "", correo: "", whatsapp: "", pais: "", grado: "", headline: "", bio: "" });
  const [tec, setTec] = useState([]);
  const [customTec, setCustomTec] = useState([]);
  const [customTecInput, setCustomTecInput] = useState("");
  const [soft, setSoft] = useState([]);
  const [experiencia, setExperiencia] = useState([{ puesto: "", empresa: "", desde: "", hasta: "", actual: false, desc: "" }]);
  const [idiomas, setIdiomas] = useState([{ idioma: "", nivel: "" }]);
  const [enlaces, setEnlaces] = useState([{ tipo: "LinkedIn", url: "" }]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [restaurado, setRestaurado] = useState(false);
  const listo = useRef(false); // no guardar hasta terminar de restaurar

  // Al abrir, retomamos lo que haya quedado a medias.
  useEffect(() => {
    const b = leerBorrador("perfil");
    if (b) {
      if (b.d) setD(b.d);
      if (b.foto) setFoto(b.foto);
      if (b.tec) setTec(b.tec);
      if (b.customTec) setCustomTec(b.customTec);
      if (b.soft) setSoft(b.soft);
      if (b.experiencia?.length) setExperiencia(b.experiencia);
      if (b.idiomas?.length) setIdiomas(b.idiomas);
      if (b.enlaces?.length) setEnlaces(b.enlaces);
      if (typeof b.step === "number") setStep(b.step);
      setRestaurado(true);
    }
    listo.current = true;
  }, []);

  // Y lo vamos guardando mientras escribe. El CV no: pesa demasiado para el
  // almacenamiento del navegador y hay que volver a adjuntarlo.
  useEffect(() => {
    if (!listo.current || status === "done") return;
    // Un borrador vacío no es un borrador: si no hay nada escrito, se borra.
    // Si no, al volver aparecería el aviso de "retomamos" sin nada que retomar.
    const hayAlgo = Boolean(
      Object.values(d).some((v) => String(v).trim()) ||
        foto ||
        tec.length || customTec.length || soft.length ||
        experiencia.some((x) => x.puesto || x.empresa || x.desc) ||
        idiomas.some((i) => i.idioma) ||
        enlaces.some((e2) => e2.url.trim())
    );
    const t = setTimeout(() => {
      if (hayAlgo) guardarBorrador("perfil", { d, foto, tec, customTec, soft, experiencia, idiomas, enlaces, step });
      else borrarBorrador("perfil");
    }, 500);
    return () => clearTimeout(t);
  }, [d, foto, tec, customTec, soft, experiencia, idiomas, enlaces, step, status]);

  function empezarDeCero() {
    borrarBorrador("perfil");
    setD({ nombre: "", correo: "", whatsapp: "", pais: "", grado: "", headline: "", bio: "" });
    setFoto(""); setCv(null); setTec([]); setCustomTec([]); setSoft([]);
    setExperiencia([{ puesto: "", empresa: "", desde: "", hasta: "", actual: false, desc: "" }]);
    setIdiomas([{ idioma: "", nivel: "" }]);
    setEnlaces([{ tipo: "LinkedIn", url: "" }]);
    setErrors({}); setStep(0); setRestaurado(false);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const set = (k) => (e) => setD((s) => ({ ...s, [k]: e.target.value }));
  const toggle = (list, setList, val) => setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  async function onFoto(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { setErrors((x) => ({ ...x, foto: "Sube una imagen JPG o PNG." })); return; }
    try { setFoto(await resizeImage(f)); setErrors((x) => ({ ...x, foto: undefined })); }
    catch { setErrors((x) => ({ ...x, foto: "No pudimos procesar esa imagen." })); }
  }

  async function onCv(e) {
    const f = e.target.files?.[0];
    if (!f) { setCv(null); return; }
    try {
      setCv(await readCv(f));
      setErrors((x) => ({ ...x, cv: undefined }));
    } catch (err) {
      setCv(null);
      setErrors((x) => ({ ...x, cv: err.message }));
      e.target.value = "";
    }
  }

  function addCustomTec() {
    const v = customTecInput.trim();
    if (!v) return;
    if (![...tec, ...customTec].some((t) => t.toLowerCase() === v.toLowerCase())) setCustomTec([...customTec, v]);
    setCustomTecInput("");
  }
  const addIdioma = () => setIdiomas([...idiomas, { idioma: "", nivel: "" }]);
  const rmIdioma = (i) => setIdiomas(idiomas.length > 1 ? idiomas.filter((_, x) => x !== i) : idiomas);
  const setIdioma = (i, k, v) => setIdiomas(idiomas.map((it, x) => (x === i ? { ...it, [k]: v } : it)));
  const addEnlace = () => setEnlaces([...enlaces, { tipo: "Portafolio / Web", url: "" }]);
  const rmEnlace = (i) => setEnlaces(enlaces.length > 1 ? enlaces.filter((_, x) => x !== i) : enlaces);
  const setEnlace = (i, k, v) => setEnlaces(enlaces.map((it, x) => (x === i ? { ...it, [k]: v } : it)));
  const addExp = () => setExperiencia([...experiencia, { puesto: "", empresa: "", desde: "", hasta: "", actual: false, desc: "" }]);
  const rmExp = (i) => setExperiencia(experiencia.length > 1 ? experiencia.filter((_, x) => x !== i) : experiencia);
  const setExp = (i, k, v) => setExperiencia(experiencia.map((it, x) => (x === i ? { ...it, [k]: v } : it)));

  function validateBasics() {
    const err = {};
    if (!d.nombre.trim()) err.nombre = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo)) err.correo = "Correo inválido.";
    if (d.whatsapp.replace(/\D/g, "").length < 7) err.whatsapp = "WhatsApp inválido.";
    if (!d.pais) err.pais = "Elige tu país.";
    if (!d.grado) err.grado = "Elige tu grado académico.";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function next() {
    if (step === 0 && !validateBasics()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    document.querySelector(".pm-body")?.scrollTo({ top: 0 });
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
    document.querySelector(".pm-body")?.scrollTo({ top: 0 });
  }

  async function submit() {
    if (!validateBasics()) { setStep(0); return; }
    if (!consent) { setErrors((x) => ({ ...x, consent: "Necesitamos tu autorización." })); return; }
    setStatus("loading");
    const payload = {
      nombre: d.nombre, correo: d.correo, whatsapp: d.whatsapp, pais: d.pais, grado: d.grado,
      headline: d.headline, bio: d.bio, resumen: d.bio,
      tecnicas: [...tec, ...customTec].join(", "),
      blandas: soft.join(", "),
      experiencia: experiencia
        .filter((x) => x.puesto.trim() || x.empresa.trim())
        .map((x) => {
          const periodo = [x.desde, x.actual ? "Actual" : x.hasta].filter(Boolean).join(" – ");
          let line = x.puesto || "";
          if (x.empresa) line += (line ? " en " : "") + x.empresa;
          if (periodo) line += ` (${periodo})`;
          if (x.desc && x.desc.trim()) line += `: ${x.desc.trim()}`;
          return line.trim();
        })
        .join("\n"),
      idiomas: idiomas.filter((i) => i.idioma).map((i) => `${i.idioma} (${i.nivel || "sin especificar"})`).join(" | "),
      enlaces: enlaces.filter((e2) => e2.url.trim()).map((e2) => `${e2.tipo}: ${e2.url.trim()}`).join(" | "),
      foto,
      cv: cv?.nombre || "",
      cvArchivo: cv?.dataUrl || "",
      cvTipo: cv?.tipo || "",
      vacante: "Perfil (banco de talento)", departamento: "General",
      ...getTracking("perfil"),
    };
    try {
      const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("bad");
      borrarBorrador("perfil");
      setStatus("done");
    } catch { setStatus("error"); }
  }

  const isLast = step === STEPS.length - 1;

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__card pm-card" role="dialog" aria-modal="true" aria-label="Crear tu perfil">
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">✕</button>

        {status === "done" ? (
          <div className="pm-body">
            <div className="form-success" style={{ padding: "26px 6px" }}>
              <div className="form-success__ic"><Check size={34} /></div>
              <h3>¡Tu perfil está listo, {d.nombre.split(" ")[0] || "crack"}! 🎉</h3>
              <p>Ya estás en el banco de talento de Grupo Consiti. Te enviamos un correo de confirmación. Cuando abra una plaza que encaje contigo, te escribimos.</p>
              <div className="hero__meta" style={{ justifyContent: "center", marginTop: 20 }}>
                <span className="chk"><Mail size={16} /> Revisá tu correo</span>
                <span className="chk"><Chat size={16} /> Atento a tu WhatsApp</span>
              </div>
              <button className="btn btn--dark btn--lg" style={{ marginTop: 22 }} onClick={onClose}>Listo</button>
            </div>
          </div>
        ) : (
          <>
            <div className="pm-head">
              <div className="pm-kicker">Crear mi perfil · Paso {step + 1} de {STEPS.length}</div>
              <h3>{STEPS[step]}</h3>
              <div className="pm-steps">
                {STEPS.map((_, i) => <span key={i} className={`pm-dot ${i <= step ? "on" : ""}`} />)}
              </div>
            </div>

            <div className="pm-body">
              {restaurado && (
                <div className="draft-note">
                  <span>Retomamos donde lo dejaste. Guardamos el avance en este navegador; el CV sí hay que volver a adjuntarlo.</span>
                  <button type="button" onClick={empezarDeCero}>Empezar de cero</button>
                </div>
              )}

              {step === 0 && (
                <>
                  <div className="pb-photo-row">
                    <label className="pb-photo" title="Subir foto">
                      <input type="file" accept="image/*" onChange={onFoto} hidden />
                      {foto ? <img src={foto} alt="Tu foto" /> : <span className="pb-photo__ph"><Camera size={24} /></span>}
                      <span className="pb-photo__edit"><Camera size={13} /></span>
                    </label>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>Tu foto de perfil</div>
                      <div className="pb-hint">Cuadrada se ve mejor. La optimizamos sola. Opcional.</div>
                      {foto && <button type="button" className="btn-remove-txt" onClick={() => setFoto("")}>Quitar foto</button>}
                      {errors.foto && <div className="field-error">{errors.foto}</div>}
                    </div>
                  </div>
                  <div className="form-row">
                    <Field label="Nombre completo" req error={errors.nombre}>
                      <input className={`input ${errors.nombre ? "invalid" : ""}`} value={d.nombre} onChange={set("nombre")} placeholder="Ej. Ana Martínez" />
                    </Field>
                    <Field label="Título profesional" hint="opcional">
                      <input className="input" value={d.headline} onChange={set("headline")} placeholder="Ej. Desarrolladora Full-Stack" />
                    </Field>
                  </div>
                  <div className="form-row">
                    <Field label="Correo" req error={errors.correo}>
                      <input className={`input ${errors.correo ? "invalid" : ""}`} type="email" value={d.correo} onChange={set("correo")} placeholder="ana@correo.com" />
                    </Field>
                    <Field label="WhatsApp" req error={errors.whatsapp}>
                      <input className={`input ${errors.whatsapp ? "invalid" : ""}`} value={d.whatsapp} onChange={set("whatsapp")} placeholder="+503 7000 0000" />
                    </Field>
                  </div>
                  <div className="form-row">
                    <Field label="País" req error={errors.pais}>
                      <select className={`select ${errors.pais ? "invalid" : ""}`} value={d.pais} onChange={set("pais")}>
                        <option value="">Selecciona…</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Grado académico" req error={errors.grado}>
                      <select className={`select ${errors.grado ? "invalid" : ""}`} value={d.grado} onChange={set("grado")}>
                        <option value="">Selecciona…</option>
                        {degrees.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </Field>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="Biografía" hint="contá tu historia en pocas líneas">
                    <textarea className="textarea" style={{ minHeight: 120 }} value={d.bio} onChange={set("bio")} placeholder="Ej. Desarrolladora con 4 años creando productos web. Me gusta el trabajo en equipo y aprender cosas nuevas…" />
                  </Field>
                  <div className="pb-sub"><Heart size={16} /> Habilidades blandas</div>
                  <div className="chip-select">
                    {softSkills.map((s) => (
                      <button type="button" key={s} className={`chip-toggle ${soft.includes(s) ? "is-on" : ""}`} onClick={() => toggle(soft, setSoft, s)}>
                        {soft.includes(s) && <Check size={13} />} {s}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="pb-hint" style={{ marginBottom: 14 }}>Agrega tus trabajos anteriores o el actual. Si estás empezando, puedes dejarlo vacío.</p>
                  <div className="repeat">
                    {experiencia.map((row, i) => (
                      <div className="exp-item" key={i}>
                        <div className="exp-item__top">
                          <span>Experiencia {i + 1}</span>
                          <button type="button" className="btn-remove" onClick={() => rmExp(i)} aria-label="Quitar" disabled={experiencia.length === 1}><Trash size={16} /></button>
                        </div>
                        <div className="form-row">
                          <Field label="Puesto / cargo">
                            <input className="input" value={row.puesto} onChange={(e) => setExp(i, "puesto", e.target.value)} placeholder="Ej. Desarrolladora Full-Stack" />
                          </Field>
                          <Field label="Empresa">
                            <input className="input" value={row.empresa} onChange={(e) => setExp(i, "empresa", e.target.value)} placeholder="Ej. Acme Inc." />
                          </Field>
                        </div>
                        <div className="form-row">
                          <Field label="Desde">
                            <input className="input" type="month" value={row.desde} onChange={(e) => setExp(i, "desde", e.target.value)} />
                          </Field>
                          <Field label="Hasta">
                            <input className="input" type="month" value={row.hasta} onChange={(e) => setExp(i, "hasta", e.target.value)} disabled={row.actual} />
                          </Field>
                        </div>
                        <label className="exp-actual">
                          <input type="checkbox" checked={row.actual} onChange={(e) => setExp(i, "actual", e.target.checked)} /> Es mi trabajo actual
                        </label>
                        <Field label="¿Qué hacías?" hint="opcional">
                          <textarea className="textarea" style={{ minHeight: 72 }} value={row.desc} onChange={(e) => setExp(i, "desc", e.target.value)} placeholder="Logros o responsabilidades principales…" />
                        </Field>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-add" onClick={addExp}><Plus size={16} /> Agregar experiencia</button>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="pb-hint" style={{ marginBottom: 14 }}>Marca las que dominas. Puedes agregar las que falten.</p>
                  {techStack.map((group) => (
                    <div className="pb-cat" key={group.cat}>
                      <div className="cat-label">{group.cat}</div>
                      <div className="chip-select">
                        {group.items.map((it) => (
                          <button type="button" key={it} className={`chip-toggle ${tec.includes(it) ? "is-on" : ""}`} onClick={() => toggle(tec, setTec, it)}>
                            {tec.includes(it) && <Check size={13} />} {it}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="pb-custom">
                    <input className="input" value={customTecInput} onChange={(e) => setCustomTecInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomTec(); } }}
                      placeholder="¿Otra que no está? Escribila y agregala" />
                    <button type="button" className="btn btn--ghost" onClick={addCustomTec}><Plus size={17} /> Agregar</button>
                  </div>
                  {customTec.length > 0 && (
                    <div className="chip-select" style={{ marginTop: 12 }}>
                      {customTec.map((t) => (
                        <button type="button" key={t} className="chip-toggle is-on" onClick={() => setCustomTec(customTec.filter((x) => x !== t))}>
                          <Check size={13} /> {t} <span style={{ opacity: .6, marginLeft: 4 }}>✕</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === 4 && (
                <>
                  <div className="pb-sub"><Globe size={16} /> Idiomas</div>
                  <div className="repeat">
                    {idiomas.map((row, i) => (
                      <div className="repeat-row" key={i}>
                        <select className="select" value={row.idioma} onChange={(e) => setIdioma(i, "idioma", e.target.value)}>
                          <option value="">Idioma…</option>
                          {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <select className="select" value={row.nivel} onChange={(e) => setIdioma(i, "nivel", e.target.value)}>
                          <option value="">Nivel…</option>
                          {languageLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <button type="button" className="btn-remove" onClick={() => rmIdioma(i)} aria-label="Quitar" disabled={idiomas.length === 1}><Trash size={16} /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-add" onClick={addIdioma}><Plus size={16} /> Agregar idioma</button>

                  <div className="pb-sub" style={{ marginTop: 22 }}><LinkIcon size={16} /> Enlaces y redes</div>
                  <div className="repeat">
                    {enlaces.map((row, i) => (
                      <div className="repeat-row repeat-row--link" key={i}>
                        <select className="select" value={row.tipo} onChange={(e) => setEnlace(i, "tipo", e.target.value)}>
                          {linkTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <input className="input" value={row.url} onChange={(e) => setEnlace(i, "url", e.target.value)} placeholder="https://…" />
                        <button type="button" className="btn-remove" onClick={() => rmEnlace(i)} aria-label="Quitar" disabled={enlaces.length === 1}><Trash size={16} /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-add" onClick={addEnlace}><Plus size={16} /> Agregar enlace</button>

                  <div className="pb-sub" style={{ marginTop: 22 }}><FileText size={16} /> Tu CV <span className="opt-tag">· opcional</span></div>
                  <label className={`filedrop ${cv ? "has-file" : ""}`}>
                    <input type="file" accept={CV_ACCEPT} onChange={onCv} />
                    {cv ? (
                      <span><FileText size={15} style={{ display: "inline", verticalAlign: "-2px" }} /> {cv.nombre}</span>
                    ) : (
                      <span>Sube tu CV en PDF o Word · opcional</span>
                    )}
                  </label>
                  {errors.cv && <div className="field-error">{errors.cv}</div>}

                  <label className="form-consent" style={{ marginTop: 22 }}>
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <span>Autorizo a Grupo Consiti S.A. de C.V. a guardar mi perfil en el banco de talento de Worky y a contactarme por correo o WhatsApp sobre plazas relevantes. <a href="/privacidad" target="_blank" rel="noopener noreferrer">Cómo manejamos tus datos</a>. {errors.consent && <span className="field-error">{errors.consent}</span>}</span>
                  </label>
                  {status === "error" && <p className="field-error">Ups, algo falló. Intentá de nuevo en un momento.</p>}
                </>
              )}
            </div>

            <div className="pm-foot">
              {step > 0 ? <button className="btn btn--ghost" onClick={back}>Atrás</button> : <span />}
              {isLast ? (
                <button className="btn btn--primary" onClick={submit} disabled={status === "loading"}>
                  {status === "loading" ? "Creando…" : (<>Crear mi perfil <ArrowRight size={18} /></>)}
                </button>
              ) : (
                <button className="btn btn--primary" onClick={next}>Siguiente <ArrowRight size={18} /></button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, req, hint, error, children }) {
  return (
    <div className="field">
      <label>
        {label} {req && <span className="req">*</span>}
        {hint && <span className="opt-tag">· {hint}</span>}
      </label>
      {children}
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}
