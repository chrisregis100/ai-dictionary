import { ImageResponse } from "next/og";

import { ogColors } from "@/lib/og/theme";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ogColors.background,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            border: `2px solid ${ogColors.foreground}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: ogColors.foreground,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "-0.08em",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {">"}
          <div
            style={{
              width: 3,
              height: 10,
              marginLeft: 1,
              borderRadius: 1,
              background: ogColors.accent,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}

export default Icon;
