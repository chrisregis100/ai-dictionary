import { OgSiteCard } from "@/lib/og/cards";
import { renderOgImage } from "@/lib/og/render";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/theme";
import { getEntries } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage(<OgSiteCard termCount={getEntries().length} />);
}
