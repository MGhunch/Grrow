"use client";

import { useTheme } from "../../lib/ThemeContext";
import { familyAlpha } from "@/lib/colors";
import SubHeader from "../../components/sections/SubHeader";
import HowItWorksSteps from "../../components/sections/HowItWorksSteps";
import QuizTrialSection from "../../components/layout/QuizTrialSection";

export default function HowItWorksPage() {
  const { dark } = useTheme();

  const gradientBg = `linear-gradient(135deg, ${familyAlpha("purple", "wash")} 0%, ${familyAlpha("teal", "wash")} 100%)`;

  return (
    <div className="min-h-screen" style={{ background: gradientBg }}>
      <SubHeader
        eyebrow="HOW IT WORKS"
        headline="Reflect. Connect."
        headlineLine2="Focus."
        headlineAccent="Repeat."
        accentInline={true}
      />

      <HowItWorksSteps dark={dark} />

      <QuizTrialSection />
    </div>
  );
}
