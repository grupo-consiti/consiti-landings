# grupo-consiti-landings

Monorepo de landing pages de Grupo Consiti. Cada sitio vive en `sites/<nombre>/`,
se despliega a su **propio** servicio Cloud Run mediante su **propio** trigger de
Cloud Build, y un push que solo toca `sites/<nombre>/**` reconstruye **solo** esa
landing.

## Dos tipos de sitio

- **Estáticos** (factura-ia, vendi, komandi, alianzas-contables): HTML servido por nginx. Usan el
  `Dockerfile` genérico de la raíz (context = `sites/<sitio>`, sirve `public/`).
- **Node / SSR** (worky): app Next.js con API server y OG dinámico. Trae su propio
  `sites/<sitio>/Dockerfile` (build `standalone` → `node server.js`), que el
  `cloudbuild.yaml` detecta y usa en vez del genérico.

## Estructura

```
Dockerfile        # genérico nginx (context = sites/<sitio> estático)
cloudbuild.yaml   # genérico, parametrizado por _SITE; incluye gate Trivy (ARQ-6)
sites/
  factura-ia/  nginx.conf + public/            # estático
  vendi/       nginx.conf + public/            # estático
  komandi/     nginx.conf + public/            # estático
  alianzas-contables/ nginx.conf + public/     # estático
  worky/       Dockerfile + src/ + public/     # Next.js SSR
                 .trivyignore                   # excepciones del gate por sitio
```

## Sitios

| Sitio | Carpeta | Tipo | Servicio Cloud Run | Trigger |
|-------|---------|------|--------------------|---------|
| Factu IA (factuiasv.com) | `sites/factura-ia` | nginx | `odoo-factura-ia-landing` | `factura-ia-landing-main` |
| Vendi | `sites/vendi` | nginx | `vendi-landing` | `vendi-landing-main` |
| Komandi | `sites/komandi` | nginx | `komandi-landing` | `komandi-landing-main` |
| Alianzas Contables (contadores.factuiasv.com) | `sites/alianzas-contables` | nginx | `alianzas-contables-landing` *(por crear)* | `alianzas-contables-landing-main` *(por crear)* |
| Worky | `sites/worky` | Next.js SSR | `worky-landing` | `worky-landing-main` |

## Seguridad de imágenes (gate ARQ-6 / runbook ARQ-A-2)

`cloudbuild.yaml` escanea la imagen con Trivy **entre build y push**: CVEs
CRITICAL/HIGH con fix disponible bloquean el push. La DB de Trivy se restaura de
la cache central `gs://consiti-trivy-db` (proyecto `consiti-foundation`), no se
descarga en cada build. **Prerrequisito:** la SA de build `sa-landings-build@` debe
tener `roles/storage.objectViewer` sobre ese bucket. Excepciones por sitio en
`sites/<sitio>/.trivyignore`.

## Agregar una landing nueva

1. **Estática:** `cp -r sites/factura-ia sites/<nuevo>`, reemplazar `public/` +
   `nginx.conf`. **Node/SSR:** copiar el proyecto a `sites/<nuevo>/` y agregar su
   `Dockerfile` (ver `sites/worky/Dockerfile`).
2. Crear su trigger: `--included-files='sites/<nuevo>/**'` +
   `--substitutions=_SITE=<nuevo>,_SERVICE_NAME=<svc>,_RUN_SA=<sa>` (Node: sumar
   `_MEMORY=512Mi,_CONCURRENCY=80`).
