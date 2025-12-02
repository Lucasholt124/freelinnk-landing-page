import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Freelinnk | Acesso Antecipado às Ferramentas Ultra",
  description:
    "Receba acesso às ferramentas mais poderosas da plataforma antes de todo mundo: Analytics avançado, IA, gestor financeiro e muito mais.",
  keywords: ["freelinnk", "link na bio", "analytics", "criadores", "IA"],
  openGraph: {
    title: "Freelinnk | Acesso Antecipado às Ferramentas Ultra",
    description: "Receba acesso às ferramentas mais poderosas da plataforma antes de todo mundo.",
    type: "website",
    locale: "pt_BR",
  },
  generator: 'v0.app',
  // AQUI ESTÁ A CONFIGURAÇÃO EXATA DO SEU ÍCONE
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}