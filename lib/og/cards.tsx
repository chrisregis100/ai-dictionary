import type { ReactNode } from "react";

import { ogColors, ogType, termFontSize } from "@/lib/og/theme";
import { siteConfig } from "@/lib/site";

interface OgFrameProps {
  children: ReactNode;
}

function OgFrame({ children }: OgFrameProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: ogColors.paper,
        color: ogColors.ink,
      }}
    >
      <div
        style={{
          width: 14,
          height: "100%",
          backgroundColor: ogColors.clay,
          display: "flex",
        }}
      />
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "52px 64px 44px 56px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function OgFooter({ trailing }: { trailing: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 28,
        paddingTop: 22,
        borderTop: `1px solid ${ogColors.line}`,
        fontFamily: "Outfit",
        fontSize: ogType.footer,
        fontWeight: 600,
        color: ogColors.muted,
      }}
    >
      <span style={{ display: "flex" }}>{siteConfig.name}</span>
      <span style={{ display: "flex", color: ogColors.clay }}>{trailing}</span>
    </div>
  );
}

interface OgSiteCardProps {
  termCount: number;
}

export function OgSiteCard({ termCount }: OgSiteCardProps) {
  return (
    <OgFrame>
      <div
        style={{
          display: "flex",
          fontFamily: "Outfit",
          fontSize: ogType.kicker,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: ogColors.muted,
        }}
      >
        Dictionnaire · IA coding
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: ogType.siteTitle,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: ogColors.ink,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            maxWidth: 920,
            fontFamily: "Outfit",
            fontSize: ogType.siteDescription,
            fontWeight: 400,
            lineHeight: 1.35,
            color: ogColors.muted,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
      <OgFooter trailing={`${termCount} termes`} />
    </OgFrame>
  );
}

interface OgEntryCardProps {
  term: string;
  sourceTerm: string;
  description: string;
  sectionTitle: string;
}

export function OgEntryCard({
  term,
  sourceTerm,
  description,
  sectionTitle,
}: OgEntryCardProps) {
  const hasDistinctSource = sourceTerm.trim() !== term.trim();

  return (
    <OgFrame>
      <div
        style={{
          display: "flex",
          fontFamily: "Outfit",
          fontSize: ogType.sectionLabel,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ogColors.clay,
        }}
      >
        {sectionTitle}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: termFontSize(term),
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: ogColors.ink,
          }}
        >
          {term}
        </div>
        {hasDistinctSource ? (
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontFamily: "Outfit",
              fontSize: ogType.sourceTerm,
              fontWeight: 400,
              color: ogColors.sage,
            }}
          >
            {sourceTerm}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            marginTop: 22,
            maxWidth: 980,
            fontFamily: "Outfit",
            fontSize: ogType.description,
            fontWeight: 400,
            lineHeight: 1.4,
            color: ogColors.muted,
          }}
        >
          {description}
        </div>
      </div>
      <OgFooter trailing={siteConfig.shortName} />
    </OgFrame>
  );
}

interface OgFallbackCardProps {
  heading: string;
  detail: string;
}

export function OgFallbackCard({ heading, detail }: OgFallbackCardProps) {
  return (
    <OgFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: ogColors.ink,
          }}
        >
          {heading}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontFamily: "Outfit",
            fontSize: ogType.siteDescription,
            fontWeight: 400,
            color: ogColors.muted,
          }}
        >
          {detail}
        </div>
      </div>
      <OgFooter trailing={siteConfig.shortName} />
    </OgFrame>
  );
}
