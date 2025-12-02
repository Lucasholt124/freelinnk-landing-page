"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Loader2, Sparkles, Shield, Zap, Lock } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(87)

  // Simulação de Escassez
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 0.1
        return next >= 96 ? 87 : next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erro ao processar sua solicitação.")
      }

      // SUCESSO: Redireciona para a página de obrigado (Melhor para o Pixel do Facebook)
      router.push("/obrigado")

    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.")
      setIsSubmitting(false) // Só para o loading se der erro
    }
  }

  const benefits = [
    { icon: Sparkles, text: "Ferramentas ULTRA de IA" },
    { icon: Zap, text: "Analytics em tempo real" },
    { icon: Shield, text: "100% seguro e LGPD" },
  ]

  return (
    <section className="w-full px-5 pt-4 pb-16 md:pt-8 md:pb-20">
      <div className="max-w-[600px] mx-auto">

        {/* Badge de Urgência */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7B2BFF]/10 to-[#0066FF]/10 border border-[#7B2BFF]/20 shadow-sm hover:scale-105 transition-transform">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B2BFF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7B2BFF]" />
            </span>
            <span className="text-sm font-bold text-[#7B2BFF] tracking-wide">Últimas 150 vagas disponíveis</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-foreground leading-[1.1] tracking-tight text-center mb-6 text-balance">
          Desbloqueie as ferramentas{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 bg-gradient-to-r from-[#7B2BFF] to-[#0066FF] bg-clip-text text-transparent">
              ULTRA
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#7B2BFF]/10 rounded-full -z-0" />
          </span>{" "}
          antes de todo mundo
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed mb-8 max-w-[520px] mx-auto text-pretty">
          IA avançada, analytics profissional e gestão financeira completa. Acesso exclusivo para os primeiros criadores.
        </p>

        {/* Benefícios Rápidos */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {benefits.map((benefit) => (
            <div
              key={benefit.text}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm"
            >
              <benefit.icon className="w-3.5 h-3.5 text-[#7B2BFF]" />
              <span className="text-xs font-semibold text-gray-700">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-[#7B2BFF]/10 border border-gray-100 relative overflow-hidden">

          {/* Barra de Progresso */}
          <div className="mb-6 p-4 rounded-xl bg-orange-50/80 border border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">Vagas preenchidas</span>
              <span className="text-sm font-bold text-orange-600">{Math.floor(progress)}%</span>
            </div>
            <div className="h-2.5 bg-orange-200/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                 <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Seu nome"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-14 px-5 rounded-xl border border-gray-200 bg-gray-50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B2BFF]/50 focus:border-[#7B2BFF] focus:bg-white transition-all text-base font-medium"
                />

                <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Seu melhor e-mail"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-14 px-5 rounded-xl border border-gray-200 bg-gray-50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B2BFF]/50 focus:border-[#7B2BFF] focus:bg-white transition-all text-base font-medium"
                />

                <div className="relative">
                    <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="WhatsApp (para confirmar sua vaga)"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-14 pl-5 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B2BFF]/50 focus:border-[#7B2BFF] focus:bg-white transition-all text-base font-medium"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute right-4 top-5 pointer-events-none" />
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 px-1 pt-1">
                 <Shield className="w-3 h-3 text-green-600" />
                 <span>Dados criptografados. Usaremos apenas para confirmar acesso.</span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium animate-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 mt-2 rounded-xl bg-[#7B2BFF] text-white font-bold text-lg hover:bg-[#6a25db] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-[#7B2BFF]/30 hover:shadow-[#7B2BFF]/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Garantindo sua vaga...
                </>
              ) : (
                "Quero Acesso Antecipado"
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-3 mt-6 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide font-medium opacity-80">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              LGPD Compliant
            </span>
            <span className="text-gray-300">|</span>
            <span>Sem spam</span>
            <span className="text-gray-300">|</span>
            <span>Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </section>
  )
}