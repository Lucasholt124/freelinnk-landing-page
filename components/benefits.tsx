import { Target, Clock, DollarSign } from "lucide-react"

export function Benefits() {
  const benefits = [
    {
      icon: Target,
      title: "Bio que Converte",
      description: "Chega de perder seguidores. Tenha um perfil estético, rápido e otimizado para transformar visitas em vendas ou contratos.",
      highlight: "Essencial",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Conteúdo no Piloto Automático",
      description: "Sem ideias para postar? Nossa inteligência cria legendas, roteiros e bios para você em segundos. Nunca mais trave na frente da tela.",
      highlight: "Economia de Tempo",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "Financeiro Descomplicado",
      description: "Planilhas são chatas. Saiba exatamente quanto entrou, quanto saiu e qual seu lucro real na palma da mão.",
      highlight: "Controle Total",
      color: "from-green-500 to-emerald-500"
    },
  ]

  return (
    <section className="w-full px-6 py-16 bg-white border-t border-gray-50">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Por que você precisa disso <span className="text-[#7B2BFF]">hoje</span>?
          </h2>
          <p className="text-gray-500">Substitua 3 ferramentas caras e complexas por uma única solução simples.</p>
        </div>

        <div className="grid gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative overflow-hidden flex flex-col sm:flex-row gap-5 p-6 md:p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#7B2BFF]/30 hover:shadow-xl hover:shadow-[#7B2BFF]/5 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shrink-0 shadow-lg opacity-90 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              
              <div className="flex-1 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7B2BFF] transition-colors">{benefit.title}</h3>
                    <span className="self-start sm:self-auto inline-flex items-center justify-center text-[10px] font-bold text-[#7B2BFF] bg-[#7B2BFF]/5 border border-[#7B2BFF]/10 px-3 py-1 rounded-full uppercase tracking-wide">
                        {benefit.highlight}
                    </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}