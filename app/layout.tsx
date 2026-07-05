import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { ShinyCursor } from "@/components/ui/shiny-cursor";
import { personJsonLd } from "@/lib/seo";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  title: "Harish Kumar - Full Stack Engineer",
  description:
    "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis (AI debugging) and Stardust (container platform) — production-grade systems with full technical documentation.",
  metadataBase: new URL("https://harishkumar.info"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Harish Kumar - Full Stack Engineer",
    description:
      "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis (AI debugging) and Stardust (container platform) — production-grade systems with full technical documentation.",
    url: "https://harishkumar.info",
    siteName: "Harish Kumar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harish Kumar - Full Stack Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Harish Kumar - Full Stack Engineer",
    description:
      "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis (AI debugging) and Stardust (container platform) — production-grade systems with full technical documentation.",
    images: ["/og-image.png"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-accent-foreground focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ShinyCursor />
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
