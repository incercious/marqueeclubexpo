"use client";

import { useState } from "react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/theme";
import { ADMIN_PASSWORD } from "@/lib/adminConfig";

// The simplest possible admin panel: a password box, two color pickers,
// a live preview, and a button that generates the updated lib/theme.js
// text for you to paste into GitHub -- same flow as any other site update.
//
// This does NOT push changes live by itself. The site has no database,
// so there's nowhere for a color choice to "live" except in the code
// itself. This page just makes editing that code easier than typing it
// by hand.
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [primary, setPrimary] = useState(COLORS.primary);
  const [secondary, setSecondary] = useState(COLORS.secondary);
  const [copied, setCopied] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password.");
    }
  };

  const generatedTheme = `// ============================================================
// One place for the site's colors and fonts. Change a value
// here and it updates everywhere it's used.
// ============================================================

export const COLORS = {
  bg: "${COLORS.bg}",
  card: "${COLORS.card}",
  ink: "${COLORS.ink}",
  inkSoft: "${COLORS.inkSoft}",
  line: "${COLORS.line}",
  primary: "${primary}",
  primaryDark: "${COLORS.primaryDark}",
  secondary: "${secondary}",
};

export const fontDisplay = "'Fraunces', Georgia, serif";
export const fontBody = "'Inter', system-ui, sans-serif";
export const fontMono = "'IBM Plex Mono', ui-monospace, monospace";
`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedTheme);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 340, margin: "100px auto", padding: "0 20px" }}>
        <h1
          style={{
            fontFamily: fontDisplay,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 28,
            color: COLORS.ink,
            marginBottom: 20,
          }}
        >
          Admin
        </h1>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              fontFamily: fontBody,
              fontSize: 15,
              padding: "10px 12px",
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 14,
              background: COLORS.ink,
              color: COLORS.bg,
              border: "none",
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
          {error && (
            <p style={{ fontFamily: fontMono, fontSize: 12.5, color: "#A3372B", margin: 0 }}>
              {error}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "60px auto", padding: "0 20px 60px" }}>
      <h1
        style={{
          fontFamily: fontDisplay,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 30,
          color: COLORS.ink,
          margin: "0 0 6px",
        }}
      >
        Site colors
      </h1>
      <p style={{ fontFamily: fontBody, fontSize: 14, lineHeight: 1.6, color: COLORS.inkSoft, margin: "0 0 28px" }}>
        Pick new colors, preview them below, then copy the updated file and paste it into{" "}
        <code style={{ fontFamily: fontMono, background: COLORS.line, padding: "1px 5px", borderRadius: 4 }}>
          lib/theme.js
        </code>{" "}
        on GitHub, same as any other update.
      </p>

      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontFamily: fontBody,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.ink,
          }}
        >
          Primary
          <input
            type="color"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
            style={{ width: 60, height: 36, border: "none", background: "none", cursor: "pointer" }}
          />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontFamily: fontBody,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.ink,
          }}
        >
          Secondary
          <input
            type="color"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
            style={{ width: 60, height: 36, border: "none", background: "none", cursor: "pointer" }}
          />
        </label>
      </div>

      <p style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, margin: "0 0 8px" }}>
        Preview
      </p>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 32,
          padding: 16,
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 10,
        }}
      >
        <span
          style={{
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 13,
            padding: "8px 16px",
            borderRadius: 8,
            background: primary,
            color: "#fff",
          }}
        >
          Join club
        </span>
        <span
          style={{
            fontFamily: fontMono,
            fontSize: 12,
            padding: "5px 12px",
            borderRadius: 999,
            background: secondary + "26",
            color: secondary,
          }}
        >
          Category badge
        </span>
      </div>

      <button
        onClick={handleCopy}
        style={{
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 14,
          background: COLORS.ink,
          color: COLORS.bg,
          border: "none",
          borderRadius: 8,
          padding: "10px 18px",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied ✓" : "Copy updated theme.js"}
      </button>
    </div>
  );
}
