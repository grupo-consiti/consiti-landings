# Worky · Despliegue en Vercel

El proyecto se despliega en **Vercel** con la CLI oficial. Este documento deja el
proceso reproducible.

---

## Requisitos

- Node.js 18.18+ (se usó Node 24).
- Vercel CLI instalada y con sesión iniciada:

```bash
vercel --version
vercel whoami        # debe mostrar tu usuario de Vercel
```

Si no hay sesión: `vercel login` (abre el navegador para autenticar).

---

## Primer despliegue (ya realizado)

Desde la carpeta del proyecto:

```bash
vercel --prod --yes
```

- Crea el proyecto en Vercel (nombre por defecto: `worky`).
- Vercel detecta Next.js automáticamente y hace el build en la nube.
- Deja un archivo local `.vercel/` que enlaza esta carpeta con el proyecto
  (está en `.gitignore`, no se sube al repo).

**URL de producción:** https://worky-zeta.vercel.app
**Proyecto Vercel:** `briant-canizalez-s-projects/worky`
**Panel:** https://vercel.com/briant-canizalez-s-projects/worky

---

## Desplegar cambios

```bash
# Vista previa (URL temporal para revisar)
vercel

# Producción
vercel --prod
```

---

## Variables de entorno

Hoy la landing no requiere variables para funcionar. Cuando se conecte la base de
datos y el correo (ver `ROADMAP.md`), se agregan así:

```bash
vercel env add NEXT_PUBLIC_SITE_URL      # p. ej. https://worky.vercel.app
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
```

> `NEXT_PUBLIC_SITE_URL` mejora los metadatos sociales (OG). Configurala con la URL
> final una vez que se conozca el dominio.

---

## Dominio propio (opcional)

1. En el dashboard de Vercel → proyecto **worky** → *Settings → Domains*.
2. Agregá el dominio (ej. `worky.com` o `talento.tumarca.com`).
3. Seguí las instrucciones de DNS (registro A / CNAME).
4. El SSL se emite automáticamente.

---

## Comandos útiles

```bash
vercel ls              # lista de deployments
vercel logs <url>      # logs de una función (ej. /api/apply)
vercel inspect <url>   # detalles de un deployment
vercel domains ls      # dominios del proyecto
```
