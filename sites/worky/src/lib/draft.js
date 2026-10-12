// Borradores de los wizards.
//
// Llenar el perfil toma unos minutos y en el teléfono cualquier cosa interrumpe:
// una llamada, el navegador que recicla la pestaña, un toque en Atrás. Sin esto,
// se pierde todo y casi nadie vuelve a empezar.
//
// El borrador vive SOLO en el navegador de la persona, en su propio dispositivo.
// Nunca viaja a nuestros servidores hasta que aprieta Enviar.

const PREFIJO = "worky_draft_";
const VENCE_EN = 7 * 24 * 60 * 60 * 1000; // una semana

function clave(nombre) {
  return PREFIJO + nombre;
}

/** Devuelve el borrador, o null si no hay, venció o quedó corrupto. */
export function leerBorrador(nombre) {
  if (typeof window === "undefined") return null;
  try {
    const crudo = localStorage.getItem(clave(nombre));
    if (!crudo) return null;
    const { guardadoEn, datos } = JSON.parse(crudo);
    if (!guardadoEn || Date.now() - guardadoEn > VENCE_EN) {
      localStorage.removeItem(clave(nombre));
      return null;
    }
    return datos || null;
  } catch {
    return null; // modo privado, storage lleno o JSON roto: seguimos sin borrador
  }
}

/**
 * Guarda el borrador. Si el navegador se queda sin espacio —pasa con la foto—
 * lo intenta de nuevo sin ella antes de rendirse.
 */
export function guardarBorrador(nombre, datos) {
  if (typeof window === "undefined") return;
  const paquete = (d) => JSON.stringify({ guardadoEn: Date.now(), datos: d });
  try {
    localStorage.setItem(clave(nombre), paquete(datos));
  } catch {
    try {
      const { foto, ...resto } = datos;
      localStorage.setItem(clave(nombre), paquete(resto));
    } catch {
      /* sin espacio: el wizard funciona igual, solo sin red de seguridad */
    }
  }
}

export function borrarBorrador(nombre) {
  try {
    localStorage.removeItem(clave(nombre));
  } catch {
    /* nada que borrar */
  }
}
