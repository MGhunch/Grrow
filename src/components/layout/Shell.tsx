"use client";

import { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "../../lib/ThemeContext";
import { COLORS } from "@/lib/colors";

function AppShell({ children }: { children: ReactNode }) {
  const { dark } = useTheme();
  
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: "var(--font-poppins), sans-serif",
        background: dark ? COLORS.ui.deepNavy : COLORS.ui.white,
        color: dark ? COLORS.ui.darkTxt : COLORS.ui.nearBlack,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Nav />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppShell>{children}</AppShell>
    </ThemeProvider>
  );
}
