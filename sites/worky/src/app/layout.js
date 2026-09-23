import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worky.consiti.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Worky — Trabaja con nosotros | Grupo Consiti",
  description:
    "Un perfil, todas nuestras plazas. Crea tu perfil gratis en el banco de talento de Grupo Consiti: cuando abrimos una vacante que encaja contigo, te escribimos.",
  keywords: [
    "empleo",
    "trabajo",
    "buscar trabajo",
    "bolsa de trabajo",
    "plazas",
    "vacantes",
    "aplicar a trabajo",
    "Worky",
    "Grupo Consiti",
    "trabajar en Consiti",
    "empleos El Salvador",
    "San Salvador",
  ],
  authors: [{ name: "Grupo Consiti S.A. de C.V." }],
  creator: "Grupo Consiti S.A. de C.V.",
  publisher: "Grupo Consiti S.A. de C.V.",
  openGraph: {
    title: "Worky — Trabaja con nosotros | Grupo Consiti",
    description:
      "Un perfil, todas nuestras plazas. Crea el tuyo gratis en el banco de talento de Grupo Consiti.",
    url: siteUrl,
    siteName: "Worky · Grupo Consiti",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worky — Trabaja con nosotros | Grupo Consiti",
    description:
      "Un perfil, todas nuestras plazas. Crea el tuyo gratis y postúlate con un clic.",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport = {
  themeColor: "#5216E7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
