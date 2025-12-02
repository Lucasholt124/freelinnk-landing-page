import { Brain, BarChart3, Wallet } from "lucide-react"

export function Benefits() {
  const benefits = [
    {
      icon: Brain,
      title: "IA Exclusiva Ultra",
      description: "Crie bios, legendas e conteúdos automaticamente com nossa IA treinada para criadores.",
      highlight: "Antes do lançamento público",
    },
    {
      icon: BarChart3,
      title: "Analytics Profissional",
      description: "Saiba exatamente quem clica, de onde vem, qual dispositivo usa e em que horário.",
      highlight: "Dados em tempo real",
    },
    {
      icon: Wallet,
      title: "Gestão Financeira",
      description: "Controle vendas, custos e lucro real sem precisar de planilhas ou apps externos.",
      highlight: "Tudo em um só lugar",
    },
  ]

  return (
    <section className="w-full px-6 py-16 md:py-24 bg-background">
      <div className="max-w-[680px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-[#7B2BFF] mb-3 uppercase tracking-widest">Tecnologia de Ponta</p>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Por que entrar agora?</h2>
        </div>

        <div className="space-y-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col sm:flex-row gap-5 p-6 md:p-8 rounded-2xl border border-border bg-white hover:border-[#7B2BFF]/30 hover:shadow-xl hover:shadow-[#7B2BFF]/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B2BFF] to-[#0066FF] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-[#7B2BFF]/20">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#7B2BFF] transition-colors">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                  <span className="shrink-0 inline-flex items-center justify-center text-[10px] font-bold text-[#7B2BFF] bg-[#7B2BFF]/5 border border-[#7B2BFF]/10 px-3 py-1 rounded-full uppercase tracking-wide self-start">
                    {benefit.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}