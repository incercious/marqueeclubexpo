"use client";

import { useState } from "react";
import { COLORS, fontDisplay, fontBody, fontMono } from "@/lib/theme";
import { ADMIN_PASSWORD } from "@/lib/adminConfig";
import { SCHOOL_NAME, SCHOOL_SHORT_NAME, CONTACT_INSTAGRAM, CONTACT_EMAIL } from "@/lib/schoolConfig";

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
  const [bg, setBg] = useState(COLORS.bg);
  const [ink, setInk] = useState(COLORS.ink);
  const [headerTag, setHeaderTag] = useState(SCHOOL_SHORT_NAME);
  const [copied, setCopied] = useState(false);
  const [copiedSchool, setCopiedSchool] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null); // { type: "success" | "error", text }

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password.");
    }
  };

  const saveToGitHub = async (files) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, files }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveMessage({ type: "error", text: data.error || "Something went wrong." });
      } else {
        const failed = Object.entries(data.results || {}).filter(([, v]) => v.startsWith("error"));
        if (failed.length) {
          setSaveMessage({ type: "error", text: failed.map(([p, v]) => `${p}: ${v}`).join(" | ") });
        } else {
          setSaveMessage({
            type: "success",
            text: "Saved! Vercel will redeploy automatically -- check back in about a minute.",
          });
        }
      }
    } catch (err) {
      setSaveMessage({ type: "error", text: "Couldn't reach the server. Try the Copy button instead." });
    } finally {
      setSaving(false);
    }
  };

  const generatedTheme = `// ============================================================
// One place for the site's colors and fonts. Change a value
// here and it updates everywhere it's used.
// ============================================================

export const COLORS = {
  bg: "${bg}",
  card: "${COLORS.card}",
  ink: "${ink}",
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

  const generatedSchoolConfig = `// ============================================================
// The ONE file to edit when setting Marquee up for a school.
// Everything school-specific (name, short name) lives here so
// reusing this project for a different school later is just
// changing the two lines below -- nothing else in the codebase
// needs to know which school it's running for.
// ============================================================

export const SCHOOL_NAME = "${SCHOOL_NAME}";
export const SCHOOL_SHORT_NAME = "${headerTag}";

// Fill these in once you have them -- shown at the bottom of the About page.
export const CONTACT_INSTAGRAM = "${CONTACT_INSTAGRAM}";
export const CONTACT_EMAIL = "${CONTACT_EMAIL}";
`;

  const handleCopySchool = async () => {
    try {
      await navigator.clipboard.writeText(generatedSchoolConfig);
      setCopiedSchool(true);
      setTimeout(() => setCopiedSchool(false), 2500);
    } catch {
      setCopiedSchool(false);
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 24 }}>
        {[
          { label: "Primary", value: primary, set: setPrimary },
          { label: "Secondary", value: secondary, set: setSecondary },
          { label: "Background", value: bg, set: setBg },
          { label: "Text", value: ink, set: setInk },
        ].map((c) => (
          <label
            key={c.label}
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
            {c.label}
            <input
              type="color"
              value={c.value}
              onChange={(e) => c.set(e.target.value)}
              style={{ width: 60, height: 36, border: "none", background: "none", cursor: "pointer" }}
            />
          </label>
        ))}
      </div>

      <p style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, margin: "0 0 8px" }}>
        Preview
      </p>
      <div
        style={{
          marginBottom: 32,
          padding: 20,
          background: bg,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 10,
        }}
      >
        <p style={{ fontFamily: fontDisplay, fontStyle: "italic", fontWeight: 600, fontSize: 22, color: ink, margin: "0 0 14px" }}>
          Find your club.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
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
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button
          onClick={() => saveToGitHub({ "lib/theme.js": generatedTheme })}
          disabled={saving}
          style={{
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 14,
            background: primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            cursor: saving ? "default" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? "Saving…" : "Save & deploy"}
        </button>
        <button
          onClick={handleCopy}
          style={{
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 14,
            background: "transparent",
            color: COLORS.ink,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 8,
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied ✓" : "Copy updated theme.js instead"}
        </button>
      </div>
      {saveMessage && (
        <p
          style={{
            fontFamily: fontBody,
            fontSize: 13,
            color: saveMessage.type === "error" ? "#A3372B" : "#2E6B3E",
            margin: "10px 0 0",
          }}
        >
          {saveMessage.text}
        </p>
      )}

      <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${COLORS.line}` }}>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 22,
            color: COLORS.ink,
            margin: "0 0 6px",
          }}
        >
          Header text
        </h2>
        <p style={{ fontFamily: fontBody, fontSize: 14, lineHeight: 1.6, color: COLORS.inkSoft, margin: "0 0 20px" }}>
          The short label shown next to the logo in the top nav. Copy the updated file and paste it into{" "}
          <code style={{ fontFamily: fontMono, background: COLORS.line, padding: "1px 5px", borderRadius: 4 }}>
            lib/schoolConfig.js
          </code>
          .
        </p>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontFamily: fontBody,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.ink,
            maxWidth: 200,
            marginBottom: 20,
          }}
        >
          Label
          <input
            type="text"
            value={headerTag}
            onChange={(e) => setHeaderTag(e.target.value)}
            style={{
              fontFamily: fontBody,
              fontSize: 14,
              padding: "8px 10px",
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              outline: "none",
            }}
          />
        </label>

        <p style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, margin: "0 0 8px" }}>
          Preview
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
            padding: 16,
            background: COLORS.card,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 10,
          }}
        >
          <span
            style={{
              fontFamily: fontDisplay,
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 18,
              color: COLORS.ink,
            }}
          >
            marquee
          </span>
          <span style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 500, color: COLORS.inkSoft }}>
            • {headerTag}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => saveToGitHub({ "lib/schoolConfig.js": generatedSchoolConfig })}
            disabled={saving}
            style={{
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 14,
              background: primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 18px",
              cursor: saving ? "default" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving…" : "Save & deploy"}
          </button>
          <button
            onClick={handleCopySchool}
            style={{
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 14,
              background: "transparent",
              color: COLORS.ink,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            {copiedSchool ? "Copied ✓" : "Copy updated schoolConfig.js instead"}
          </button>
        </div>
        {saveMessage && (
          <p
            style={{
              fontFamily: fontBody,
              fontSize: 13,
              color: saveMessage.type === "error" ? "#A3372B" : "#2E6B3E",
              margin: "10px 0 0",
            }}
          >
            {saveMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}
