"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Data ─── */
const IMAGES = [
  "https://se-cdn.djiits.com/tpc/uploads/carousel/image/8f026266bc7f7a9fe1f2f79591874606@ultra.jpg",
  "https://se-cdn.djiits.com/tpc/uploads/carousel/image/48272e295eebee2fc16ff15a663594df@ultra.jpg?format=webp",
  "https://se-cdn.djiits.com/tpc/uploads/carousel/image/8e1522eae916ca88631f0d48a88a2c7a@ultra.jpg?format=webp",
  "https://se-cdn.djiits.com/tpc/uploads/carousel/image/9c1660fba056e372229e96508bd5c0cb@ultra.jpg",
  "https://se-cdn.djiits.com/tpc/uploads/carousel/image/4ec1d29d6bb8865db38782caceb3b813@ultra.jpg",
  "https://se-cdn.djiits.com/tpc/uploads/scenario/image/730aa5b63c118addb2c6bb64499de425@ultra.jpg",
  "https://se-cdn.djiits.com/tpc/uploads/scenario/image/95cf42b01627e76e14e5ce274ca6f631@ultra.jpg",
];

const SPECS = [
  { label: "Sensor",        value: "1-inch CMOS" },
  { label: "Video",         value: "4K / 120 fps · 130 Mbps" },
  { label: "Stabilization", value: "3-axis mechanical" },
  { label: "Tracking",      value: "ActiveTrack 6.0" },
  { label: "Audio",         value: "DJI Mic 2 included" },
  { label: "Battery",       value: "Up to 166 min (Battery Handle)" },
  { label: "Screen",        value: "2″ touch · 700 nits" },
  { label: "Weight",        value: "179 g" },
];

const INCLUDES = [
  "Osmo Pocket 3", "DJI Mic 2", "Battery Handle",
  "Mini Tripod", "Carrying Bag", "Wide-Angle Lens",
];

/* ─── Linear interpolation ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

/* ─── Theme tokens computed from scroll progress (0=dark, 1=white) ─── */
function theme(p: number) {
  const v  = Math.round(lerp(8,   255, p));
  const sv = Math.round(lerp(15,  248, p));
  const ease = "cubic-bezier(0.4,0,0.2,1)";
  const tr   = `background 0s, color 0s, border-color 0s`; // JS drives it
  return {
    bg:       `rgb(${v},${v},${v})`,
    surface:  `rgb(${sv},${sv},${sv})`,
    border:   `rgba(${p > 0.5 ? "0,0,0" : "255,255,255"},${lerp(0.10, 0.09, p).toFixed(2)})`,
    text1:    `rgba(${p > 0.5 ? "10,10,10" : "245,245,245"},1)`,
    text2:    `rgba(${p > 0.5 ? "10,10,10" : "255,255,255"},${lerp(0.55, 0.50, p).toFixed(2)})`,
    text3:    `rgba(${p > 0.5 ? "10,10,10" : "255,255,255"},${lerp(0.32, 0.38, p).toFixed(2)})`,
    orange:   "#E05D26",
    orangeHi: "#FFD092",
    ease,
  };
}

