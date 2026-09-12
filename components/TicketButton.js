"use client";

import Link from "next/link";
import { COLORS, fontBody } from "@/lib/theme";

// A button that can either navigate to a page (pass href) or run
// custom code on click (pass onClick). "primary" gives it the
// solid orange fill; otherwise it's an outlined button.
export default function TicketButton({ children, primary, onClick, href, external, small }) {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    fontFamily: fontBody,
    fontWeight: 600,
    fontSize: small ? 14 : 15.5,
    padding: small ? "9px 16px" : "12px 22px",
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    background: primary ? COLORS.primary : "transparent",
    color: primary ? "#2B1A05" : COLORS.ink,
    boxShadow: primary ? "none" : `inset 0 0 0 1.5px ${COLORS.line}`,
  };

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" style={style}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
}
