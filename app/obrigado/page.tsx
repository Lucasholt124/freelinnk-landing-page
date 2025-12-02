"use client"

import { useEffect, useState } from "react"
import { Check, Loader2, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ObrigadoPage() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Contador regressivo
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    // Redirecionamento automático após 5 segundos
    const redirect = setTimeout(() => {
      window.location.href = "https://freelinnk.com"
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-[500px] w-full animate-in fade-in zoom-in duration-500">

          {/* Ícone de Sucesso Pulsante */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-75" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl shadow-green-500/20">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Vaga Garantida! 🚀
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Seus dados foram recebidos. Já enviamos o acesso para o seu e-mail e WhatsApp.
          </p>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg shadow-[#7B2BFF]/5 mb-8">
            <p className="text-sm font-medium text-gray-500 mb-2">Redirecionando para a plataforma em</p>
            <div className="text-4xl font-bold text-[#7B2BFF] mb-2">{countdown}s</div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
               <Loader2 className="w-3 h-3 animate-spin" />
               Aguarde um momento...
            </div>
          </div>

          <a
            href="https://freelinnk.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7B2BFF] text-white font-bold text-lg hover:bg-[#681CE6] transition-all shadow-lg hover:scale-105"
          >
            Acessar Agora
            <ArrowRight className="w-5 h-5" />
          </a>

        </div>
      </div>

      <Footer />
    </main>
  )
}