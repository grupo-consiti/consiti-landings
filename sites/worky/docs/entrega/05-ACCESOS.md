# 5 · Accesos que necesitás

Ninguna credencial viaja en esta entrega ni en el ZIP. Esta es la lista de lo que hay
que pedir y a quién.

---

## Para correr el proyecto en local

No hace falta ningún acceso. Se clona, se instala y corre:

```bash
npm install
npm run dev
```

Sin `SHEETS_WEBHOOK_URL`, el endpoint responde OK y escribe el registro en la consola.
El sitio se ve y se prueba completo, sin tocar datos reales. **Usá esto para desarrollar:
no hace falta escribir en la hoja de producción.**

---

## Para trabajar de verdad

| Acceso | Para qué | A quién pedírselo |
|---|---|---|
| **Vercel** — proyecto `worky` | Desplegar, variables de entorno, dominios | Briant |
| **Apps Script** — [proyecto](https://script.google.com/d/1n2BH3DlsV4lTdFXWhSnfoowsRUfT7ppEZBDo9wQX_k6tmEZvidobYJF8/edit) | El backend actual | Briant (está en su cuenta de Google) |
| **Hoja** — [Worky — Postulaciones](https://docs.google.com/spreadsheets/d/1nYJV3z8Z2l7LV4pJ2gL6xSHYGDdXhBQWGS9i0yt1P6w/edit) | Ver los datos reales | Briant |
| **Drive** — carpetas "Worky — Currículums" y "Worky — Fotos de perfil" | Los archivos de los candidatos | Briant |
| **Google Cloud DNS** — zona `consiti.com` | Crear `worky.consiti.com` | Quien administre el proyecto de Google Cloud de Consiti |
| **Search Console** | Indexación | Se crea nuevo, sobre el dominio |
| **Meta Business** | Solo si vas a tocar el pixel | Briant |

> El proyecto de Apps Script se llama **"Proyecto sin título"** y en el Drive hay otros
> tres con el mismo nombre. Conviene renombrarlo.

---

## Datos sensibles: dónde están y dónde no

- **El ZIP no trae `.env.local`**, a propósito: contenía un token de Vercel.
- **No hay credenciales en el repositorio.** El sitio solo conoce una URL de webhook, y
  esa vive como variable de entorno en Vercel.
- **Las variables de entorno en Vercel están cifradas** y no se pueden leer desde la CLI;
  hay que verlas en el panel o volver a generarlas.
- **El Apps Script corre con los permisos del dueño de la hoja.** Quien lo ejecute, actúa
  como esa cuenta: por eso cualquier cambio ahí toca datos reales de candidatos.

---

## Datos reales: cuidado

La hoja tiene **postulaciones de personas reales**. No son datos de prueba.

- Para probar, usá el entorno local sin webhook.
- Si necesitás escribir en la hoja, marcá los registros con "prueba" en el nombre:
  existe `limpiarPruebas()` en el Apps Script, que los lista antes de borrar nada.
- Lo que le decimos a la gente en `/privacidad` es que sus datos se usan **solo** para
  procesos de selección de Consiti, que no se comparten con terceros, y que se borran a
  solicitud. Esas tres promesas hay que poder seguir cumpliéndolas.
