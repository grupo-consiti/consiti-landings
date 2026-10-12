# Worky · URLs para la pauta de Meta

La pauta de Meta manda el tráfico **a Worky**, no a un correo ni a un formulario aparte.
Este documento tiene las URL exactas que van en cada anuncio.

> **Dominio:** mientras `worky.consiti.com` no tenga el DNS listo, usá
> `https://worky-zeta.vercel.app`. Las rutas y parámetros son idénticos: solo cambia
> el dominio. Cuando el subdominio esté activo, se reemplaza y listo.

---

## Cómo funciona

| Parámetro | Para qué sirve |
|---|---|
| `?plaza=<id>` | Abre **directo el formulario de esa vacante**, con sus preguntas. El candidato no tiene que buscarla en el catálogo. |
| `?perfil=1` | Abre el **constructor de perfil** (banco de talento), sin plaza concreta. |
| `utm_*` | Se guardan solos en la hoja, en las columnas **Campaña · Fuente · Anuncio**. Con eso se cuenta cuántas postulaciones trajo cada campaña. |

Cada postulación queda en la hoja con la campaña que la trajo. Dividiendo el gasto de
la campaña entre esas filas sale el **costo por registro**, que es la métrica de la
revisión semanal con Recursos Humanos.

---

## URLs por campaña

### 1. Practicante de QA con Automatización e IA

```
https://worky.consiti.com/?plaza=practicante-qa-ia&utm_source=facebook&utm_medium=paid&utm_campaign=qa-ia-sep2026&utm_content={{ad.name}}
```

### 2. Practicante de Infraestructura Cloud

```
https://worky.consiti.com/?plaza=practicante-infra-cloud&utm_source=facebook&utm_medium=paid&utm_campaign=infra-cloud-sep2026&utm_content={{ad.name}}
```

> Canal único Facebook y **cierre el viernes 9 de octubre de 2026**. Al cerrar, bajá la
> plaza de `src/lib/positions.js` o el anuncio caerá en una convocatoria vencida.

### 3. Contador General

```
https://worky.consiti.com/?plaza=contador-general&utm_source=facebook&utm_medium=paid&utm_campaign=contador-sep2026&utm_content={{ad.name}}
```

> El arte actual dice "Envía tu CV a administracion@consiti.com". Si el anuncio se pauta
> con esta URL, conviene actualizar el arte: dos vías de entrada es justo lo que Dirección
> pidió eliminar, y por correo la postulación no queda en la hoja con sus respuestas.

### 4. Vendedor/a Freelance B2B

```
https://worky.consiti.com/?plaza=vendedor-freelance-b2b&utm_source=facebook&utm_medium=paid&utm_campaign=ventas-b2b-sep2026&utm_content={{ad.name}}
```

> Es la única plaza abierta a **toda Latinoamérica**: si se pauta, conviene ampliar la
> segmentación geográfica más allá de El Salvador. El monto de la base y el porcentaje
> de comisión **no se publican**, ni en el arte ni en el texto.

### 5. Campaña permanente del banco de talento ($1 a $5 / día)

```
https://worky.consiti.com/?perfil=1&utm_source=facebook&utm_medium=paid&utm_campaign=banco-talento-permanente&utm_content={{ad.name}}
```

Esta es la de siempre activa (B8 del informe de RRHH): no vende una plaza concreta,
suma perfiles al banco para que las vacantes futuras ya tengan a quién llamar.

---

## Publicación orgánica

Para los posts sin pauta, usá la misma URL cambiando la fuente:

```
...&utm_source=facebook&utm_medium=organico&utm_campaign=<la misma campaña>
```

Así se distingue en la hoja lo que trajo la pauta de lo que trajo el alcance orgánico
y el reparto en grupos.

---

## Notas

- `{{ad.name}}` lo reemplaza Meta solo, con el nombre del anuncio. Se pega tal cual, con
  las llaves dobles. Para que funcione, poné los parámetros en el campo **Parámetros de
  URL** del anuncio, no pegados a mano en el enlace del destino.
- Nombrá las campañas en Meta igual que el `utm_campaign`: así la hoja y el administrador
  de anuncios se leen juntos sin traducir nada.
- Si se agrega una plaza nueva, su `id` está en `src/lib/positions.js` y la URL se arma
  igual.
- **No se pauta el salario ni el estipendio**, ni en el arte, ni en el texto, ni en el
  destino.
