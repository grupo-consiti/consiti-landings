# HANDOFF — Rebrand "Factura IA" → "FactuIA"

**Para:** Duvan Andres (mergea y despliega) · **Decidido por:** Briant Canizalez, 2026-09-26
**Rama/PR:** `feat/rebrand-factu-ia` → `main`

## Qué cambia

| Antes | Ahora |
|---|---|
| Factura IA / Odoo Factura IA | **FactuIA** (sin "Odoo" pegado al nombre) |
| facturaiasv.com | **factuiasv.com** |
| contadores.facturaiasv.com | **contadores.factuiasv.com** |

`factuia.com` está tomado: no se usa.

La marca es solo **"FactuIA"** (junto, sin espacio): es el **nombre legal**, registrado así en
Hacienda y en el CNR. Una versión anterior de este PR escribía el nombre en dos palabras; ya se unificó
todo a «FactuIA» (texto, metadatos, docs y el asset `assets/factuia-logo.svg`).
Donde "Odoo" iba pegado al nombre del producto se quitó.
"Odoo" como plataforma se queda ("sobre Odoo", "Odoo Partner"). El isotipo (el ticket) no cambia.

El PR ya cambia el texto visible, `<title>`, meta description, Open Graph, JSON-LD, `alt`,
`aria-label` del favicon, términos, `consent.js`, mensajes de WhatsApp, `robots.txt`,
`sitemap.xml`, canonical/og:url y los enlaces cruzados entre ambas landings
(`sites/factura-ia` y `sites/alianzas-contables`), más README/HANDOFF/docs y las menciones en
`sites/worky`.

> ⚠️ **No mergear hasta que `factuiasv.com` y `contadores.factuiasv.com` respondan con
> certificado válido.** El merge a `main` dispara el deploy. Con el PR desplegado:
> - el canonical, og:url, sitemap y robots apuntan al dominio nuevo, y
> - los bloques 301 nuevos de `nginx.conf` mandan el dominio viejo al nuevo.
> Si el dominio nuevo todavía no existe, la gente que entra por el viejo termina en un
> dominio muerto.

## Qué NO se cambió (lo decides tú)

- Carpeta `sites/factura-ia` y cualquier ruta que usen CI o Cloud Build.
- Servicio Cloud Run `odoo-factura-ia-landing` y trigger `factura-ia-landing-main`.
- `cloudbuild.yaml`, `Dockerfile` y `.gitignore`: solo mencionan la carpeta.
- Nombres de assets del **isotipo** (`fotos/favicon-facturaia.png`, `fotos/apple-touch-facturaia.png`):
  el isotipo no cambia y se dejan con su nombre para no romper rutas. Los del **wordmark** ya se
  reemplazaron por archivos nuevos (ver (f)).
- URL de preview en Vercel `odoo-factura-ia-landing.vercel.app`. (La copia de contadores
  `alianzas-contables-facturaia.vercel.app` se dio de baja el 26-sep-2026; el sitio de
  contadores vive solo en Cloud Run.)
- Nombres de configuraciones externas que se citan tal cual existen hoy: dataset de Meta
  `FACTURA_IA`, propiedad GA4 "Factura IA" y flujo "Landing Factura IA", comentario del
  snippet de Hotjar "FacturaIA". Si se renombran en esas plataformas, hay que actualizar los
  docs.
- `api/capi.js`: solo cambiaron los comentarios. **Los nombres de eventos de Meta no se
  tocaron** (p. ej. `Lead` por defecto). El pixel sigue siendo `2238963863532324`.
- `docs/brief/`: es material de origen histórico, y `docs/README.md` lo marca como "no se
  edita". Conserva el nombre viejo.

## Checklist

### (a) Dominio
- [ ] **Briant** compra `factuiasv.com` (hoy está disponible en Hostinger).
- [ ] Averiguar quién tiene `facturaiasv.com`. **No está en la cuenta de Hostinger de Briant.**
      Hay que saber quién lo controla para mantenerlo vivo, renovarlo y apuntarlo al 301.
      Revisar el registrador con WHOIS.

