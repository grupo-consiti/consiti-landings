import { ArrowRight } from "./Icon";

// Marco común de las páginas legales: cabecera simple, contenido y pie con la
// firma de Grupo Consiti. No repite la navegación de la landing a propósito:
// acá la persona viene a leer.
export default function LegalShell({ title, updated, children }) {
  const year = new Date().getFullYear();
  return (
    <>
      <header className="header is-stuck">
        <div className="container header__inner">
          <a href="/" className="brand" aria-label="Worky by Consiti · inicio">
            <img className="brand__logo" src="/logo-worky.png" alt="Worky by Consiti" width={600} height={146} />
          </a>
          <a href="/#plazas" className="btn btn--ghost">Ver plazas</a>
        </div>
      </header>

      <main className="legal">
        <div className="container legal__wrap">
          <h1>{title}</h1>
          <p className="legal__updated">Última actualización: {updated}</p>
          {children}

          <div className="legal__back">
            <a href="/" className="btn btn--primary">
              Volver a Worky <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </main>

      <footer className="footer footer--slim">
        <div className="container">
          <div className="footer__bottom" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
            <span>© {year} Worky · un producto de Grupo Consiti S.A. de C.V.</span>
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
