# Sitio estático servido por nginx (sin build). Imagen no-root, escucha 8080.
FROM nginxinc/nginx-unprivileged:1.30-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html terminos.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
