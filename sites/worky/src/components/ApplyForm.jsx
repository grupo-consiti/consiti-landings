"use client";

import { useState } from "react";
import { countries, degrees } from "@/lib/formOptions";
import { readCv, CV_ACCEPT } from "@/lib/cvFile";
import { getTracking } from "@/lib/tracking";
import { Check, Shield, Mail, Chat, ArrowRight, FileText } from "./Icon";

const empty = {
  nombre: "", correo: "", whatsapp: "", pais: "", grado: "",
  blandas: "", tecnicas: "", resumen: "", video: "",
};

export default function ApplyForm() {
  const [data, setData] = useState(empty);
  const [cv, setCv] = useState(null); // { nombre, tipo, dataUrl }
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

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

  function validate() {
    const err = {};
    if (!data.nombre.trim()) err.nombre = "Escribe tu nombre completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) err.correo = "Escribe un correo válido.";
    if (data.whatsapp.replace(/\D/g, "").length < 7) err.whatsapp = "Escribe un WhatsApp válido.";
    if (!data.pais) err.pais = "Elige tu país.";
    if (!data.grado) err.grado = "Elige tu grado académico.";
    if (!data.resumen.trim()) err.resumen = "Cuéntanos brevemente sobre ti.";
    if (!consent) err.consent = "Necesitamos tu autorización para contactarte.";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          cv: cv?.nombre || "",
          cvArchivo: cv?.dataUrl || "",
          cvTipo: cv?.tipo || "",
          vacante: "Banco de talento (general)",
          departamento: "General",
          ...getTracking("banco general"),
        }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("done");
    } catch (_) {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="form-success__ic"><Check size={34} /></div>
          <h3>¡Listo, {data.nombre.split(" ")[0] || "crack"}! 🎉</h3>
          <p>
            Ya estás en el banco de talento de Grupo Consiti. Te enviamos un correo
            de confirmación. Cuando abra una plaza que encaje contigo, te escribimos
            por correo o WhatsApp.
          </p>
          <div className="hero__meta" style={{ justifyContent: "center", marginTop: 22 }}>
            <span className="chk"><Mail size={16} /> Revisá tu correo</span>
            <span className="chk"><Chat size={16} /> Atento a tu WhatsApp</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
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

      <div className="form-row">
        <Field label="Habilidades blandas">
          <input className="input" value={data.blandas} onChange={set("blandas")} placeholder="Comunicación, liderazgo…" />
        </Field>
        <Field label="Habilidades técnicas">
          <input className="input" value={data.tecnicas} onChange={set("tecnicas")} placeholder="Excel, React, ventas…" />
        </Field>
      </div>

      <Field label="Cuéntanos sobre ti" req error={errors.resumen}>
        <textarea className={`textarea ${errors.resumen ? "invalid" : ""}`} value={data.resumen} onChange={set("resumen")} placeholder="Quién eres, qué sabes hacer y qué estás buscando." />
      </Field>

      <Field label="Video de presentación" optTag>
        <input className="input" value={data.video} onChange={set("video")} placeholder="Enlace de YouTube, Drive o Loom" />
      </Field>

      <Field label="Adjuntar CV" optTag error={errors.cv}>
        <label className={`filedrop ${cv ? "has-file" : ""}`}>
          <input type="file" accept={CV_ACCEPT} onChange={onCv} />
          {cv ? (
            <span><FileText size={15} style={{ display: "inline", verticalAlign: "-2px" }} /> {cv.nombre}</span>
          ) : (
            <span>Arrastra tu CV o haz clic para subirlo · PDF o Word</span>
          )}
        </label>
      </Field>

      <label className="form-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Autorizo a Grupo Consiti S.A. de C.V. a guardar mis datos en el banco de
          talento de Worky y a contactarme por correo o WhatsApp sobre plazas
          relevantes.{" "}
          <a href="/privacidad" target="_blank" rel="noopener noreferrer">Cómo manejamos tus datos</a>. {errors.consent && <span className="field-error">{errors.consent}</span>}
        </span>
      </label>

      {status === "error" && (
        <p className="field-error" style={{ marginBottom: 14 }}>
          Ups, algo falló al enviar. Intentá de nuevo en un momento.
        </p>
      )}

      <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : (<>Crear mi perfil gratis <ArrowRight size={19} /></>)}
      </button>

      <p className="form-note" style={{ textAlign: "center", marginTop: 14 }}>
        <Shield size={13} style={{ display: "inline", verticalAlign: "-2px" }} /> Tus datos solo se usan para contactarte. No los compartimos con nadie.
      </p>
    </form>
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
