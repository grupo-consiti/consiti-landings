// Worky · iconografía propia
// Estilo: grid 24, trazo currentColor 1.8, extremos redondeados.

function S({ children, size = 22, strokeWidth = 1.8, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Check = (p) => (
  <S {...p}><path d="M20 6 9 17l-5-5" /></S>
);
export const ArrowRight = (p) => (
  <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>
);
export const Plus = (p) => (
  <S {...p}><path d="M12 5v14M5 12h14" /></S>
);
export const Bank = (p) => ( // banco de talento
  <S {...p}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></S>
);
export const Sparkles = (p) => ( // IA
  <S {...p}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="M19 14l.7 1.9L21.5 16.6 19.7 17.3 19 19.2 18.3 17.3 16.5 16.6 18.3 15.9 19 14Z" /></S>
);
export const Bolt = (p) => (
  <S {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></S>
);
export const Users = (p) => (
  <S {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" /></S>
);
export const Clipboard = (p) => (
  <S {...p}><rect x="8" y="3" width="8" height="4" rx="1.5" /><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 12h6M9 16h4" /></S>
);
export const Mail = (p) => (
  <S {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></S>
);
export const Chat = (p) => ( // WhatsApp / contacto
  <S {...p}><path d="M21 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-5A8 8 0 1 1 21 11.5Z" /><path d="M9 10.5c0 2.5 2 4.5 4.5 4.5" strokeWidth="1.6" /></S>
);
export const Globe = (p) => (
  <S {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" /></S>
);
export const Cap = (p) => ( // grado académico
  <S {...p}><path d="M2 9l10-4 10 4-10 4L2 9Z" /><path d="M6 11v4c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-4M22 9v5" /></S>
);
export const Heart = (p) => ( // habilidades blandas
  <S {...p}><path d="M12 20s-7-4.4-9.2-8.4A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 9.2 5.3C19 15.6 12 20 12 20Z" /></S>
);
export const Code = (p) => ( // habilidades técnicas
  <S {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" /></S>
);
export const FileText = (p) => ( // CV
  <S {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></S>
);
export const Video = (p) => (
  <S {...p}><rect x="3" y="6" width="12" height="12" rx="2.5" /><path d="m15 10 6-3v10l-6-3" /></S>
);
export const Target = (p) => ( // match
  <S {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></S>
);
export const Search = (p) => (
  <S {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></S>
);
export const Shield = (p) => ( // gratis / seguro
  <S {...p}><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></S>
);
export const Rocket = (p) => (
  <S {...p}><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0Z" /><path d="M9 13c4-6 9-8 11-8 0 2-2 7-8 11l-3-3Z" /><path d="M15 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></S>
);
export const Filter = (p) => (
  <S {...p}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" /></S>
);
export const Sheet = (p) => ( // base de datos / google sheet
  <S {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M4 15h16M10 3v18" /></S>
);
export const Share = (p) => (
  <S {...p}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></S>
);
export const Clock = (p) => (
  <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>
);
export const Eye = (p) => (
  <S {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></S>
);
export const Bell = (p) => (
  <S {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></S>
);
export const Camera = (p) => (
  <S {...p}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8Z" transform="translate(-1 0)" /><circle cx="12" cy="13" r="3.6" /></S>
);
export const Trash = (p) => (
  <S {...p}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /></S>
);
export const Link = (p) => (
  <S {...p}><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></S>
);

export const Menu = (p) => (
  <S {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </S>
);

export const Close = (p) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </S>
);
