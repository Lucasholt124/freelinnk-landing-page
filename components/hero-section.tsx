"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, TrendingUp, Clock, Wallet } from "lucide-react"

// Declaração global para evitar erro de TypeScript no window.fbq
declare global {
  interface Window {
    fbq: any;
  }
}

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

  // Formatação visual do telefone
  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
      .slice(0, 15)
  }

  // Barra de escassez (Mantenha, funciona bem)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 0.1
        return next >= 98 ? 92 : next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    if (formData.phone.length < 14) {
        setError("Por favor, digite um WhatsApp válido com DDD.")
        setIsSubmitting(false)
        return
    }

    const payload = {
      ...formData,
      phone: formData.phone.replace(/\D/g, "")
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erro ao processar sua solicitação.")
      }

      // --- RASTREAMENTO CRÍTICO AQUI ---
      // Dispara o evento antes de sair da página para garantir que o Facebook marque o Lead
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
            content_name: 'Cadastro Acesso Antecipado',
            value: 0.00,
            currency: 'BRL'
        });
      }

      router.push("/obrigado")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.")
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full px-4 pt-4 pb-12 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-[640px] mx-auto relative z-10">

        {/* Badge de Urgência - Mais direto */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 shadow-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs font-bold text-red-600 tracking-wide uppercase">Últimas vagas do Lote Beta</span>
          </div>
        </div>

        {/* Headline: Fim da "IA Genérica", Foco no Benefício Real */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight text-center mb-6 text-balance">
          Pare de perder tempo com <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2BFF] to-[#6020D0]">
            Link na Bio amador.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 text-center leading-relaxed mb-8 max-w-[540px] mx-auto text-pretty">
          O Freelinnk é a única plataforma que <strong>cria seu conteúdo</strong>, organiza suas finanças e profissionaliza seu perfil automaticamente.
        </p>

        {/* Formulário Otimizado */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl shadow-[#7B2BFF]/15 border border-gray-100 relative">

           {/* Gatilho Visual de Progresso */}
          <div className="mb-6">
              <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  <span>Preenchimento das Vagas</span>
                  <span className="text-red-500 font-bold">Alta Demanda</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7B2BFF] via-purple-500 to-red-500 transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
              </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="sr-only">Seu Nome</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Digite seu primeiro nome"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 px-5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#7B2BFF] focus:ring-4 focus:ring-[#7B2BFF]/10 transition-all outline-none font-medium"
                />
              </div>

              <div>
                <label className="sr-only">Seu E-mail</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Seu melhor e-mail"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-14 px-5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#7B2BFF] focus:ring-4 focus:ring-[#7B2BFF]/10 transition-all outline-none font-medium"
                />
              </div>

              <div className="relative">
                  <label className="sr-only">Seu WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(DD) 99999-9999"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    maxLength={15}
                    className="w-full h-14 pl-5 pr-10 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#7B2BFF] focus:ring-4 focus:ring-[#7B2BFF]/10 transition-all outline-none font-medium"
                  />
              </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-semibold text-center animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 rounded-xl bg-[#7B2BFF] text-white font-bold text-lg hover:bg-[#6924db] hover:shadow-lg hover:shadow-[#7B2BFF]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin text-white/80" />
              ) : (
                <>
                  QUERO RESOLVER ISSO AGORA
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    <span>Aumente o Alcance</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#7B2BFF]" />
                    <span>Poupe Tempo</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    <Wallet className="w-3.5 h-3.5 text-blue-500" />
                    <span>Controle Lucros</span>
                </div>
            </div>
          </form>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
            🔒 Seus dados estão seguros. Não enviamos spam, apenas soluções.
        </p>

      </div>
    </section>
  )
}