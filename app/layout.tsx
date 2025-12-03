import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script" // ✅ Import do Script adicionado
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
        {/* ✅ INÍCIO: Meta Pixel Code */}
        <Script
          id="meta-pixel-lp"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '719697624058334');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=719697624058334&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>
        {/* ✅ FIM: Meta Pixel Code */}

        {children}
        <Analytics />
      </body>
    </html>
  )
}