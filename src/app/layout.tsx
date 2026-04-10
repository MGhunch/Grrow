import type { Metadata } from "next";
import { Poppins, Fredoka } from "next/font/google";
import "./globals.css";
import Shell from "../components/layout/Shell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "600", "900"],
  variable: "--font-poppins",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Grrow",
  description: "Professional development that works",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${fredoka.variable}`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
