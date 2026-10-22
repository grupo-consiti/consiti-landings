# Bolsa de Trabajo · Grupo Consiti

Sitio donde **Grupo Consiti S.A. de C.V.** publica sus vacantes. El candidato elige la
plaza, llena **el formulario de esa plaza** y la respuesta cae en el Google Sheet de
Recursos Humanos (vía Apps Script). No hay cuentas, perfiles guardados ni IA que
recomiende plazas.

- **Framework:** Next.js 15 (App Router) + React 18
- **Estilo:** CSS propio con la paleta del manual de Consiti (negro, morado `#5216E7`,
  lavanda `#DFD2FF`, blanco), sin degradados
- **Tipografía:** Hanken Grotesk (versión abierta de HK Grotesk) vía `next/font`
- **Dominio:** `worky.consiti.com` (Cloud Run, servicio `worky-landing`)

> **Cambio de enfoque (22-oct-2026).** El sitio dejó de ser "Worky", el banco de
> talento con perfil e IA, y pasó a ser la Bolsa de Trabajo de Consiti con marca
> 100 % Consiti. La carpeta y el servicio conservan el nombre `worky` para no romper
> el despliegue. `docs/BRANDING.md` y `docs/entrega/` describen el modelo anterior.

## Publicar o quitar una vacante

Todo vive en [`src/lib/positions.js`](src/lib/positions.js): cada plaza trae su
descripción, requisitos y sus preguntas propias (`extraFields`), que son las que arma
su formulario. Para quitar una plaza, se borra del archivo. Enlace directo para la
pauta: `/?plaza=<id>` abre el formulario de esa plaza.

---

## 🗂️ Estructura del proyecto

```
src/
├── app/            layout (SEO, tipografía), page, privacidad, terminos, api/apply, OG
├── components/     Header, Hero, Positions (listado + filtros), ApplyModal (formulario
│                   por plaza), HowItWorks, WhyConsiti, Faq, FinalCta, Footer, LegalShell
└── lib/            positions (catálogo), tracking y consent (UTM), draft, cvFile
docs/apps-script/   Codigo.gs: webhook → Google Sheets + CV en Drive + correo
```

---

## 🚀 Correr en local

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de producción:

```bash
npm run build
npm run start
```

---

## 🌐 Desplegar en Vercel

El proyecto ya está enlazado a Vercel. Para publicar cambios:

```bash
vercel --prod
```

Detalles completos en [`docs/DEPLOY.md`](docs/DEPLOY.md).

---

## 📥 Postulaciones y Google Sheets

Hay dos formas de postular, y ambas caen al mismo lugar:

1. **Banco de talento general** (sección "Sumate gratis").
2. **Aplicar a una vacante**: en el catálogo de plazas (agrupado por departamento),
   cada botón **Aplicar** abre un **formulario instantáneo (modal)** con los datos base
   + las **preguntas específicas de esa plaza**.

Todo se envía a `POST /api/apply`, que **reenvía cada postulación a un Google Sheet**
mediante un Web App de Google Apps Script. **La foto y el CV se guardan en Google
Drive** (carpetas "Worky — Fotos de perfil" y "Worky — Currículums") y la hoja guarda
los enlaces, para que Recursos Humanos busque currículums desde el Drive.

Una sola base: los dos formularios caen en la misma hoja. No hay ni debe haber un
formulario paralelo (ej. Google Forms) capturando candidatos por fuera.

👉 Para crear la hoja y activar la conexión (5 min, una sola vez), seguí
[`docs/GOOGLE-SHEETS.md`](docs/GOOGLE-SHEETS.md). Mientras no esté configurada la
variable `SHEETS_WEBHOOK_URL`, el endpoint responde OK y registra en logs (no se pierde
el flujo).

Correos: la **confirmación** sale automática al registrarse y la **reactivación** se
dispara a mano (`enviarReactivacion` en Apps Script) cuando se abren plazas nuevas.

> **Plazas:** [`src/lib/positions.js`](src/lib/positions.js) tiene las vacantes reales
> de Consiti, tomadas de las fichas de RR. HH. **No se publica salario ni estipendio**
> ni requisitos de edad, sexo o apariencia — las reglas están al inicio del archivo.

---

## ⚖️ Privacidad, términos y cookies

- `/privacidad` — qué datos se recogen, para qué, dónde viven y cómo pedir que se
  borren. Enlazada desde el pie y desde cada casilla de consentimiento.
- `/terminos` — reglas de uso: gratis siempre, postular no garantiza empleo,
  veracidad de la información, uso correcto del sitio.
- **Autoguardado:** los dos wizards guardan el avance en `localStorage` mientras la
  persona escribe, para que cerrar la ventana no le cueste empezar de cero. El borrador
  **no sale del dispositivo**, no incluye el CV, se borra al enviar y vence a la semana.
  Está declarado en `/privacidad`.
- **Banner de cookies:** Worky no usa cookies de publicidad ni de analítica. Lo único
  opcional es recordar de qué campaña llegó la visita, y solo si la persona acepta
  (`src/lib/consent.js`). Si elige "solo lo necesario", no se guarda nada opcional —
  la atribución sigue funcionando leyendo el UTM de la URL, sin almacenarlo.

> ⚠️ Los textos legales los redactó el equipo, **no un abogado**. Antes de una campaña
> grande conviene que alguien de legal los revise, sobre todo el plazo de 15 días
> hábiles para atender solicitudes y el correo de contacto.

## 🎨 Marca

Toda la identidad (logo, isotipo, paleta, tipografía, iconografía, voz y las reglas de
co-branding con Grupo Consiti) está documentada en
[`docs/BRANDING.md`](docs/BRANDING.md).

## 🧭 Estado y pendientes

Las correcciones de Dirección aplicadas el 22-sep-2026 y lo que sigue bloqueado
(DNS del subdominio, perfiles de puesto, retiro del Google Form) están en
[`docs/ROADMAP.md`](docs/ROADMAP.md).
