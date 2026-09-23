# Worky · Conectar el formulario a Google Sheets

> **Estado: ✅ CONECTADO** (17-sep-2026). Las postulaciones del sitio en producción
> ya caen en la hoja **“Worky — Postulaciones”**. Verificado con `sheetsWired: true`
> y un envío end-to-end. Dominio de producción: `worky.consiti.com` (pendiente de DNS;
> mientras tanto sigue activo https://worky-zeta.vercel.app). La variable
> `SHEETS_WEBHOOK_URL` está configurada en Vercel (Production).

Las postulaciones (del banco general y de cada vacante) se guardan en una hoja de
Google Sheets mediante un **Google Apps Script** desplegado como Web App. El script
**crea la hoja solo** y agrega una fila por cada postulación.

> ⚠️ La Web App debe quedar con acceso **“Cualquier usuario”** (no el dominio), o
> Google rechaza los envíos externos con 401.

> ¿Por qué Apps Script y no una conexión directa? Así ningún dato sensible ni llave de
> Google vive dentro del sitio. El sitio solo llama a una URL; Google hace el resto.

## Dónde vive cada cosa

| Qué | Enlace |
|---|---|
| Proyecto de Apps Script | https://script.google.com/d/1n2BH3DlsV4lTdFXWhSnfoowsRUfT7ppEZBDo9wQX_k6tmEZvidobYJF8/edit |
| Hoja "Worky — Postulaciones" | https://docs.google.com/spreadsheets/d/1nYJV3z8Z2l7LV4pJ2gL6xSHYGDdXhBQWGS9i0yt1P6w/edit |

Ambos en la cuenta `briant_canizalez@consiti.com`. El proyecto de script quedó con
el nombre por defecto "Proyecto sin título": conviene renombrarlo a **Worky —
Postulaciones**, porque en el Drive hay otros tres con el mismo nombre.

---

## Pasos (una sola vez, ~5 minutos)

1. Entrá a **https://script.google.com** → **Proyecto nuevo**.
2. Borrá el contenido y pegá el código de [`apps-script/Codigo.gs`](apps-script/Codigo.gs). Guardá (💾).
3. En la barra de funciones elegí **`setup`** y hacé clic en **Ejecutar**.
   - Google pedirá **autorizar** (es tu cuenta, aceptá los permisos).
   - En **Registro de ejecución** aparecerá el enlace de la hoja creada:
     **“Worky — Postulaciones”**. Ábrila para verla (ya con encabezados).
4. Clic en **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - *Ejecutar como*: **Yo**.
   - *Quién tiene acceso*: **Cualquier usuario**.
   - **Implementar** y **copiá la URL** (termina en `/exec`).
5. Pasame esa URL (o configurala vos):

```bash
# En la carpeta del proyecto
vercel env add SHEETS_WEBHOOK_URL production
# (pegá la URL /exec cuando la pida)
vercel --prod          # redeploy para que tome la variable
```

Listo: cada postulación caerá en la hoja. Podés verificar visitando
`https://worky.consiti.com/api/apply` → debe decir `"sheetsWired": true`.

---

## Perfil completo: archivos en Drive + correos (incluido en el script)

La versión actual de `Codigo.gs` hace cuatro cosas más al recibir un perfil:

- Guarda **más columnas**: Título, Biografía, Idiomas, Enlaces / redes, Foto,
  Experiencia, CV (archivo) y Reactivación enviada (se agregan al final para no
  descuadrar las filas anteriores).
- Guarda la **foto de perfil** en una carpeta de tu Drive (**“Worky — Fotos de perfil”**)
  y escribe el **enlace** en la hoja.
- Guarda el **CV** en la carpeta **“Worky — Currículums”** y escribe el enlace en la
  hoja. Esa carpeta es la que Recursos Humanos busca desde el Drive: como los archivos
  quedan con el nombre del candidato, el buscador de Drive los encuentra por nombre y
  por contenido (Drive indexa el texto de los PDF y Word).
- Envía un **correo de confirmación** con la marca Worky vía **MailApp** (sale desde tu
  propia cuenta de Google, sin costo). Diseño: [`email/confirmacion.html`](email/confirmacion.html).

Para activar esta versión (o al pegarla por primera vez):

1. Pegá el `Codigo.gs` actualizado y **Guardá**.
2. Elegí la función **`setup`** y **Ejecutar**. Google pedirá **autorizar de nuevo**
   (ahora incluye **Hojas + Drive + Gmail**). Aceptá.
3. **Implementar → Gestionar implementaciones → editar (✏️) → Versión: Nueva versión →
   Implementar.** (La URL `/exec` se mantiene.)

> Cuota gratuita de MailApp: ~100 correos/día en Gmail y hasta ~1,500/día en Workspace.
> Las fotos se optimizan en el navegador (máx 512px) antes de subirse, así que pesan
> poco. El CV va tal cual, con tope de **4 MB** y solo PDF o Word.

---

## Correo de reactivación

Cuando RRHH abre plazas nuevas, se le avisa a quien **ya está** en el banco de talento:

1. Abrí el proyecto en Apps Script.
2. Elegí la función **`enviarReactivacion`** y hacé clic en **Ejecutar**.
3. En el registro aparece cuántos correos salieron.

- Solo le escribe a quien tenga vacía la columna **“Reactivación enviada”**, y le pone
  la fecha al terminar. Nadie recibe el mismo aviso dos veces.
- Manda como máximo **50 por corrida** (`REACTIVACION_LOTE`): si hay más candidatos,
  volvé a ejecutarla al día siguiente para no pasarte de la cuota de Gmail.
- Para volver a escribirle a todo el banco (campaña nueva), corré
  **`reiniciarReactivacion`**, que limpia esa columna.
- El correo incluye una línea de baja: quien responda **BAJA** hay que sacarlo de la
  hoja a mano.

---

## Columnas de la hoja

`Fecha · Vacante · Departamento · Modalidad · Nombre · Correo · WhatsApp · País ·
Grado · Resumen · Habilidades blandas · Habilidades técnicas · Respuestas específicas ·
CV / LinkedIn · Origen · Título · Biografía · Idiomas · Enlaces / redes · Foto ·
Experiencia · CV (archivo) · Reactivación enviada · Campaña · Fuente · Anuncio`

**CV / LinkedIn** guarda el *nombre* del archivo que subió el candidato;
**CV (archivo)** guarda el enlace de Drive al archivo real.

**Campaña · Fuente · Anuncio** se llenan solas con los parámetros UTM de la URL por la
que entró la persona. Sirven para contar postulaciones por campaña y sacar el costo por
registro de la pauta de Meta. Si alguien entra directo al sitio, quedan vacías. Las URL
que hay que usar en cada anuncio están en
[`CAMPANAS-META.md`](CAMPANAS-META.md).

La columna **Respuestas específicas** guarda las preguntas propias de cada vacante
(ej. “Años de experiencia: 4 | Stack principal: React, Node”).

---

## Consumir con Claude / IA

Con los datos en la hoja, Claude puede leerla y, ante una vacante, ordenar y elegir los
perfiles más afines (el matching descrito en la landing). Para eso hay que **autorizar
el conector de Google** en claude.ai (Ajustes → Conectores) o vía `/mcp` en una sesión
interactiva de Claude Code.

## Limpiar registros de prueba

La hoja arrastra las postulaciones con las que se probó el formulario. Para sacarlas:

1. En Apps Script elegí la función **`limpiarPruebas`** y **Ejecutar**.
2. En el registro sale la lista de filas que considera de prueba. **Todavía no borra nada.**
3. Si la lista es correcta, ejecutá **`limpiarPruebas(true)`** (o cambiá la llamada en
   el editor) y esas filas se borran.

Marca como prueba las filas cuyo nombre o correo contenga *prueba, test, asdf, qwerty
o ejemplo*, más los correos internos listados en `CORREOS_PRUEBA`. Si un candidato real
cayera ahí, ajustá esas listas antes de correrla con `true`. **Borrar es irreversible**,
por eso la función no borra sin que revises primero.

## Si cambia la URL del despliegue

Al publicar en Apps Script hay dos caminos y no dan lo mismo:

- **Gestionar implementaciones → ✏️ → Nueva versión** mantiene la misma URL `/exec`.
  No hay que tocar nada más.
- **Nueva implementación** genera una URL `/exec` **distinta**. El sitio sigue hablando
  con la anterior, que quedó congelada en el código viejo: las postulaciones siguen
  llegando, pero sin CV en Drive ni columnas de campaña.

Si pasó lo segundo, actualizá la variable y volvé a desplegar:

```bash
vercel env rm SHEETS_WEBHOOK_URL production --yes
printf 'https://…/exec' | vercel env add SHEETS_WEBHOOK_URL production
vercel --prod
```

> Ojo: cambiar la variable **no** basta. Las funciones leen las variables del
> despliegue con el que se publicaron, así que hay que volver a desplegar el sitio.

Para comprobar que quedó bien, mandá una postulación de prueba y verificá en la hoja
que las columnas **CV (archivo)**, **Campaña**, **Fuente** y **Anuncio** se llenaron.

## ⚠️ Al actualizar a esta versión

El script agrega columnas y una carpeta nueva de Drive. Después de pegar el código:

1. Ejecutá **`setup`** una vez (escribe los encabezados nuevos).
2. Google va a pedir **autorizar de nuevo** — aceptá.
3. **Implementar → Gestionar implementaciones → ✏️ → Nueva versión → Implementar.**

Los registros viejos quedan intactos: las columnas nuevas se agregan al final y sus
celdas quedan vacías.

## Actualizar el script

Si cambiás `Codigo.gs`, en Apps Script hacé **Implementar → Gestionar implementaciones →
editar (✏️) → Nueva versión**. La URL `/exec` se mantiene.
