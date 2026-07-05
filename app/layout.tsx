import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harish Kumar - Full Stack Engineer",
  description:
    "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis (AI debugging) and Stardust (container platform) — production-grade systems with full technical documentation.",
  openGraph: {
    title: "Harish Kumar - Full Stack Engineer",
    description:
      "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis (AI debugging) and Stardust (container platform) — production-grade systems with full technical documentation.",
    url: "https://harishkumar.dev",
    siteName: "Harish Kumar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harish Kumar - Full Stack Engineer",
    description:
      "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis (AI debugging) and Stardust (container platform) — production-grade systems with full technical documentation.",
  },
  robots: { index: true, follow: true },
}

import { ShinyCursor } from "@/components/ui/shiny-cursor"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ShinyCursor />
        {children}
      </body>
    </html>
  )
}
