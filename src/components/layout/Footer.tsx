"use client";

import { COLORS } from "@/lib/colors";
import { TEXT } from "@/lib/typography";
import { useTheme } from "../../lib/ThemeContext";
import LogoMark from "../shared/LogoMark";

export default function Footer() {
  const { dark } = useTheme();
  const muted = dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted;

  return (
    <footer style={{ 
      background: dark ? COLORS.ui.darkCard : COLORS.ui.white,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "28px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Left: LogoMark + links */}
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <LogoMark size={16} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href="/privacy" style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: muted,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              Privacy
            </a>
            <span style={{
              fontSize: 13,
              color: muted,
              opacity: 0.5,
            }}>·</span>
            <a href="/terms" style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: muted,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              Terms
            </a>
          </div>
        </div>

        {/* Right: Copyright */}
        <div style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: muted,
        }}>
          © {new Date().getFullYear()} Grrow
        </div>
      </div>
    </footer>
  );
}
