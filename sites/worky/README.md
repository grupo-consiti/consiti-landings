# Worky · Landing

Landing y banco de talento de **Grupo Consiti S.A. de C.V.** Worky es la página
"Trabaja con nosotros": el candidato crea su perfil una vez y queda visible para todas
las plazas que abre Consiti.

- **Framework:** Next.js 15 (App Router) + React 18
- **Estilo:** CSS propio con design tokens (sin dependencias de UI)
- **Tipografías:** Sora (títulos) + Inter (texto) vía `next/font`
- **Hosting:** Vercel → **https://worky-zeta.vercel.app**
- **Dominio destino:** `worky.consiti.com` *(pendiente de DNS)*

> 📦 **¿Vas a retomar el proyecto?** Empezá por
> [`docs/entrega/00-LEEME-PRIMERO.md`](docs/entrega/00-LEEME-PRIMERO.md): contexto
> funcional, arquitectura, lo que falta y los accesos que necesitás.

> **Marca:** Worky va co-branded con Grupo Consiti (sello en el header, bloque de marca
> en el footer, firma legal y correos). Las reglas están en
> [`docs/BRANDING.md`](docs/BRANDING.md) §0. La premisa de "marca blanca" de la v1
> quedó sin efecto por corrección de Dirección (21-sep-2026).

---

## 🗂️ Estructura del proyecto

```
WORKY/
├── public/                     # Assets estáticos y marca
│   ├── logo-worky.png          # Logotipo "Worky by Consiti" (fondo claro)
│   ├── logo-worky-white.png    # El mismo para fondo oscuro
│   ├── isotipo-worky.png       # Isotipo solo (la W con la lupa)
│   ├── consiti-logotipo-morado.svg    # Marca madre (header)
│   ├── consiti-imagologo-blanco.svg   # Marca madre (footer)
│   └── favicon.png
├── src/
│   ├── app/
│   │   ├── layout.js           # Metadatos, SEO, tipografías
│   │   ├── page.js             # Composición de la landing
│   │   ├── privacidad/         # Cómo manejamos los datos del candidato
│   │   ├── terminos/           # Términos y condiciones de uso
│   │   ├── globals.css         # Design system (tokens, componentes)
│   │   ├── opengraph-image.js  # Imagen social (OG) generada
│   │   └── api/apply/route.js  # Endpoint que recibe los registros
│   ├── components/             # Secciones y UI
│   │   ├── Header.jsx  Hero.jsx  Stats.jsx  Problem.jsx
│   │   ├── HowItWorks.jsx  Audience.jsx  Positions.jsx  AiEngine.jsx
│   │   ├── Apply.jsx  ApplyForm.jsx  ApplyModal.jsx  Faq.jsx
│   │   ├── ProfileModal.jsx  ProfileModalHost.jsx
│   │   ├── FinalCta.jsx  Footer.jsx  Reveal.jsx
│   │   └── Icon.jsx            # Iconografía propia (SVG)
│   └── lib/
│       ├── positions.js        # Vacantes reales + requisitos y preguntas por plaza
│       ├── profileOptions.js   # Stack, habilidades, idiomas y tipos de enlace
│       ├── cvFile.js           # Lectura y validación del CV antes de subirlo
│       ├── consent.js          # Consentimiento de cookies / almacenamiento
│       ├── draft.js            # Autoguardado de los wizards (solo en el navegador)
│       ├── tracking.js         # Atribución de campañas (UTM)
│       └── formOptions.js      # Países y grados académicos
├── docs/
│   ├── entrega/                # 📦 Carpeta de traspaso técnico (empezá por acá)
│   ├── BRANDING.md             # Guía de marca (logo, paleta, tipografía, voz)
│   ├── CAMPANAS-META.md        # URLs de la pauta + medición por campaña
│   ├── PROMPT-ARTES.md         # Prompts para el copy y el arte de cada plaza
│   ├── DEPLOY.md               # Cómo se despliega en Vercel
│   ├── GOOGLE-SHEETS.md        # Conectar el formulario a Google Sheets
│   ├── ROADMAP.md              # Próximos pasos (correo, matching IA, etc.)
│   └── apps-script/Codigo.gs   # Script que crea la hoja y recibe postulaciones
├── next.config.mjs
├── vercel.json
└── package.json
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
