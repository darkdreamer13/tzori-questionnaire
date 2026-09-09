import type { Metadata, Viewport } from "next";
import { Inter, Play } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-sans-loaded",
  display: "swap"
});

const play = Play({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-heading-loaded",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Ερωτηματολόγιο Έναρξης | Promoters",
  description:
    "Onboarding ερωτηματολόγιο της Promoters για τη νέα σειρά ελαιολάδου — Brand Strategy, προϊόν, storytelling και εγκρίσεις.",
  generator: "Next.js"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="el" className={`bg-background ${inter.variable} ${play.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
