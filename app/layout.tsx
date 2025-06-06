import type React from "react"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Qantora - AI-Driven Fintech Platform",
  description: "AI-driven fintech platform designed specifically for retail traders and investors.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700,600,500&display=swap" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
