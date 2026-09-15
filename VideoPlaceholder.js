import { COLORS, fontMono } from "@/lib/theme";

// Pulls the 11-character video ID out of any common YouTube URL shape:
// youtube.com/watch?v=ID, youtu.be/ID, or youtube.com/embed/ID
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// Pass a club's `videoUrl` (an unlisted YouTube link) and this embeds it.
// If there's no videoUrl yet, it falls back to a plain "video coming soon"
// placeholder instead of breaking or showing nothing.
export default function VideoPlaceholder({ compact, videoUrl }) {
  const videoId = getYouTubeId(videoUrl);

  if (videoId) {
    return (
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden",
          aspectRatio: "16 / 9",
          background: "#000",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Club intro video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ display: "block" }}
        />
      </div>
    );
  }

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
      <span style={{ fontFamily: fontMono, fontSize: compact ? 11 : 12.5 }}>
        ▶ Video coming soon
      </span>
    </div>
  );
}
