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
        ...TEXT.eyebrow,
        fontSize: size ?? TEXT.eyebrow.fontSize,
        color: color ?? (dark ? COLORS.ui.darkMuted : COLORS.ui.lightMuted),
      }}
    >
      {children}
    </span>
  );
}
