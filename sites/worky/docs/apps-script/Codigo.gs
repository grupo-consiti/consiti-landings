/**
 * Worky — Webhook a Google Sheets + Archivos en Drive + Correos
 * -----------------------------------------------------------------------
 * Worky es el banco de talento de Grupo Consiti S.A. de C.V.
 *
 * 1) CREA la hoja "Worky — Postulaciones" (al correr `setup` una vez).
 * 2) Recibe perfiles/postulaciones en `doPost` y agrega una fila.
 * 3) Guarda la FOTO y el CV en Google Drive y pone sus enlaces en la hoja,
 *    para que Recursos Humanos pueda buscar currículums desde el Drive.
 * 4) Envía al postulante un CORREO de confirmación.
 * 5) Permite enviar el CORREO DE REACTIVACIÓN a candidatos del banco
 *    (`enviarReactivacion`), avisándoles que hay plazas nuevas abiertas.
 * 6) Guarda la CAMPAÑA de la que vino cada postulación (UTM de la pauta de Meta),
 *    para contar registros por campaña y calcular el costo por registro.
 *
 * Al correr `setup` (o al primer envío) Google pedirá autorizar Hojas + Drive + Gmail.
 * Pasos y re-autorización: ver docs/GOOGLE-SHEETS.md
 */

var SHEET_TAB = "Postulaciones";
// Orden estable: no cambies las primeras 15; las nuevas van al final.
var HEADERS = [
  "Fecha", "Vacante", "Departamento", "Modalidad", "Nombre", "Correo",
  "WhatsApp", "País", "Grado", "Resumen", "Habilidades blandas",
  "Habilidades técnicas", "Respuestas específicas", "CV / LinkedIn", "Origen",
  "Título", "Biografía", "Idiomas", "Enlaces / redes", "Foto", "Experiencia",
  "CV (archivo)", "Reactivación enviada",
  "Campaña", "Fuente", "Anuncio",
];

// worky.consiti.com ya está en producción: los enlaces de los correos apuntan al
// dominio propio. (Antes iban al dominio temporal de Vercel.)
var URL_PLAZAS = "https://worky.consiti.com/#plazas";
var URL_CONSITI = "https://consiti.com";
// Logo para los correos. Va la versión MONOCROMÁTICA (todo blanco): la cabecera
// del correo es morada, y en la versión normal la W y la "y" son moradas y se
// perderían sobre ese fondo.
// Sirve desde worky.consiti.com.
var URL_LOGO = "https://worky.consiti.com/logo-worky-mono.png";
// Tope de correos por corrida de reactivación (cuidá la cuota diaria de Gmail).
var REACTIVACION_LOTE = 50;

/** Corré esto UNA vez: crea la hoja y (al reautorizar) habilita Drive + correo. */
function setup() {
  var sheet = getSheet_();
  var url = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty("SHEET_ID")
  ).getUrl();
  Logger.log("✅ Hoja lista: " + url);
  return url;
}

/** Recibe los perfiles/postulaciones desde /api/apply de la landing. */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    var especificas = "";
    if (data.especificas && typeof data.especificas === "object") {
      especificas = Object.keys(data.especificas)
        .map(function (k) { return k + ": " + data.especificas[k]; })
        .join("  |  ");
    }

    var fotoUrl = saveToDrive_(data.foto, data.nombre, getPhotoFolder_(), "foto");
    var cvUrl = saveToDrive_(data.cvArchivo, data.nombre, getCvFolder_(), "CV", data.cv);

    sheet.appendRow([
      new Date(),
      data.vacante || "", data.departamento || "", data.modalidad || "",
      data.nombre || "", data.correo || "", data.whatsapp || "", data.pais || "",
      data.grado || "", data.resumen || "", data.blandas || "", data.tecnicas || "",
      especificas, data.cv || "", data.origen || "landing-worky",
      data.headline || "", data.bio || "", data.idiomas || "", data.enlaces || "", fotoUrl,
      data.experiencia || "",
      cvUrl, "",
      data.campania || "", data.fuente || "", data.anuncio || "",
    ]);

    try { sendConfirmation_(data); } catch (mailErr) { Logger.log("Correo no enviado: " + mailErr); }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, service: "worky-sheets" });
}

/**
 * Guarda un archivo (dataURL base64) en Drive y devuelve su enlace de solo lectura.
 * `nombreOriginal` se usa para conservar la extensión real del CV.
 */
