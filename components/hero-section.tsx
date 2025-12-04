"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Sparkles, Shield, Zap, Lock } from "lucide-react"

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

  // Função visual: Formata o telefone para o usuário ver bonito (ex: (11) 99999-9999)
  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
      .slice(0, 15)
  }

  // Simulação da barra de progresso (Gatilho de Escassez)
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

    // 1. Validação básica: impede envio de números incompletos
    if (formData.phone.length < 14) {
        setError("Por favor, digite um WhatsApp válido com DDD.")
        setIsSubmitting(false)
        return
    }

    // 2. LIMPEZA PARA O BREVO: Remove parênteses, traços e espaços
    // O usuário vê formatado, mas a API recebe limpo (ex: 11999999999)
    const payload = {
      ...formData,
      phone: formData.phone.replace(/\D/g, "")
    }

    try {
      // Chama sua rota API existente (que conecta com o Brevo)
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Envia o payload limpo
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erro ao processar sua solicitação.")
      }

      // Sucesso: Redireciona para obrigado
      router.push("/obrigado")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.")
      setIsSubmitting(false)
    }
  }

  const benefits = [
    { icon: Sparkles, text: "IA Ultra" },
    { icon: Zap, text: "Analytics Real" },
    { icon: Shield, text: "Seguro" },
  ]

  return (
    <section className="w-full px-4 pt-2 pb-12 md:pt-10 md:pb-20">
      <div className="max-w-[580px] mx-auto">

        {/* Badge de Urgência */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7B2BFF]/10 to-[#0066FF]/10 border border-[#7B2BFF]/20 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B2BFF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7B2BFF]" />
            </span>
            <span className="text-xs md:text-sm font-bold text-[#7B2BFF] tracking-wide">Restam apenas 12 vagas hoje</span>
          </div>
        </div>

        {/* Headline Otimizada */}
        <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-foreground leading-[1.1] tracking-tight text-center mb-4 text-balance">
          Desbloqueie o Poder{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 bg-gradient-to-r from-[#7B2BFF] to-[#0066FF] bg-clip-text text-transparent">
              ULTRA
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#7B2BFF]/10 rounded-full -z-0" />
          </span>
        </h1>

        <p className="text-base md:text-xl text-muted-foreground text-center leading-relaxed mb-6 max-w-[520px] mx-auto text-pretty px-2">
          Acesso exclusivo à IA que cria seu conteúdo e gerencia suas finanças.
        </p>

        {/* Formulário de Alta Conversão */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl shadow-[#7B2BFF]/15 border border-gray-100 relative overflow-hidden">

          {/* Barra de Progresso */}
          <div className="mb-5 md:mb-6">
             <div className="flex justify-between text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                 <span>Status das Vagas</span>
                 <span className="text-orange-600 animate-pulse">Quase Esgotado</span>
             </div>
             <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                 <div
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                 />
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Seu primeiro nome"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-12 md:h-14 px-5 rounded-xl border border-gray-200 bg-gray-50 text-base focus:bg-white focus:border-[#7B2BFF] focus:ring-2 focus:ring-[#7B2BFF]/20 transition-all outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Seu melhor e-mail"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 md:h-14 px-5 rounded-xl border border-gray-200 bg-gray-50 text-base focus:bg-white focus:border-[#7B2BFF] focus:ring-2 focus:ring-[#7B2BFF]/20 transition-all outline-none"
              />

              <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(DD) 99999-9999"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    maxLength={15}
                    className="w-full h-12 md:h-14 pl-5 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-base focus:bg-white focus:border-[#7B2BFF] focus:ring-2 focus:ring-[#7B2BFF]/20 transition-all outline-none"
                  />
                  <Lock className="w-4 h-4 text-green-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 md:h-16 mt-2 rounded-xl bg-gradient-to-r from-[#7B2BFF] to-[#6020D0] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#7B2BFF]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "LIBERAR MEU ACESSO AGORA"
              )}
            </button>

            <p className="text-[10px] text-center text-gray-400 mt-3">
               🔒 Seus dados estão 100% seguros e criptografados.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}