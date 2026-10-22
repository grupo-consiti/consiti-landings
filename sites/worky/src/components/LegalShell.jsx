import { ArrowRight } from "./Icon";
import { BrandMark } from "./Header";

// Marco común de las páginas legales: cabecera simple, contenido y pie con la
// firma de Grupo Consiti. No repite la navegación de la landing a propósito:
// acá la persona viene a leer.
export default function LegalShell({ title, updated, children }) {
  const year = new Date().getFullYear();
  return (
    <>
      <header className="header is-stuck">
        <div className="container header__inner">
          <BrandMark href="/" />
          <a href="/#vacantes" className="btn btn--ghost">Ver vacantes</a>
        </div>
      </header>

      <main className="legal">
        <div className="container legal__wrap">
          <h1>{title}</h1>
          <p className="legal__updated">Última actualización: {updated}</p>
          {children}

          <div className="legal__back">
            <a href="/" className="btn btn--primary">
              Volver a la Bolsa de Trabajo <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </main>

      <footer className="footer footer--slim">
        <div className="container">
          <div className="footer__bottom" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
            <span>© {year} Grupo Consiti S.A. de C.V.</span>
            <span className="legal__links">
              <a href="/privacidad">Privacidad</a>
              <a href="/terminos">Términos</a>
              <a href="https://consiti.com" target="_blank" rel="noopener noreferrer">consiti.com</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
