"use client";

import { useState } from "react";
import { useTheme } from "../../lib/ThemeContext";
import { COLORS, whiteAlpha } from "@/lib/colors";
import { TEXT } from "@/lib/typography";
import { ButtonPrimary } from "../shared/Button";
import QuizWrap from "../quiz/QuizWrap";

interface QuizTrialSectionProps {
  headline?: string;
  subline?: string;
  buttonText?: string;
}

export default function QuizTrialSection({
  headline = "Try the quiz",
  subline = "Only takes five minutes. No sign up required.",
  buttonText = "Let's go",
}: QuizTrialSectionProps) {
  const { dark } = useTheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{ background: COLORS.purple.hero }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 32px",
          textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
            fontSize: 36,
            color: COLORS.ui.white,
            margin: "0 0 8px",
          }}>
            {headline}
          </h2>
          {subline && (
            <p style={{
              fontFamily: "Poppins, sans-serif",
              ...TEXT.standard.l,
              fontWeight: 400,
              color: whiteAlpha(0.7),
              margin: "0 0 32px",
            }}>
              {subline}
            </p>
          )}
          <ButtonPrimary onClick={() => setShowModal(true)}>
            {buttonText}
          </ButtonPrimary>
        </div>
      </div>

      {showModal && (
        <QuizWrap dark={dark} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
