import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/theme";
import { CONTACT_INSTAGRAM, CONTACT_EMAIL } from "@/lib/schoolConfig";
import TicketButton from "@/components/TicketButton";

const SUGGESTIONS_FORM = "https://forms.gle/tBshNyaJboYijB6m8";

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 80px" }}>
      <h1
        style={{
          fontFamily: fontDisplay,
          fontWeight: 600,
          fontStyle: "italic",
          fontSize: 40,
          color: COLORS.ink,
          margin: "0 0 18px",
        }}
      >
        Contact
      </h1>
      <p style={{ fontFamily: fontBody, fontSize: 17, lineHeight: 1.7, color: COLORS.inkSoft, margin: "0 0 36px" }}>
        Questions, want your club added, or just want to say hi -- reach out any of these ways.
      </p>

      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <h2 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 600, color: COLORS.ink, margin: "0 0 10px" }}>
          Reach us
        </h2>
        <p style={{ fontFamily: fontMono, fontSize: 14, color: COLORS.inkSoft, margin: 0, lineHeight: 1.9 }}>
          Instagram: {CONTACT_INSTAGRAM}
          <br />
          Email: {CONTACT_EMAIL}
        </p>
      </div>

      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 12,
          padding: 24,
        }}
      >
        <h2 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 600, color: COLORS.ink, margin: "0 0 10px" }}>
          Got a suggestion?
        </h2>
        <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.6, color: COLORS.inkSoft, margin: "0 0 18px" }}>
          Missing club, wrong info, an idea for the site -- tell us here.
        </p>
        <TicketButton primary href={SUGGESTIONS_FORM} external>
          Open suggestions form
        </TicketButton>
      </div>
    </div>
  );
}
