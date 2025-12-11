import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react" // Importante
import { FacebookPixel } from "@/components/facebook-pixel" // Importe o novo componente
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Freelinnk | Seu Negócio Digital Profissional",
  description:
    "A única plataforma que une Link na Bio, Criação de Conteúdo Automática e Gestão Financeira. Profissionalize seu perfil agora.",
  keywords: ["freelinnk", "link na bio", "gestão financeira", "criadores", "automação"],
  openGraph: {
    title: "Freelinnk | Profissionalize seu Perfil",
    description: "Pare de perder tempo. Automatize seu conteúdo e organize suas finanças.",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: "#7B2BFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased bg-white`}>
        {/* Pixel Envolto em Suspense para performance máxima */}
        <Suspense fallback={null}>
            <FacebookPixel />
        </Suspense>

        {children}
        <Analytics />
      </body>
    </html>
  )
}