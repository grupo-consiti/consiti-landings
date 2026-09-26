# Worky · Guía de marca

Identidad visual de **Worky**, el banco de talento de **Grupo Consiti S.A. de C.V.**
Worky tiene personalidad propia —tecnológica, optimista y humana— pero **no es una
marca independiente**: siempre se presenta respaldada por Consiti.

> **Cambio de premisa (22-sep-2026).** La v1 nació como marca blanca sin relación con
> otras marcas. Dirección corrigió ese enfoque: Worky debe colgar de Consiti, bajo el
> dominio `worky.consiti.com`, como la página "Trabaja con nosotros". Este documento ya
> refleja la corrección; la regla de "marca blanca" quedó **sin efecto**.

---

## 0. Relación con Grupo Consiti (co-branding)

**Regla base:** Worky es el producto, Consiti es el respaldo. Worky manda en el diseño;
Consiti aparece siempre, en segundo plano, identificando al dueño.

| Dónde | Qué se muestra | Archivo |
|---|---|---|
| Header | Logotipo **Worky by Consiti** (196 px de ancho) | `public/logo-worky.png` |
| Footer · marca | El mismo logotipo en versión para fondo oscuro (200 px) | `public/logo-worky-white.png` |
| Footer · respaldo | Imagologo Consiti blanco + tagline + razón social | `public/consiti-imagologo-blanco.svg` |
| Legal | "© {año} Worky · un producto de Grupo Consiti S.A. de C.V." | — |
| Correos | Firma "El banco de talento con IA de Grupo Consiti S.A. de C.V." | `apps-script/Codigo.gs` |
| OG / SEO | `siteName: "Worky · Grupo Consiti"` | `src/app/layout.js` |

**El color de Worky es el morado de Consiti.** Desde el 22-sep-2026 el logotipo de Worky
lleva la firma *by Consiti* y está construido con el morado `#5216E7` del manual. La
interfaz se alineó a ese mismo morado: ya no existe un "violeta Worky" aparte.

**Nunca:**
- Separar la firma *by Consiti* del logotipo de Worky ni reescribirla como texto suelto.
- Deformar, rotar o aplicar efectos al monograma GC.
- Usar el monograma GC por debajo de 32 px, o el logotipo horizontal por debajo de
  100 px de ancho. Nunca sin su zona de protección.
- Usar amarillo `#FFDD00` (es exclusivo de la submarca Factu IA).
- Presentar Worky como marca ajena a Consiti, ni cobrarle al candidato.

**Consentimiento y datos:** los textos legales nombran a **Grupo Consiti S.A. de C.V.**
como responsable de los datos, no a "Worky" a secas.

---

## 1. Concepto

**Worky** = *Work* + la terminación *-y* (cercana, amigable, tipo producto digital).
La marca representa un **banco de talento con IA**: el lugar donde el talento espera
listo y la oportunidad lo encuentra.

**Encuadre:** Worky es la puerta de entrada al empleo **en Grupo Consiti**. Las plazas
son vacantes reales de Consiti y quien revisa los perfiles es Recursos Humanos.

**Idea del símbolo:** una insignia con una **"W" ascendente** (crecimiento, progreso)
y una **chispa ámbar** arriba a la derecha = la oportunidad / el *match* que aparece.

**Personalidad:** confiable pero fresca · directa · optimista · nada acartonada.

---

## 2. Logo

| Archivo | Uso |
|---|---|
| `public/logo-worky.png` | Logotipo **Worky by Consiti** sobre fondos claros |
| `public/logo-worky-white.png` | El mismo sobre fondos oscuros (texto blanco, W morada) |
| `public/logo-worky-mono.png` | Todo blanco, para fondos morados o de color: sobre morado, la W de la versión anterior desaparece |
| `public/isotipo-worky.png` | Isotipo solo: la W con la lupa (avatar, sellos) |
| `public/favicon.png` | Ícono de pestaña |
| `public/consiti-logotipo-morado.svg` | Logotipo Consiti para fondos claros |
| `public/consiti-logotipo-blanco.svg` | Logotipo Consiti para fondos oscuros |
| `public/consiti-imagologo-blanco.svg` | Imagologo Consiti (monograma + nombre), footer |
| `public/consiti-isotipo-morado.svg` | Monograma GC suelto |

Los archivos de Consiti salen de los originales del manual de marca
(`PROYECTOS/Grupo-Consiti/06_Activos_Visuales`), recortados al contenido y recoloreados
al morado oficial. **No los edites a mano:** si cambian los originales, se regeneran.

