"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { loadVideoJS, cfHLS, cfPoster } from "@/lib/videojs";

const DESKTOP_ID = "b6f7a464b10049f3729662c390f50496";
const MOBILE_ID  = "2394ce871888898c2766a679cf4556a3";
const HERO_FALLBACK_IMAGE =
  "https://imagedelivery.net/jmgC06hj1Xh1brKwMMi-2Q/1fc2c2ec-bd4a-49d7-13fb-787a4f02a600/public";

const TAGS = [
  "Osmo Pocket 3",
  "DJI Mic 2",
  "Battery Handle",
  "Mini Tripod",
  "Carrying Bag",
  "Wide-Angle Lens",
];

export default function Hero({ price = "117" }: { price?: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [desktopReady, setDesktopReady] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef  = useRef<HTMLVideoElement>(null);
  const desktopPlayer = useRef<any>(null);
  const mobilePlayer  = useRef<any>(null);
  const desktopReadyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileReadyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const syncViewport = () => setIsMobile(media.matches);

    syncViewport();
    media.addEventListener("change", syncViewport);

    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useLayoutEffect(() => {
    if (fallbackRef.current?.complete) {
      setFallbackLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!fallbackLoaded) return;

    loadVideoJS().then(() => {
      const vjs = (window as any).videojs;
      if (!vjs) return;

      const opts = (src: string) => ({
        autoplay: "muted",
        muted: true,
        loop: true,
        controls: false,
        preload: "auto",
        fill: true,
        fluid: false,
        responsive: false,
        techOrder: ["html5"],
        sources: [{ src, type: "application/x-mpegURL" }],
      });
      const markReady = (
        player: any,
        timeoutRef: { current: ReturnType<typeof setTimeout> | null },
        setReady: (ready: boolean) => void,
      ) => {
        const showVideo = () => {
          if (timeoutRef.current) return;
          timeoutRef.current = setTimeout(() => {
            setReady(true);
            timeoutRef.current = null;
          }, 300);
        };

        player.one("playing", showVideo);
        player.one("loadeddata", showVideo);
      };

      if (desktopRef.current && !desktopPlayer.current) {
        desktopPlayer.current = vjs(desktopRef.current, opts(cfHLS(DESKTOP_ID)));
        markReady(desktopPlayer.current, desktopReadyTimeout, setDesktopReady);
      }

      if (mobileRef.current && !mobilePlayer.current) {
        mobilePlayer.current = vjs(mobileRef.current, opts(cfHLS(MOBILE_ID)));
        markReady(mobilePlayer.current, mobileReadyTimeout, setMobileReady);
      }
    });

    return () => {
      [desktopReadyTimeout, mobileReadyTimeout].forEach((timeout) => {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
      });
      [desktopPlayer, mobilePlayer].forEach((p) => {
        if (p.current) { try { p.current.dispose(); } catch (_) {} p.current = null; }
      });
    };
  }, [fallbackLoaded]);

  const fallbackVisible = isMobile ? !mobileReady : !desktopReady;

  return (
    <section
      className="hero-section"
      aria-label="Hero — DJI Osmo Pocket 3 Creator Combo"
      style={{
        position: "relative",
        width: "100%",
        height: "820px",
        maxHeight: "820px",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      <style>{`
        .hero-container { padding: 0 48px; }
        .desktop-video { display: block; }
        .mobile-video { display: none; }
        .content-wrapper { align-items: center; }
        .hero-overlay { display: block; }
        @media (max-width: 768px) {
          .hero-container { padding: 0 24px; padding-bottom: 80px; }
          .hero-section { height: 100svh !important; max-height: none !important; min-height: unset !important; }
          .desktop-video { display: none !important; }
          .mobile-video { display: block !important; }
          .content-wrapper { align-items: flex-end !important; }
          .hero-overlay {
            display: block !important;
            background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 25%, rgba(10,10,10,0.3) 50%, transparent 75%) !important;
          }
          .hero-cta-btn { width: 100% !important; }
          .mobile-video .hero-vjs .vjs-tech { object-position: center top !important; }
        }
      `}</style>
      {/* ── Vídeo background (Video.js + Cloudflare Stream HLS) ── */}
      <style>{`
        .hero-vjs.video-js { background: transparent !important; }
        .hero-vjs .vjs-tech { object-fit: cover !important; width: 100% !important; height: 100% !important; position: absolute !important; inset: 0 !important; }
        .hero-vjs .vjs-control-bar, .hero-vjs .vjs-big-play-button, .hero-vjs .vjs-loading-spinner, .hero-vjs .vjs-error-display { display: none !important; }
        .hero-fallback-image {
          transition: opacity 0.35s ease;
          object-position: center 72%;
          transform: scale(1);
          transform-origin: center center;
        }
        @media (max-width: 768px) {
          .hero-fallback-image {
            object-fit: cover !important;
            object-position: 50% 0%;
            transform: scale(1);
            transform-origin: 50% 0%;
            background: #0a0a0a;
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
      >
        {/* Real img element keeps an immediate LCP candidate before Video.js hydrates. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={fallbackRef}
          className="hero-fallback-image"
          src={HERO_FALLBACK_IMAGE}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onLoad={() => setFallbackLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 0%",
            opacity: fallbackVisible ? 1 : 0,
            zIndex: 1,
            transform: "scale(1)",
            transformOrigin: "center center",
            background: "#0a0a0a",
          }}
        />

        {/* Desktop */}
        <div
          className="desktop-video"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "max(100%, calc(820px * 2.36))",
            height: "max(100%, calc(100vw / 2.36))",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <video ref={desktopRef} className="hero-vjs video-js" playsInline
            poster={cfPoster(DESKTOP_ID)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>

        {/* Mobile */}
        <div
          className="mobile-video"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "max(105vw, calc(100vh * 0.5625))",
            height: "max(100vh, calc(105vw * 1.7777))",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <video ref={mobileRef} className="hero-vjs video-js" playsInline
            poster={cfPoster(MOBILE_ID)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>
      </div>

      {/* ── Overlay escurecimento esquerdo para legibilidade ── */}
      <div
        className="hero-overlay"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(95deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.50) 42%, transparent 68%)",
        }}
      />

      {/* ── Conteúdo — grid 1280px ── */}
      <div
        className="content-wrapper"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          width: "100%",
        }}
      >
        <div
          className="hero-container"
          style={{
            maxWidth: "1280px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Coluna de conteúdo (lado esquerdo) */}
          <div
            style={{
              maxWidth: "500px",
              display: "flex",
              flexDirection: "column",
              opacity: 1,
              transform: "translateY(0)",
            }}
          >
            {/* Logo */}
            <div style={{ marginBottom: "32px" }}>
              <DJILogo />
            </div>

            {/* Títulos */}
            <div style={{ marginBottom: "20px" }}>
              <h1
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: "clamp(36px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.022em",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Creator Combo
              </h1>
              <h2
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: "clamp(36px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.022em",
                  margin: 0,
                  background:
                    "linear-gradient(135deg, #FFD092 0%, #E05D26 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Osmo Pocket 3
              </h2>
            </div>

            {/* Descrição */}
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 700,
                fontSize: "clamp(11px, 3.3vw, 16px)",
                lineHeight: 1.4,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                margin: "0 0 24px 0",
                maxWidth: "100%",
                whiteSpace: "nowrap",
                color: "#ffffff",
              }}
            >
              With the DJI Pocket 3 Creator Combo
            </p>

            {/* Tags e Botão foram alterados */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "28px",
              }}
            >
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.65)",
                    padding: "7px 14px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Botão CTA Centralizado */}
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "8px" }}>
              <button
                className="hero-cta-btn"
                style={{
                  fontFamily:
                    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#ffffff",
                  background: "#E05D26",
                  border: "none",
                  borderRadius: "999px",
                  padding: "14px 32px",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1)";
                }}
                onClick={() => {
                  const el = document.getElementById("buy-action-btn") || document.getElementById("comprar");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "end" });
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── DJI SVG Logo ── */
function DJILogo() {
  return (
    <svg
      width="77"
      height="46"
      viewBox="0 0 77 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DJI"
      role="img"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.2109 0.417008C36.1369 0.646299 35.8682 1.6135 35.6138 2.5662C35.3594 3.51891 34.923 5.1496 34.6439 6.18994C34.365 7.23041 33.9089 8.93373 33.6305 9.97509C33.3522 11.0166 32.92 12.6193 32.6702 13.5367C32.4205 14.4541 32.1938 15.2914 32.1665 15.3972C31.551 17.7864 30.6205 21.1761 30.1061 22.9034C29.8749 23.6797 29.6116 24.6035 29.521 24.9563C29.2836 25.8809 28.8172 26.7552 28.4048 27.049C27.6415 27.5926 27.1696 27.6315 21.2492 27.6387C15.065 27.6462 14.7971 27.6188 14.4466 26.9408C14.3419 26.7384 14.2563 26.4382 14.2563 26.2736C14.2563 25.9579 14.9952 22.8429 15.4058 21.4278C15.5389 20.9691 15.8309 19.9298 16.0548 19.1182C16.6735 16.875 16.8905 16.2973 17.2494 15.9384C17.5426 15.6453 17.722 15.5988 18.9005 15.5105C19.6278 15.4561 22.2436 15.4081 24.7136 15.4038L29.2044 15.3959L29.4925 14.4022C30.0483 12.4839 30.8083 9.60043 30.8083 9.40925C30.8083 9.23847 29.6982 9.22307 21.2171 9.27606C11.0505 9.3397 10.2265 9.3841 8.48362 9.96393C6.22497 10.7153 4.83397 12.0807 3.8633 14.4991C3.70753 14.8872 3.52956 15.3202 3.46797 15.4614C3.217 16.0354 2.25608 19.2387 1.81277 20.9787C1.6869 21.4727 1.37677 22.6564 1.12362 23.6091C-0.394934 29.3234 -0.379152 31.145 1.20073 32.5358C2.05412 33.2869 3.10588 33.5815 5.50939 33.7423C8.15656 33.9195 28.5938 33.9127 31.8125 33.7335C35.2489 33.5423 37.2814 33.0165 38.423 32.0235C38.6238 31.8488 38.8312 31.6884 38.8838 31.6671C39.1028 31.5786 39.9802 30.2944 40.269 29.6397C40.4403 29.2515 40.632 28.8185 40.6951 28.6773C41.3287 27.261 42.9136 21.8266 45.3542 12.7027C45.6657 11.5383 46.0475 10.1237 46.2027 9.55911C46.6202 8.04018 46.9367 6.86742 47.6223 4.29839C47.9615 3.02812 48.3577 1.55576 48.5031 1.02648C48.6484 0.497202 48.7683 0.0496561 48.7696 0.0320776C48.7707 0.0144991 45.9759 0 42.5587 0H36.3455L36.2109 0.417008ZM48.7891 10.8743C48.5704 11.774 48.1917 13.2609 47.9472 14.1783C47.0544 17.5305 46.5802 19.3151 46.5322 19.5032C45.4891 23.5965 44.0737 28.1565 43.3264 29.8321C43.1691 30.185 42.9297 30.7478 42.7945 31.0826C42.6593 31.4177 42.5055 31.6919 42.4525 31.6921C42.3995 31.6924 42.3562 31.7573 42.3562 31.8362C42.3562 32.1684 41.3638 33.5742 40.6016 34.3214C38.669 36.2163 36.6241 36.689 29.3328 36.9258L26.5099 37.0175L26.2108 38.1081C26.0462 38.708 25.7199 39.9205 25.4856 40.8027C24.7721 43.4886 24.3932 44.8297 24.2582 45.1466L24.1295 45.4486L32.1202 45.3847C42.0465 45.3053 43.593 45.1652 46.3978 44.0912C47.9928 43.4804 49.2497 42.7015 50.3997 41.6113C51.2825 40.7744 52.3268 39.4327 52.8494 38.4639C53.0414 38.1081 53.2828 37.666 53.3858 37.4815C54.329 35.7912 55.5447 32.2799 56.7227 27.8433C56.9944 26.82 57.3447 25.5209 57.5011 24.9563C57.6575 24.3918 57.8614 23.6123 57.9541 23.2242C58.0469 22.836 58.3587 21.6524 58.6472 20.5938C58.9355 19.5352 59.1937 18.5825 59.2211 18.4767C59.9161 15.7855 60.2364 14.5731 60.3902 14.05C60.7992 12.6606 61.6028 9.59234 61.6028 9.42028C61.6028 9.26567 60.6687 9.23834 55.3947 9.23834H49.1867L48.7891 10.8743ZM64.3666 10.1686C64.2483 10.6803 64.0964 11.2345 64.0289 11.4001C63.9615 11.5659 63.6183 12.8073 63.2661 14.1588C62.914 15.5104 62.4796 17.1358 62.3012 17.771C62.1226 18.4061 61.6854 20.0228 61.3297 21.3637C60.9741 22.7045 60.518 24.4078 60.3166 25.1488C60.115 25.8898 59.7134 27.391 59.4241 28.4849C59.1349 29.5787 58.7843 30.8426 58.6452 31.2935C58.4252 32.0069 58.0101 33.6564 58.0101 33.8177C58.0101 33.8486 60.8066 33.8739 64.2245 33.8739C70.0316 33.8739 70.4434 33.8591 70.5066 33.6494C70.5438 33.5259 70.8324 32.4432 71.1478 31.2435C71.4633 30.0438 71.9524 28.225 72.2347 27.2018C72.517 26.1785 72.9825 24.4463 73.2691 23.3525C73.5556 22.2586 73.9973 20.613 74.2503 19.6956C74.5033 18.7782 74.8806 17.3636 75.0886 16.552C75.2964 15.7405 75.5756 14.73 75.7088 14.3066C76 13.3815 77 9.55847 77 9.37101C77 9.28145 74.9799 9.23834 70.7908 9.23834H64.5815L64.3666 10.1686Z"
        fill="url(#dji-logo-gradient)"
      />
      <defs>
        <linearGradient
          id="dji-logo-gradient"
          x1="38.5"
          y1="0"
          x2="59.5"
          y2="39.2243"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#FFDCC9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
