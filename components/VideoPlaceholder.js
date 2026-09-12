import { COLORS, fontMono } from "@/lib/theme";

export default function VideoPlaceholder({ compact }) {
  return (
    <div
      style={{
        background: "#EDE9DC",
        border: `1px dashed ${COLORS.line}`,
        borderRadius: 10,
        aspectRatio: "16 / 9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        color: COLORS.inkSoft,
      }}
    >
      <span style={{ fontFamily: fontMono, fontSize: compact ? 11 : 12.5 }}>
        ▶ Demo intro video placeholder
      </span>
    </div>
  );
}