> **Archivo maestro:** `Worky.png` (2214 × 738, fondo transparente), entregado por
> Briant el 22-sep-2026. De ahí salen las cuatro versiones de arriba, recortadas al
> contenido y escaladas. La versión para fondo oscuro se derivó pasando a blanco el
> texto azul noche y conservando el morado. **Si aparece el original vectorial, hay que
> reemplazar estos PNG por SVG.**

**Reglas de uso**
- Mantené un área de respiro alrededor del logo (mínimo la mitad del alto del isotipo).
- No bajes el logotipo de **156 px de ancho**: por debajo, la firma *by Consiti* deja
  de leerse.
- No deformes, rotes ni cambies los colores del gradiente.
- Sobre fondos de color o foto, usá la versión blanca.
- Tamaño mínimo del isotipo: 24 px. Del logo horizontal: 120 px de ancho.

---

## 3. Paleta

El color madre es el **morado Consiti**, el mismo del logotipo. Coral, mint y ámbar
quedan como acentos funcionales (alerta, éxito, destaque), nunca como color principal —
el manual de Consiti prohíbe verde, rojo o azul brillante en ese rol.

| Rol | Nombre | HEX |
|---|---|---|
| Primario | **Morado Consiti** | `#5216E7` |
| Primario oscuro | Morado 700 | `#350E96` |
| Primario claro | Morado 050 | `#EFEAFE` |
| Secundario claro | Lavanda Consiti | `#DFD2FF` |
| Acento cálido | Coral | `#FF6A5A` |
| Chispa / destaque | Ámbar | `#FFC24B` |
| Crecimiento / éxito | Mint | `#12B886` |
| Tinta / texto | Ink | `#160F33` |
| Texto secundario | Slate | `#565273` |
| Fondo | Cloud | `#F6F5FC` |
| Superficie | Blanco | `#FFFFFF` |
| Bordes | Line | `#E9E7F3` |

El morado y la lavanda salen del manual de Grupo Consiti y mandan en toda la interfaz:
botones, títulos, enlaces y estados activos.

**Gradiente de marca:** `linear-gradient(135deg, #6E35F0 0%, #5216E7 52%, #3B0FAF 118%)`

Es morado puro: el coral salió del gradiente principal el 22-sep-2026, al alinear la
interfaz con el manual de Consiti.

Todos los valores viven como *design tokens* en `src/app/globals.css` (`:root`).

---

## 4. Tipografía

| Uso | Fuente | Pesos |
|---|---|---|
| Títulos / display | **Sora** | 700 / 800 |
| Texto / UI | **Inter** | 400 / 500 / 600 / 700 |

Se cargan con `next/font` (sin llamadas externas en runtime). Títulos con
`letter-spacing` negativo (`-0.02em`) para un look compacto y moderno.

---

## 5. Iconografía propia

Set de íconos en `src/components/Icon.jsx`. Estilo unificado:

- Grid de **24×24**, trazo `currentColor`, grosor **1.8**.
- Extremos y uniones **redondeados** (`round`).
- Sin relleno (salvo puntos de acento).
- Heredan el color del contexto → se tiñen con la paleta.

Íconos incluidos: Check, ArrowRight, Plus, Bank (banco de talento), Sparkles (IA),
Bolt, Users, Clipboard, Mail, Chat (WhatsApp), Globe, Cap (grado académico), Heart
(habilidades blandas), Code (habilidades técnicas), FileText (CV), Video, Target
(match), Search, Shield, Rocket, Filter, Sheet (base de datos), Share, Clock, Eye.

---

## 6. Voz y tono

- **Cercana y directa, en _tú_**: "Crea tu perfil", "Ya estás dentro".
  **Nunca voseo** (*creá, tenés, podés, sumate*): el sitio y los correos hablan de tú,
  sin excepción. Es la forma que usa el público salvadoreño al leer, y la que mantiene
  el registro profesional de Consiti sin sonar acartonado.
- **Frases cortas.** Si una oración necesita una coma para respirar, probablemente sean
  dos oraciones.
- **Verbo antes que sustantivo:** "Crea tu perfil", no "Creación de perfil".
- **Beneficio antes que función:** no "formulario de registro", sino "un perfil, todas
  nuestras plazas".
- **Cero relleno.** Fuera "te invitamos a", "no dudes en", "en Worky creemos que".
- **Promesas que se cumplen.** Si decimos que respondemos, respondemos. Nada de
  "podrías ser el próximo".
- Emoji con moderación (💜 en el pie). En los correos, ninguno.

**Claims base**
- "Un perfil. Todas nuestras plazas."
- "El banco de talento de Grupo Consiti."
- "Deja de buscar. Que te encuentren."

> Ojo: el tono de Worky (cercano, en *tú*) es más informal que el de Consiti
> corporativo. Está bien: Worky le habla al candidato, no al C-level. Lo que **no**
> cambia es la firma legal ni la forma del logo de Consiti.
