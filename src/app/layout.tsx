import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}