function saveToDrive_(dataUrl, nombre, folder, etiqueta, nombreOriginal) {
  if (!dataUrl || String(dataUrl).indexOf("base64,") < 0) return "";
  try {
    var meta = dataUrl.substring(5, dataUrl.indexOf(";")); // p. ej. image/jpeg
    var b64 = dataUrl.substring(dataUrl.indexOf("base64,") + 7);
    var bytes = Utilities.base64Decode(b64);

    var ext = "";
    if (nombreOriginal && String(nombreOriginal).indexOf(".") > -1) {
      ext = String(nombreOriginal).split(".").pop().toLowerCase();
    }
    if (!ext) ext = (meta.split("/")[1] || "bin");

    var safe = (nombre || "perfil").replace(/[^A-Za-z0-9]+/g, "_");
    var blob = Utilities.newBlob(bytes, meta, safe + "_" + Date.now() + "." + ext);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    Logger.log(etiqueta + " no guardado: " + err);
    return "";
  }
}

function getPhotoFolder_() {
  return getFolder_("FOTOS_FOLDER_ID", "Worky — Fotos de perfil");
}

/** Carpeta de currículums: es la que Recursos Humanos busca desde el Drive. */
function getCvFolder_() {
  return getFolder_("CVS_FOLDER_ID", "Worky — Currículums");
}

function getFolder_(propKey, nombre) {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty(propKey);
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var folder = DriveApp.createFolder(nombre);
  props.setProperty(propKey, folder.getId());
  return folder;
}

