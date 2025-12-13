"use client"

import { useEffect } from "react"
import { Check, ArrowRight, ShieldCheck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

declare global {
  interface Window {
    fbq: any;
  }
}

export default function ObrigadoPage() {

  useEffect(() => {
    // 1. Disparo de Conversão (MANTIDO)
    // O pixel marca que o Lead foi capturado com sucesso
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', { // Ou 'Lead', dependendo da sua estratégia
            currency: 'BRL',
            value: 0.00,
            content_name: 'Lead Capturado'
        });
    }

    // SEM REDIRECIONAMENTO AUTOMÁTICO
    // O usuário precisa clicar para ir ao site real
  }, [])

  return (
    <main className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-[500px] w-full animate-in fade-in zoom-in duration-500">

          {/* Ícone de Sucesso */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-75" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl shadow-green-500/20">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Tudo Certo!
          </h1>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Recebemos seus dados com sucesso. <br className="hidden sm:block"/>
            Agora, <b>clique no botão abaixo</b> para acessar o site oficial e criar sua conta gratuitamente.
          </p>

          {/* Botão de Ação Principal - O único caminho */}
          <div className="space-y-6">
            <a
              href="https://freelinnk.com"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-xl bg-[#7B2BFF] text-white font-bold text-lg hover:bg-[#681CE6] transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Ir para o Site Oficial
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Selo de Segurança (Mata a objeção do cara chato) */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Ambiente Seguro - Pode clicar sem medo
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}