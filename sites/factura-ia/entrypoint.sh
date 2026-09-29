#!/bin/sh
# Arranque del contenedor Cloud Run: Node en background (127.0.0.1:8081) y
# nginx en foreground (puerto 8080, expuesto por Cloud Run). Si Node muere,
# el kill al final tumba también a nginx para que Cloud Run lo reinicie
# entero en vez de servir solo estáticos con el proxy roto.
set -eu

PORT_API="${PORT_API:-8081}"
export PORT_API

# El sitio HTML estático sigue en /usr/share/nginx/html/. El backend Node vive
# en /app/api/lead.js. Solo el módulo lead está cargado desde aquí: capi.js
# sigue siendo Vercel Function y no lo servimos en Cloud Run por ahora.
node /app/api/lead.js &
NODE_PID=$!

# Si Node se cae, tumbamos nginx para que Cloud Run reinicie la instancia.
trap 'kill -TERM "$NODE_PID" 2>/dev/null || true; exit 0' TERM INT
( wait "$NODE_PID"; echo "[entrypoint] node exited, killing nginx"; kill -TERM 1 ) &

exec nginx -g 'daemon off;'