/** Envía el correo de confirmación al postulante. */
function sendConfirmation_(data) {
  var correo = (data.correo || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return;

  var nombre = (data.nombre || "").trim();
  var primerNombre = nombre ? nombre.split(" ")[0] : "";
  var vacante = data.vacante || "el banco de talento de Grupo Consiti";
  var departamento = data.departamento || "";

  var html = emailHtml_(primerNombre || "hola", vacante, departamento);

  MailApp.sendEmail({
    to: correo,
    subject: "Ya estás en el banco de talento de Grupo Consiti" + (primerNombre ? ", " + primerNombre : ""),
    htmlBody: html,
    name: "Worky · Grupo Consiti",
  });
}

function emailHtml_(nombre, vacante, departamento) {
  return EMAIL_TEMPLATE
    .split("{{NOMBRE}}").join(escapeHtml_(nombre))
    .split("{{VACANTE}}").join(escapeHtml_(vacante))
    .split("{{DEPARTAMENTO}}").join(escapeHtml_(departamento))
    .split("{{URL_PLAZAS}}").join(URL_PLAZAS)
    .split("{{URL_CONSITI}}").join(URL_CONSITI)
    .split("{{URL_LOGO}}").join(URL_LOGO);
}

function escapeHtml_(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Abre (o crea) la hoja y asegura los encabezados (agrega columnas nuevas si faltan). */
function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  var ss;

  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.create("Worky — Postulaciones");
    props.setProperty("SHEET_ID", ss.getId());
  }

  var sheet = ss.getSheetByName(SHEET_TAB) || ss.getSheets()[0];
  sheet.setName(SHEET_TAB);

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight("bold").setBackground("#EEEAFE");
  sheet.setFrozenRows(1);
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/* ====================== Plantilla del correo (HTML) ====================== */
var EMAIL_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Ya estás en el banco de talento de Grupo Consiti</title>
<style>
body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
table { border-collapse:collapse; }
img { border:0; outline:none; text-decoration:none; }
a { text-decoration:none; }
@media only screen and (max-width:620px){
.wrap{width:100% !important;} .px{padding-left:24px !important;padding-right:24px !important;} .h1{font-size:26px !important;}
}
</style>
</head>
<body style="margin:0; padding:0; background-color:#F6F5FC;">
<div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#F6F5FC; font-size:1px; line-height:1px;">Recibimos tu postulación. Si avanzas en el proceso, te escribimos.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F6F5FC;">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:22px; overflow:hidden; box-shadow:0 20px 45px -20px rgba(22,15,51,0.28);">
<tr><td style="background-color:#5216E7; background-image:linear-gradient(135deg,#6E35F0 0%,#5216E7 52%,#3B0FAF 118%); padding:34px 40px;">
<img src="{{URL_LOGO}}" alt="Worky by Consiti" width="172" style="display:block; width:172px; max-width:172px; height:auto; border:0; outline:none; text-decoration:none;" />
</td></tr>
<tr><td class="px" style="padding:38px 40px 8px 40px;">
<div style="display:inline-block; background-color:#E4F8F1; color:#0E9E74; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; letter-spacing:0.06em; text-transform:uppercase; padding:7px 13px; border-radius:999px;">Perfil recibido</div>
<h1 class="h1" style="margin:18px 0 0 0; font-family:Arial,Helvetica,sans-serif; font-size:30px; line-height:1.15; color:#160F33; font-weight:bold; letter-spacing:-0.5px;">Listo, {{NOMBRE}}. Ya estás dentro.</h1>
</td></tr>
<tr><td class="px" style="padding:16px 40px 4px 40px; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.65; color:#565273;">Tu perfil ya está en el <strong style="color:#160F33;">banco de talento de Grupo Consiti</strong>. Gracias por tomarte el tiempo.</td></tr>
<tr><td class="px" style="padding:20px 40px 4px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F6F5FC; border:1px solid #E9E7F3; border-radius:16px;"><tr><td style="padding:18px 20px; font-family:Arial,Helvetica,sans-serif;">
<div style="font-size:12px; color:#8B87A6; text-transform:uppercase; letter-spacing:0.06em; font-weight:bold;">Te postulaste a</div>
<div style="font-size:18px; color:#160F33; font-weight:bold; margin-top:5px;">{{VACANTE}}</div>
<div style="font-size:14px; color:#5216E7; font-weight:bold; margin-top:3px;">{{DEPARTAMENTO}}</div>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:24px 40px 4px 40px; font-family:Arial,Helvetica,sans-serif; font-size:16px; color:#160F33; font-weight:bold;">¿Qué sigue?</td></tr>
<tr><td class="px" style="padding:8px 40px 0 40px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.6; color:#565273;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td width="26" valign="top" style="color:#12B886; font-weight:bold;">1.</td><td style="padding-bottom:10px;">Worky compara tu perfil con lo que pide la plaza.</td></tr>
<tr><td width="26" valign="top" style="color:#12B886; font-weight:bold;">2.</td><td style="padding-bottom:10px;"><strong style="color:#160F33;">Si avanzas</strong> en esta o en otra plaza, Recursos Humanos te escribe por correo o WhatsApp.</td></tr>
<tr><td width="26" valign="top" style="color:#12B886; font-weight:bold;">3.</td><td>Tu perfil se queda guardado: entra en cada vacante que abrimos, sin que tengas que hacer nada.</td></tr>
</table>
</td></tr>
<tr><td class="px" align="center" style="padding:30px 40px 8px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="background-color:#5216E7; background-image:linear-gradient(135deg,#6E35F0 0%,#5216E7 52%,#3B0FAF 118%); border-radius:999px;">
<a href="{{URL_PLAZAS}}" target="_blank" style="display:inline-block; padding:15px 30px; font-family:Arial,Helvetica,sans-serif; font-size:16px; font-weight:bold; color:#ffffff;">Ver las plazas abiertas →</a>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:22px 40px 36px 40px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.6; color:#565273;">Gracias por confiar en nosotros.<br />— Recursos Humanos · Grupo Consiti</td></tr>
<tr><td style="background-color:#160F33; padding:26px 40px; font-family:Arial,Helvetica,sans-serif;">
<div style="color:#ffffff; font-size:16px; font-weight:bold;">Worky <span style="color:#A9A4CC; font-weight:normal;">by Consiti</span></div>
<div style="color:#A9A4CC; font-size:13px; line-height:1.6; margin-top:6px;">El banco de talento con IA de <a href="{{URL_CONSITI}}" target="_blank" style="color:#C9C5E4; font-weight:bold;">Grupo Consiti S.A. de C.V.</a> · San Salvador, El Salvador</div>
<div style="color:#8480A6; font-size:12px; margin-top:14px;">Correo automático de confirmación. Si no te postulaste en Worky, ignora este mensaje.</div>
</td></tr>
</table>
</td></tr></table>
</body>
</html>`;


/* ====================== Limpieza de registros de prueba =================
 * Borrar postulaciones es irreversible, así que la función NO borra nada por
 * defecto: primero lista lo que encontró para que lo revises en el registro.
 *
 *   limpiarPruebas()       → solo muestra qué filas borraría
 *   limpiarPruebas(true)   → borra de verdad, después de que lo revisaste
 *
 * Marca como prueba las filas cuyo nombre o correo contenga alguna de las
 * palabras de PATRONES_PRUEBA. Si un candidato real cae ahí por casualidad,
 * ajustá la lista antes de correrla con true.
 * ====================================================================== */

var PATRONES_PRUEBA = ["prueba", "test", "asdf", "qwerty", "ejemplo"];
// Correos internos que se usaron para probar el formulario.
var CORREOS_PRUEBA = ["briant_canizalez@consiti.com"];

function limpiarPruebas(borrarDeVerdad) {
  var sheet = getSheet_();
  var ultima = sheet.getLastRow();
  if (ultima < 2) { Logger.log("La hoja no tiene postulaciones."); return 0; }

  var colNombre = HEADERS.indexOf("Nombre") + 1;
  var colCorreo = HEADERS.indexOf("Correo") + 1;
  var colFecha = HEADERS.indexOf("Fecha") + 1;

  var filas = sheet.getRange(2, 1, ultima - 1, HEADERS.length).getValues();
  var marcadas = [];

  for (var i = 0; i < filas.length; i++) {
    var nombre = String(filas[i][colNombre - 1] || "").toLowerCase();
    var correo = String(filas[i][colCorreo - 1] || "").toLowerCase();
    var esPrueba = CORREOS_PRUEBA.indexOf(correo) > -1;
    if (!esPrueba) {
      for (var j = 0; j < PATRONES_PRUEBA.length; j++) {
        if (nombre.indexOf(PATRONES_PRUEBA[j]) > -1 || correo.indexOf(PATRONES_PRUEBA[j]) > -1) {
          esPrueba = true;
          break;
        }
      }
    }
    if (esPrueba) {
      marcadas.push({
        fila: i + 2,
        fecha: filas[i][colFecha - 1],
        nombre: filas[i][colNombre - 1],
        correo: filas[i][colCorreo - 1],
      });
    }
  }

  if (!marcadas.length) { Logger.log("No hay registros de prueba."); return 0; }

  Logger.log("Se encontraron " + marcadas.length + " registro(s) de prueba:");
  for (var k = 0; k < marcadas.length; k++) {
    Logger.log("  fila " + marcadas[k].fila + " · " + marcadas[k].nombre + " · " + marcadas[k].correo);
  }

  if (!borrarDeVerdad) {
    Logger.log("Nada se borró. Si la lista es correcta, corré limpiarPruebas(true).");
    return marcadas.length;
  }

  // De abajo hacia arriba, para que los índices no se corran al borrar.
  for (var m = marcadas.length - 1; m >= 0; m--) {
    sheet.deleteRow(marcadas[m].fila);
  }
  Logger.log("✅ Borradas " + marcadas.length + " fila(s) de prueba.");
  return marcadas.length;
}

/* ====================== Correo de reactivación ==========================
 * Avisa a los candidatos que YA ESTÁN en el banco de talento que hay plazas
 * nuevas abiertas. Corré `enviarReactivacion` a mano desde el editor de
 * Apps Script cuando Recursos Humanos publique vacantes nuevas.
 *
 * - Solo escribe a quien tenga la columna "Reactivación enviada" vacía.
 * - Marca la fecha en esa columna para no repetirle el correo a nadie.
 * - Manda como máximo REACTIVACION_LOTE correos por corrida (cuota de Gmail).
 * ====================================================================== */

/** Envía el correo de reactivación al banco de talento. Devuelve cuántos salieron. */
function enviarReactivacion() {
  var sheet = getSheet_();
  var ultimaFila = sheet.getLastRow();
  if (ultimaFila < 2) { Logger.log("No hay candidatos en la hoja."); return 0; }

  var colCorreo = HEADERS.indexOf("Correo") + 1;
  var colNombre = HEADERS.indexOf("Nombre") + 1;
  var colMarca = HEADERS.indexOf("Reactivación enviada") + 1;

  var filas = sheet.getRange(2, 1, ultimaFila - 1, HEADERS.length).getValues();
  var enviados = 0;

  for (var i = 0; i < filas.length && enviados < REACTIVACION_LOTE; i++) {
    var correo = String(filas[i][colCorreo - 1] || "").trim();
    var yaEnviado = String(filas[i][colMarca - 1] || "").trim();
    if (yaEnviado) continue;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) continue;

    var nombre = String(filas[i][colNombre - 1] || "").trim();
    var primerNombre = nombre ? nombre.split(" ")[0] : "hola";

    try {
      MailApp.sendEmail({
        to: correo,
        subject: "Abrimos plazas nuevas" + (nombre ? ", " + primerNombre : ""),
        htmlBody: REACTIVACION_TEMPLATE
          .split("{{NOMBRE}}").join(escapeHtml_(primerNombre))
          .split("{{URL_PLAZAS}}").join(URL_PLAZAS)
          .split("{{URL_CONSITI}}").join(URL_CONSITI)
          .split("{{URL_LOGO}}").join(URL_LOGO),
        name: "Worky · Grupo Consiti",
      });
      sheet.getRange(i + 2, colMarca).setValue(new Date());
      enviados++;
    } catch (err) {
      Logger.log("Reactivación no enviada a " + correo + ": " + err);
    }
  }

  Logger.log("✅ Correos de reactivación enviados: " + enviados);
  return enviados;
}

/** Borra las marcas de reactivación para poder volver a escribirle a todo el banco. */
function reiniciarReactivacion() {
  var sheet = getSheet_();
  var ultimaFila = sheet.getLastRow();
  if (ultimaFila < 2) return;
  var colMarca = HEADERS.indexOf("Reactivación enviada") + 1;
  sheet.getRange(2, colMarca, ultimaFila - 1, 1).clearContent();
  Logger.log("Marcas de reactivación borradas.");
}

var REACTIVACION_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Abrimos plazas nuevas en Grupo Consiti</title>
<style>
body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
table { border-collapse:collapse; }
img { border:0; outline:none; text-decoration:none; }
a { text-decoration:none; }
@media only screen and (max-width:620px){
.wrap{width:100% !important;} .px{padding-left:24px !important;padding-right:24px !important;} .h1{font-size:25px !important;}
}
</style>
</head>
<body style="margin:0; padding:0; background-color:#F6F5FC;">
<div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#F6F5FC; font-size:1px; line-height:1px;">Tu perfil sigue en el banco de talento. Estas son las plazas abiertas hoy.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F6F5FC;">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:22px; overflow:hidden; box-shadow:0 20px 45px -20px rgba(22,15,51,0.28);">
<tr><td style="background-color:#5216E7; background-image:linear-gradient(135deg,#6E35F0 0%,#5216E7 52%,#3B0FAF 118%); padding:34px 40px;">
<img src="{{URL_LOGO}}" alt="Worky by Consiti" width="172" style="display:block; width:172px; max-width:172px; height:auto; border:0; outline:none; text-decoration:none;" />
</td></tr>
<tr><td class="px" style="padding:38px 40px 8px 40px;">
<div style="display:inline-block; background-color:#EEEAFE; color:#5216E7; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; letter-spacing:0.06em; text-transform:uppercase; padding:7px 13px; border-radius:999px;">Plazas nuevas</div>
<h1 class="h1" style="margin:18px 0 0 0; font-family:Arial,Helvetica,sans-serif; font-size:29px; line-height:1.15; color:#160F33; font-weight:bold; letter-spacing:-0.5px;">{{NOMBRE}}, abrimos plazas nuevas</h1>
</td></tr>
<tr><td class="px" style="padding:16px 40px 4px 40px; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.65; color:#565273;">Tu perfil sigue guardado en el <strong style="color:#160F33;">banco de talento de Grupo Consiti</strong>. Acabamos de publicar vacantes nuevas y queremos que las veas antes que nadie.</td></tr>
<tr><td class="px" style="padding:14px 40px 4px 40px; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.65; color:#565273;">No tienes que volver a llenar nada: entra, mira las plazas y postúlate con un clic.</td></tr>
<tr><td class="px" align="center" style="padding:28px 40px 8px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="background-color:#5216E7; background-image:linear-gradient(135deg,#6E35F0 0%,#5216E7 52%,#3B0FAF 118%); border-radius:999px;">
<a href="{{URL_PLAZAS}}" target="_blank" style="display:inline-block; padding:15px 30px; font-family:Arial,Helvetica,sans-serif; font-size:16px; font-weight:bold; color:#ffffff;">Ver las plazas abiertas →</a>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:22px 40px 36px 40px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.6; color:#565273;">Si ya encontraste trabajo, felicidades. Igual te avisamos cuando abramos algo que encaje contigo.<br />— Recursos Humanos · Grupo Consiti</td></tr>
<tr><td style="background-color:#160F33; padding:26px 40px; font-family:Arial,Helvetica,sans-serif;">
<div style="color:#ffffff; font-size:16px; font-weight:bold;">Worky <span style="color:#A9A4CC; font-weight:normal;">by Consiti</span></div>
<div style="color:#A9A4CC; font-size:13px; line-height:1.6; margin-top:6px;">El banco de talento de <a href="{{URL_CONSITI}}" target="_blank" style="color:#C9C5E4; font-weight:bold;">Grupo Consiti S.A. de C.V.</a> · San Salvador, El Salvador</div>
<div style="color:#8480A6; font-size:12px; margin-top:14px;">Recibes este correo porque creaste tu perfil en Worky. Si no quieres más avisos de plazas, responde con la palabra BAJA.</div>
</td></tr>
</table>
</td></tr></table>
</body>
</html>`;
