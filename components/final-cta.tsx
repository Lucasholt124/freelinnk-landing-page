"use client"

import { ArrowUp, Sparkles } from "lucide-react"

export function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="w-full px-4 py-16 mb-8">
      <div className="max-w-[680px] mx-auto text-center">
        <div className="relative overflow-hidden bg-[#111] rounded-[2rem] p-10 md:p-14 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B2BFF]/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0066FF]/30 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              Acesso Antecipado Exclusivo
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance tracking-tight">
              Não perca a chance de sair na frente
            </h2>
            <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">
              Vagas extremamente limitadas. Este lote pode encerrar a qualquer momento.
            </p>

            <button
              onClick={scrollToTop}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl bg-white text-[#111] font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105 active:scale-100"
            >
              Sim, quero minha vaga agora
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}