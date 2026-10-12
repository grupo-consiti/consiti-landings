"use client";

import { useEffect, useRef, useState } from "react";
import { countries, degrees } from "@/lib/formOptions";
import { Check, Mail, Chat, ArrowRight, Shield, FileText } from "./Icon";
import { readCv, CV_ACCEPT } from "@/lib/cvFile";
import { getTracking } from "@/lib/tracking";
import { leerBorrador, guardarBorrador, borrarBorrador } from "@/lib/draft";

// Las preguntas propias de la plaza se reparten en pasos cortos: son hasta nueve
// y de un solo golpe abruman, que es justo lo que el wizard evita.
const POR_PASO = 5;

// Reparte parejo en vez de cortar de a tantos: con nueve preguntas da 5 y 4,
// no 5, 4 y una suelta al final.
function trocear(lista, maximo) {
  if (!lista.length) return [];
  const cantidad = Math.ceil(lista.length / maximo);
  const tam = Math.ceil(lista.length / cantidad);
  const grupos = [];
  for (let i = 0; i < lista.length; i += tam) grupos.push(lista.slice(i, i + tam));
  return grupos;
}

export default function ApplyModal({ vacancy, departamento, onClose }) {
  const grupos = trocear(vacancy.extraFields || [], POR_PASO);

  // Paso 0: la plaza. 1: tus datos. 2: sobre ti. 3 en adelante: la plaza.
  const PASOS = ["La plaza", "Tus datos", "Sobre ti"].concat(
    grupos.map((_, i) => (grupos.length === 1 ? "Sobre la plaza" : "Sobre la plaza " + (i + 1)))
  );

  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    nombre: "", correo: "", whatsapp: "", pais: "", grado: "", resumen: "", enlaces: "",
  });
  const [extra, setExtra] = useState({});
  const [cv, setCv] = useState(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [restaurado, setRestaurado] = useState(false);
  const listo = useRef(false);

  // Un borrador por plaza: las preguntas cambian de una a otra.
  const claveBorrador = "plaza-" + vacancy.id;

  useEffect(() => {
    const b = leerBorrador(claveBorrador);
    if (b) {
      if (b.data) setData(b.data);
      if (b.extra) setExtra(b.extra);
      if (typeof b.step === "number") setStep(b.step);
      setRestaurado(true);
    }
    listo.current = true;
  }, [claveBorrador]);

  // Se guarda mientras escribe. Ni el CV ni el consentimiento: el primero pesa
  // demasiado y el segundo es un acto legal que se hace en el momento.
  useEffect(() => {
    if (!listo.current || status === "done") return;
    // Un borrador vacío no es un borrador: si no hay nada escrito, se borra.
    // Si no, al volver aparecería el aviso de "retomamos" sin nada que retomar.
    const hayAlgo =
      Object.values(data).some((v) => String(v).trim()) ||
      Object.values(extra).some((v) => String(v).trim());
    const t = setTimeout(() => {
      if (hayAlgo) guardarBorrador(claveBorrador, { data, extra, step });
      else borrarBorrador(claveBorrador);
    }, 500);
    return () => clearTimeout(t);
  }, [data, extra, step, status, claveBorrador]);

  function empezarDeCero() {
    borrarBorrador(claveBorrador);
    setData({ nombre: "", correo: "", whatsapp: "", pais: "", grado: "", resumen: "", enlaces: "" });
    setExtra({}); setCv(null); setErrors({}); setStep(0); setRestaurado(false);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const setEx = (k) => (e) => setExtra((x) => ({ ...x, [k]: e.target.value }));

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

  // Cada paso valida lo suyo: nadie llega al final para enterarse de un error
  // que dejo cuatro pantallas atras.
  function validar(paso) {
    const err = {};
    if (paso === 1) {
      if (!data.nombre.trim()) err.nombre = "Escribe tu nombre completo.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) err.correo = "Escribe un correo válido.";
      if (data.whatsapp.replace(/\D/g, "").length < 7) err.whatsapp = "Escribe un WhatsApp válido.";
      if (!data.pais) err.pais = "Elige tu país.";
      if (!data.grado) err.grado = "Elige tu grado académico.";
    }
    if (paso === 2 && !data.resumen.trim()) {
      err.resumen = "Cuéntanos por qué encajas.";
    }
    if (paso >= 3) {
      (grupos[paso - 3] || []).forEach((f) => {
        if (f.required && !String(extra[f.name] || "").trim()) err[f.name] = "Campo obligatorio.";
      });
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  const esUltimo = step === PASOS.length - 1;

  function next() {
    if (!validar(step)) return;
    setStep((s) => Math.min(s + 1, PASOS.length - 1));
    document.querySelector(".pm-body")?.scrollTo({ top: 0 });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    document.querySelector(".pm-body")?.scrollTo({ top: 0 });
  }

  async function submit() {
    if (!validar(step)) return;
    if (!consent) { setErrors((x) => ({ ...x, consent: "Necesitamos tu autorización." })); return; }
    setStatus("loading");

    const especificas = {};
    (vacancy.extraFields || []).forEach((f) => {
      if (extra[f.name]) especificas[f.label] = extra[f.name];
    });

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          cv: cv?.nombre || "",
          cvArchivo: cv?.dataUrl || "",
          cvTipo: cv?.tipo || "",
          vacante: vacancy.role,
          departamento,
          modalidad: vacancy.modality,
          especificas,
          ...getTracking("vacante: " + vacancy.id),
        }),
      });
      if (!res.ok) throw new Error("bad");
      borrarBorrador(claveBorrador);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__card pm-card" role="dialog" aria-modal="true" aria-label={"Aplicar a " + vacancy.role}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">✕</button>

        {status === "done" ? (
          <div className="pm-body">
            <div className="form-success" style={{ padding: "26px 6px" }}>
              <div className="form-success__ic"><Check size={34} /></div>
              <h3>¡Aplicación enviada, {data.nombre.split(" ")[0] || "crack"}! 🎉</h3>
              <p>
                Recibimos tu postulación a <strong>{vacancy.role}</strong>. Si avanzas
                en el proceso, Recursos Humanos te contacta por correo o WhatsApp.
              </p>
              <div className="hero__meta" style={{ justifyContent: "center", marginTop: 20 }}>
                <span className="chk"><Mail size={16} /> Revisa tu correo</span>
                <span className="chk"><Chat size={16} /> Pendiente del WhatsApp</span>
              </div>
              <button className="btn btn--dark btn--lg" style={{ marginTop: 22 }} onClick={onClose}>Listo</button>
            </div>
          </div>
        ) : (
          <>
            <div className="pm-head">
              <div className="pm-kicker">{departamento} · Paso {step + 1} de {PASOS.length}</div>
              <h3>{step === 0 ? vacancy.role : PASOS[step]}</h3>
              <div className="pm-steps">
                {PASOS.map((_, i) => <span key={i} className={`pm-dot ${i <= step ? "on" : ""}`} />)}
              </div>
            </div>

            <div className="pm-body">
              {restaurado && step > 0 && (
                <div className="draft-note">
                  <span>Retomamos donde lo dejaste. El CV sí hay que volver a adjuntarlo.</span>
                  <button type="button" onClick={empezarDeCero}>Empezar de cero</button>
                </div>
              )}

              {/* 0 · De qué se trata la plaza, antes de pedir un solo dato */}
              {step === 0 && (
                <>
                  <p className="modal__sub" style={{ marginTop: 0 }}>
                    {vacancy.modality} · {vacancy.location} · {vacancy.type}
                  </p>
                  <p className="modal__desc" style={{ marginTop: 14 }}>{vacancy.desc}</p>

                  {vacancy.closes && (
                    <p className="pos__closes" style={{ marginTop: 0, marginBottom: 18 }}>
                      Postulaciones abiertas hasta el {vacancy.closes}
                    </p>
                  )}

                  {vacancy.requirements?.length > 0 && (
                    <>
                      <div className="pb-sub">Lo que pide</div>
                      <ul className="reqs__list">
                        {vacancy.requirements.map((r) => (
                          <li key={r}><Check size={14} /> {r}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {vacancy.note && <p className="reqs__note">{vacancy.note}</p>}
                </>
              )}

              {/* 1 · Datos de contacto */}
              {step === 1 && (
                <>
                  <div className="form-row">
                    <Field label="Nombre completo" req error={errors.nombre}>
                      <input className={`input ${errors.nombre ? "invalid" : ""}`} value={data.nombre} onChange={set("nombre")} placeholder="Ej. Ana Martínez" />
                    </Field>
                    <Field label="Correo" req error={errors.correo}>
                      <input className={`input ${errors.correo ? "invalid" : ""}`} type="email" value={data.correo} onChange={set("correo")} placeholder="ana@correo.com" />
                    </Field>
                  </div>
                  <div className="form-row">
                    <Field label="WhatsApp" req error={errors.whatsapp}>
                      <input className={`input ${errors.whatsapp ? "invalid" : ""}`} value={data.whatsapp} onChange={set("whatsapp")} placeholder="+503 7000 0000" />
                    </Field>
                    <Field label="País" req error={errors.pais}>
                      <select className={`select ${errors.pais ? "invalid" : ""}`} value={data.pais} onChange={set("pais")}>
                        <option value="">Selecciona…</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Grado académico" req error={errors.grado}>
                    <select className={`select ${errors.grado ? "invalid" : ""}`} value={data.grado} onChange={set("grado")}>
                      <option value="">Selecciona…</option>
                      {degrees.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                </>
              )}

              {/* 2 · Presentación y archivos */}
              {step === 2 && (
                <>
                  <Field label="¿Por qué encajas en esta plaza?" req error={errors.resumen}>
                    <textarea className={`textarea ${errors.resumen ? "invalid" : ""}`} value={data.resumen} onChange={set("resumen")} placeholder="¿Por qué encajas en esta plaza?" />
                  </Field>

                  <Field label="LinkedIn o portafolio" optTag>
                    <input className="input" value={data.enlaces} onChange={set("enlaces")} placeholder="https://linkedin.com/in/…" />
                  </Field>

                  <div className="pb-sub" style={{ marginTop: 22 }}>
                    <FileText size={16} /> Tu CV <span className="opt-tag">· opcional</span>
                  </div>
                  <label className={`filedrop ${cv ? "has-file" : ""}`}>
                    <input type="file" accept={CV_ACCEPT} onChange={onCv} />
                    {cv ? (
                      <span><FileText size={15} style={{ display: "inline", verticalAlign: "-2px" }} /> {cv.nombre}</span>
                    ) : (
                      <span>Sube tu CV en PDF o Word · opcional</span>
                    )}
                  </label>
                  {errors.cv && <div className="field-error">{errors.cv}</div>}
                </>
              )}

              {/* 3 en adelante · Las preguntas propias de la plaza */}
              {step >= 3 && (
                <>
                  <p className="modal__desc" style={{ marginTop: 0 }}>
                    {grupos.length > 1
                      ? "Preguntas propias de la plaza. Van en grupos cortos para que no se haga pesado."
                      : "Lo puntual de esta plaza."}
                  </p>

                  {(grupos[step - 3] || []).map((f) => (
                    <Field key={f.name} label={f.label} req={f.required} error={errors[f.name]}>
                      {f.type === "select" ? (
                        <select className={`select ${errors[f.name] ? "invalid" : ""}`} value={extra[f.name] || ""} onChange={setEx(f.name)}>
                          <option value="">Selecciona…</option>
                          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : f.type === "textarea" ? (
                        <textarea className={`textarea ${errors[f.name] ? "invalid" : ""}`} value={extra[f.name] || ""} onChange={setEx(f.name)} placeholder={f.placeholder || ""} />
                      ) : (
                        <input className={`input ${errors[f.name] ? "invalid" : ""}`} type={f.type === "number" ? "number" : "text"} value={extra[f.name] || ""} onChange={setEx(f.name)} placeholder={f.placeholder || ""} />
                      )}
                    </Field>
                  ))}

                  {esUltimo && (
                    <>
                      <label className="form-consent" style={{ marginTop: 22 }}>
                        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                        <span>
                          Autorizo a Grupo Consiti S.A. de C.V. a guardar mis datos en el banco
                          de talento de Worky y a contactarme sobre esta y otras plazas.{" "}
                          <a href="/privacidad" target="_blank" rel="noopener noreferrer">Cómo manejamos tus datos</a>.
                          {errors.consent && <span className="field-error">{errors.consent}</span>}
                        </span>
                      </label>
                      {status === "error" && (
                        <p className="field-error">Ups, algo falló. Intentá de nuevo en un momento.</p>
                      )}
                      <p className="form-note" style={{ marginTop: 12 }}>
                        <Shield size={13} style={{ display: "inline", verticalAlign: "-2px" }} /> Tus datos solo se usan para este proceso de selección.
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="pm-foot">
              {step > 0 ? <button className="btn btn--ghost" onClick={back}>Atrás</button> : <span />}
              {esUltimo ? (
                <button className="btn btn--primary" onClick={submit} disabled={status === "loading"}>
                  {status === "loading" ? "Enviando…" : (<>Enviar aplicación <ArrowRight size={18} /></>)}
                </button>
              ) : (
                <button className="btn btn--primary" onClick={next}>
                  {step === 0 ? "Aplicar a esta plaza" : "Siguiente"} <ArrowRight size={18} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, req, optTag, error, children }) {
  return (
    <div className="field">
      <label>
        {label} {req && <span className="req">*</span>}
        {optTag && <span className="opt-tag">· opcional</span>}
      </label>
      {children}
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}
