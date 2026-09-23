# 2 · Arquitectura actual

Cómo está armado hoy, sin adornos. La idea es que en 20 minutos puedas modificar
cualquier cosa sin romper otra.

---

## Stack

| Capa | Qué se usa | Por qué |
|---|---|---|
| Framework | Next.js 15 (App Router) + React 18 | Páginas estáticas, un único endpoint dinámico |
| Estilos | CSS propio con design tokens en `:root` | Sin Tailwind ni librerías de UI: el sitio pesa 117 kB de JS y el CSS entero cabe en un archivo |
| Iconos | SVG propios en `src/components/Icon.jsx` | Sin dependencias; todos heredan `currentColor` |
| Tipografías | Sora + Inter vía `next/font` | Se sirven desde el propio dominio, sin llamadas a Google en runtime |
| Hosting | Vercel | Ya enlazado; `vercel --prod` despliega |
| Backend | Google Apps Script como Web App | Ver abajo |

**No hay base de datos, ni ORM, ni autenticación, ni estado global.** Es deliberado:
ver [`04-DATOS-Y-BACKEND.md`](04-DATOS-Y-BACKEND.md).

---

## Mapa de archivos

```
src/
├── app/
│   ├── layout.js            Metadatos, SEO, tipografías, favicon
│   ├── page.js              Composición de la landing (el orden importa: ver nota)
│   ├── globals.css          TODO el CSS. Tokens arriba, responsive al final
│   ├── opengraph-image.js   Imagen social generada en el edge
│   ├── privacidad/          Cómo tratamos los datos
│   ├── terminos/            Términos y condiciones
│   └── api/apply/route.js   ÚNICO endpoint. Recibe y reenvía al Apps Script
├── components/
│   ├── Header.jsx           Menú con indicador deslizante y scroll-spy
│   ├── Hero · Stats · Problem · HowItWorks · Positions · Audience
│   ├── AiEngine · Apply · Faq · FinalCta · Footer
│   ├── ProfileModal.jsx     Wizard de perfil, 5 pasos
│   ├── ApplyModal.jsx       Wizard de postulación, 5 pasos, dinámico por plaza
│   ├── ProfileModalHost.jsx Abre el wizard desde cualquier CTA o con ?perfil=1
│   ├── CookieBanner.jsx     Consentimiento
│   ├── LegalShell.jsx       Marco de las páginas legales
│   └── Icon.jsx · Reveal.jsx
└── lib/
    ├── positions.js         LAS PLAZAS. Fuente de verdad del catálogo
    ├── profileOptions.js    Stack, habilidades, idiomas, tipos de enlace
    ├── formOptions.js       Países y grados académicos
    ├── cvFile.js            Lee y valida el CV antes de subirlo (máx 4 MB)
    ├── tracking.js          Atribución de campañas por UTM
    ├── consent.js           Consentimiento de almacenamiento
    └── draft.js             Autoguardado de los wizards
```

> **Nota sobre el orden en `page.js`:** las secciones están ordenadas para que el
> indicador del menú avance de izquierda a derecha al bajar. Si reordenás secciones,
> reordená también `LINKS` en `Header.jsx` o el indicador irá y vendrá.

---

## El flujo de una postulación, paso a paso

1. **El navegador** arma el payload en `ProfileModal` o `ApplyModal`. El CV se lee como
   dataURL base64 (`lib/cvFile.js`), tope de 4 MB, solo PDF o Word.
2. **`POST /api/apply`** valida que estén nombre, correo, WhatsApp y país, normaliza el
   registro y lo reenvía a `SHEETS_WEBHOOK_URL`. Si esa variable no está, responde OK y
   registra en logs: **nunca se pierde el flujo del usuario por un problema de backend.**
3. **El Apps Script** (`docs/apps-script/Codigo.gs`) hace cuatro cosas:
   - agrega la fila a la hoja,
   - guarda foto y CV en dos carpetas de Drive y escribe los enlaces,
   - manda el correo de confirmación,
   - registra la campaña de la que vino (UTM).

**Por qué Apps Script y no una API propia:** así ninguna credencial de Google vive en el
sitio. El sitio solo conoce una URL. Google hace el resto con los permisos del dueño de
la hoja.

---

## Variables de entorno

En Vercel, entorno **Production**:

| Variable | Para qué | Ojo |
|---|---|---|
| `SHEETS_WEBHOOK_URL` | URL `/exec` del Apps Script | **Si publicás una implementación nueva en Apps Script en vez de una versión nueva de la existente, esta URL cambia.** Ya pasó una vez: las postulaciones seguían llegando pero sin CV ni columnas de campaña, porque el sitio hablaba con el despliegue viejo. |
| `NEXT_PUBLIC_SITE_URL` | Base para SEO, canonical y OG | Hoy apunta a la URL de Vercel. Hay que cambiarla cuando entre el dominio. |

Cambiar una variable **no basta**: las funciones leen las del despliegue con el que se
publicaron, así que hay que volver a desplegar.

---

## Almacenamiento en el navegador

Tres cosas, todas declaradas en `/privacidad`:

| Clave | Qué guarda | Vence |
|---|---|---|
| `worky_consent` | "todas" o "esenciales" | No vence |
| `worky_utm` | Campaña de origen, **solo si aceptó** | Sesión |
| `worky_draft_*` | Borrador del wizard, sin el CV | 7 días |

Si cambiás esto, **actualizá `/privacidad`**: esa página enumera exactamente qué se
guarda, y la lista tiene que seguir siendo cierta.

---

## Convenciones del código

- **Comentarios en español**, y explican *por qué*, no *qué*. Si un comentario solo
  repite lo que dice la línea de abajo, sobra.
- **Nombres de dominio en español** (`plazas`, `postulacion`, `borrador`), nombres
  técnicos en inglés. Es mezcla, pero es consistente y se lee bien.
- **Sin dependencias nuevas sin motivo.** Hoy son tres: next, react, react-dom.
- El CSS está ordenado por secciones con comentarios de banda. **Las media queries van
  al final**: si agregás una regla base después de ellas, pisa el responsive. Ya pasó.
