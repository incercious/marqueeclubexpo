import { COLORS, fontMono } from "@/lib/theme";
import { SCHOOL_SHORT_NAME } from "@/lib/schoolConfig";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.line}`, marginTop: 60 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "36px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
        <p style={{ fontFamily: fontMono, fontSize: 12.5, color: COLORS.inkSoft, margin: 0 }}>
          {SCHOOL_SHORT_NAME} club directory — club fair, but every day of the year.
        </p>
      </div>
    </footer>
  );
}
