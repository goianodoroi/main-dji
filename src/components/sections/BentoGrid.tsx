"use client";

import { useEffect, useRef, useState } from "react";

import { loadVideoJS, cfHLS, cfPoster } from "@/lib/videojs";
import { useReveal } from "@/lib/useReveal";

const CARDS = [
  {
    id: "01",
    videoId: "d8a9449a1cfffe095c3b98fd5d7d951e",
    tag: "4K / 120fps",
    title: "Be a\nSlow-Mo-Pro",
    body: "Shoot in 4K/120fps to capture experiences in dynamic and incredibly smooth detail — magnify every moment in slow motion.",
    area: "c1",
    gradient: false,
  },
  {
    id: "02",
    videoId: "b7113550d29371aa5a0696dc6621cf63",
    tag: "Night Mode",
    title: "Stunning\nnight shots",
    body: "Through specialized image quality optimization, Pocket 3's night shots bring low-light scenes to life with clarity and authentic colors.",
    area: "c2",
    gradient: false,
  },
  {
    id: "03",
    videoId: "e973dd41215bd027976bb8d9c80049ee",
    tag: "3-Axis Gimbal",
    title: "Ready to\nsteady",
    body: "Three-axis mechanical stabilization keeps the camera steady even in dynamic movements.",
    area: "c3",
    gradient: false,
  },
  {
    id: "04",
    videoId: "f0b0eeabf3045c52fbe1107b0c91e821",
    tag: "ActiveTrack 6.0",
    title: "Be the Star",
    body: "Face Auto-Detect and Dynamic Framing for smooth and cinematic footage with one hand.",
    area: "c4",
    gradient: false,
  },
  {
    id: "05",
    videoId: "fe25b45386cf971c71424229c6268d65",
    tag: "Creative Modes",
    title: "Endless Possibilities",
    body: "SpinShot, Motionlapse, digital zoom, Panorama, and much more — all just a few taps away.",
    area: "c5",
    gradient: false,
  },
  {
    id: "06",
    videoUrl: "https://www.djiusa.com/cdn/shop/videos/c/vp/92e174fd528248a0b7aa002d9d1d411e/92e174fd528248a0b7aa002d9d1d411e.HD-1080p-4.8Mbps-58384209.mp4?v=0",
    tag: "Osmo 360",
    title: "1-Inch 360°\nImaging",
    body: "Specially designed for 360° capture, the all-new square HDR image sensor maintains the same 360° image field as a traditional 1-inch sensor.",
    area: "c1",
    gradient: true,
  },
  {
    id: "07",
    videoUrl: "https://www.djiusa.com/cdn/shop/videos/c/vp/c7a8da94dd7d4e09944a9dcd8008a98c/c7a8da94dd7d4e09944a9dcd8008a98c.HD-720p-3.0Mbps-58384204.mp4?v=0",
    tag: "Low-Light",
    title: "Native 8K &\nSuperb Low-Light",
    body: "DJI's first camera to offer native 8K 360° video. 13.5 stops of dynamic range, capturing sharp, vibrant footage—even in high-contrast scenes.",
    area: "c2",
    gradient: false,
  },
  {
    id: "08",
    videoUrl: "https://www.djiusa.com/cdn/shop/videos/c/vp/fd5b830570304945a90b2257a709b541/fd5b830570304945a90b2257a709b541.HD-720p-3.0Mbps-58384205.mp4?v=0",
    tag: "Boost Video",
    title: "4K/120fps &\n170° Boost Video",
    body: "In single-lens mode, switch to Boost Video mode for a 170° field of view and buttery-smooth 4K/120fps footage.",
    area: "c3",
    gradient: false,
  },
] as const;


