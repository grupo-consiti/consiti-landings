export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              className="footer__logo"
              src="/consiti-imagologo-blanco.svg"
              alt="Grupo Consiti"
              width={2182}
              height={1530}
            />
            <p className="footer__tag">Transformación digital con Software, IA y Cloud.</p>
          </div>

          <div>
            <h4>Bolsa de Trabajo</h4>
            <a href="#vacantes">Vacantes abiertas</a>
            <a href="#como-aplicar">Cómo aplicar</a>
            <a href="#faq">Preguntas frecuentes</a>
          </div>

          <div>
            <h4>Información</h4>
            <a href="/privacidad">Cómo manejamos tus datos</a>
            <a href="/terminos">Términos y condiciones</a>
            <a href="https://consiti.com" target="_blank" rel="noopener noreferrer">consiti.com</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Grupo Consiti S.A. de C.V. · San Salvador, El Salvador</span>
          <span>Postularte a una plaza de Consiti siempre es gratis.</span>
        </div>
      </div>
    </footer>
  );
}
