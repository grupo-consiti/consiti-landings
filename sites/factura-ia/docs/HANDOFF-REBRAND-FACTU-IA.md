# HANDOFF — Rebrand "Factura IA" → "Factu IA"

**Para:** Duvan Andres (mergea y despliega) · **Decidido por:** Briant Canizalez, 2026-09-26
**Rama/PR:** `feat/rebrand-factu-ia` → `main`

## Qué cambia

| Antes | Ahora |
|---|---|
| Factura IA / Odoo Factura IA | **Factu IA** (sin "Odoo" pegado al nombre) |
| facturaiasv.com | **factuiasv.com** |
| contadores.facturaiasv.com | **contadores.factuiasv.com** |

`factuia.com` está tomado: no se usa.

La marca es solo **"Factu IA"**. Donde "Odoo" iba pegado al nombre del producto se quitó.
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
- [ ] Carpeta `sites/factura-ia` → `sites/factu-ia`. Actualizar `--included-files` del trigger,
      `_SITE`, README raíz, `Dockerfile` (comentario) y `cloudbuild.yaml` (comentario).
- [ ] Servicio `odoo-factura-ia-landing` → nombre nuevo. Implica un servicio nuevo, mover los
      domain mappings y los secretos (`META_CAPI_TOKEN`) y borrar el viejo.
- [ ] Trigger `factura-ia-landing-main` → nombre nuevo.
- [ ] Repos `odoo-factura-ia-landing` y `contadores-referidores-fia` en GitHub (si aplica).

### (f) Logos y assets — ✅ wordmark nuevo aplicado (2026-09-26)
Briant entregó el wordmark nuevo (se ve escrito «FactuIA», unido; en texto corrido sigue siendo
«Factu IA»). Solo cambió el **wordmark**; isotipo, marca «IA» y subrayado amarillo son los mismos.
Los archivos se derivaron del PNG que entregó Briant (vectorizado, sin redibujar).

| Antes (eliminado del repo) | Ahora | Dónde se usa |
|---|---|---|
| `sites/factura-ia/public/assets/factura-ia-logo.svg` | `sites/factura-ia/public/assets/factu-ia-logo.svg` (mismo viewBox 90×30, texto blanco + subrayado amarillo #F4DC0C) | Header/footer de `index.html` y `terminos.html`, `smoke.sh` |
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
