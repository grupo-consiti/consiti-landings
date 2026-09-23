# 1 · Contexto funcional

Lo que el producto tiene que lograr, y por qué está armado como está. Si algo de lo
técnico choca con esto, gana esto.

---

## Para quién es

**El usuario final es el candidato**, no Recursos Humanos. Esa decisión ya se tomó y
condiciona todo: el sitio le habla a quien busca trabajo, no a quien contrata. Todo lo
que suene a "portal de reclutamiento para empresas" está fuera de lugar.

**La segunda usuaria es Nohemy**, Especialista de Recursos Humanos y Administración.
Ella revisa las postulaciones todos los días. Su comodidad operativa es un requisito
del producto, no un detalle — ver [`04-DATOS-Y-BACKEND.md`](04-DATOS-Y-BACKEND.md).

---

## La promesa

> Un perfil. Todas nuestras plazas.

La persona escribe sus datos **una sola vez**. Cada vez que Grupo Consiti abre una
vacante, su perfil entra en la comparación sin que tenga que hacer nada. Si encaja,
Recursos Humanos la contacta.

De ahí salen tres reglas que no se negocian:

1. **Nunca se le pide dos veces lo mismo.** Si ya dio su nombre, no se lo volvemos a
   pedir. (Hoy esto se cumple a medias: ver "Deuda funcional".)
2. **Postularse es gratis, siempre.** No hay plan pago, ni ahora ni previsto. Hubo una
   sección de precios con un "plan Pro" y Dirección la mandó a quitar: cobrarle al
   candidato desde un dominio de Consiti no va.
3. **Nadie queda fuera por no tener CV.** El CV y el video son opcionales a propósito.

---

## Los dos caminos de entrada

```
                          ┌─────────────────────────────┐
  Anuncio de Meta ───────▶│  worky.consiti.com          │
  o enlace directo        │                             │
                          │  ?plaza=<id>  →  Wizard de  │──┐
                          │                  la plaza   │  │
                          │  ?perfil=1    →  Wizard de  │──┤
                          │                  perfil     │  │
                          └─────────────────────────────┘  │
                                                           ▼
                                              POST /api/apply (Next.js)
                                                           │
                                                           ▼
                                          Apps Script (Web App /exec)
                                                    │         │
                                            ┌───────┘         └───────┐
                                            ▼                         ▼
                                  Hoja de Google              Drive (CV y foto)
                                  "Worky — Postulaciones"     + correo al candidato
```

**Perfil general:** para quien no ve hoy una plaza que le encaje. Queda en el banco de
talento esperando.

**Postulación a una plaza:** además de los datos base, responde las preguntas propias
de esa vacante. Esas respuestas son lo que permite descartar sin abrir un solo CV — por
ejemplo, si el contador tiene CVPCPA vigente, o si el practicante puede dedicarse en
exclusiva.

Ambos caminos son **wizards de 5 pasos**, no formularios largos. Se probó con un
formulario de una sola pantalla y era un muro de 15 campos.

---

## Las plazas

Son **reales**, no de ejemplo. Hoy hay cuatro:

| Plaza | Modalidad | Particularidad |
|---|---|---|
| Practicante de QA con Automatización e IA | Híbrido o remoto, San Salvador | Dos vías de ingreso que compiten igual |
| Practicante de Infraestructura Cloud | Híbrido o remoto, San Salvador | **Cierra el 9 de octubre de 2026** |
| Vendedor/a Freelance B2B | Remoto, toda Latinoamérica | La única no limitada a El Salvador |
| Contador General | Presencial, San Salvador | Requisitos legales: CVPCPA vigente |

**Reglas de contenido que vienen de Recursos Humanos y de Dirección:**

- **No se publica salario, base, comisión ni estipendio.** En ninguna plaza. Ni en el
  sitio, ni en el arte, ni en el texto del anuncio.
- Nada de requisitos de edad, sexo, estado civil ni apariencia: además de alejar buenos
  candidatos, es riesgo legal en un anuncio de empleo.
- No se nombran clientes ni proveedores de Consiti.
- La plaza de contador se publica como "Contador General", sin variantes tipo "analista
  financiero". Fue un acuerdo expreso.

Están todas en [`src/lib/positions.js`](../../src/lib/positions.js), con esas reglas
escritas al inicio del archivo.

---

## Qué pasa después de postularse

1. Cae una fila en la hoja de Google, con las respuestas específicas de esa plaza y el
   enlace al CV en Drive.
2. Sale un correo de confirmación automático, con la marca de Worky by Consiti.
3. Nohemy revisa la hoja y contacta a quien encaja.
4. Cuando se abren plazas nuevas, se corre `enviarReactivacion()` y se le avisa a todo
   el banco de talento sin repetirle el correo a nadie.

---

## Deuda funcional conocida

Esto es lo que hoy no cumple la promesa, en orden de cuánto duele:

1. **Quien ya creó su perfil vuelve a escribir todo al postularse.** Es la contradicción
   más visible con "nunca se le pide dos veces lo mismo". Se resuelve con cuentas —
   parte de tu encargo.
2. **Nadie puede volver a ver ni corregir su perfil.** Si alguien se equivocó en el
   correo, no hay forma de arreglarlo.
3. **Las plazas se editan en código.** Publicar una vacante hoy requiere un despliegue.
   Nohemy no puede hacerlo sola.
4. **El correo sale por MailApp**, con cuota de ~100 al día en Gmail. Si la pauta
   funciona y entran 150 postulaciones en un día, 50 personas no reciben confirmación.
5. **La reactivación es manual**, hay que entrar a Apps Script y ejecutar una función.

---

## Lo que no hay que romper

Si tocás la arquitectura, cuidá que esto siga funcionando:

- **Los enlaces `?plaza=<id>` y `?perfil=1`.** Ya están pegados en anuncios de Meta que
  están corriendo. Si cambian las rutas, el dinero de la pauta cae en un 404.
- **Las columnas de la hoja y su orden.** Nohemy ya trabaja sobre ella.
- **Las columnas Campaña / Fuente / Anuncio.** Son las que permiten calcular el costo
  por registro, que es la métrica de la revisión semanal.
- **El tuteo.** El sitio habla de *tú*, nunca de *vos*. Está fijado en el manual de
  marca y aplicado en cada texto, correo y mensaje de error.
- **Que no aparezca ningún monto** por ningún lado.