### (b) DNS + Cloud Run
- [ ] Domain mapping en Cloud Run (proyecto `consiti-landing-page`, `us-central1`):
  - `factuiasv.com` → `odoo-factura-ia-landing`
  - `www.factuiasv.com` → `odoo-factura-ia-landing` (nginx lo manda por 301 al apex)
  - `contadores.factuiasv.com` → `alianzas-contables-landing` (servicio por crear, ver README raíz)
- [ ] Crear en el DNS del dominio nuevo los registros A/AAAA/CNAME que indique Cloud Run.
- [ ] Esperar a que el certificado administrado quede **Active** en los tres hosts.
- [ ] Verificar la propiedad del dominio en Google (Search Console / Webmaster Central), que
      Cloud Run pide para el mapping.

### (c) 301 desde los dominios viejos
- [ ] El PR agrega a `nginx.conf` un server block por Host (no toca el bloque default):
  - `sites/factura-ia/nginx.conf`: `facturaiasv.com`, `www.facturaiasv.com` y
    `www.factuiasv.com` → `https://factuiasv.com$request_uri`
  - `sites/alianzas-contables/nginx.conf`: `contadores.facturaiasv.com` →
    `https://contadores.factuiasv.com$request_uri`
- [ ] Para que el 301 funcione, los dominios viejos deben **seguir mapeados al mismo
      servicio**. Cloud Run conserva el Host, y nginx decide con él.
- [ ] No se pudo validar localmente: no hay Docker en la máquina de Briant. Correr
      `nginx -t` en la imagen y el `smoke.sh` local, que ahora prueba el 301 con
      `Host: facturaiasv.com`:
      `docker build -t fia -f Dockerfile sites/factura-ia && docker run -d --rm -p 18080:8080 --name fia fia && sites/factura-ia/smoke.sh`
- [ ] **Mantener vivo el dominio viejo** (renovación + mapping + certificado) por lo menos
      12 meses. Hay anuncios, QR, firmas y backlinks con la URL vieja, y el 301 traspasa el SEO.
- [ ] Alternativa, si el dominio viejo NO puede apuntar a Cloud Run: redirect 301 a nivel del
      registrador (forwarding con ruta), y entonces los server blocks sobran.

### (d) Medición y anuncios
- [ ] **Search Console:** agregar la propiedad `factuiasv.com` (tipo dominio), enviar
      `https://contadores.factuiasv.com/sitemap.xml` y usar **Cambio de dirección** desde la
      propiedad vieja cuando el 301 esté activo. La landing principal todavía no tiene
      `robots.txt` ni `sitemap.xml`; se pueden agregar en `public/`.
- [ ] **Meta Business Manager:** verificar el dominio `factuiasv.com` (meta-tag o DNS TXT) y
      configurar los eventos del pixel `2238963863532324` para el dominio nuevo (Aggregated
      Event Measurement). Revisar la lista de dominios permitidos del pixel. CAPI no cambia:
      `event_source_url` lo manda el navegador con la URL real.
- [ ] **Google Ads:** cambiar las URLs finales y los sitelinks a `factuiasv.com`. El 301
      cubre mientras tanto, pero Ads puede rechazar anuncios si el destino redirige a otro
      dominio.
- [ ] **GA4:** actualizar la URL del flujo web y, opcionalmente, renombrar la propiedad
      "Factura IA".
- [ ] Hotjar: agregar el dominio nuevo al sitio.
- [ ] Revisar el Sharing Debugger de Meta con la URL nueva (og:image ahora es
      `/assets/og-factuia.jpg`, con el wordmark nuevo; pedir "Scrape Again" para refrescar la caché).

### (e) Opcional: renombrar infraestructura
- [ ] Carpeta `sites/factura-ia` → `sites/factuia`. Actualizar `--included-files` del trigger,
      `_SITE`, README raíz, `Dockerfile` (comentario) y `cloudbuild.yaml` (comentario).
- [ ] Servicio `odoo-factura-ia-landing` → nombre nuevo. Implica un servicio nuevo, mover los
      domain mappings y los secretos (`META_CAPI_TOKEN`) y borrar el viejo.
- [ ] Trigger `factura-ia-landing-main` → nombre nuevo.
- [ ] Repos `odoo-factura-ia-landing` y `contadores-referidores-fia` en GitHub (si aplica).

