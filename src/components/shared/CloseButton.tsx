"use client";

import { COLORS } from "@/lib/colors";

interface CloseButtonProps {
  onClose: () => void;
  dark?: boolean;
  size?: number;
  accentColor?: string; // defaults to teal — pass family accent for quiz context
}

export default function CloseButton({
  onClose,
  dark = false,
  size = 28,
  accentColor = COLORS.teal.hero,
}: CloseButtonProps) {
  const iconSize = Math.round(size * 0.5);

  // Convert hex to rgba for background tint
  const hex = accentColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const bgColor   = `rgba(${r},${g},${b},${dark ? 0.15 : 0.12})`;
  const bgHover   = `rgba(${r},${g},${b},${dark ? 0.25 : 0.20})`;

  return (
    <button
      onClick={onClose}
      aria-label="Close"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bgColor,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = bgHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bgColor;
      }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
