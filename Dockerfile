# Imagen genérica para cualquier landing del monorepo.
# El build context es la carpeta del sitio (sites/<sitio>), así que las
# rutas son relativas a ella: cada landing trae su nginx.conf y su public/.
#   docker build -f Dockerfile sites/factura-ia
FROM nginxinc/nginx-unprivileged:1.30-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public/    /usr/share/nginx/html/
