# Worky · Entrega técnica

**Para:** Duván
**De:** Briant Canizález
**Fecha:** 23 de septiembre de 2026

Worky es el banco de talento de Grupo Consiti: la página donde una persona crea su
perfil una vez y queda visible para todas las vacantes que abrimos. Está **en
producción y recibiendo postulaciones reales** desde https://worky-zeta.vercel.app.

Esta carpeta es el traspaso completo. No hay nada guardado en la cabeza de nadie: lo
que no está acá, no existe.

---

## Por dónde empezar (30 minutos)

| # | Documento | Qué resuelve |
|---|---|---|
| 1 | [`01-CONTEXTO-FUNCIONAL.md`](01-CONTEXTO-FUNCIONAL.md) | Qué hace el producto, para quién y qué se espera que siga haciendo. **Leelo antes de tocar código.** |
| 2 | [`02-ARQUITECTURA.md`](02-ARQUITECTURA.md) | Cómo está armado hoy y por dónde corre cada dato. |
| 3 | [`03-ENCARGO.md`](03-ENCARGO.md) | **Lo que necesitamos que hagas**, en orden de prioridad. |
| 4 | [`04-DATOS-Y-BACKEND.md`](04-DATOS-Y-BACKEND.md) | La restricción que condiciona cualquier decisión de base de datos. |
| 5 | [`05-ACCESOS.md`](05-ACCESOS.md) | Qué cuentas y permisos hay que darte. |

## Documentación que ya existía (sigue vigente)

| Documento | Contenido |
|---|---|
| [`../../README.md`](../../README.md) | Estructura del proyecto y cómo correrlo en local |
| [`../BRANDING.md`](../BRANDING.md) | Manual de marca: logos, paleta, tipografía, voz |
| [`../GOOGLE-SHEETS.md`](../GOOGLE-SHEETS.md) | Cómo funciona la hoja, el Apps Script y los correos |
| [`../CAMPANAS-META.md`](../CAMPANAS-META.md) | URLs de la pauta y medición por campaña |
| [`../ROADMAP.md`](../ROADMAP.md) | Historia de decisiones y qué quedó pendiente |
| [`../PROMPT-ARTES.md`](../PROMPT-ARTES.md) | Prompts para generar copy y arte de cada plaza |
| [`../apps-script/Codigo.gs`](../apps-script/Codigo.gs) | El backend que hay hoy, entero, comentado |

---

## Estado en una pantalla

**Funciona hoy, en producción:**

- Landing completa, responsive, con menú móvil y wizards de varios pasos.
- **4 plazas reales** con sus preguntas de filtro propias.
- Dos formas de entrar: crear perfil general o postularse a una plaza concreta.
- Las postulaciones caen en una hoja de Google, con el **CV subido a Drive**.
- Correo de confirmación automático y correo de reactivación manual.
- Enlaces directos por plaza (`?plaza=<id>`) y **atribución de campañas por UTM**, ya
  usados por la pauta de Meta.
- Páginas de privacidad y términos, y banner de cookies con rechazo real.
- Autoguardado de los formularios en el navegador de la persona.

**No existe todavía:**

- El dominio `worky.consiti.com` (hoy responde solo la URL de Vercel).
- Cuentas de usuario: nadie puede volver a ver ni editar su perfil.
- Indexación en Google.
- Analítica de ningún tipo.
- Panel para publicar plazas: hoy se editan en un archivo de código.

**Números del repo:** 26 commits, 61 archivos versionados, 2 MB sin dependencias.
Next.js 15 + React 18, sin librerías de UI. El historial de git viene incluido: cada
commit explica por qué se hizo el cambio, no solo qué cambió.
