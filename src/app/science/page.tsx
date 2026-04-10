"use client";

import { useTheme } from "../../lib/ThemeContext";
import { familyAlpha } from "@/lib/colors";
import SubHeader from "../../components/sections/SubHeader";
import LearningStagesSection from "../../components/sections/LearningStagesSection";
import SkillsScienceSection from "../../components/sections/SkillsScienceSection";
import SeventyTwentyTenSection from "../../components/sections/SeventyTwentyTenSection";
import QuizTrialSection from "../../components/layout/QuizTrialSection";

export default function TheSciencePage() {
  const { dark } = useTheme();

  // Purple → Teal gradient wash
  const gradientBg = `linear-gradient(135deg, ${familyAlpha("purple", "wash")} 0%, ${familyAlpha("teal", "wash")} 100%)`;

  return (
    <div className="min-h-screen" style={{ background: gradientBg }}>
      <SubHeader
        eyebrow="THE SCIENCE"
        headline="Backed by research."
        headlineAccent="Built for humans."
      />

      <LearningStagesSection dark={dark} />

      <SkillsScienceSection dark={dark} />

      <SeventyTwentyTenSection dark={dark} />

      <QuizTrialSection />
    </div>
  );
}
