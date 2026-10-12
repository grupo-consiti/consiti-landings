// ============================================================
//  Backend proxy: formulario del wizard Alianzas Contables  ->  Odoo landing_crm_api
// ============================================================
//  Único punto que conoce la ODOO_LEAD_API_KEY. El navegador nunca
//  la ve. Recibe el POST del wizard, arma el payload contra Odoo y
//  devuelve un JSON compacto para el cliente.
//
//  Es una copia especializada del backend de sites/factura-ia con la
//  whitelist adaptada a los campos del wizard de contadores. Las
//  variables de entorno son las mismas (Cloud Run):
//    ODOO_URL             https://consiti17.odoofactura.com
//    ODOO_LEAD_API_KEY    la misma que landing_crm_api.api_key
//
//  Los leads de esta landing llegan a Odoo con medio "landing-contables"
//  (via utm.medium), lo que permite filtrarlos por separado de los de
//  factuiasv.com sin tocar el modulo Python.
// ============================================================

const http = require('http');

const PORT = Number(process.env.PORT_API || 8081);
const ODOO_URL = (process.env.ODOO_URL || '').replace(/\/$/, '');
const API_KEY = process.env.ODOO_LEAD_API_KEY || '';
const UPSTREAM_TIMEOUT_MS = 10000;
const MAX_BODY_BYTES = 8 * 1024;

// Whitelist de campos extras propios del wizard de Alianzas Contables.
// Cualquier otro campo que llegue en el body se descarta antes de reenviar
// (evita que un atacante ensucie las notas del lead con basura arbitraria).
const EXTRAS_PERMITIDOS = new Set([
  'perfil', 'despacho', 'clientes', 'departamento', 'municipio',
  'medio_contacto', 'horario', 'dia', 'hora',
  'cta_origen', 'lead_event_id',
]);

// Mensajes al visitante. Los codigos crudos de Odoo no se le muestran.
const MENSAJES = {
  missing_name: 'Falta el nombre.',
  missing_contact: 'Déjenos un teléfono o un correo.',
  invalid_email: 'El correo no parece válido.',
  invalid_json: 'No pudimos leer los datos del formulario.',
};

function json(res, status, body) {
  const buf = Buffer.from(JSON.stringify(body));
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': String(buf.length),
    'cache-control': 'no-store',
  });
  res.end(buf);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

function clean(v) {
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

async function forwardToOdoo(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const r = await fetch(ODOO_URL + '/api/crm/lead', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-API-Key': API_KEY,
        // El nginx de Odoo bloquea con 403 los User-Agent vacíos (map $blocked_agent);
        // el fetch de Node no manda UA por defecto, así que lo fijamos explícito.
        'user-agent': 'contadores-landing/1.0 (+https://contadores.factuiasv.com)',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await r.json().catch(() => ({}));
    return { status: r.status, body: data };
  } finally {
    clearTimeout(timer);
  }
}

async function handleLead(req, res) {
  if (!ODOO_URL || !API_KEY) {
    console.error('[lead] faltan ODOO_URL u ODOO_LEAD_API_KEY');
    return json(res, 500, { ok: false, error: 'server_misconfigured' });
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch (e) {
    if (e.message === 'payload_too_large') {
      return json(res, 413, { ok: false, error: 'payload_too_large' });
    }
    return json(res, 400, { ok: false, error: 'invalid_body' });
  }

  let data;
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch (e) {
    return json(res, 400, { ok: false, error: 'invalid_json' });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return json(res, 400, { ok: false, error: 'invalid_json' });
  }

  // Honeypot: si el campo oculto viene lleno es un bot. Se responde 200
  // para que no aprenda que lo detectamos, pero no se llama a Odoo.
  if (data.empresa_web) {
    console.warn('[lead] honeypot activado, envío descartado');
    return json(res, 200, { ok: true, dropped: 'bot' });
  }

  // Campos nativos del modulo Odoo. El "medio" por default identifica a esta
  // landing en el campo Medio del lead.
  const payload = {
    nombre: clean(data.nombre),
    numero: clean(data.numero),
    correo: clean(data.correo),
    medio: clean(data.medio) || 'landing-contables',
  };

  // Extras: solo los de la whitelist, no vacios. Van a la descripcion del
  // lead como <li><b>clave:</b> valor</li>.
  for (const [k, v] of Object.entries(data)) {
    if (!EXTRAS_PERMITIDOS.has(k)) continue;
    const val = clean(v);
    if (val) payload[k] = val;
  }

  try {
    const { status, body } = await forwardToOdoo(payload);
    if (body && body.ok) {
      console.log('[lead] creado', body.lead_id, body.duplicate ? '(reenvío)' : '');
      return json(res, 200, { ok: true });
    }
    if (status >= 400 && status < 500 && MENSAJES[body && body.error]) {
      return json(res, 400, { ok: false, error: body.error, mensaje: MENSAJES[body.error] });
    }
    console.error('[lead] Odoo respondió', status, body);
    return json(res, 502, { ok: false, error: 'upstream_error' });
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[lead] timeout hablando con Odoo');
      return json(res, 504, { ok: false, error: 'upstream_timeout' });
    }
    console.error('[lead] no se pudo contactar a Odoo:', err.message);
    return json(res, 502, { ok: false, error: 'upstream_unreachable' });
  }
}

const server = http.createServer((req, res) => {
  const url = req.url || '/';

  if (req.method === 'GET' && (url === '/api/lead/salud' || url === '/api/lead/health')) {
    return json(res, 200, {
      ok: true,
      service: 'alianzas-contables-lead-proxy',
      odoo_url_set: Boolean(ODOO_URL),
      odoo_key_set: Boolean(API_KEY),
    });
  }

  if (req.method === 'POST' && url === '/api/lead') {
    return handleLead(req, res);
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end('{"ok":false,"error":"not_found"}');
});

// Escuchamos solo en localhost: nginx dentro del mismo contenedor
// hace proxy_pass a este puerto. Cloud Run expone solo el 8080.
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[lead] listening on 127.0.0.1:${PORT}  ODOO_URL=${ODOO_URL || '(unset)'}  key=${API_KEY ? 'set' : 'unset'}`);
});
