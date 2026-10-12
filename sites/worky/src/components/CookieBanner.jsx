"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";
import { Shield } from "./Icon";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Solo aparece si la persona todavía no eligió.
    if (!getConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const elegir = (valor) => {
    setConsent(valor);
    setVisible(false);
  };

  return (
    <div className="cookies" role="dialog" aria-label="Preferencias de cookies">
      <div className="cookies__inner">
        <div className="cookies__txt">
          <div className="cookies__title">
            <Shield size={17} /> Antes de seguir
          </div>
          <p>
            No usamos cookies de publicidad ni te seguimos por otros sitios. Solo
            queremos recordar desde qué anuncio llegaste, para saber qué campaña
            funciona. Puedes decir que no: el sitio funciona igual.{" "}
            <a href="/privacidad">Cómo manejamos tus datos</a>.
          </p>
        </div>
        <div className="cookies__btns">
          <button className="btn btn--ghost" onClick={() => elegir("esenciales")}>
            Solo lo necesario
          </button>
          <button className="btn btn--primary" onClick={() => elegir("todas")}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
