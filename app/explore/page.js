"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CLUBS, CATEGORIES } from "@/data/clubs";
import { COLORS, fontDisplay, fontBody } from "@/lib/theme";
import ClubCard from "@/components/ClubCard";

function ExploreContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    let list = CLUBS.filter((c) => {
      const matchesQuery = (c.name + c.shortDescription).toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "all" || c.category === activeCategory;
      const matchesLevel = levelFilter === "all" || c.level === levelFilter;
      return matchesQuery && matchesCategory && matchesLevel;
    });
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "category") list = [...list].sort((a, b) => a.category.localeCompare(b.category));
    return list;
  }, [query, activeCategory, levelFilter, sortBy]);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px 80px" }}>
      <h1 style={{ fontFamily: fontDisplay, fontSize: 34, fontWeight: 600, color: COLORS.ink, margin: "0 0 6px" }}>
        Explore clubs
      </h1>
      <p style={{ fontFamily: fontBody, fontSize: 15, color: COLORS.inkSoft, margin: "0 0 26px" }}>
        {CLUBS.length} clubs and counting.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: COLORS.card,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 10,
            padding: "8px 12px",
            flex: "1 1 260px",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clubs..."
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontFamily: fontBody,
              fontSize: 14,
              background: "transparent",
              color: COLORS.ink,
            }}
          />
        </div>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          style={{
            fontFamily: fontBody,
            fontSize: 14,
            padding: "9px 12px",
            borderRadius: 10,
            border: `1px solid ${COLORS.line}`,
            background: COLORS.card,
            color: COLORS.ink,
          }}
        >
          <option value="all">All grade levels</option>
          <option value="ms">Middle School Only</option>
          <option value="hs">High School Only</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            fontFamily: fontBody,
            fontSize: 14,
            padding: "9px 12px",
            borderRadius: 10,
            border: `1px solid ${COLORS.line}`,
            background: COLORS.card,
            color: COLORS.ink,
          }}
        >
          <option value="name">Sort: A – Z</option>
          <option value="category">Sort: category</option>
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
        <button onClick={() => setActiveCategory("all")} style={chipStyle(activeCategory === "all")}>
          All clubs
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={chipStyle(activeCategory === cat.id, cat.color)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: COLORS.inkSoft, fontFamily: fontBody }}>
          No clubs match that search. Try a different term or category.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {filtered.map((c) => (
            <ClubCard key={c.slug} club={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function chipStyle(active, color) {
  return {
    fontFamily: fontBody,
    fontSize: 13.5,
    fontWeight: 500,
    cursor: "pointer",
    padding: "7px 14px",
    borderRadius: 999,
    border: `1px solid ${active ? color || COLORS.ink : COLORS.line}`,
    background: active ? (color ? color + "1A" : COLORS.ink) : COLORS.card,
    color: active ? color || "#fff" : COLORS.inkSoft,
  };
}

// Suspense is required here because useSearchParams needs it in Next.js —
// it just means "wait for the URL info to be ready before rendering."
export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}
