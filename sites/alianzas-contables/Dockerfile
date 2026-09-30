# Alianzas Contables landing en Cloud Run. Sobrescribe el Dockerfile generico
# de la raiz porque este sitio necesita Node al lado de nginx: un pequeno
# proxy escucha en 127.0.0.1:8081 y crea el lead en Odoo (landing_crm_api).
# nginx (8080) sirve los estaticos y hace proxy_pass /api/ -> Node.
#
# Mismo patron que sites/factura-ia/Dockerfile; comparten las env vars
# ODOO_URL y ODOO_LEAD_API_KEY. cloudbuild.yaml detecta este archivo
# automaticamente (DF="sites/${_SITE}/Dockerfile"; [ -f "$$DF" ] || DF="Dockerfile").
FROM nginxinc/nginx-unprivileged:1.30-alpine

USER root
# nodejs de Alpine 3.x trae Node >= 18: fetch nativo y AbortController.
# tini como PID 1 (reap de zombis y propagacion de senales).
RUN apk add --no-cache nodejs tini

COPY nginx.conf   /etc/nginx/conf.d/default.conf
COPY public/      /usr/share/nginx/html/
COPY api/lead.js  /app/api/lead.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER nginx

EXPOSE 8080

ENTRYPOINT ["/sbin/tini", "--", "/entrypoint.sh"]
