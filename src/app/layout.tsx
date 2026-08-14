import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Buat.in — Desain website visual, bayar sekali, miliki kodenya",
  description:
    "Desain website visual dengan drag & drop. Gratis selama mendesain — bayar sekali saat export, source code HTML/CSS/JS milik Anda. Tanpa lock-in, tanpa langganan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${interTight.variable} ${garamond.variable} dark h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}