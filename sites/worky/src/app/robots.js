// Indexación (encargo §C). URL base = dominio definitivo, con fallback al mismo valor
// que usa layout.js, así funciona aunque no esté seteada NEXT_PUBLIC_SITE_URL.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worky.consiti.com";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
