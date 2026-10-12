# 4 · Datos y backend: la restricción que manda

Este documento existe porque hay una restricción que no se ve en el código y que
condiciona cualquier decisión de base de datos.

---

## La restricción

> **Recursos Humanos trabaja en Google Sheets, y tiene que seguir pudiendo hacerlo.**

Nohemy revisa las postulaciones todos los días: filtra, ordena, marca, comparte con
Dirección y depura lo que no aplica. Lo hace en una hoja de cálculo porque es la
herramienta que domina y en la que es rápida.

Sabemos que vas a montar backend de verdad —se mencionó **Firebase / Firestore**, y
para autenticación con Google es una elección razonable—. Esto no es una objeción a esa
decisión. Es un requisito que esa decisión tiene que respetar:

**Si los datos se mudan a Firestore y Nohemy queda dependiendo de un panel web para su
trabajo diario, el proyecto pierde a su usuaria interna.** No es un problema técnico, es
un problema de adopción: la herramienta se deja de usar y volvemos al correo y al
WhatsApp, que es justo de donde salimos.

---

## Formas de cumplirla

Ordenadas de menor a mayor esfuerzo. Cualquiera sirve; la decisión es tuya.

**1. Firestore como fuente de verdad, con espejo automático a Sheets.**
Una Cloud Function que escribe en la hoja cada vez que entra o cambia una postulación.
Nohemy sigue en su hoja, la app tiene su base real. Es lo más limpio. Ojo con la
dirección del espejo: si ella marca algo en la hoja, eso también debería volver, o al
menos no perderse.

**2. Sheets sigue siendo la fuente de verdad; Firestore guarda solo las cuentas.**
Los perfiles y postulaciones se quedan donde están y Firestore maneja únicamente la
sesión y la vinculación por correo. Menos trabajo, pero arrastra los límites de la hoja.

**3. Firestore como fuente de verdad, con exportación programada.**
Un volcado a Sheets cada X horas. Más simple, pero Nohemy deja de ver las postulaciones
en tiempo real, y hoy sí las ve.

---

## Lo que ya existe y conviene no tirar

El backend actual es un Apps Script de ~440 líneas
([`docs/apps-script/Codigo.gs`](../apps-script/Codigo.gs)), comentado y con más cosas de
las que parece:

- Escritura en la hoja con encabezados versionados (agrega columnas nuevas al final sin
  descuadrar lo anterior).
- Guardado de foto y CV en dos carpetas de Drive, con enlace en la hoja.
- Correo de confirmación con la marca.
- **Correo de reactivación** con control de a quién ya se le escribió y tope por corrida
  para no quemar la cuota de Gmail.
- **Limpieza de registros de prueba** con vista previa antes de borrar.
- Atribución de campaña (UTM) en tres columnas.

Si lo reemplazás, lo que no se puede perder es: el CV en Drive, los correos, y las
columnas de campaña — esas tres alimentan operaciones que ya están en marcha.

---

## Detalles que te van a ahorrar horas

- **La URL `/exec` cambia** si publicás una "implementación nueva" en vez de una "versión
  nueva" de la existente. Cuando pasó, las postulaciones seguían llegando pero sin CV ni
  campaña, porque el sitio hablaba con el despliegue viejo. Se detecta mirando si esas
  columnas quedan vacías.
- **El endpoint nunca falla hacia el usuario.** Si el webhook no responde, `/api/apply`
  igual devuelve OK y deja el registro en logs. Es a propósito —no se le rompe la
  experiencia al candidato por un problema nuestro— pero significa que **un backend caído
  es silencioso**. Cualquier reemplazo necesita alertas.
- **El CV viaja como base64 dentro del JSON.** Funciona, pero es frágil para archivos
  grandes; el tope está en 4 MB en `src/lib/cvFile.js`. Con Firebase Storage, subir
  directo desde el navegador es mejor camino.
- **La hoja tiene 26 columnas** y su orden importa: Nohemy ya trabaja sobre ellas. Si
  cambia la estructura, hay que avisarle antes, no después.

---

## Antes de decidir, conviene hablar con Nohemy

Ella es quien va a usar esto todos los días. Vale media hora con ella para entender cómo
revisa hoy: qué filtra primero, qué marca, qué exporta. Es probable que salgan dos o tres
cosas que ningún panel que diseñemos de memoria iba a contemplar.
