import { ImageResponse } from "next/og";
import type { ReactElement } from "react";

import { ogImageFonts } from "@/lib/og/fonts";
import { OG_SIZE } from "@/lib/og/theme";

export function renderOgImage(element: ReactElement) {
  return new ImageResponse(element, {
    ...OG_SIZE,
    fonts: ogImageFonts(),
  });
}
