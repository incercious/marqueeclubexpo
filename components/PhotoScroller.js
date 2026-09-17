"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { COLORS, fontMono } from "@/lib/theme";

// One arrow button, with a small shadow-pulse effect that plays each time
// it's clicked (grows outward and fades away) -- purely a visual touch,
// doesn't affect the actual navigation logic.
function ArrowButton({ onClick, side, ariaLabel, children }) {
  const [pulses, setPulses] = useState([]);

  const handleClick = () => {
    const id = Date.now() + Math.random();
    setPulses((p) => [...p, id]);
    onClick();
    setTimeout(() => {
      setPulses((p) => p.filter((pid) => pid !== id));
    }, 650);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      style={{
        position: "absolute",
        [side]: 10,
        top: "50%",
        transform: "translateY(-50%)",
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: "none",
        background: "rgba(28, 38, 36, 0.55)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {children}
      {pulses.map((id) => (
        <span key={id} className="click-pulse" />
      ))}
    </button>
  );
}

// A simple photo carousel: one photo at a time, arrows to move between
// them, dots to show position. Pass an array of image paths (usually
// files sitting in /public/images/clubs/<slug>/) -- if a club has no
// photos yet, this shows a plain "coming soon" placeholder instead of
// breaking or showing nothing, same pattern as the video section.
export default function PhotoScroller({ photos = [] }) {
  const [index, setIndex] = useState(0);

  if (!photos.length) {
    return (
      <div
        style={{
          background: "#EDE9DC",
          border: `1px dashed ${COLORS.line}`,
          borderRadius: 10,
          aspectRatio: "16 / 9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          color: COLORS.inkSoft,
        }}
      >
        <ImageIcon size={22} strokeWidth={1.5} />
        <span style={{ fontFamily: fontMono, fontSize: 12.5 }}>Photos coming soon</span>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img
          src={photos[index]}
          alt={`Photo ${index + 1} of ${photos.length}`}
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            display: "block",
            borderRadius: 10,
          }}
        />
        {photos.length > 1 && (
          <>
            <ArrowButton onClick={prev} side="left" ariaLabel="Previous photo">
              <ChevronLeft size={18} />
            </ArrowButton>
            <ArrowButton onClick={next} side="right" ariaLabel="Next photo">
              <ChevronRight size={18} />
            </ArrowButton>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === index ? COLORS.primary : COLORS.line,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

