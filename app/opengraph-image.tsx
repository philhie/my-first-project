import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Phil Hie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 10,
            background: "#ffffff",
            color: "#000000",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          ph
        </div>

        {/* Bottom: content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            Phil Hie
          </div>
          <div
            style={{
              color: "#666666",
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: 720,
            }}
          >
            Building at the intersection of services and artificial intelligence.
          </div>
          <div
            style={{
              color: "#333333",
              fontSize: 18,
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            philhie.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
