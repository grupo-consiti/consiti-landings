import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Worky — El banco de talento de Grupo Consiti";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #6E35F0 0%, #5216E7 52%, #3B0FAF 118%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 26,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, marginLeft: 26, letterSpacing: -1 }}>
            Worky
          </div>
        </div>

        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 40, lineHeight: 1.05, letterSpacing: -2 }}>
          Un perfil.
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          Todas nuestras plazas.
        </div>

        <div style={{ fontSize: 32, marginTop: 30, color: "rgba(255,255,255,0.92)" }}>
          Créalo gratis · Postúlate con un clic
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
            paddingTop: 26,
            borderTop: "1px solid rgba(255,255,255,0.28)",
            fontSize: 26,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: 0.5,
          }}
        >
          Un producto de Grupo Consiti · worky.consiti.com
        </div>
      </div>
    ),
    { ...size }
  );
}
