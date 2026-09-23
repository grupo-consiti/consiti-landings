import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Privacidad · Worky by Consiti",
  description:
    "Qué datos guardamos cuando creas tu perfil en Worky, para qué los usamos, dónde viven, cuánto duran y cómo pedir que los borremos.",
};

export default function Privacidad() {
  return (
    <LegalShell title="Cómo manejamos tus datos" updated="22 de septiembre de 2026">
      <p className="legal__lead">
        Worky es el banco de talento de <strong>Grupo Consiti S.A. de C.V.</strong> Aquí te
        contamos sin rodeos qué datos nos dejas, para qué los usamos y cómo pedir que
        los borremos. Si algo no te queda claro, escríbenos y te respondemos.
      </p>

      <h2>1. Quién es responsable de tus datos</h2>
      <p>
        Grupo Consiti S.A. de C.V., con domicilio en San Salvador, El Salvador. Para
        cualquier tema de datos personales, escríbenos a{" "}
        <a href="mailto:administracion@consiti.com">administracion@consiti.com</a>.
      </p>

      <h2>2. Qué datos recogemos</h2>
      <p>Solo lo que escribes en el formulario. No tomamos nada de ningún otro lado.</p>
      <ul>
        <li><strong>Para contactarte:</strong> nombre, correo, WhatsApp y país.</li>
        <li><strong>Para evaluar tu perfil:</strong> grado académico, titular, resumen, habilidades técnicas y blandas, experiencia laboral, idiomas y enlaces o redes que compartas.</li>
        <li><strong>Opcionales:</strong> tu foto de perfil y tu CV en PDF o Word.</li>
        <li><strong>Respuestas de cada plaza:</strong> las preguntas propias de la vacante a la que te postulas.</li>
        <li><strong>De qué campaña llegaste:</strong> si entraste desde un anuncio, guardamos el nombre de esa campaña. No dice nada de ti: nos sirve para saber qué anuncio funciona.</li>
      </ul>
      <p>
        No te pedimos DUI, NIT, número de cuenta, contraseñas ni datos de salud. Te
        pedimos que tampoco los escribas por tu cuenta en los campos abiertos.
      </p>

      <h2>3. Para qué los usamos</h2>
      <ul>
        <li>Evaluar tu perfil frente a las plazas abiertas de Grupo Consiti.</li>
        <li>Contactarte por correo o WhatsApp si avanzas en un proceso.</li>
        <li>Avisarte cuando abrimos plazas nuevas que encajan con tu perfil.</li>
        <li>Medir cuántas postulaciones trae cada campaña, en números agregados.</li>
      </ul>
      <p>
        <strong>No usamos tus datos para publicidad</strong>, no los vendemos y no los
        compartimos con otras empresas.
      </p>

      <h2>4. Dónde se guardan</h2>
      <p>
        En cuentas de Google de Grupo Consiti: los datos del perfil en una hoja de Google
        Sheets y los archivos —tu foto y tu CV— en Google Drive. El sitio está alojado en
        Vercel. Tanto Google como Vercel actúan como proveedores de infraestructura y
        pueden almacenar la información en servidores fuera de El Salvador.
      </p>
      <p>Solo el equipo de Recursos Humanos y Dirección de Consiti tiene acceso.</p>

      <h2>5. Cuánto tiempo los conservamos</h2>
      <p>
        Mientras siga siendo útil para nuestros procesos de selección. Si nos pides que lo
        borremos, lo borramos. No tienes que dar explicaciones.
      </p>

      <h2>6. Tus derechos</h2>
      <p>En cualquier momento puedes pedirnos:</p>
      <ul>
        <li>Una copia de los datos que tenemos tuyos.</li>
        <li>Que corrijamos lo que esté mal o desactualizado.</li>
        <li>Que borremos tu perfil por completo.</li>
        <li>Que dejemos de escribirte sobre plazas nuevas.</li>
      </ul>
      <p>
        Escribinos a <a href="mailto:administracion@consiti.com">administracion@consiti.com</a>{" "}
        desde el mismo correo con el que te registraste. Atendemos la solicitud en un
        plazo máximo de <strong>15 días hábiles</strong>. Para dejar de recibir avisos de
        plazas también puedes responder <strong>BAJA</strong> a cualquiera de nuestros correos.
      </p>

      <h2>7. Cookies y almacenamiento en tu navegador</h2>
      <p>
        Worky <strong>no usa cookies de publicidad ni de analítica</strong>. Lo único que
        guardamos en tu navegador es:
      </p>
      <ul>
        <li><strong>Tu elección de cookies</strong>, para no volver a preguntarte. Es necesaria y no se puede desactivar.</li>
        <li>
          <strong>El borrador de tu perfil o de tu postulación</strong>, mientras lo
          estás llenando. Si cierras la ventana a medias, al volver lo retomas donde lo
          dejaste en lugar de empezar de cero. <strong>Ese borrador no sale de tu
          dispositivo</strong>: no nos llega nada hasta que pulsas Enviar. Se borra solo
          al enviar, a la semana sin usarlo, o cuando tocas “Empezar de cero”. Tu CV
          nunca se guarda ahí.
        </li>
        <li><strong>La campaña por la que llegaste</strong>, solo si lo aceptaste. Si eliges “solo lo necesario”, no se guarda nada de esto.</li>
      </ul>
      <p>
        Nada de eso te identifica ni te sigue por otros sitios, y puedes borrarlo cuando
        quieras desde la configuración de tu navegador.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Los datos viajan cifrados y viven en cuentas corporativas con acceso restringido.
        Ningún sistema es infalible: si ocurriera un incidente que afecte tu información,
        te lo comunicaríamos por correo.
      </p>

      <h2>9. Mayoría de edad</h2>
      <p>
        Worky está dirigido a personas mayores de edad en busca de empleo o de prácticas
        profesionales. No recogemos datos de menores de forma intencional.
      </p>

      <h2>10. Cambios</h2>
      <p>
        Si cambiamos algo de esta página, actualizamos la fecha del encabezado. Si el
        cambio es importante y ya estás en el banco de talento, te avisamos por correo.
      </p>
    </LegalShell>
  );
}
