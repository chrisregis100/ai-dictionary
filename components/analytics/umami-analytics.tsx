import Script from "next/script";

const UMAMI_SRC =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? "https://cloud.umami.is/script.js";

export function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  return (
    <Script
      src={UMAMI_SRC}
      data-website-id={websiteId}
      strategy="afterInteractive"
      defer
    />
  );
}
