# FactuIA landing en Cloud Run. Sobrescribe el Dockerfile genérico de la raíz
# porque este sitio necesita Node al lado de nginx: un pequeño proxy escucha
# en 127.0.0.1:8081 y crea el lead en Odoo (landing_crm_api). nginx
# (8080) sirve los estáticos y hace proxy_pass /api/ -> Node.
#
# cloudbuild.yaml detecta este archivo automáticamente
# (DF="sites/${_SITE}/Dockerfile"; [ -f "$$DF" ] || DF="Dockerfile").
FROM nginxinc/nginx-unprivileged:1.30-alpine

USER root
# nodejs de Alpine 3.x trae Node >= 18: fetch nativo y AbortController.
# tini se encarga de reap de zombis y de propagar señales entre Node y nginx.
RUN apk add --no-cache nodejs tini

COPY nginx.conf   /etc/nginx/conf.d/default.conf
COPY public/      /usr/share/nginx/html/
COPY api/lead.js  /app/api/lead.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Volvemos al usuario nginx (uid 101) del base image. Node en 8081 no
# necesita privilegios (puerto >1024).
USER nginx

# El PORT que Cloud Run inyecta se mapea al listen 8080 de nginx.
EXPOSE 8080

ENTRYPOINT ["/sbin/tini", "--", "/entrypoint.sh"]
