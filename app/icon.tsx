import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "-0.5px",
            marginTop: -1,
          }}
        >
          ph
        </span>
      </div>
    ),
    { ...size }
  );
}
