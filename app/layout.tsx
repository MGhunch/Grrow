export const metadata = {
  title: "Grrow",
  description: "Make one‑on‑ones meaningful, measurable and manageable."
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
