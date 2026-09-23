// Lectura del CV para enviarlo al endpoint y que Apps Script lo guarde en Drive.
//
// El archivo viaja como dataURL (base64) dentro del JSON de /api/apply, igual que
// la foto de perfil. Google Apps Script tiene un límite práctico de payload, por eso
// se topa en 4 MB: un CV en PDF pesa mucho menos.

export const CV_MAX_MB = 4;
export const CV_ACCEPT = ".pdf,.doc,.docx";

const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * Lee el archivo y devuelve { nombre, tipo, dataUrl }.
 * Lanza Error con mensaje listo para mostrar si el archivo no sirve.
 */
export function readCv(file) {
  return new Promise((resolve, reject) => {
    if (!file) { reject(new Error("No se seleccionó ningún archivo.")); return; }

    const ext = file.name.toLowerCase().split(".").pop();
    const tipoOk = CV_TYPES.includes(file.type) || ["pdf", "doc", "docx"].includes(ext);
    if (!tipoOk) { reject(new Error("El CV debe ser PDF o Word (.pdf, .doc, .docx).")); return; }

    if (file.size > CV_MAX_MB * 1024 * 1024) {
      reject(new Error(`El archivo pesa más de ${CV_MAX_MB} MB. Subí una versión más liviana.`));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) =>
      resolve({ nombre: file.name, tipo: file.type || "application/octet-stream", dataUrl: e.target.result });
    reader.onerror = () => reject(new Error("No pudimos leer el archivo. Intentá de nuevo."));
    reader.readAsDataURL(file);
  });
}
