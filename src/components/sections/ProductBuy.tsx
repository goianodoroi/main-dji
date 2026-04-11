"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProductConfig } from "@/lib/config";

const PRODUCT_DATA: Record<string, any> = {
  combo: {
    title: "Double Creator Combo\nPocket 3 + Osmo 360",
    desc: "The Ultimate DJI Recording Kit. Includes the Osmo Pocket 3 with 1-inch sensor AND the new Osmo 360. Maximum creativity and coverage.",
    images: [
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/8f026266bc7f7a9fe1f2f79591874606@ultra.jpg",
      "/images/osmo360/1.webp",
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/48272e295eebee2fc16ff15a663594df@ultra.jpg?format=webp",
      "/images/osmo360/3.webp",
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/8e1522eae916ca88631f0d48a88a2c7a@ultra.jpg?format=webp"
    ],
    specs: [
      { label: "Sensors",       value: "1-inch / 1-Inch 360°" },
      { label: "Pocket Video",  value: "4K / 120 fps" },
      { label: "360° Video",    value: "Native 8K 360°" },
      { label: "Photo",         value: "up to 120MP 360°" },
      { label: "Stabilization", value: "Mechanical & Digital" },
      { label: "Audio",         value: "Dual DJI Mics & OsmoAudio" }
    ],
    includes: [
      "Osmo Pocket 3", "Osmo 360", "DJI Mic 2", "Battery Handle", "Extreme Battery Plus", 
      "Mini Tripod", "Protective Pouches", "Wide-Angle Lens", "Lens Protectors"
    ]
  },
  pocket3: {
    title: "Osmo Pocket 3\nCreator Combo",
    desc: "1-inch sensor, 4K/120fps, 3-axis mechanical stabilization, and DJI Mic 2 included — the most complete camera that fits in your pocket.",
    images: [
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/8f026266bc7f7a9fe1f2f79591874606@ultra.jpg",
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/48272e295eebee2fc16ff15a663594df@ultra.jpg?format=webp",
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/8e1522eae916ca88631f0d48a88a2c7a@ultra.jpg?format=webp",
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/9c1660fba056e372229e96508bd5c0cb@ultra.jpg",
      "https://se-cdn.djiits.com/tpc/uploads/carousel/image/4ec1d29d6bb8865db38782caceb3b813@ultra.jpg",
      "https://se-cdn.djiits.com/tpc/uploads/scenario/image/730aa5b63c118addb2c6bb64499de425@ultra.jpg",
      "https://se-cdn.djiits.com/tpc/uploads/scenario/image/95cf42b01627e76e14e5ce274ca6f631@ultra.jpg",
    ],
    specs: [
      { label: "Sensor",        value: "1-inch CMOS" },
      { label: "Video",         value: "4K / 120 fps · 130 Mbps" },
      { label: "Stabilization", value: "3-axis mechanical" },
      { label: "Tracking",      value: "ActiveTrack 6.0" },
      { label: "Audio",         value: "DJI Mic 2 included" },
      { label: "Battery",       value: "Up to 166 min" },
      { label: "Screen",        value: "2″ touch · 700 nits" },
      { label: "Weight",        value: "179 g" },
    ],
    includes: [
      "Osmo Pocket 3", "DJI Mic 2", "Battery Handle",
      "Mini Tripod", "Carrying Bag", "Wide-Angle Lens",
    ]
  }
};

