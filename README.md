# grupo-consiti-landings

Monorepo de landing pages estáticas de Grupo Consiti. Cada sitio vive en
`sites/<nombre>/`, se sirve con nginx y se despliega a su **propio** servicio
Cloud Run mediante su **propio** trigger de Cloud Build.

## Estructura

```
Dockerfile        # genérico (context = sites/<sitio>)
cloudbuild.yaml   # genérico, parametrizado por _SITE
sites/
  factura-ia/
    nginx.conf    # clean URLs + redirects del sitio
    public/       # lo que se sirve (index.html, assets, …)
    smoke.sh      # verificación de rutas
    …             # docs/, api/ (fase 2): NO se sirven
```

## Sitios

| Sitio | Carpeta | Servicio Cloud Run | Trigger |
|-------|---------|--------------------|---------|
| Factura IA | `sites/factura-ia` | `odoo-factura-ia-landing` | `factura-ia-landing-main` |

## Agregar una landing nueva

1. `cp -r sites/factura-ia sites/<nuevo>` y reemplazar `public/` + `nginx.conf`.
2. Crear su trigger (un solo comando; ver `setup` en la infra):
   `--included-files='sites/<nuevo>/**'` +
   `--substitutions=_SITE=<nuevo>,_SERVICE_NAME=<svc>,_RUN_SA=<sa>`.

Un push que solo toca `sites/<nuevo>/**` reconstruye **solo** esa landing.
