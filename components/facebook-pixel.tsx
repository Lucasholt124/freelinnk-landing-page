'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Script from 'next/script'

export function FacebookPixel() {
  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Rastreia a mudança de rotas (Navegação SPA)
  useEffect(() => {
    if (!loaded) return

    // Pequeno delay para garantir que o título da página atualizou
    const timer = setTimeout(() => {
        import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.pageView()
        })
    }, 200)

    return () => clearTimeout(timer)
  }, [pathname, searchParams, loaded])

  return (
    <>
      <Script
        id="fb-pixel"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={() => {
          setLoaded(true)
          import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
              ReactPixel.init('719697624058334') // Seu ID
              ReactPixel.pageView()
            })
        }}
      />
    </>
  )
}