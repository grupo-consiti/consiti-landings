# Worky · Roadmap

Estado y próximos pasos. La **landing (v1)** ya está lista y desplegada. Lo siguiente
es convertirla en una plataforma que reciba y procese talento de verdad.

---

## 📌 Correcciones de Dirección — informe de RRHH (21-sep-2026)

Fuente: *"Informe de seguimiento · Worky y campañas: pasos a seguir con Briant"*,
elaborado por **Nohemy** (Especialista de RRHH y Administración), a partir de la
reunión "Revisión de Worky" (16-sep) y la 1a1 de Administración y RRHH (17-sep).

### ✅ Aplicado el 22-sep-2026

| # | Corrección de Dirección | Qué se hizo |
|---|---|---|
| B1 | *"Marca Consiti en la landing"* | Co-branding **Worky by Consiti**: sello "un producto de" en el header, bloque de marca en el footer, firma legal, SEO/OG y correos. Ver [`BRANDING.md`](BRANDING.md) §0. |
| B1 | *"Dominio worky.consiti.com"* | La app ya apunta a ese dominio (`NEXT_PUBLIC_SITE_URL`, OG, correos). **Falta el DNS** — ver bloqueos abajo. |
| B2 | *"Una sola base de datos"* | Ya había una sola: los dos formularios del sitio pegan a `POST /api/apply` y caen en la misma hoja. Se eliminó el campo de CV como texto y **ahora el archivo real se sube a Drive**. |
| B2 | *"Conectada al Drive para búsqueda de currículums"* | El CV se sube de verdad (PDF/Word, máx 4 MB) a la carpeta **"Worky — Currículums"** y el enlace queda en la hoja. Antes solo se guardaba el nombre del archivo. |
| — | *"Flujo de comunicación integrado: el correo de reactivación es parte de Worky"* | `enviarReactivacion()` en [`apps-script/Codigo.gs`](apps-script/Codigo.gs): escribe a quienes ya están en el banco cuando se abren plazas nuevas, con control de a quién ya se le escribió. |
| — | Encuadre comercial | Se quitó la sección de **Precios / Worky Pro**: no se le cobra al candidato desde un dominio de Consiti. El copy pasó de "banco de talento multi-empresa" a "las plazas de Grupo Consiti". |
| — | **Catálogo de plazas reales** | Se vació el catálogo demo y se cargaron las vacantes abiertas con sus fichas de RR. HH.: **Practicante de QA con Automatización e IA**, **Practicante de Infraestructura Cloud** y **Contador General**. Sin salario ni estipendio publicado, con las preguntas de filtro de cada plaza y los requisitos visibles al aplicar. El 23-sep se sumó **Vendedor/a Freelance B2B** (remoto, toda Latinoamérica), dictada por Briant sin ficha formal de RR. HH. |

### ✅ UX y legales — 22-sep-2026

- **Plazas compactas.** El catálogo pasó de tarjetas altas a una lista de filas: en
  escritorio cada plaza bajó de ~500 px a ~190 px de alto, y en teléfono a ~300 px.
- **Responsive de verdad.** Menú de navegación en teléfono (antes los enlaces
  simplemente desaparecían bajo 960 px), modales a pantalla completa con `100dvh`,
  campos de 16 px para que iOS no haga zoom al tocarlos y botones de 46 px mínimo.
- **Privacidad y términos.** Páginas `/privacidad` y `/terminos`, enlazadas desde el
  pie y desde cada casilla de consentimiento.
- **Banner de cookies** con opción de rechazar lo opcional, conectado de verdad con la
  atribución de campañas.
- El imagologo de Consiti en el pie bajó de 150 px a 96 px.

### 🚧 Bloqueado o pendiente de terceros

| # | Qué falta | De quién depende |
|---|---|---|
| B1 | Apuntar el DNS de `worky.consiti.com` a Vercel (registro CNAME) y agregar el dominio en el proyecto | Quien administre el DNS de `consiti.com` — **acordar en la próxima reunión** (punto 6.1 del informe) |
| — | Enlazar Worky desde la página "Trabaja con nosotros" de consiti.com | Sitio corporativo |
| B2 | Retirar o redirigir el **Google Form de RRHH**: mientras siga vivo hay dos canales de captura, que es justo lo que Dirección pidió eliminar | Nohemy |
| — | **Estipendio de los practicantes** (QA e Infraestructura): no se publica hasta que Gerencia lo confirme — así está hoy en el sitio. Se necesita antes de la primera entrevista | Gerencia |
| — | **Ficha de la plaza de ventas**: se cargó con lo que dictó Briant, sin pasar por RR. HH. Conviene que Nohemy la revise, sobre todo el monto de la base y el porcentaje de comisión (que **no** se publican en el sitio) | RR. HH. |
| — | **Cierre de Infraestructura Cloud: viernes 9 de octubre de 2026.** Al pasar esa fecha hay que bajar la plaza del sitio o quedará publicada una convocatoria cerrada | RR. HH. |
| B5–B8 | Campañas de Meta (practicantes QA, practicantes infraestructura, Contador, permanentes $1–$5/día) | Landing aprobada. **La pauta apunta a Worky**: las URL de cada anuncio y la medición por campaña están en [`CAMPANAS-META.md`](CAMPANAS-META.md) |
| B3, B4 | Plantilla de arte estándar y acceso de operador en Meta para RRHH | Briant — no es trabajo de código |
| N1 | Envío de la propuesta a Rafael, que desbloquea las observaciones formales | Nohemy |
| — | **Revisión legal de `/privacidad` y `/terminos`**: los redactamos nosotros, no un abogado. Revisar el plazo de 15 días hábiles y el correo de contacto | Dirección / legal |

