"use client";

import React from "react";
import Image from "next/image";
import { useReveal } from "@/lib/useReveal";

const ITEMS = [
  { name: "Osmo Pocket 3", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/925871682f3f11d28170171289df4e3e@retina_small.png" },
  { name: "Type-C to Type-C PD Cable", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/eb0a5423cea41562f27333ce9e7cf8dd@retina_small.png" },
  { name: "Osmo Pocket 3 Protective Cover", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/833051b24e422b19873a90637a6e2110@retina_small.png" },
  { name: "DJI Wrist Strap", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/82124fb2db792b664e2f098c17c2bc91@retina_small.png" },
  { name: "Osmo Pocket 3 Handle With 1/4″ Thread", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/cfbd0f190b73377d0ffe93383f74cc25@retina_small.png" },
  { name: "Osmo Pocket 3 Wide-Angle Lens", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/b8e2f7788c3f817dfaf17aa76ddd5ed3@retina_small.png" },
  { name: "DJI Mic 2 Transmitter (Shadow Black)", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/788371080178cebe3ae0118369e21d49@retina_small.png" },
  { name: "DJI Mic 2 Windscreen", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/bfd61a0059f8c5cb61019e44d340d353@retina_small.png" },
  { name: "DJI Mic 2 Clip Magnet", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/b214a96f51ef578d641af22d41b83864@retina_small.png" },
  { name: "Osmo Pocket 3 Battery Handle", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/0fe932a46a0831552789ac0a01235351@retina_small.png" },
  { name: "Osmo Mini Tripod", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/409f1a7499f097ce81d21e150b6b8582@retina_small.png" },
  { name: "Osmo Pocket 3 Carrying Bag", qty: "× 1", img: "https://se-cdn.djiits.com/tpc/uploads/in_the_box/cover/a4def4de4d8580bb1cdad5592cf7912b@retina_small.webp" }
];

function ItemCard({ item, delay }: { item: typeof ITEMS[number]; delay: number }) {
  const { ref, visible } = useReveal(0.08);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div
        className="itb-img-wrap"
        style={{
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Image
          src={item.img}
          alt={item.name}
          width={160}
          height={160}
          loading="lazy"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.06))",
            transition: "transform 0.4s ease-out",
          }}
          className="itb-img"
        />
      </div>
      <h4 style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 500, fontSize: "14px", color: "#111111",
        marginBottom: "6px", maxWidth: "200px",
      }}>
        {item.name}
      </h4>
      <span style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 400, fontSize: "14px", color: "#666666",
      }}>
        {item.qty}
      </span>
    </div>
  );
}

export default function InTheBox() {
  const { ref: titleRef, visible: titleVisible } = useReveal(0.3);

  return (
    <section id="in-the-box" className="in-the-box-section" style={{ background: "#ffffff", overflow: "hidden" }}>
      <style>{`
        .in-the-box-section { padding: 120px 0; }
        .in-the-box-container { padding: 0 48px; max-width: 1280px; margin: 0 auto; }
        .in-the-box-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          row-gap: 64px;
          column-gap: 32px;
        }
        .itb-img-wrap:hover .itb-img { transform: scale(1.05); }
        @media (max-width: 1024px) {
          .in-the-box-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .in-the-box-section { padding: 64px 0; }
          .in-the-box-container { padding: 0 24px; }
          .in-the-box-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 40px;
            column-gap: 16px;
          }
        }
      `}</style>
      <div className="in-the-box-container">
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: "80px",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2 style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "clamp(32px, 4vw, 52px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: "#111111",
            margin: 0,
          }}>
            In the Box
          </h2>
        </div>

        <div className="in-the-box-grid">
          {ITEMS.map((item, i) => (
            <ItemCard key={i} item={item} delay={i * 40} />
          ))}
        </div>
      </div>
    </section>
  );
}
