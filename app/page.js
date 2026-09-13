"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLUBS, CATEGORIES } from "@/data/clubs";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/theme";
import { SCHOOL_SHORT_NAME } from "@/lib/schoolConfig";
import ClubCard from "@/components/ClubCard";
import TicketButton from "@/components/TicketButton";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const featured = CLUBS.filter((c) => c.featured);

  const goSearch = (e) => {
    e.preventDefault();
    router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 20px 40px" }}>
        <div style={{ maxWidth: 640 }}>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 12.5,
              color: COLORS.primaryDark,
              background: COLORS.primary + "26",
              padding: "4px 10px",
              borderRadius: 999,
            }}
          >
            {SCHOOL_SHORT_NAME} club directory
          </span>
          <h1
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: "clamp(38px, 6vw, 60px)",
              lineHeight: 1.05,
              margin: "18px 0 18px",
              color: COLORS.ink,
            }}
          >
            Find your club.
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 17, lineHeight: 1.6, color: COLORS.inkSoft, margin: "0 0 28px" }}>
            The club fair happens once a year. This doesn't. Browse every club on campus,
            watch a quick intro video, and find your people — any day of the school year.
          </p>

          <form
            onSubmit={goSearch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: COLORS.card,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 10,
              padding: "6px 8px 6px 14px",
              maxWidth: 460,
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clubs, e.g. 'robotics'"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontFamily: fontBody,
                fontSize: 14.5,
                background: "transparent",
                padding: "8px 0",
                color: COLORS.ink,
              }}
            />
            <TicketButton primary small onClick={goSearch}>
              Search
            </TicketButton>
          </form>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 10px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 600, color: COLORS.ink, margin: 0 }}>
            Popular right now
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {featured.map((c) => (
            <ClubCard key={c.slug} club={c} />
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 20px 10px" }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 600, color: COLORS.ink, margin: "0 0 18px" }}>
          Browse by category
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
          {CATEGORIES.map((cat) => {
            const count = CLUBS.filter((c) => c.category === cat.id).length;
            const Icon = cat.icon;
            return (
              <a
                key={cat.id}
                href={`/explore?category=${cat.id}`}
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 12,
                  padding: "18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: cat.color + "1A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} color={cat.color} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 14.5, color: COLORS.ink }}>
                    {cat.name}
                  </div>
                  <div style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft }}>
                    {count} club{count !== 1 ? "s" : ""}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 20px 20px", textAlign: "center" }}>
        <div
          style={{
            background: COLORS.ink,
            borderRadius: 18,
            padding: "48px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <h2 style={{ fontFamily: fontDisplay, fontStyle: "italic", fontSize: 28, color: "#F6F5F0", margin: 0 }}>
            {CLUBS.length} clubs. One place. Every day of the year.
          </h2>
          <TicketButton primary href="/explore">
            Explore all clubs
          </TicketButton>
        </div>
      </section>
    </div>
  );
}
