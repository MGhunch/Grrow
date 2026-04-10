"use client";

import Link from "next/link";
import { ReactNode, CSSProperties } from "react";
import { COLORS, familyAlpha } from "@/lib/colors";

// ─────────────────────────────────────────────────────────────────────────────
// BUTTON COMPONENTS
// Primary: solid fill, white text
// Secondary: transparent, coloured border and text
// ─────────────────────────────────────────────────────────────────────────────

type ButtonColor = "teal" | "purple";

interface ButtonProps {
  children: ReactNode;
  color?: ButtonColor;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  shadow?: boolean;
  style?: CSSProperties;
}

// Shared base styles
const BASE: CSSProperties = {
  padding: "12px 28px",
  borderRadius: 100,
  fontSize: 15,
  fontWeight: 600,
  fontFamily: "Poppins, sans-serif",
  cursor: "pointer",
  transition: "all 0.15s ease",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

// ── Primary Button ────────────────────────────────────────────────────────────
// Solid fill, white text

export function ButtonPrimary({
  children,
  color = "teal",
  onClick,
  href,
  disabled = false,
  shadow = true,
  style,
}: ButtonProps) {
  const bgColor = color === "teal" ? COLORS.teal.hero : COLORS.purple.hero;
  const disabledBg = familyAlpha(color, "border", "light");

  const styles: CSSProperties = {
    ...BASE,
    backgroundColor: disabled ? disabledBg : bgColor,
    color: disabled ? (color === "teal" ? COLORS.teal.hero : COLORS.purple.hero) : COLORS.ui.white,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: shadow && !disabled ? `0 4px 24px ${familyAlpha(color, "shadow3", "light")}` : "none",
    ...style,
  };

  const handleHover = (e: React.MouseEvent, lift: boolean) => {
    if (disabled) return;
    e.currentTarget.style.transform = lift ? "translateY(-1px)" : "translateY(0)";
    if (shadow) {
      e.currentTarget.style.boxShadow = lift 
        ? `0 8px 32px ${familyAlpha(color, "shadow3", "light")}` 
        : `0 4px 24px ${familyAlpha(color, "shadow3", "light")}`;
    }
  };

  if (href && !disabled) {
    return (
      <Link
        href={href}
        style={styles}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={styles}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {children}
    </button>
  );
}

// ── Secondary Button ──────────────────────────────────────────────────────────
// Transparent, coloured border and text

export function ButtonSecondary({
  children,
  color = "teal",
  onClick,
  href,
  disabled = false,
  shadow = false,
  style,
}: ButtonProps) {
  const accentColor = color === "teal" ? COLORS.teal.hero : COLORS.purple.hero;
  const disabledColor = familyAlpha(color, "border", "light");

  const styles: CSSProperties = {
    ...BASE,
    backgroundColor: "transparent",
    color: disabled ? disabledColor : accentColor,
    border: `1.5px solid ${disabled ? disabledColor : accentColor}`,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: shadow && !disabled ? `0 4px 20px ${familyAlpha(color, "shadow2", "light")}` : "none",
    ...style,
  };

  const handleHover = (e: React.MouseEvent, lift: boolean) => {
    if (disabled) return;
    e.currentTarget.style.transform = lift ? "translateY(-1px)" : "translateY(0)";
  };

  if (href && !disabled) {
    return (
      <Link
        href={href}
        style={styles}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={styles}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {children}
    </button>
  );
}
