"use client";

import React, { useState } from "react";
import { useReveal } from "@/lib/useReveal";

const QA = [
  {
    q: "What are the major upgrades of Osmo Pocket 3 compared with DJI Pocket 2?",
    a: "Compared with DJI Pocket 2, Osmo Pocket 3 has greatly improved in imaging performance, shooting experience, and intelligent features:\n1. Imaging performance: The sensor has been upgraded from 1/1.7 inches to 1 inch to deliver high-resolution footage in various scenarios, low-noise night shots, high-dynamic range capabilities in high-contrast scenarios, and support for 4K/120fps.\n2. Shooting experience: The upgraded 2-inch OLED screen delivers richer colors and higher contrast. The larger image size presents clearer details, and both horizontal and vertical shots can be displayed on full screen.\n3. Intelligent features: ActiveTrack has been upgraded to 6.0, achieving a perfect combination of mechanical gimbal and intelligent tracking algorithms. With the new Face Auto-Detect mode, you can effortlessly record single-person vlogs."
  },
  {
    q: "What accessories does Osmo Pocket 3 support?",
    a: "Osmo Pocket 3 has added the following practical accessories, further enhancing your experience in shooting, storage, operating time, and more:\n- Osmo Pocket 3 Black Mist Filter\n- Osmo Pocket 3 Battery Handle\n- Osmo Mini Tripod\n- Osmo Pocket 3 Magnetic ND Filters Set\n- Osmo Pocket 3 Expansion Adapter\n- Osmo Pocket 3 Wide-Angle Lens\n- Osmo Pocket 3 Carrying Bag\nPlease note that Osmo Pocket 3 does not support the exclusive accessories of previous-generation products."
  },
  {
    q: "What microSD cards does Osmo Pocket 3 support?",
    a: "Recommended microSD cards include SanDisk Extreme Pro 32GB V30 A1, Kingston Canvas Go!Plus up to 512GB, Kingston Canvas React Plus up to 256GB, and Lexar Pro/SILVER PLUS from 64GB up to 1TB."
  },
  {
    q: "What Timelapse modes are available on Osmo Pocket 3? What parameters can be customized?",
    a: "There are three modes: Hyperlapse, Timelapse, and Motionlapse.\nIn Hyperlapse mode, you can set the resolution, frame rate, and speed.\nIn Timelapse mode, you can set the resolution, frame rate, interval, and duration.\nIn Motionlapse mode, you can set the resolution, frame rate, interval, duration, and waypoints."
  },
  {
    q: "What is Osmo Pocket 3's color mode D-Log M?",
    a: "D-Log M is designed to capture a wide dynamic range from the sensor, and colors are distributed evenly so the bright and dark parts of the video have greater fidelity and clarity. It is not a LUT but a lower-contrast video with a flat color profile, which is great for expanding post-processing options."
  },
  {
    q: "Can Osmo Pocket 3 shoot slow-motion videos?",
    a: "Yes, it supports shooting up to 1080p/240fps 8x slow-motion and 4K/120fps 4x slow-motion videos."
  },
  {
    q: "Does Osmo Pocket 3 support livestreaming? What platforms does it support?",
    a: "Yes. It supports YouTube and RTMP platforms."
  },
  {
    q: "Is Osmo Pocket 3's 1-inch sensor the same as DJI Air 2S?",
    a: "No. Osmo Pocket 3 features an all-new 1-inch stacked CMOS sensor, which supports up to 4K/120fps uncropped recording (available only in Slow Motion mode) and full-pixel PDAF, delivering enhanced overall performance."
  },
  {
    q: "How do I use LightCut for quick editing?",
    a: "Launch LightCut, enter One-Tap Edit and select the videos you have shot. One-Tap Edit will automatically recommend templates according to your videos, which are optimized for many scenarios, including nature, city, home, shopping, food, pets, festivals, and more, and will intelligently select clips and generate a short video with no manual editing required."
  }
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useReveal(0.08);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        cursor: "pointer",
        overflow: "hidden",
        userSelect: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 500, fontSize: "16px", lineHeight: 1.4,
        color: "#111111", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ paddingRight: "16px" }}>{q}</span>
        <span style={{
          display: "inline-block",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          fontSize: "24px",
          color: "#888888",
          flexShrink: 0,
          lineHeight: 1,
        }}>+</span>
      </div>

      {/* CSS grid trick for height: auto animation */}
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        opacity: open ? 1 : 0,
        transition: "grid-template-rows 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              paddingTop: "16px",
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 400, fontSize: "14px", lineHeight: 1.6,
              color: "#666666", cursor: "auto", whiteSpace: "pre-line", userSelect: "text",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref: titleRef, visible: titleVisible } = useReveal(0.2);

  return (
    <section id="faq" className="faq-section" style={{ background: "#f5f5f5" }}>
      <style>{`
        .faq-section { padding: 120px 0; }
        .faq-container { padding: 0 32px; max-width: 800px; margin: 0 auto; }
        @media (max-width: 768px) {
          .faq-section { padding: 64px 0; }
          .faq-container { padding: 0 24px; }
        }
      `}</style>
      <div className="faq-container">

        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: "64px",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2 style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            letterSpacing: "-0.025em",
            color: "#111111",
            margin: 0,
          }}>
            Let&apos;s Answer Your Questions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {QA.map((item, i) => (
            <AccordionItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

      </div>
    </section>
  );
}