> **Nota sobre el título de la plaza de contador:** debe publicarse como **"contador"**,
> sin variantes tipo "analista financiero" (acuerdo de la reunión del 16-sep).

> **Nota sobre la base única:** conviene decirle a RRHH que en el sitio **nunca hubo**
> formularios separados de plazas y freelance; el segundo canal era el Google Form.

---

## 💡 Ideas propuestas por Briant — PENDIENTES (sin confirmar)

> Planteadas el 17-sep-2026 como **ideas para más adelante**. NO aprobadas para
> construir todavía; quedan aquí para retomarlas cuando Briant decida. Siguen vigentes
> después de las correcciones del 22-sep.

Convertir Worky de "formulario que envía" a **plataforma con perfiles**:

1. **Ver y editar el perfil.** Tras crear el perfil, poder volver a verlo y editar sus
   campos (hoy el botón solo dice "Crear perfil"). Requiere poder **leer** un perfil de
   vuelta (hoy el Google Sheet es solo de escritura).
2. **Autocompletar al aplicar a una plaza.** Al dar "Aplicar", precargar el formulario
   con los datos del perfil ya creado y pedir solo lo específico de esa plaza.
3. **Plazas recomendadas por match.** Comparar el perfil (habilidades, idiomas,
   experiencia) contra lo que pide cada plaza y mostrar "Plazas recomendadas para vos"
   ordenadas por afinidad (la tarjeta del hero ya lo insinúa).

**Decisiones abiertas antes de construir (sin decidir):**
- **Identidad del que vuelve:** link privado sin login (rápido) **o** login con código
  al correo (más seguro).
- **Dónde viven los perfiles:** Supabase (base real + copia al Sheet) **o** solo Google
  Sheets ampliando el Apps Script.

---

## ✅ Hecho — v1 (landing comercial y explicativa)

- Marca completa: logo, isotipo, paleta, tipografía e iconografía propia.
- Landing con todas las secciones: hero, problema, cómo funciona, para talento / para
  empresas, catálogo de plazas, motor de IA, precios, formulario, FAQ y CTA.
- Formulario de registro con validación en el cliente.
- Endpoint `POST /api/apply` que recibe y valida los datos.
- SEO + imagen social (OG) + favicon.
- Desplegado en Vercel.

---

## 🔜 Paso 1 — Recibir datos de verdad (base de datos)

**Objetivo:** que cada registro caiga a una base consultable por Claude, tal como
se pensó el producto.

Dos caminos:

- **Opción A · Supabase** (recomendada para escalar): tabla `candidatos`, insertar
  desde `src/app/api/apply/route.js` con la service key. Permite consultas SQL,
  storage para CV y, más adelante, autenticación.
- **Opción B · Google Sheets** (más rápida para arrancar): escribir cada registro en
  una hoja ya conectada con Claude, vía Google Sheets API o un webhook (Apps Script).

En el endpoint ya está marcado el punto exacto con un `TODO(worky)`.

## ✅ Paso 2 — Correos *(hecho)*

- **Confirmación:** automática al registrarse, con firma de Grupo Consiti.
- **Reactivación:** `enviarReactivacion()`, a mano desde Apps Script cuando se abren
  plazas nuevas. Marca en la hoja a quién ya se le escribió y respeta un lote máximo
  para no quemar la cuota de Gmail (~100/día Gmail, ~1,500/día Workspace).

## ✅ Paso 3 — Subida de CV *(hecho el 22-sep-2026)*

El CV se sube de verdad: viaja como dataURL en `POST /api/apply`, el Apps Script lo
guarda en la carpeta de Drive **"Worky — Currículums"** y escribe el enlace en la hoja.
Límite de 4 MB, solo PDF/Word. Está en los tres formularios: perfil, banco general y
aplicación a vacante.

## 🔜 Paso 4 — Matching con IA

Con los datos en base, Claude ordena el banco de talento según cada plaza abierta y
devuelve los mejores candidatos. Es el corazón del producto (ya contado en la landing).

## 🔜 Paso 5 — Catálogo de plazas dinámico

Mover `src/lib/positions.js` a la base de datos y una vista de administración para
publicar/editar plazas. Página por plaza (`/plazas/[id]`) con botón "Aplicar".

## 🔜 Paso 6 — Plan Pro (suscripción)

Cobro mensual opcional para prioridad y visibilidad. Integrar pasarela (Stripe / la que
aplique) y marcar perfiles Pro en el ranking.

---

## 📣 Adquisición — campaña Meta

Plan comercial para generar los primeros registros:

- Campañas permanentes de Worky con presupuesto de **$1 a $5 diarios** (B8 del informe
  de RRHH), más las campañas por plaza (practicantes QA, practicantes de
  infraestructura y Contador General).
- Escalar el presupuesto conforme crece la demanda.
- Enviar el tráfico a la landing (`#aplicar`) con creativos alineados a la marca.
- Medir costo por registro y optimizar copy/creativo.

> Antes de invertir en ads conviene tener listo al menos el **Paso 1** (base de datos)
> y el **Paso 2** (correo), para no perder los registros que lleguen.
