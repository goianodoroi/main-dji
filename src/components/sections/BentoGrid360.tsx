"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";

const CARDS = [
  {
    id: "01",
    videoUrl: "https://www.djiusa.com/cdn/shop/videos/c/vp/92e174fd528248a0b7aa002d9d1d411e/92e174fd528248a0b7aa002d9d1d411e.HD-1080p-4.8Mbps-58384209.mp4?v=0",
    tag: "Native 8K 360°",
    title: "Limitless\nperspectives",
    body: "Specially designed for 360° capture with a massive 1-inch sensor, capturing the uncapturable.",
    gradient: true,
  },
  {
    id: "02",
    videoUrl: "https://www.djiusa.com/cdn/shop/videos/c/vp/c7a8da94dd7d4e09944a9dcd8008a98c/c7a8da94dd7d4e09944a9dcd8008a98c.HD-720p-3.0Mbps-58384204.mp4?v=0",
    tag: "Superb Low-Light",
    title: "Nighttime\nbrilliance",
    body: "13.5 stops of dynamic range for sharp, vibrant footage even in high-contrast city nights.",
    gradient: false,
  },
  {
    id: "03",
    videoUrl: "https://www.djiusa.com/cdn/shop/videos/c/vp/fd5b830570304945a90b2257a709b541/fd5b830570304945a90b2257a709b541.HD-720p-3.0Mbps-58384205.mp4?v=0",
    tag: "4K/120fps Boost",
    title: "Action\nready",
    body: "Switch to single-lens Boost Video mode for an ultra-wide 170° field of view and buttery-smooth motion.",
    gradient: false,
  },
] as const;

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
export default function BentoGrid360() {
  const { ref: headRef, visible: headVisible } = useReveal(0.3);

  return (
    <section
      id="features-360"
      className="bento-section-360"
      style={{ background: "#080808" }}
    >
      <style>{`
        .bento-section-360 { padding: 40px 0 112px; overflow: hidden; }
        .bento-container-360 { padding: 0; }
        .bento-grid-360 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .bento-card-360 { height: 500px; }

        @media (max-width: 900px) {
          .bento-section-360 { padding: 20px 0 80px; }
          .bento-grid-360 { 
            grid-template-columns: 1fr; 
            padding: 0 24px; 
            gap: 16px; 
          }
          .bento-card-360 { height: 420px; }
        }
      `}</style>

      {/* Section label */}
      <div
        ref={headRef}
        className="bento-container-360"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          marginBottom: "48px",
          padding: "0 48px",
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#E05D26",
            display: "block",
            marginBottom: "12px",
          }}
        >
          Explore the Osmo 360
        </span>
        <h2
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "clamp(28px, 3.2vw, 44px)",
            letterSpacing: "-0.022em",
            lineHeight: 1.08,
            color: "#f5f5f5",
            margin: "0 auto",
          }}
        >
          Capture every angle,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FFD092 0%, #E05D26 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            every time.
          </span>
        </h2>
      </div>

      <div className="bento-grid-360">
        {CARDS.map((card, i) => (
          <BentoCard360 key={card.id} card={card} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CARD
───────────────────────────────────────── */
function BentoCard360({
  card,
  delay,
}: {
  card: (typeof CARDS)[number];
  delay: number;
}) {
  const { ref, visible } = useReveal(0.08);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      ref={ref}
      className="bento-card-360"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "default",
        background: "#111",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.98)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
        }}
      >
        <video
          ref={videoRef}
          src={card.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background: "transparent",
          }}
        />
      </div>

      {/* Mask gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.45) 45%, rgba(8,8,8,0.10) 100%)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Hover tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.12)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "28px 28px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              padding: "3px 8px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
            }}
          >
            {card.tag}
          </span>
        </div>

        <h3
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "clamp(20px, 2vw, 26px)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 8px 0",
            whiteSpace: "pre-line",
            ...(card.gradient
              ? {
                  background: "linear-gradient(135deg, #FFD092 0%, #E05D26 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }
              : { color: "#ffffff" }),
          }}
        >
          {card.title}
        </h3>

        {card.body && (
          <p
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.50)",
              margin: 0,
              maxWidth: "280px",
              opacity: hovered ? 1 : 0.75,
              transform: hovered ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {card.body}
          </p>
        )}
      </div>

      {/* Border glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "20px",
          border: hovered
            ? "1px solid rgba(255,208,146,0.22)"
            : "1px solid rgba(255,255,255,0.06)",
          transition: "border-color 0.4s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
