"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLORS, fontBody } from "@/lib/theme";
import { SCHOOL_SHORT_NAME } from "@/lib/schoolConfig";
import Logo from "./Logo";
import TicketButton from "./TicketButton";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore clubs" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: COLORS.bg + "F2",
        backdropFilter: "blur(6px)",
        borderBottom: `1px solid ${COLORS.line}`,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span
            style={{
              fontFamily: fontBody,
              fontSize: 14,
              fontWeight: 500,
              color: COLORS.inkSoft,
            }}
          >
            • {SCHOOL_SHORT_NAME}
          </span>
        </div>
        <nav className="marquee-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: fontBody,
                fontSize: 14.5,
                fontWeight: 500,
                textDecoration: "none",
                color: pathname === l.href ? COLORS.ink : COLORS.inkSoft,
                borderBottom: pathname === l.href ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                paddingBottom: 3,
              }}
            >
              {l.label}
            </Link>
          ))}
          <TicketButton primary small href="/explore">
            Explore all clubs
          </TicketButton>
        </nav>
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="marquee-mobile-toggle"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: COLORS.ink }}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>
      {mobileOpen && (
        <div
          className="marquee-mobile-menu"
          style={{ padding: "6px 20px 18px", display: "none", flexDirection: "column", gap: 14 }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ fontFamily: fontBody, fontSize: 16, fontWeight: 500, color: COLORS.ink, textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 720px) {
          .marquee-desktop-nav { display: none !important; }
          .marquee-mobile-toggle { display: block !important; }
          .marquee-mobile-menu { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
