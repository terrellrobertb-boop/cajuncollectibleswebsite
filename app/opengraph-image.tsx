import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cajun Collectibles — Where the Past Comes Alive, One Memory at a Time";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0D5C63",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 80px",
          color: "#F3EAD2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#E0B341",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 22,
            fontWeight: 700,
          }}
        >
          Cajun Collectibles
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Where the past</span>
          <span style={{ color: "#E0B341" }}>comes alive,</span>
          <span>one memory at a time.</span>
        </div>
        <div
          style={{
            marginTop: 38,
            fontSize: 28,
            color: "#1f8a93",
            fontWeight: 600,
          }}
        >
          Sports Cards &bull; Retro Games &bull; Comics &bull; Vintage Toys
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 24,
            color: "#C75E2A",
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          The Hunt. The Find. The Story.
        </div>
      </div>
    ),
    { ...size },
  );
}
