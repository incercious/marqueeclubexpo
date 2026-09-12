import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/theme";
import { SCHOOL_NAME, CONTACT_INSTAGRAM, CONTACT_EMAIL } from "@/lib/schoolConfig";
import TicketButton from "@/components/TicketButton";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px" }}>
      <h1
        style={{
          fontFamily: fontDisplay,
          fontWeight: 600,
          fontStyle: "italic",
          fontSize: 40,
          color: COLORS.ink,
          margin: "0 0 22px",
        }}
      >
        Why marquee exists
      </h1>
      <p style={{ fontFamily: fontBody, fontSize: 17, lineHeight: 1.7, color: COLORS.ink, margin: "0 0 18px" }}>
        Every fall, {SCHOOL_NAME} holds a club fair — one afternoon where every club sets up a table,
        and students walk around deciding what to join. It works well for the students who make it that
        day. Everyone else — students who were absent, new students who arrive mid-year, or anyone who
        just wants to double-check a meeting time in March — has nowhere to go.
      </p>
      <p style={{ fontFamily: fontBody, fontSize: 17, lineHeight: 1.7, color: COLORS.inkSoft, margin: "0 0 30px" }}>
        Marquee is a year-round, searchable home for every club at our school. Instead of a single afternoon,
        club information — what a club does, when it meets, how to join — stays available and up to date
        for the whole school year.
      </p>
      <TicketButton primary href="/explore">
        Explore all clubs
      </TicketButton>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${COLORS.line}` }}>
        <p style={{ fontFamily: fontMono, fontSize: 12.5, color: COLORS.inkSoft, margin: 0 }}>
          Questions or want your club added? {CONTACT_INSTAGRAM} · {CONTACT_EMAIL}
        </p>
      </div>
    </div>
  );
}
