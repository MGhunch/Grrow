import { COLORS } from "@/lib/colors";
import { TEXT } from "@/lib/typography";

export default function Label({
  children,
  dark,
  color,
  size,
}: {
  children: React.ReactNode;
  dark: boolean;
  color?: string;
  size?: number;
}) {
  return (
    <span
      style={{
        fontFamily: "Poppins, sans-serif",
        ...TEXT.label.xs,
        fontSize: size ?? TEXT.label.xs.fontSize,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: color ?? (dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted),
      }}
    >
      {children}
    </span>
  );
}
