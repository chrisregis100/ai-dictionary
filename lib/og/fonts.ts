import { readFileSync } from "node:fs";
import path from "node:path";

export interface OgFontFiles {
  frauncesBold: Buffer;
  outfitRegular: Buffer;
  outfitSemiBold: Buffer;
}

export interface OgFontOption {
  name: string;
  data: Buffer;
  weight: 400 | 600 | 700;
  style: "normal";
}

let cachedFonts: OgFontFiles | undefined;

export function loadOgFonts(): OgFontFiles {
  if (cachedFonts) return cachedFonts;

  cachedFonts = {
    frauncesBold: readFileSync(
      path.join(process.cwd(), "assets/fonts/Fraunces144pt-Bold.ttf"),
    ),
    outfitRegular: readFileSync(
      path.join(process.cwd(), "assets/fonts/Outfit-Regular.ttf"),
    ),
    outfitSemiBold: readFileSync(
      path.join(process.cwd(), "assets/fonts/Outfit-SemiBold.ttf"),
    ),
  };

  return cachedFonts;
}

export function ogImageFonts(): OgFontOption[] {
  const files = loadOgFonts();
  return [
    {
      name: "Fraunces",
      data: files.frauncesBold,
      weight: 700,
      style: "normal",
    },
    {
      name: "Outfit",
      data: files.outfitRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Outfit",
      data: files.outfitSemiBold,
      weight: 600,
      style: "normal",
    },
  ];
}
