// Atribución de campañas (Meta Ads y cualquier otra pauta).
//
// La pauta manda tráfico a Worky con parámetros UTM en la URL. Acá los leemos y los
// mandamos junto con la postulación, para que en la hoja se pueda contar cuántos
// registros trajo cada campaña y calcular el costo por registro.
//
// No se guarda nada personal: solo de qué anuncio viene la visita.
//
// El parámetro de la URL se lee siempre (está a la vista, no es almacenamiento).
// Recordarlo entre páginas sí requiere consentimiento: ver src/lib/consent.js.

import { puedeRecordar } from "./consent";

const KEY = "worky_utm";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function readStore() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {}; // modo privado o storage bloqueado
  }
}

function writeStore(obj) {
  if (!puedeRecordar()) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(obj));
  } catch {
    /* sin storage: igual funciona mientras la URL conserve los parámetros */
  }
}

function readUrl() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const found = {};
  FIELDS.forEach((f) => {
    const v = p.get(f);
    if (v) found[f] = v.trim().slice(0, 120);
  });
  return found;
}

/**
 * Datos de campaña para adjuntar al payload de /api/apply.
 * @param {string} origenBase - de qué formulario salió ("perfil", "vacante"…)
 */
export function getTracking(origenBase) {
  const fromUrl = readUrl();
  if (Object.keys(fromUrl).length) writeStore(fromUrl);
  const u = Object.keys(fromUrl).length ? fromUrl : readStore();

  return {
    origen: [origenBase, u.utm_campaign].filter(Boolean).join(" · "),
    campania: u.utm_campaign || "",
    fuente: [u.utm_source, u.utm_medium].filter(Boolean).join(" / "),
    anuncio: u.utm_content || u.utm_term || "",
  };
}
