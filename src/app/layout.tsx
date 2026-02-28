import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AnimapleCore Powered by Otakudesu",
  description: "Core API for Project Animaple, scraping Otakudesu data.",
  openGraph: {
    title: "AnimapleCore Powered by Otakudesu",
    description: "Core API for Project Animaple, scraping Otakudesu data.",
    url: "https://animaple-core.vercel.app",
    siteName: "AnimapleCore",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "AnimapleCore Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AnimapleCore Powered by Otakudesu",
    description: "Core API for Project Animaple, scraping Otakudesu data.",
    images: ["/icon.png"],
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>{children}</body>
    </html>
  )
}