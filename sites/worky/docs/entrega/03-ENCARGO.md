# 3 · El encargo

Lo que necesitamos que hagas, en orden de prioridad. Los tres primeros son los que pidió
Briant explícitamente; el resto es lo que le falta al sitio para estar completo.

---

## A · Dominio propio: `worky.consiti.com`

**Requisito firme.** Viene de Dirección: Worky tiene que colgar de Consiti, no vivir en
una URL de Vercel. El sitio ya está preparado —marca, SEO y correos asumen ese
dominio—, solo falta el DNS.

Lo que ya averiguamos:

- La zona de `consiti.com` está en **Google Cloud DNS**
  (`ns-cloud-a1` a `a4.googledomains.com`), no en Hostinger.
- `worky.consiti.com` **no existe todavía**: no resuelve.

Pasos:

1. Crear el registro en Google Cloud DNS apuntando a Vercel (CNAME).
2. Agregar el dominio en el proyecto de Vercel y esperar el certificado.
3. Cambiar `NEXT_PUBLIC_SITE_URL` a `https://worky.consiti.com` y **volver a desplegar**
   (la variable sola no basta).
4. Cambiar `URL_PLAZAS` y `URL_LOGO` en `docs/apps-script/Codigo.gs` y publicar una
   **versión nueva** de la implementación existente. Están juntas y comentadas.
5. Dejar la URL de Vercel redirigiendo al dominio nuevo: **hay anuncios de Meta
   corriendo con ella**.
6. Actualizar las URLs de `docs/CAMPANAS-META.md` y avisar a quien gestiona la pauta.

---

## B · Entrar con Google

**El problema que resuelve:** hoy nadie puede volver a ver ni corregir su perfil, y
quien ya lo creó vuelve a escribir todo al postularse a una plaza. Es la contradicción
más visible con la promesa del producto.

Lo que esperamos que habilite:

- Crear el perfil con la cuenta de Google, sin contraseña que recordar.
- Volver, ver el perfil y **editarlo**.
- Al postularse a una plaza, que los datos base vengan precargados y solo se pidan las
  preguntas propias de esa vacante.
- Idealmente, ver a qué plazas se postuló y cuándo.

Decisiones abiertas, tuyas:

- **Proveedor de identidad.** Google como mínimo. Que se pueda entrar sin cuenta de
  Google no es obligatorio, pero perder a quien no la tenga sí importa: evaluá dejar el
  camino actual (sin cuenta) como alternativa.
- **Qué pasa con quien ya está en la hoja.** Hay postulaciones reales anteriores al
  login. Hay que decidir si se vinculan por correo o si empiezan de cero.

**Antes de elegir dónde viven los perfiles, leé
[`04-DATOS-Y-BACKEND.md`](04-DATOS-Y-BACKEND.md).** Hay una restricción operativa que
condiciona esa decisión.

---

## C · Que Google la indexe

Hoy el sitio **no está indexado**. Para una bolsa de empleo esto es plata sobre la mesa:
buena parte de las búsquedas de trabajo empiezan en Google, no en Facebook.

Lo mínimo:

1. **Search Console**: verificar la propiedad del dominio y enviar el sitemap.
2. **`sitemap.xml` y `robots.txt`**. Hoy no existen. En Next.js son dos archivos
   (`app/sitemap.js` y `app/robots.js`).
3. **Canonical** apuntando al dominio definitivo.
4. **Datos estructurados `JobPosting`** (schema.org) por cada plaza. Esto es lo que
   mete las vacantes en **Google Jobs**, el recuadro de empleos que sale arriba de los
   resultados. Con cuatro plazas ya publicadas y sus datos en `src/lib/positions.js`,
   generarlo es directo. Ojo: `JobPosting` pide `validThrough` — la plaza de
   Infraestructura ya tiene fecha de cierre, las otras no.
5. **Páginas propias por plaza** (`/plazas/[id]`). Hoy todo vive en una sola página, así
   que Google no puede posicionar "Contador General San Salvador" por separado. Esto y
   los datos estructurados se potencian mutuamente.

---

## D · Lo que le falta a una página completa

Ordenado por lo que más duele si falta.

### Medición

- **No hay analítica de ningún tipo.** Ni cuánta gente entra, ni dónde abandona el
  wizard, ni qué plaza se mira más. Hoy solo sabemos cuántos terminaron, porque llegan a
  la hoja. Vercel Analytics o GA4.
- **Meta Pixel**, si se va a seguir pautando: sin él, Meta no puede optimizar por
  conversión y se está pagando tráfico a ciegas.
- **Importante:** ya existe un banner de cookies con rechazo real (`src/lib/consent.js`).
  Cualquier script de medición tiene que respetarlo, no cargarse antes del
  consentimiento, y quedar declarado en `/privacidad`. Esa página enumera hoy
  exactamente qué se guarda; si agregás algo, la lista deja de ser cierta.

### Correo

- Hoy sale por **MailApp de Apps Script**, con cuota de ~100 correos al día en Gmail
  (~1.500 en Workspace). Si la pauta funciona, es un cuello de botella real: 150
  postulaciones en un día significan 50 personas sin confirmación, y nadie se entera.
- Conviene un proveedor transaccional (Resend, SendGrid) con dominio verificado
  (SPF/DKIM). De paso mejora la entregabilidad: hoy los correos salen de una cuenta
  personal de Gmail.

### Robustez

- **No hay página 404 propia.** Sale la de Next.js por defecto.
- **No hay monitoreo ni alertas.** Si el Apps Script deja de responder, las
  postulaciones se pierden en silencio: el endpoint responde OK igual, a propósito, para
  no romperle la experiencia al candidato. Hace falta al menos un aviso.
- **No hay respaldo de la hoja.** Es el único lugar donde viven los candidatos.
- **No hay límite de envíos** en `/api/apply`. Es un endpoint abierto: alguien puede
  llenar la hoja de basura. Conviene rate limiting o un captcha invisible.

### Calidad

- **Accesibilidad:** el sitio usa HTML semántico y tiene foco visible, pero no pasó por
  una auditoría. Vale una pasada de Lighthouse y lector de pantalla, sobre todo en los
  wizards.
- **Imágenes:** los logos son PNG (60 KB el del header). Si aparece el vectorial
  original, reemplazarlos por SVG. Y usar `next/image` en vez de `<img>`.
- **Sin tests.** Ninguno. Lo que más se rompe al tocar: la validación por pasos de los
  wizards y el reparto de preguntas por plaza.

### Legal

- `/privacidad` y `/terminos` los redactó el equipo, **no un abogado**. Hay dos
  compromisos concretos que alguien de legal debería confirmar: el plazo de **15 días
  hábiles** para atender solicitudes de datos, y el correo de contacto
  `administracion@consiti.com`.
- Con login de Google entran datos nuevos (identificador de cuenta, sesión). Eso
  **obliga** a actualizar `/privacidad`.

### Contenido

- **Panel para publicar plazas.** Hoy Nohemy no puede abrir una vacante sin que alguien
  despliegue. Es el pedido natural después del login.
- **La plaza de Infraestructura cierra el 9 de octubre de 2026.** Al pasar esa fecha hay
  que bajarla o quedará publicada una convocatoria cerrada. Hoy nadie lo hace
  automáticamente.

---

## Lo que pedimos que no cambie sin avisar

- Los enlaces `?plaza=<id>` y `?perfil=1`: hay anuncios corriendo con ellos.
- Las columnas de la hoja y su orden.
- Que no aparezca ningún monto de salario, base, comisión o estipendio.
- El tuteo en todos los textos.
- La hoja de Google como vista operativa de Recursos Humanos (documento 04).
