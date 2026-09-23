import { NextResponse } from "next/server";

/**
 * POST /api/apply
 * Recibe una postulación (perfil del banco de talento o aplicación a una vacante)
 * y la reenvía al Google Sheet vía el Web App de Apps Script (SHEETS_WEBHOOK_URL).
 *
 * Incluye foto y CV (dataURL base64): el Apps Script los guarda en Google Drive y
 * escribe los enlaces en la hoja, para que Recursos Humanos pueda buscar currículums
 * desde el Drive. Ver docs/GOOGLE-SHEETS.md.
 */
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const required = ["nombre", "correo", "whatsapp", "pais"];
  const missing = required.filter((k) => !data?.[k] || String(data[k]).trim() === "");
  if (missing.length) {
    return NextResponse.json({ ok: false, error: "Faltan campos", missing }, { status: 422 });
  }

  const record = {
    vacante: data.vacante || "Banco de talento (general)",
    departamento: data.departamento || "General",
    modalidad: data.modalidad || "",
    nombre: data.nombre,
    correo: data.correo,
    whatsapp: data.whatsapp,
    pais: data.pais,
    headline: data.headline || "",
    grado: data.grado || "",
    bio: data.bio || "",
    resumen: data.resumen || data.bio || "",
    tecnicas: data.tecnicas || "",
    blandas: data.blandas || "",
    experiencia: data.experiencia || "",
    idiomas: data.idiomas || "",
    enlaces: data.enlaces || "",
    especificas: data.especificas || {},
    cv: data.cv || "",
    cvArchivo: data.cvArchivo || "",
    cvTipo: data.cvTipo || "",
    foto: data.foto || "",
    origen: data.origen || "landing-worky",
    campania: data.campania || "",
    fuente: data.fuente || "",
    anuncio: data.anuncio || "",
    recibidoEn: new Date().toISOString(),
  };

  const webhook = process.env.SHEETS_WEBHOOK_URL;
  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!r.ok) console.error("[worky] webhook respondió", r.status);
    } catch (err) {
      console.error("[worky] error enviando al Google Sheet:", err);
    }
  } else {
    const { foto, cvArchivo, ...rest } = record;
    console.log("[worky] nuevo registro (sin webhook):", {
      ...rest,
      foto: foto ? "[imagen]" : "",
      cvArchivo: cvArchivo ? "[archivo]" : "",
    });
  }

  return NextResponse.json({ ok: true, message: "Perfil recibido" }, { status: 200 });
}

export function GET() {
  const wired = Boolean(process.env.SHEETS_WEBHOOK_URL);
  return NextResponse.json({ ok: true, service: "worky-apply", sheetsWired: wired });
}
