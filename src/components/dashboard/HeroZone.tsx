"use client";

import { ReactNode } from "react";
import GrrowCircle from "../circle/GrrowCircle";

// ── Types ─────────────────────────────────────────────────────────────

interface HeroZoneProps {
  greeting?: string;
  name: string;
  intro?: string;
  circleSize?: number;
  actions?: ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────

export default function HeroZone({
  greeting = "Hello again",
  name,
  intro,
  circleSize = 600,
  actions,
}: HeroZoneProps) {
  return (
    <section className="bg-hero-blue relative min-h-[500px] md:min-h-[700px] overflow-hidden">
      <div className="max-w-container mx-auto px-6 md:px-8 py-12 md:py-0 grid grid-cols-1 md:grid-cols-[500px_1fr] items-center md:min-h-[700px]">
        
        {/* Circle — centered on mobile, bleeding left on desktop */}
        <div className="relative h-[320px] md:h-[550px] flex items-center justify-center md:block">
          <div className="md:absolute md:-left-10 md:top-1/2 md:-translate-y-1/2">
            {/* Mobile circle */}
            <div className="md:hidden">
              <GrrowCircle id="dash-mobile" size={300} dark={true} />
            </div>
            {/* Desktop circle */}
            <div className="hidden md:block">
              <GrrowCircle id="dash-desktop" size={circleSize} dark={true} />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="relative z-10 text-center md:text-left mx-auto md:mx-0 md:ml-24">
          <h1 className="text-hero-xs md:text-hero-l text-white">
            {greeting}
          </h1>
          <h1 className="text-hero-xs md:text-hero-l text-teal-hero">
            {name}
          </h1>

          {intro && (
            <p className="text-light-l text-white/75 max-w-[440px] mt-6 md:mt-7 leading-relaxed mx-auto md:mx-0">
              {intro}
            </p>
          )}

          {actions && (
            <div className="flex gap-3 mt-8 md:mt-10 justify-center md:justify-start">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
