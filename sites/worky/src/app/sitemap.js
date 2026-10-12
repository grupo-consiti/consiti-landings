// Sitemap (encargo §C). Rutas públicas actuales. Cuando existan páginas por plaza
// (/plazas/[id]) se agregan aquí desde src/lib/positions.js.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worky.consiti.com";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
