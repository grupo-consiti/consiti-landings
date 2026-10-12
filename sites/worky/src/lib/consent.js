// Consentimiento de cookies / almacenamiento.
//
// Worky no usa cookies de publicidad ni de analítica. Lo único que puede guardar
// en el navegador es la campaña por la que llegó la visita, y eso solo si la
// persona lo acepta. Mientras no haya elegido, no se guarda nada opcional.

const KEY = "worky_consent"; // "todas" | "esenciales"

export function getConsent() {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(KEY);
    return v === "todas" || v === "esenciales" ? v : null;
  } catch {
    return null; // modo privado: se trata como "sin decidir"
  }
}

export function setConsent(valor) {
  try {
    localStorage.setItem(KEY, valor);
  } catch {
    /* sin storage: la elección vale solo para esta visita */
  }
  if (valor === "esenciales") {
    try {
      sessionStorage.removeItem("worky_utm");
    } catch {
      /* nada que limpiar */
    }
  }
  window.dispatchEvent(new CustomEvent("worky:consent", { detail: valor }));
}

/** ¿Podemos recordar cosas no esenciales en el navegador? */
export function puedeRecordar() {
  return getConsent() === "todas";
}
