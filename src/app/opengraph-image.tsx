import { ImageResponse } from "next/og";
import { ICON_PATH } from "@/components/Icon";

export const alt = "The Semio Group — Strategic Advisory for the Modern SaaS Economy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6c6c6c",
            }}
          >
            The Semio Group
          </div>
          <svg width="120" height="120" viewBox="0 0 250 250.0296">
            <path d={ICON_PATH} fill="#000000" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
          }}
        >
          Strategic Advisory for the Modern SaaS Economy.
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#333333", letterSpacing: "-0.01em" }}>
          Driving revenue by creating value.
        </div>
      </div>
    ),
    { ...size }
  );
}