/* ─── Utils ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function calculateDiscount(price: string, oldPrice: string) {
  const p = parseFloat(price);
  const op = parseFloat(oldPrice);
  if (!isNaN(p) && !isNaN(op) && op > 0 && op > p) {
    const diff = ((op - p) / op) * 100;
    return `−${Math.round(diff)}%`;
  }
  return "";
}

function theme(p: number) {
  const v  = Math.round(lerp(8,   255, p));
  const sv = Math.round(lerp(15,  248, p));
  const ease = "cubic-bezier(0.4,0,0.2,1)";
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

export default function ProductBuy({ products = [] }: { products?: ProductConfig[] }) {
  const [progress, setProgress] = useState(0);
  const sectionRef  = useRef<HTMLElement>(null);
  const rafRef      = useRef<number>(0);

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

  const T = theme(progress);

  const comboConfig = products?.find(p => p.id === "combo") || { id: "combo", price: "450", oldPrice: "1178.99", checkoutLinks: [] };
  const pocket3Config = products?.find(p => p.id === "pocket3") || { id: "pocket3", price: "117", oldPrice: "629", checkoutLinks: [] };

  return (
    <section ref={sectionRef} id="comprar" className="product-buy-section" style={{ background: T.bg }}>
      <style>{`
        .product-buy-section { padding: 120px 0; }
        .product-buy-container { padding: 0 32px; max-width: 1200px; margin: 0 auto; }
        .product-buy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .product-buy-section { padding: 64px 0; }
          .product-buy-container { padding: 0 24px; }
          .product-buy-grid {
            grid-template-columns: 1fr;
            gap: 80px;
          }
        }
      `}</style>
      <div className="product-buy-container">
        <div className="product-buy-grid">
          <ProductCard 
            config={comboConfig as ProductConfig}
            data={PRODUCT_DATA.combo}
            T={T}
            progress={progress}
            isHighlighted={true}
          />
          <ProductCard 
            config={pocket3Config as ProductConfig}
            data={PRODUCT_DATA.pocket3}
            T={T}
            progress={progress}
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ config, data, T, progress, isHighlighted }: { config: ProductConfig, data: any, T: any, progress: number, isHighlighted?: boolean }) {
  const [active, setActive] = useState(0);
  const checkoutLink = config.checkoutLinks?.find(l => l.isActive)?.url || "#";
  const discountStr = calculateDiscount(config.price, config.oldPrice);

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % data.images.length), 3800);
    return () => clearInterval(id);
  }, [data.images.length]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%", position: "relative" }}>
      {isHighlighted && (
        <div style={{
          position: "absolute", top: "-32px", left: "0", right: "0", textAlign: "center",
          background: "linear-gradient(90deg, #E05D26, #FF9A5A)", color: "#fff",
          padding: "6px 0", borderRadius: "12px 12px 0 0",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 600, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase"
        }}>
          BEST VALUE
        </div>
      )}
      {/* ══ Imagens ══ */}
      <div className="product-image-container" style={{ borderTopRadius: isHighlighted ? "0" : "16px" }}>
        {/* Main image */}
        <div style={{
          position: "relative", width: "100%", aspectRatio: "1/1",
          borderRadius: "16px", overflow: "hidden",
          background: T.surface,
          border: `1px solid ${T.border}`,
          marginBottom: "12px",
          borderTopLeftRadius: isHighlighted ? "0" : "16px",
          borderTopRightRadius: isHighlighted ? "0" : "16px",
        }}>
          {data.images.map((src: string, i: number) => (
            <div key={`${src}-${i}`} style={{
              position: "absolute", inset: 0,
              opacity:   active === i ? 1 : 0,
              transform: active === i ? "scale(1)" : "scale(1.03)",
              transition: "opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)",
            }}>
              <Image src={src} alt={`${data.title} — vista ${i + 1}`} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} priority={i === 0} loading={i === 0 ? undefined : "lazy"} />
            </div>
          ))}

          {/* Dot progress */}
          <div style={{
            position: "absolute", bottom: "16px", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: "6px", zIndex: 2,
          }}>
            {data.images.map((_: any, i: number) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Imagem ${i + 1}`}
                style={{
                  width: active === i ? "20px" : "6px", height: "6px",
                  borderRadius: "999px", border: "none", padding: 0, cursor: "pointer",
                  background: active === i ? `linear-gradient(90deg,${T.orangeHi},${T.orange})` : `rgba(${progress > 0.5 ? "0,0,0" : "255,255,255"},0.25)`,
                  transition: "width 280ms cubic-bezier(0.16,1,0.3,1), background 280ms ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {data.images.map((src: string, i: number) => (
            <button key={`thumb-${i}`} onClick={() => setActive(i)} aria-label={`Thumbnail ${i + 1}`}
              style={{
                width: "48px", height: "48px", borderRadius: "10px",
                overflow: "hidden", padding: 0, cursor: "pointer", flexShrink: 0,
                border: active === i ? `1.5px solid ${T.orange}` : `1.5px solid ${T.border}`,
                opacity: active === i ? 1 : 0.45,
                background: T.surface,
                transition: "border-color 200ms ease, opacity 200ms ease",
              }}>
              <Image src={src} alt={`Vista ${i + 1}`} width={48} height={48} loading="lazy" style={{ objectFit: "cover", display: "block", width: "100%", height: "100%" }} />
            </button>
          ))}
        </div>
      </div>

      {/* ══ Info ══ */}
      <div id="buy-info-target" style={{ display: "flex", flexDirection: "column" }}>
        {/* Nome */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500,
            fontSize: "clamp(24px, 2.6vw, 34px)", letterSpacing: "-0.022em", lineHeight: 1.1,
            color: T.text1, margin: "0 0 8px 0", whiteSpace: "pre-line"
          }}>
            {data.title}
          </h3>
          <p style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400,
            fontSize: "14px", lineHeight: 1.65, color: T.text2, margin: 0, maxWidth: "380px",
          }}>
            {data.desc}
          </p>
        </div>

        <Divider color={T.border} />

        {/* Preço */}
        <div style={{ padding: "24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div>
              <span style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: "13px",
                color: T.text3, textDecoration: "line-through", display: "block", marginBottom: "4px",
              }}>
                ${config.oldPrice || (config.id === "pocket3" ? "629" : "1178.99")}
              </span>
              <span style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: "42px",
                letterSpacing: "-0.03em", lineHeight: 1, color: T.text1,
              }}>
                $ <span style={{ color: T.text1 }}>{config.price}</span>
              </span>
            </div>

            {discountStr && (
              <span style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: "12px",
                color: T.orangeHi, padding: "4px 10px", borderRadius: "999px",
                border: "1px solid rgba(255,208,146,0.22)", background: "rgba(255,208,146,0.07)",
              }}>
                {discountStr}
              </span>
            )}
          </div>

          <p style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: "12px",
            color: T.text3, marginTop: "8px",
          }}>
            Free shipping · In stock · Immediate shipping
          </p>
        </div>

        <Divider color={T.border} />

        {/* CTA */}
        <div style={{ padding: "24px 0" }}>
          <BtnPrimary checkoutLink={checkoutLink}>Buy now</BtnPrimary>
        </div>

        <Divider color={T.border} />

        {/* Specs */}
        <AccordionItem title="Specifications" T={T}>
          {data.specs.map((spec: any, i: number) => (
            <div key={spec.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0",
              borderBottom: i < data.specs.length - 1 ? `1px solid ${T.border}` : "none",
            }}>
              <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: "13px", color: T.text2 }}>{spec.label}</span>
              <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: "13px", color: T.text1, textAlign: "right" }}>{spec.value}</span>
            </div>
          ))}
        </AccordionItem>

        <Divider color={T.border} />

        {/* Incluso */}
        <AccordionItem title="In the Box" T={T}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {data.includes.map((item: string) => (
              <span key={item} style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: "12px", color: T.text2,
                padding: "5px 12px", borderRadius: "999px", border: `1px solid ${T.border}`,
              }}>
                {item}
              </span>
            ))}
          </div>
        </AccordionItem>
      </div>
    </div>
  )
}

function AccordionItem({ title, children, T }: { title: string, children: React.ReactNode, T: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: "16px 0", cursor: "pointer", userSelect: "none" }} onClick={() => setOpen(!open)}>
      <div style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: "11px",
        letterSpacing: "0.10em", textTransform: "uppercase", color: T.text3, display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span>{title}</span>
        <span style={{ display: "inline-block", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", fontSize: "18px", color: T.text3, lineHeight: 1 }}>+</span>
      </div>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0, transition: "grid-template-rows 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease" }}>
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
      href={checkoutLink || "#"} rel="noreferrer" target="_self" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: "15px", color: "#ffffff",
        background: "#E05D26", border: "none", borderRadius: "999px", padding: "14px 32px", cursor: "pointer", width: "100%",
        display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box", letterSpacing: "-0.01em",
        transform: hov ? "scale(1.03)" : "scale(1)", opacity: hov ? "0.88" : "1", boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
    >
      {children}
    </a>
  );
}
