import Link from "next/link";
import { COLORS, fontDisplay } from "@/lib/theme";

// This is the one file to edit for branding. The icon below is a self-
// contained SVG (marquee-light bulbs over an "M") so it scales cleanly at
// any size, and it doesn't reference this school by name -- swap the
// wordmark text or tagline elsewhere if this ever expands to other schools.
export default function Logo({ showTagline = false }) {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <svg width="34" height="34" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="0" y="0" width="100" height="100" rx="20" fill={COLORS.ink} />
        <circle cx="14" cy="20" r="5" fill={COLORS.primary} />
        <circle cx="34" cy="20" r="5" fill={COLORS.secondary} />
        <circle cx="54" cy="20" r="5" fill={COLORS.primary} />
        <circle cx="74" cy="20" r="5" fill={COLORS.secondary} />
        <circle cx="86" cy="20" r="5" fill={COLORS.primary} />
        <text
          x="50"
          y="78"
          textAnchor="middle"
          fontSize="56"
          fill={COLORS.bg}
          fontFamily={fontDisplay}
          fontStyle="italic"
          fontWeight="600"
        >
          M
        </text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: fontDisplay,
            fontWeight: 600,
            fontSize: 21,
            color: COLORS.ink,
            fontStyle: "italic",
          }}
        >
          marquee
        </span>
        {showTagline && (
          <span
            style={{
              fontFamily: fontDisplay,
              fontSize: 11,
              color: COLORS.secondary,
              letterSpacing: 0.3,
            }}
          >
            what's on, all in one place
          </span>
        )}
      </div>
    </Link>
  );
}
