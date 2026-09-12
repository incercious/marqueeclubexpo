import { getCategory } from "@/data/clubs";
import { fontMono } from "@/lib/theme";

export default function CategoryBadge({ categoryId, size = "sm" }) {
  const cat = getCategory(categoryId);
  if (!cat) return null;
  const pad = size === "sm" ? "3px 10px" : "5px 14px";
  const fs = size === "sm" ? 12 : 13.5;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: cat.color + "1A",
        color: cat.color,
        fontFamily: fontMono,
        fontSize: fs,
        fontWeight: 500,
        padding: pad,
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {cat.name}
    </span>
  );
}
