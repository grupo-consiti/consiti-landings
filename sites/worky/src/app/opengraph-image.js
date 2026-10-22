import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bolsa de Trabajo de Grupo Consiti";
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
          background: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 700, color: "#DFD2FF", letterSpacing: 4 }}>
          <div style={{ width: 40, height: 4, background: "#5216E7", marginRight: 18 }} />
          GRUPO CONSITI
        </div>

        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 34, lineHeight: 1.02, letterSpacing: -3 }}>
          Bolsa de Trabajo
        </div>

        <div style={{ fontSize: 36, marginTop: 28, color: "#C4C0D0", lineHeight: 1.35 }}>
          Elige la vacante, llena su formulario y Recursos Humanos te contacta.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            alignSelf: "flex-start",
            background: "#5216E7",
            borderRadius: 999,
            padding: "18px 34px",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Ver vacantes abiertas
        </div>
      </div>
    ),
    { ...size }
  );
}