/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
export default function BentoGrid() {
  const { ref: headRef, visible: headVisible } = useReveal(0.3);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userInteracting, setUserInteracting] = useState(false);

  useEffect(() => {
    if (userInteracting) return;

    let animationFrameId: number;
    let ticking = false;
    const speed = 1;

    const animate = () => {
      if (!ticking) return;
      const el = scrollRef.current;
      if (el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!ticking) {
          ticking = true;
          animationFrameId = requestAnimationFrame(animate);
        }
      } else {
        ticking = false;
        cancelAnimationFrame(animationFrameId);
      }
    }, { rootMargin: "50% 0px" });

    if (scrollRef.current) observer.observe(scrollRef.current);

    return () => {
      ticking = false;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [userInteracting]);

  return (
    <section
      id="features"
      className="bento-section"
      style={{ background: "#080808" }}
    >
      <style>{`
        .bento-section { padding: 8px 0 112px; overflow: hidden; }
        .bento-container { padding: 0; }
        .bento-grid {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding: 0 48px;
        }
        .bento-grid::-webkit-scrollbar { display: none; }
        .bento-card { flex: 0 0 calc(33.333% - 14px); height: 500px; }

        /* ── Video.js background-video overrides ── */
        .bento-card .video-js {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: transparent !important;
        }
        .bento-card .video-js .vjs-tech {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          inset: 0 !important;
        }
        .bento-card .vjs-control-bar,
        .bento-card .vjs-big-play-button,
        .bento-card .vjs-loading-spinner,
        .bento-card .vjs-error-display { display: none !important; }

        @media (max-width: 900px) {
          .bento-section { padding: 0 0 80px; }
          .bento-grid { padding: 0 24px; gap: 16px; }
          .bento-card { flex: 0 0 85%; height: 420px; }
        }
        @media (max-width: 600px) {
          .bento-card { flex: 0 0 90%; }
        }
      `}</style>

      {/* Section label */}
      <div
        ref={headRef}
        className="bento-container"
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
          Features
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
          Technology you{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FFD092 0%, #E05D26 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            can feel.
          </span>
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="bento-container bento-grid"
        onMouseEnter={() => setUserInteracting(true)}
        onMouseLeave={() => setUserInteracting(false)}
        onTouchStart={() => setUserInteracting(true)}
        onTouchEnd={() => setTimeout(() => setUserInteracting(false), 2000)}
        style={{ width: "100%", margin: "0 auto" }}
      >
        {CARDS.map((card, i) => (
          <BentoCard key={card.id} card={card as any} delay={i * 80} />
        ))}
        {/* Duplicate for infinite loop — static posters only, no Video.js */}
        {CARDS.map((card, i) => (
          <BentoCard key={card.id + "-dup"} card={card as any} delay={i * 80} isDuplicate />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CARD
───────────────────────────────────────── */
function BentoCard({
  card,
  delay,
  isDuplicate = false,
}: {
  card: {
    id: string;
    videoId?: string;
    videoUrl?: string;
    tag: string;
    title: string;
    body: string;
    area: string;
    gradient: boolean;
  };
  delay: number;
  isDuplicate?: boolean;
}) {
  const { ref, visible } = useReveal(0.08);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (isDuplicate) return;
    if (!card.videoId) return; // Skip videojs for direct URLs
    
    const videoEl = videoRef.current;
    if (!videoEl) return;

    loadVideoJS().then(() => {
      if (!videoRef.current || playerRef.current) return;
      const vjs = (window as any).videojs;
      if (!vjs) return;

      const player = vjs(videoEl, {
        autoplay: "muted",
        muted: true,
        loop: true,
        controls: false,
        preload: "none",
        fill: true,
        fluid: false,
        responsive: false,
        techOrder: ["html5"],
        sources: [
          { src: cfHLS(card.videoId), type: "application/x-mpegURL" },
        ],
      });

      playerRef.current = player;
    });

    return () => {
      if (playerRef.current) {
        try { playerRef.current.dispose(); } catch (_) {}
        playerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.videoId, isDuplicate]);

  // Pause/play on visibility
  useEffect(() => {
    if (isDuplicate) return;
    if (card.videoUrl) {
      if (videoRef.current) {
         if (visible) videoRef.current.play().catch(() => {});
      }
      return;
    }
    
    const player = playerRef.current;
    if (!player) return;
    if (visible) player.play().catch(() => {});
  }, [visible, isDuplicate, card.videoUrl]);

  return (
    <div
      ref={ref}
      className="bento-card"
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
        flexShrink: 0,
      }}
    >
      {/* Video.js player / native player / static poster for duplicates */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
        }}
      >
        {isDuplicate ? (
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: card.videoId ? `url(${cfPoster(card.videoId)})` : "none",
            backgroundColor: "#000",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            {card.videoUrl && (
              <video
                src={card.videoUrl}
                muted
                loop
                playsInline
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover"}}
              />
            )}
          </div>
        ) : (
          card.videoUrl ? (
            <video
              ref={videoRef}
              src={card.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover"}}
            />
          ) : (
            <video
              ref={videoRef}
              className="video-js"
              playsInline
            />
          )
        )}
      </div>

      {/* Mask gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: card.area === "c5"
            ? "linear-gradient(to right, rgba(8,8,8,0.80) 0%, rgba(8,8,8,0.40) 40%, transparent 70%)"
            : card.area === "c2"
            ? "linear-gradient(160deg, rgba(8,8,8,0.30) 0%, rgba(8,8,8,0.85) 100%)"
            : "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.45) 45%, rgba(8,8,8,0.10) 100%)",
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
          padding: card.area === "c5" ? "32px 40px" : "28px 28px",
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

