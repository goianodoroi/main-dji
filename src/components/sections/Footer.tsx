"use client";
import React from "react";
import { useReveal } from "@/lib/useReveal";

export default function Footer() {
  const { ref, visible } = useReveal(0.1);
  return (
    <footer className="footer-section" style={{ background: "#000000", color: "#ffffff" }}>
      <style>{`
        .footer-section { padding: 80px 0 40px; }
        .footer-container { padding: 0 48px; max-width: 1280px; margin: 0 auto; }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 80px;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        .footer-bottom-left { display: flex; gap: 24px; align-items: center; }
        .footer-bottom-links { display: flex; gap: 16px; }
        @media (max-width: 768px) {
          .footer-section { padding: 48px 0 32px; }
          .footer-container { padding: 0 24px; }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            margin-bottom: 48px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-bottom-left { flex-direction: column; align-items: flex-start; gap: 8px; }
          .footer-bottom-links { flex-direction: column; gap: 12px; }
        }
      `}</style>
      <div
        ref={ref}
        className="footer-container"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        
        <div className="footer-grid">
          {/* Column 1 */}
          <div>
            <h5 style={styles.heading}>Product Categories</h5>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>Camera Drones</a></li>
              <li><a href="#" style={styles.link}>Handheld Cameras</a></li>
              <li><a href="#" style={styles.link}>Power</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h5 style={styles.heading}>Where to Buy</h5>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>DJI Store</a></li>
              <li><a href="#" style={styles.link}>Flagship Stores</a></li>
              <li><a href="#" style={styles.link}>Retail Stores</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h5 style={styles.heading}>Support</h5>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>Help Center</a></li>
              <li><a href="#" style={styles.link}>After-Sales Service</a></li>
              <li><a href="#" style={styles.link}>Repair Services</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h5 style={styles.heading}>Explore</h5>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>Newsroom</a></li>
              <li><a href="#" style={styles.link}>Events</a></li>
              <li><a href="#" style={styles.link}>Buying Guides</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: "14px", fontWeight: 500 }}>
              DJI
            </span>
            <span style={styles.bottomLink}>Copyright © 2026 DJI All Rights Reserved.</span>
          </div>

          <div className="footer-bottom-links">
            <a href="#" style={styles.bottomLink}>Privacy Policy</a>
            <a href="#" style={styles.bottomLink}>Use of Cookies</a>
            <a href="#" style={styles.bottomLink}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  heading: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: "14px",
    color: "#ffffff",
    marginBottom: "24px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
  },
  link: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 400,
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  bottomLink: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 400,
    fontSize: "12px",
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
  }
};
