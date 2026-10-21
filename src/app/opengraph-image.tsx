import { ImageResponse } from "next/og";

export const alt = "Fiyinfoluwa Tomiwa Ikuyajolu — Web Designer & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0e0e0c", color: "#f4f3ee", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: "#c9f23a" }} />
          <div style={{ fontSize: 26, letterSpacing: 6, opacity: 0.7 }}>FIYINFOLUWA TOMIWA IKUYAJOLU</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <span>Websites that turn</span>
          <span style={{ color: "#c9f23a" }}>visitors into clients.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, opacity: 0.7 }}>
          <span>Web Design · Development · Data · Graphics · Marketing</span>
          <span>Book a free call →</span>
        </div>
      </div>
    ),
    size,
  );
}