export default function ProductBuy({ price = "117", checkoutLink = "#" }: { price?: string; checkoutLink?: string }) {
  const [active, setActive]     = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef  = useRef<HTMLElement>(null);
  const rafRef      = useRef<number>(0);

  /* ── Scroll-driven progress via rAF (Optimized with IntersectionObserver) ── */
  useEffect(() => {
    let ticking = false;
    const tick = () => {
      if (!ticking) return;
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh   = window.innerHeight;
        const startOffset = vh * 0.75;
        const endOffset = vh * 0.25;
        const raw = (startOffset - rect.top) / (startOffset - endOffset);
        setProgress(Math.max(0, Math.min(1, raw)));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!ticking) {
          ticking = true;
          rafRef.current = requestAnimationFrame(tick);
        }
      } else {
        ticking = false;
        cancelAnimationFrame(rafRef.current);
      }
    }, { rootMargin: "20% 0px" });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      ticking = false;
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  /* ── Carousel auto-advance (Optimized) ── */
  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!id) id = setInterval(() => setActive(i => (i + 1) % IMAGES.length), 3800);
      } else {
        if (id) { clearInterval(id); id = null; }
      }
    }, { threshold: 0 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (id) clearInterval(id);
      observer.disconnect();
    };
  }, []);

  const T = theme(progress);

  return (
    <section
      ref={sectionRef}
      id="comprar"
      className="product-buy-section"
      style={{ background: T.bg }}
    >
      <style>{`
        .product-buy-section { padding: 120px 0; }
        .product-buy-container { padding: 0 32px; max-width: 1120px; margin: 0 auto; }
        .product-buy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .product-image-container { position: sticky; top: 48px; }
        @media (max-width: 900px) {
          .product-buy-section { padding: 64px 0; }
          .product-buy-container { padding: 0 24px; }
          .product-buy-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .product-image-container { position: relative; top: auto; }
        }
      `}</style>
      <div className="product-buy-container">



        {/* ── Main grid ── */}
        <div className="product-buy-grid">

          {/* ══ Imagens ══ */}
          <div className="product-image-container">
            {/* Main image */}
            <div style={{
              position: "relative", width: "100%", aspectRatio: "1/1",
              borderRadius: "16px", overflow: "hidden",
              background: T.surface,
              border: `1px solid ${T.border}`,
              marginBottom: "12px",
            }}>
              {IMAGES.map((src, i) => (
                <div key={src} style={{
                  position: "absolute", inset: 0,
                  opacity:   active === i ? 1 : 0,
                  transform: active === i ? "scale(1)" : "scale(1.03)",
                  transition: "opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)",
                }}>
                  <Image
                    src={src}
                    alt={`Osmo Pocket 3 — vista ${i + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                  />
                </div>
              ))}

              {/* Dot progress */}
              <div style={{
                position: "absolute", bottom: "16px", left: "50%",
                transform: "translateX(-50%)",
                display: "flex", gap: "6px", zIndex: 2,
              }}>
                {IMAGES.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    aria-label={`Imagem ${i + 1}`}
                    style={{
                      width: active === i ? "20px" : "6px", height: "6px",
                      borderRadius: "999px", border: "none", padding: 0, cursor: "pointer",
                      background: active === i
                        ? `linear-gradient(90deg,${T.orangeHi},${T.orange})`
                        : `rgba(${progress > 0.5 ? "0,0,0" : "255,255,255"},0.25)`,
                      transition: "width 280ms cubic-bezier(0.16,1,0.3,1), background 280ms ease",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {IMAGES.map((src, i) => (
                <button key={src} onClick={() => setActive(i)}
                  aria-label={`Thumbnail ${i + 1}`}
                  style={{
                    width: "54px", height: "54px", borderRadius: "10px",
                    overflow: "hidden", padding: 0, cursor: "pointer", flexShrink: 0,
                    border: active === i ? `1.5px solid ${T.orange}` : `1.5px solid ${T.border}`,
                    opacity: active === i ? 1 : 0.45,
                    background: T.surface,
                    transition: "border-color 200ms ease, opacity 200ms ease",
                  }}>
                  <Image src={src} alt={`Vista ${i + 1}`} width={54} height={54} loading="lazy" style={{ objectFit: "cover", display: "block", width: "100%", height: "100%" }} />
                </button>
              ))}
            </div>
          </div>

          {/* ══ Info ══ */}
          <div id="buy-info-target" style={{ display: "flex", flexDirection: "column" }}>

            {/* Nome */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontSize: "clamp(24px, 2.6vw, 34px)",
                letterSpacing: "-0.022em", lineHeight: 1.1,
                color: T.text1, margin: "0 0 8px 0",
              }}>
                Osmo Pocket 3<br />Creator Combo
              </h3>
              <p style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 400, fontSize: "14px", lineHeight: 1.65,
                color: T.text2, margin: 0, maxWidth: "380px",
              }}>
                1-inch sensor, 4K/120fps, 3-axis mechanical stabilization,
                and DJI Mic 2 included — the most complete camera that fits in your pocket.
              </p>
            </div>

            <Divider color={T.border} />

            {/* Preço */}
            <div style={{ padding: "24px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div>
                  <span style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 400, fontSize: "13px",
                    color: T.text3, textDecoration: "line-through",
                    display: "block", marginBottom: "4px",
                  }}>
                    USD $629
                  </span>
                  <span style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 500, fontSize: "42px",
                    letterSpacing: "-0.03em", lineHeight: 1, color: T.text1,
                  }}>
                    USD ${" "}
                    <span style={{
                      color: T.text1,
                    }}>
                      {price}
                    </span>
                  </span>
                </div>

                <span style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 500, fontSize: "12px",
                  color: T.orangeHi,
                  padding: "4px 10px", borderRadius: "999px",
                  border: "1px solid rgba(255,208,146,0.22)",
                  background: "rgba(255,208,146,0.07)",
                }}>
                  −81%
                </span>
              </div>

              <p style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 400, fontSize: "12px",
                color: T.text3, marginTop: "8px",
              }}>
                Free shipping · In stock · Immediate shipping
              </p>
            </div>

            <Divider color={T.border} />

            {/* CTA */}
            <div id="buy-action-btn" style={{ padding: "24px 0" }}>
              <BtnPrimary checkoutLink={checkoutLink}>Buy now</BtnPrimary>
            </div>

            <Divider color={T.border} />

            {/* Specs */}
            <AccordionItem title="Specifications" T={T}>
              {SPECS.map((spec, i) => (
                <div key={spec.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "10px 0",
                  borderBottom: i < SPECS.length - 1 ? `1px solid ${T.border}` : "none",
                }}>
                  <span style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 400, fontSize: "13px", color: T.text2,
                  }}>
                    {spec.label}
                  </span>
                  <span style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 500, fontSize: "13px", color: T.text1, textAlign: "right",
                  }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </AccordionItem>

            <Divider color={T.border} />

            {/* Incluso */}
            <AccordionItem title="In the Box" T={T}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {INCLUDES.map(item => (
                  <span key={item} style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 400, fontSize: "12px", color: T.text2,
                    padding: "5px 12px", borderRadius: "999px",
                    border: `1px solid ${T.border}`,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </AccordionItem>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Atoms ─── */
function AccordionItem({ title, children, T }: { title: string, children: React.ReactNode, T: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: "16px 0", cursor: "pointer", userSelect: "none" }} onClick={() => setOpen(!open)}>
      <div style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 500, fontSize: "11px",
        letterSpacing: "0.10em", textTransform: "uppercase",
        color: T.text3, display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span>{title}</span>
        <span style={{
          display: "inline-block",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          fontSize: "18px", color: T.text3, lineHeight: 1,
        }}>+</span>
      </div>
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        opacity: open ? 1 : 0,
        transition: "grid-template-rows 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ paddingTop: "16px", cursor: "auto", userSelect: "text" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function Divider({ color }: { color: string }) {
  return <div style={{ height: "1px", background: color, flexShrink: 0 }} />;
}

function BtnPrimary({ children, checkoutLink }: { children: React.ReactNode, checkoutLink?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={checkoutLink || "#"}
      rel="noreferrer"
      target="_self"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 500, fontSize: "15px", color: "#ffffff",
        background: "#E05D26",
        border: "none", borderRadius: "999px",
        padding: "14px 32px", cursor: "pointer", width: "100%",
        display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box",
        letterSpacing: "-0.01em",
        transform: hov ? "scale(1.03)" : "scale(1)",
        opacity: hov ? "0.88" : "1",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
    >
      {children}
    </a>
  );
}
