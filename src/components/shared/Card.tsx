"use client";

import { ReactNode } from "react";
import { useTheme } from "../../lib/ThemeContext";
import { COLORS, familyAlpha } from "@/lib/colors";

interface CardProps {
  variant?: "teal" | "white" | "purple";
  children: ReactNode;
}

export default function Card({ variant = "teal", children }: CardProps) {
  const { dark } = useTheme();
  const mode = dark ? "dark" : "light";

  const styles: Record<"teal" | "white" | "purple", { bg: string; shadow: string }> = {
    teal: {
      bg: familyAlpha("teal", "wash", mode),
      shadow: dark
        ? "0 4px 12px rgba(0,0,0,0.35)"
        : "0 4px 12px rgba(0,0,0,0.08)",
    },
    white: {
      bg: dark ? COLORS.ui.darkCard : COLORS.ui.white,
      shadow: dark
        ? "0 4px 12px rgba(0,0,0,0.35)"
        : "0 4px 12px rgba(0,0,0,0.08)",
    },
    purple: {
      bg: familyAlpha("purple", "wash", mode),
      shadow: dark
        ? "0 4px 12px rgba(0,0,0,0.35)"
        : "0 4px 12px rgba(0,0,0,0.08)",
    },
  };

  const { bg, shadow } = styles[variant];

  return (
    <div
      style={{
        background:   bg,
        borderRadius: 20,
        padding:      "32px",
        boxShadow:    shadow,
      }}
    >
      {children}
    </div>
  );
}
