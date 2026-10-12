#!/bin/sh
# Arranque del contenedor Cloud Run: Node en background (127.0.0.1:8081) y
# nginx en foreground (puerto 8080, expuesto por Cloud Run). Si Node muere,
# el kill al final tumba tambien a nginx para que Cloud Run reinicie
# la instancia entera en vez de servir solo estaticos con el proxy roto.
set -eu

PORT_API="${PORT_API:-8081}"
export PORT_API

node /app/api/lead.js &
NODE_PID=$!

trap 'kill -TERM "$NODE_PID" 2>/dev/null || true; exit 0' TERM INT
( wait "$NODE_PID"; echo "[entrypoint] node exited, killing nginx"; kill -TERM 1 ) &

exec nginx -g 'daemon off;'
