import { CLUBS, getClub, getCategory } from "@/data/clubs";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/theme";
import CategoryBadge from "@/components/CategoryBadge";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import PhotoScroller from "@/components/PhotoScroller";
import TicketButton from "@/components/TicketButton";
import ClubCard from "@/components/ClubCard";
import Link from "next/link";

// This tells Next.js to build one page per club, using the "slug"
// value from each entry in data/clubs.js as the URL. Add a club
// to that file and its page appears here automatically.
export function generateStaticParams() {
  return CLUBS.map((c) => ({ slug: c.slug }));
}

export default function ClubPage({ params }) {
  const club = getClub(params.slug);

  if (!club) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontFamily: fontDisplay, fontSize: 28, color: COLORS.ink }}>Club not found</h1>
        <p style={{ fontFamily: fontBody, color: COLORS.inkSoft }}>
          That club doesn't exist in the demo data.{" "}
          <Link href="/explore" style={{ color: COLORS.secondary }}>
            Back to all clubs
          </Link>
        </p>
      </div>
    );
  }

  const cat = getCategory(club.category);
  const related = CLUBS.filter((c) => c.category === club.category && c.slug !== club.slug).slice(0, 3);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 20px 80px" }}>
      <Link
        href="/explore"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: fontBody,
          fontSize: 14,
          color: COLORS.inkSoft,
          marginBottom: 22,
          textDecoration: "none",
        }}
      >
        ← Back to all clubs
      </Link>

      <CategoryBadge categoryId={club.category} size="md" />
      <h1
        style={{
          fontFamily: fontDisplay,
          fontWeight: 600,
          fontSize: "clamp(30px, 5vw, 42px)",
          color: COLORS.ink,
          margin: "14px 0 26px",
          lineHeight: 1.1,
        }}
      >
        {club.name}
      </h1>

      <VideoPlaceholder videoUrl={club.videoUrl} />

      <div style={{ marginTop: 20 }}>
        <p
          style={{
            fontFamily: fontMono,
            fontSize: 11.5,
            color: COLORS.inkSoft,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            margin: "0 0 8px",
          }}
        >
          Photos
        </p>
        <PhotoScroller photos={club.photos} />
      </div>

      <p style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.7, color: COLORS.ink, margin: "26px 0" }}>
        {club.longDescription}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 14,
          padding: 22,
          margin: "20px 0 30px",
        }}
      >
        <InfoRow
          label="Meets"
          value={
            club.meetingDays && club.meetingTime
              ? `${club.meetingDays} · ${club.meetingTime}`
              : club.meetingDays || club.meetingTime
          }
        />
        <InfoRow label="Location" value={club.location} />
        <InfoRow label="Sponsor" value={club.sponsor} />
        <InfoRow label="Contact" value={club.email} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        {club.joinLinkNew || club.joinLinkReturning ? (
          <>
            {club.joinLinkNew && (
              <TicketButton primary href={club.joinLinkNew} external>
                New member? Join here
              </TicketButton>
            )}
            {club.joinLinkReturning && (
              <TicketButton primary href={club.joinLinkReturning} external>
                Returning member? Sign up here
              </TicketButton>
            )}
          </>
        ) : club.joinLink ? (
          <TicketButton primary href={club.joinLink} external>
            Join club
          </TicketButton>
        ) : club.email ? (
          <TicketButton primary href={`mailto:${club.email}`} external>
            Email to join
          </TicketButton>
        ) : null}
        {Object.entries(club.social || {}).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: fontMono,
              fontSize: 13,
              padding: "10px 14px",
              borderRadius: 10,
              border: `1px solid ${COLORS.line}`,
              color: COLORS.ink,
              textDecoration: "none",
            }}
          >
            {key}
          </a>
        ))}
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <h3 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 600, color: COLORS.ink, marginBottom: 14 }}>
            More in {cat.name}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {related.map((c) => (
              <ClubCard key={c.slug} club={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 11.5,
          color: COLORS.inkSoft,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: fontBody, fontSize: 14.5, color: COLORS.ink, fontWeight: 500 }}>{value}</div>
    </div>
  );
}
