import Link from "next/link";
import { getCategory } from "@/data/clubs";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/theme";
import CategoryBadge from "./CategoryBadge";

export default function ClubCard({ club }) {
  const cat = getCategory(club.category);
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style={{ height: 4, background: cat.color }} />
      <div style={{ padding: "18px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <CategoryBadge categoryId={club.category} />
          {club.level !== "both" && (
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 11,
                color: COLORS.inkSoft,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 999,
                padding: "2px 9px",
              }}
            >
              {club.level === "ms" ? "Middle school" : "High school"}
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: fontDisplay,
            fontSize: 21,
            fontWeight: 600,
            margin: "10px 0 6px",
            color: COLORS.ink,
            lineHeight: 1.2,
          }}
        >
          {club.name}
        </h3>
        <p
          style={{
            fontFamily: fontBody,
            fontSize: 14.5,
            color: COLORS.inkSoft,
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {club.shortDescription}
        </p>
      </div>

      {/* perforated ticket-stub divider */}
      <div style={{ position: "relative", margin: "16px 0 0" }}>
        <div style={{ borderTop: `2px dashed ${COLORS.line}` }} />
        <div
          style={{
            position: "absolute",
            left: -9,
            top: -9,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: COLORS.bg,
            border: `1px solid ${COLORS.line}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -9,
            top: -9,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: COLORS.bg,
            border: `1px solid ${COLORS.line}`,
          }}
        />
      </div>

      <div
        style={{
          padding: "14px 18px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft }}>
          {club.meetingDays || "Details soon"}
        </span>
        <Link
          href={`/clubs/${club.slug}`}
          style={{
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 14,
            color: COLORS.ink,
            textDecoration: "none",
            border: `1.5px solid ${COLORS.line}`,
            padding: "9px 16px",
            borderRadius: 8,
          }}
        >
          View club →
        </Link>
      </div>
    </div>
  );
}
