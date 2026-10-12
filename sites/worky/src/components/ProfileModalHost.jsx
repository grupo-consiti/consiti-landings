"use client";

import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";

// Abre el pop-up de "Crear mi perfil" cuando se hace clic en cualquier CTA que
// apunte a #aplicar o tenga [data-open-profile], en vez de hacer scroll a la sección.
//
// También lo abre al entrar con /?perfil=1, que es la URL para los anuncios de Meta
// que invitan al banco de talento en general (sin plaza concreta).
export default function ProfileModalHost() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("perfil")) setOpen(true);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest('a[href="#aplicar"], [data-open-profile]');
      if (trigger) { e.preventDefault(); setOpen(true); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!open) return null;
  return <ProfileModal onClose={() => setOpen(false)} />;
}
