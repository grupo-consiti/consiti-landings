#!/usr/bin/env bash
# Smoke test de las rutas de nginx.conf (clean URLs + 301 de vercel.json).
# Uso:  ./smoke.sh                      # contra el contenedor local en :18080
#       ./smoke.sh https://<url-cloud-run>
# Local: docker build -t fia . && docker run -d --rm -p 18080:8080 --name fia fia
set -u
B="${1:-http://127.0.0.1:18080}"; fail=0
chk() { # path código_esperado [location_esperada]
  r=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$B$1")
  code=${r%% *}; loc=${r#* }; loc=${loc#"$B"}
  if [ "$code" = "$2" ] && { [ -z "${3:-}" ] || [ "$loc" = "$3" ]; }; then
    echo "ok   $1 -> $code $loc"
  else
    echo "FAIL $1 -> $code $loc  (esperaba $2 ${3:-})"; fail=1
  fi
}
chk /                        200
chk /terminos                200
chk /terminos.html           301 /terminos
chk /index.html              301 /
chk /faq                     301 "/#faq"
chk /servicios               301 /
chk /consiti-ai              301 /
chk /privacidad              301 "/terminos#s9"
chk /sla                     301 /terminos
chk /assets/factu-ia-logo.svg 200
chk /docs/DESPLIEGUE-GCP.md  404
chk /README.md               404
chk /vercel.json             404
# Rebrand Factu IA: 301 del dominio viejo. Solo en local (contra run.app el
# frontend de Google no respeta un Host ajeno).
case "$B" in http://127.0.0.1*|http://localhost*)
  for h in facturaiasv.com www.facturaiasv.com www.factuiasv.com; do
    r=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' -H "Host: $h" "$B/terminos?x=1")
    if [ "$r" = "301 https://factuiasv.com/terminos?x=1" ]; then echo "ok   Host:$h -> $r"
    else echo "FAIL Host:$h -> $r  (esperaba 301 https://factuiasv.com/terminos?x=1)"; fail=1; fi
  done;;
esac
exit $fail
