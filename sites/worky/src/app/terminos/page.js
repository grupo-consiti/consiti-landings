import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Términos y condiciones · Worky by Consiti",
  description:
    "Las reglas de uso de Worky, el banco de talento de Grupo Consiti: qué es, qué no es, y qué esperamos de ti al postularte.",
};

export default function Terminos() {
  return (
    <LegalShell title="Términos y condiciones" updated="22 de septiembre de 2026">
      <p className="legal__lead">
        Estas son las reglas de uso de Worky, el banco de talento de{" "}
        <strong>Grupo Consiti S.A. de C.V.</strong> Al crear tu perfil o postularte a una
        plaza, aceptas lo que está aquí.
      </p>

      <h2>1. Qué es Worky</h2>
      <p>
        Worky es la bolsa de empleo de Grupo Consiti. Las plazas que ves son vacantes
        reales de la empresa y quien revisa los perfiles es nuestro equipo de Recursos
        Humanos. No somos una agencia de empleo ni publicamos vacantes de terceros.
      </p>

      <h2>2. Es gratis</h2>
      <p>
        Crear tu perfil y aplicar a las plazas <strong>no cuesta nada y nunca va a
        costar</strong>. Consiti no cobra por postular, ni por capacitaciones, ni por
        procesos de selección. Si alguien te pide dinero a nombre de Worky o de Consiti,
        no somos nosotros. Avísanos a{" "}
        <a href="mailto:administracion@consiti.com">administracion@consiti.com</a>.
      </p>

      <h2>3. Postular no garantiza un empleo</h2>
      <p>
        Registrarte te pone en el banco de talento; no te asegura una entrevista ni una
        contratación. Contactamos a quienes mejor encajan con cada plaza. Si no te
        escribimos por una vacante, tu perfil sigue guardado para las siguientes.
      </p>

      <h2>4. La información que das debe ser tuya y verdadera</h2>
      <ul>
        <li>Los datos, el CV y los enlaces que subes deben ser tuyos y reflejar la realidad.</li>
        <li>Información falsa o de otra persona es causa de descarte del proceso y de eliminación del perfil.</li>
        <li>Mantén tu correo y tu WhatsApp al día: es por ahí que te buscamos.</li>
      </ul>

      <h2>5. Qué hacemos con lo que subes</h2>
      <p>
        Usamos tu perfil, tu foto y tu CV únicamente para evaluarte en procesos de
        selección de Grupo Consiti. No los publicamos, no los vendemos y no los pasamos a
        terceros. El detalle está en{" "}
        <a href="/privacidad">cómo manejamos tus datos</a>.
      </p>

      <h2>6. Uso correcto del sitio</h2>
      <p>Al usar Worky te comprometes a no:</p>
      <ul>
        <li>Postularte haciéndote pasar por otra persona.</li>
        <li>Usar robots, scripts o herramientas automáticas para enviar postulaciones.</li>
        <li>Subir archivos con virus o contenido ilegal, ofensivo o que no te pertenezca.</li>
        <li>Intentar acceder a datos de otros candidatos o a partes no públicas del sitio.</li>
      </ul>

      <h2>7. Las plazas cambian</h2>
      <p>
        Podemos modificar, pausar o cerrar una vacante en cualquier momento, incluso antes
        de la fecha de cierre publicada. Cuando una convocatoria tiene fecha límite, la
        mostramos en la plaza.
      </p>

      <h2>8. Marca y contenido del sitio</h2>
      <p>
        Worky, Grupo Consiti, sus logotipos y el contenido de este sitio son propiedad de
        Grupo Consiti S.A. de C.V. Puedes compartir el enlace de una plaza libremente; no
        puedes copiar el sitio ni usar la marca sin autorización escrita.
      </p>

      <h2>9. Disponibilidad</h2>
      <p>
        Hacemos lo posible por mantener Worky en línea, pero puede haber interrupciones
        por mantenimiento o por causas fuera de nuestro control. Si no está disponible
        cuando quieras postularte, inténtalo de nuevo más tarde.
      </p>

      <h2>10. Cambios y ley aplicable</h2>
      <p>
        Podemos actualizar estos términos; la fecha del encabezado indica la última
        versión. Se rigen por las leyes de la República de El Salvador, y cualquier
        controversia se ventila ante los tribunales de San Salvador.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Grupo Consiti S.A. de C.V. · San Salvador, El Salvador ·{" "}
        <a href="mailto:administracion@consiti.com">administracion@consiti.com</a> ·{" "}
        <a href="https://consiti.com" target="_blank" rel="noopener noreferrer">consiti.com</a>
      </p>
    </LegalShell>
  );
}
