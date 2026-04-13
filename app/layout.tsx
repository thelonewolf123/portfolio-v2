import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harish Kumar - Full Stack Engineer",
  description:
    "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Currently building Aegis — an AI system for querying and debugging production systems.",
  generator: "v0.app",
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
