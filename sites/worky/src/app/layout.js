import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Hanken Grotesk es la versión abierta de HK Grotesk, la tipografía del manual
// de marca de Consiti. Una sola familia para títulos y texto.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worky.consiti.com";

const title = "Bolsa de Trabajo | Grupo Consiti";
const description =
  "Las vacantes abiertas de Grupo Consiti en un solo lugar. Elige la plaza, llena su formulario y Recursos Humanos te contacta. Sin crear cuenta.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "bolsa de trabajo",
    "empleo",
    "vacantes",
    "plazas",
    "trabajo en El Salvador",
    "San Salvador",
    "Grupo Consiti",
    "trabajar en Consiti",
    "empleos tecnología",
    "prácticas profesionales",
  ],
  authors: [{ name: "Grupo Consiti S.A. de C.V." }],
  creator: "Grupo Consiti S.A. de C.V.",
  publisher: "Grupo Consiti S.A. de C.V.",
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Bolsa de Trabajo · Grupo Consiti",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={hanken.variable}>
      <body>{children}</body>
    </html>
  );
}