### (f) Logos y assets — ✅ wordmark nuevo aplicado (2026-09-26)
Briant entregó el wordmark nuevo, escrito «FactuIA» (unido, igual que el nombre legal y que el
texto corrido). Solo cambió el **wordmark**; isotipo, marca «IA» y subrayado amarillo son los mismos.
Los archivos se derivaron del PNG que entregó Briant (vectorizado, sin redibujar).

| Antes (eliminado del repo) | Ahora | Dónde se usa |
|---|---|---|
| `sites/factura-ia/public/assets/factura-ia-logo.svg` | `sites/factura-ia/public/assets/factuia-logo.svg` (mismo viewBox 90×30, texto blanco + subrayado amarillo #FFDD00; en una versión anterior del PR llevaba guion entre «factu» e «ia») | Header/footer de `index.html` y `terminos.html`, `smoke.sh` |
| `sites/factura-ia/public/assets/og-facturaia.jpg` | `sites/factura-ia/public/assets/og-factuia.jpg` (1200×630; mismo arte, solo cambia el wordmark de arriba a la izquierda) | `<meta property="og:image">` de `index.html` |
| `sites/alianzas-contables/public/fotos/logo-facturaia-color-dark.png` | `sites/alianzas-contables/public/fotos/logo-factuia-color-dark.png` (520×153) | Header de contadores + `preload` |
| `sites/alianzas-contables/public/fotos/logo-facturaia-color-light.png` | `sites/alianzas-contables/public/fotos/logo-factuia-color-light.png` (520×153) | Footer de contadores |
| `sites/factura-ia/public/assets/odoo-factura-logo.png` (legado "Odoo Factura IA", sin uso) | — (eliminado) | Ninguno |

El CSS fija la **altura** de los logos (`.mark-logo` 30 px; `.logo img` 34/38/26 px), así que el
tamaño visual en la página no cambia. El wordmark nuevo es un poco más alto en proporción que el
viejo, así que se ve algo más angosto a la misma altura.

**Se quedan igual (isotipo, el ticket):** `sites/factura-ia/public/assets/favicon.svg`,
`sites/alianzas-contables/public/fotos/favicon-facturaia.png` y
`sites/alianzas-contables/public/fotos/apple-touch-facturaia.png`.

`docs/brief/` conserva la referencia vieja a `og-facturaia.jpg` porque es material histórico que
no se edita (no se despliega).

### (g) Correo
- [ ] Averiguar si existen buzones o alias `@facturaiasv.com`: MX del dominio viejo y quien
      lo administre. En este repo no aparece ninguno. Si existen, crear los equivalentes en
      `@factuiasv.com`, dejar reenvío desde los viejos y actualizar firmas. Los viejos
      **no se eliminan**.

## CTA «Contactar» + wizard de clientes (landing principal)

**Decidido por:** Briant, 2026-09-26 · **Archivo:** `sites/factura-ia/public/index.html` (mismo PR)

### Qué cambia
- **Todos los CTA de conversión dicen «Contactar»** y ya no abren WhatsApp directo: abren un
  **wizard de contacto para clientes** (modal; pantalla completa en <640 px). Afecta a nav, menú
  móvil, hero, DTE 2.0, migración, contadores, tabla de planes (y sus tarjetas móviles), resultado
  de «Descubrir mi plan», cierre, pie de página, barra fija móvil y botón flotante.
  Se quitó el ícono de WhatsApp de esos botones (llevan la flecha de contadores).
- Los enlaces de navegación («Ver precios», «Ver todo lo que incluye», «Conocer FactuIA para
  contadores») no cambian. «Descubrir mi plan» sigue igual; solo su CTA final pasa a «Contactar»
  y le pasa el plan recomendado al wizard.
- **Botón:** clase `.btn-cta`, copia del `.btn` de contadores (Instrument Sans 700, pill,
  flecha `.go`, tamaños `.sm`/`.lg`). **Color verde WhatsApp** por decisión de Briant, en
  variables `--cta-bg` / `--cta-bg-hover` / `--cta-ink` / `--cta-shadow` / `--cta-shadow-hover`.
  El texto va en tinta `#140A2E` y no en blanco: blanco sobre `#25D366` da 1.98:1 (no pasa AA).
  Dentro del wizard, «Siguiente»/«Cerrar» van en morado (como en contadores) y «Enviar» en verde.
- **Wizard (6 pasos):** tipo de negocio · facturas al mes (rangos alineados a la tabla: hasta 30 /
  31–100 / 101–500 / 501–1,000 / más de 1,000 / no estoy seguro) · quién es · sistema actual ·
  medio (llamada, reunión virtual, WhatsApp) + franja (mañana 8–12, tarde 12–5;
  día opcional si es reunión) · nombre, negocio (opcional), teléfono SV de 8 dígitos (acepta +503)
  y línea de consentimiento.
- **Envío:** arma un resumen legible (respuestas, plan de interés o sugerido, origen + `cta_id`) y
  abre WhatsApp al mismo número `WA` (7255-9059). La pantalla de gracias dice «Un asesor le
  contactará por <medio> en la franja <franja>» y deja un botón «Abrir WhatsApp» (con aviso si el
  navegador bloqueó la ventana). Dentro del wizard queda el enlace pequeño «¿Prefiere escribirnos
  directo?».
- Accesibilidad: `role="dialog"`, `aria-modal`, `aria-labelledby`, foco al título de cada paso,
  foco atrapado, `Escape` cierra y devuelve el foco al botón de origen, fondo `inert`, barra de
  progreso con `role="progressbar"`, objetivos ≥44 px, `prefers-reduced-motion`. Con teclado las
  flechas no hacen avanzar de paso (solo el clic/toque en una tarjeta).
- Se retiraron `MENSAJES`, el cableado de `[data-wa]`, el campo `wa` de `PLANES` y las clases
  `.btn-wa`, `.btn-sm` y `.wa-float` (ya sin uso).

### Eventos (para Meta/GA4)
| Momento | Meta | GA4 | dataLayer |
|---|---|---|---|
| Abre el wizard | `Contact` (Pixel, solo con consentimiento) con `cta_id` | `abrir_wizard` (`cta_id`, `item_name`) | `abrir_wizard` (`cta_id`, `plan`) |
| Envía el wizard | `Lead` por **Pixel + CAPI con el mismo `event_id`** (dedupe) | `generate_lead` | `enviar_wizard` |
| Clic en «escribirnos directo» | `Lead` (Pixel + CAPI), `cta_id` = `<origen>-directo` | `generate_lead` | `clic_whatsapp` |

`Lead` lleva `content_name` (plan o «Consulta general»), `content_category`, `value`/`currency`
según `VALOR_CTA` (plan del CTA; si no hay, el plan que sugiere el rango de facturas; «No estoy
seguro» = 0), `cta_id`, `plan_origen` (`cta` / `volumen` / `ninguno`), `tipo_negocio`,
`rango_facturas`, `rol`, `tiene_sistema`, `medio_contacto` y `franja_horaria`.
**Sin datos personales:** nombre, negocio, teléfono y los textos libres («Otro», «¿cuál sistema?»)
nunca van a tracking; los campos personales llevan `data-hj-suppress` para Hotjar.
El consentimiento se respeta igual que antes (`__consentGranted`, `sendCAPI`, `trackGA`).
**Cambio de semántica:** antes `Lead` se contaba al hacer clic en un CTA de WhatsApp; ahora se
cuenta al enviar el wizard. Es esperable ver menos `Lead` y más calificados; comparar contra
`Contact` para medir la caída del embudo.

### Cómo probar
1. Servir `sites/factura-ia/public` (p. ej. `python -m http.server 8765`) y abrir `http://127.0.0.1:8765/`.
2. En la consola, para no abrir WhatsApp: `window.open=function(u){console.log(decodeURIComponent(u));return {}}`.
3. Abrir desde tres CTA distintos (hero, un plan de la tabla, barra fija móvil) y completar los 6
   pasos; revisar el resumen que se imprime, `dataLayer` (`abrir_wizard`, `enviar_wizard`) y, con
   cookies aceptadas, Meta → Probar eventos (`Contact` y `Lead` deduplicado).
4. Probar en 375 px (pantalla completa, sin scroll horizontal) y con teclado (Tab, Escape).
5. `smoke.sh` no se pudo correr aquí (no hay Docker); no cambia rutas de nginx.
