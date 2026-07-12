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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808"
};

export const metadata: Metadata = {
  title: "Harish Kumar - Full Stack & AI Engineer",
  description:
    "AI Engineer building production-grade AI agent systems — Aegis (AI debugging), Mail Pilot (AI-native email), and Quartermaster (conversational AI). 5+ years building scalable systems. Speaker at Chennai Web Conf on 'Artemis: Personal AI OS'.",
  metadataBase: new URL("https://harishkumar.info"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Harish Kumar - Full Stack & AI Engineer",
    description:
      "AI Engineer building production-grade AI agent systems — Aegis (AI debugging), Mail Pilot (AI-native email), and Quartermaster (conversational AI). 5+ years building scalable systems. Speaker at Chennai Web Conf on 'Artemis: Personal AI OS'.",
    url: "https://harishkumar.info",
    siteName: "Harish Kumar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harish Kumar - Full Stack & AI Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Harish Kumar - Full Stack & AI Engineer",
    description:
      "AI Engineer building production-grade AI agent systems — Aegis (AI debugging), Mail Pilot (AI-native email), and Quartermaster (conversational AI). 5+ years building scalable systems. Speaker at Chennai Web Conf on 'Artemis: Personal AI OS'.",
    images: ["/og-image.png"]
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/favicon-assets/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/favicon-assets/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/favicon-assets/favicon.svg",
        type: "image/svg+xml"
      }
    ],
    apple: [
      {
        url: "/favicon-assets/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  },
  manifest: "/favicon-assets/site.webmanifest"
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
