"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../shared/Logo";
import { COLORS, familyAlpha } from "@/lib/colors";
import { TEXT } from "@/lib/typography";
import { useTheme } from "../../lib/ThemeContext";

export default function Nav() {
  const { dark } = useTheme();
  const [open, setOpen] = useState(false);

  const border = dark ? COLORS.ui.darkBorder : COLORS.ui.lightBorder;
  const card   = dark ? COLORS.ui.darkCard   : COLORS.ui.white;
  const txt    = dark ? COLORS.ui.darkTxt    : COLORS.ui.nearBlack;
  const muted  = dark ? COLORS.ui.darkMuted  : COLORS.ui.lightMuted;

  const links = [
    { label: "How it works", href: "/howto" },
    { label: "The science", href: "/science" },
  ];

  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        height: 72,
        background: dark ? COLORS.ui.darkCard : COLORS.ui.white,
        boxShadow: dark 
          ? "0 2px 8px rgba(0,0,0,0.3)" 
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", height: "100%", position: "relative" }}>
        <Link href="/">
          <Logo size={32} dark={dark} />
        </Link>
        <div style={{ flex: 1 }} />
        <Link
          href="/dashboard"
          style={{
            padding: "8px 20px",
            background: COLORS.teal.hero,
            borderRadius: 100,
            fontFamily: "Poppins, sans-serif",
            ...TEXT.bold.m,
            color: COLORS.ui.white,
            textDecoration: "none",
            marginRight: 16,
          }}
        >
          Sign in
        </Link>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px 2px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <span style={{ display: "block", width: 22, height: 2, borderRadius: 2, background: open ? COLORS.purple.growing : muted, transition: "transform 0.2s, opacity 0.2s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, borderRadius: 2, background: open ? COLORS.purple.growing : muted, transition: "opacity 0.2s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, borderRadius: 2, background: open ? COLORS.purple.growing : muted, transition: "transform 0.2s, opacity 0.2s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
        {open && (
          <div
            style={{
              position: "absolute",
              top: 68,
              right: 32,
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 14,
              padding: "8px 0",
              minWidth: 200,
              boxShadow: dark 
                ? "0 16px 48px rgba(0,0,0,0.5)" 
                : `0 16px 48px ${familyAlpha("purple", "shadow1", "light")}`,
              zIndex: 50,
            }}
            onClick={e => e.stopPropagation()}
          >
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 20px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: TEXT.bold.m.fontSize,
                  fontWeight: 400,
                  color: txt,
                  textDecoration: "none",
                  borderBottom: i < links.length - 1 ? `1px solid ${border}` : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = dark ? COLORS.ui.darkHover : COLORS.ui.lightHover)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
