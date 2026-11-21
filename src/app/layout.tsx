import type { Metadata } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lucky Metha Purnomo — Software Developer & UI Specialist",
  description:
    "Portfolio of Lucky Metha Purnomo — Front-End & Full-Stack Web Developer and User Interface Specialist with 5+ years of experience building POS Accounting systems, E-Commerce CRM platforms, and interactive web applications.",
  keywords: [
    "Lucky Metha Purnomo",
    "Software Developer Bandung",
    "Front-End Developer",
    "Full-Stack Web Developer",
    "UI Specialist",
    "React",
    "Next.js",
    "Laravel",
    "dRetail",
  ],
  openGraph: {
    title: "Lucky Metha Purnomo — Software Developer & UI Specialist",
    description:
      "Crafting precision interfaces & resilient full-stack web systems. 5+ years building POS Accounting, E-Commerce CRM, Healthcare, and EdTech platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased selection:bg-blue-600 selection:text-white dark:selection:bg-blue-500">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
