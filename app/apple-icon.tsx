import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 39,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: "-2.8px",
            marginTop: -6,
          }}
        >
          ph
        </span>
      </div>
    ),
    { ...size }
  );
}
