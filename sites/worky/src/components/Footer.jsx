export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#top" className="brand">
              <img className="brand__logo" src="/logo-worky-white.png" alt="Worky by Consiti" width={600} height={146} />
            </a>
            <p className="footer__tag">
              El banco de talento de Grupo Consiti. Un perfil, todas nuestras
              plazas. Gratis y sin letra chica.
            </p>
          </div>

          <div>
            <h4>Tu cuenta</h4>
            <a href="#aplicar">Crear mi perfil</a>
            <a href="#plazas">Ver plazas</a>
            <a href="#como-funciona">Cómo funciona</a>
          </div>

          <div>
            <h4>Información</h4>
            <a href="#faq">Preguntas frecuentes</a>
            <a href="/privacidad">Cómo manejamos tus datos</a>
            <a href="/terminos">Términos y condiciones</a>
            <a href="https://consiti.com" target="_blank" rel="noopener noreferrer">Sitio de Consiti</a>
          </div>

          <div className="footer__owner">
            <img
              className="footer__owner-logo"
              src="/consiti-imagologo-blanco.svg"
              alt="Grupo Consiti"
              width={96}
              height={67}
            />
            <p className="footer__owner-tag">
              Transformación digital con Software, IA y Cloud.
            </p>
            <p className="footer__owner-legal">
              Grupo Consiti S.A. de C.V.<br />
              San Salvador, El Salvador
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Worky · un producto de Grupo Consiti S.A. de C.V.</span>
          <span>Hecho con 💜 en San Salvador.</span>
        </div>
      </div>
    </footer>
  );
}
