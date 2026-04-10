"use client";

import { COLORS, familyAlpha } from "@/lib/colors";

interface HowItWorksStepsProps {
  dark: boolean;
}

// ── Step Data ─────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "reflect",
    eyebrow: "REFLECT",
    headlineLine1: "Take five.",
    headlineLine2: "Get a snapshot.",
    body: "Answer a few questions about how you work. No prep, no pressure. Just an honest look at where you're at right now.",
    accentFamily: "purple" as const,
    image: "/images/howto/how-quiz-cards.svg",
    imageAlt: "Quiz questions with response options",
  },
  {
    id: "connect",
    eyebrow: "CONNECT",
    headlineLine1: "Have a chat.",
    headlineLine2: "Compare notes.",
    body: "Both sides give their take on the same questions. Some will match, others might not. The gaps are where the best conversations start.",
    accentFamily: "teal" as const,
    image: "/images/howto/how-calibration.svg",
    imageAlt: "Score comparison between you and them",
  },
  {
    id: "focus",
    eyebrow: "FOCUS",
    headlineLine1: "Three picks.",
    headlineLine2: "One direction.",
    body: "Choose one strength to keep building. One to focus on. And another to grow into. Because focus is the best way to grow.",
    accentFamily: "purple" as const,
    image: "/images/howto/how-kfg-circle.svg",
    imageAlt: "Keep Focus Grow on the circle",
  },
  {
    id: "checkin",
    eyebrow: "REPEAT",
    headlineLine1: "Check in.",
    headlineLine2: "Stay on track.",
    body: "Come back to your big three to see what's what. Track any changes, tweak the plan, and keep going. Simple.",
    accentFamily: "teal" as const,
    image: "/images/howto/how-kfg-cards.svg",
    imageAlt: "Keep Focus Grow cards",
  },
];

// ── Main Component ────────────────────────────────────────────────────

export default function HowItWorksSteps({ dark }: HowItWorksStepsProps) {
  return (
    <section>
      {STEPS.map((step, index) => {
        const isEven = index % 2 === 0;
        const heroColor = step.accentFamily === "purple" ? COLORS.purple.hero : COLORS.teal.hero;
        const darkHeroColor = step.accentFamily === "purple" ? COLORS.purple.dark : COLORS.teal.dark;
        
        const bgColor = isEven 
          ? COLORS.ui.white 
          : `linear-gradient(135deg, ${familyAlpha("purple", "wash")} 0%, ${familyAlpha("teal", "wash")} 100%)`;

        return (
          <div
            key={step.id}
            style={{ background: bgColor }}
          >
            <div className={`max-w-container mx-auto px-6 md:px-8 ${index === 0 ? "py-8 md:py-10" : "py-12 md:py-14"}`}>
              <div
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16`}
              >
                {/* Text column */}
                <div className="flex-1 w-full lg:w-auto">
                  <p
                    className="text-eyebrow uppercase mb-3"
                    style={{ color: darkHeroColor }}
                  >
                    {step.eyebrow}
                  </p>

                  <h2
                    className="text-headline-l mb-1"
                    style={{ color: COLORS.ui.nearBlack }}
                  >
                    {step.headlineLine1}
                  </h2>
                  <h2
                    className="text-headline-l mb-4"
                    style={{ color: heroColor }}
                  >
                    {step.headlineLine2}
                  </h2>

                  <p
                    className="text-light-m leading-relaxed"
                    style={{ color: COLORS.ui.lightCopy, maxWidth: 340 }}
                  >
                    {step.body}
                  </p>
                </div>

                {/* Visual column */}
                <div 
                  className={`flex-1 w-full lg:w-auto flex justify-center px-4 md:px-0 ${index === 0 ? "lg:-ml-10" : ""}`}
                >
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    style={{ 
                      maxWidth: step.id === "reflect" ? 460 : step.id === "focus" ? 360 : 400,
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
