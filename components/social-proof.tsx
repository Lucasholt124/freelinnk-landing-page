"use client"

import { useEffect, useState } from "react"
import { Users, MousePointerClick, TrendingUp } from "lucide-react"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1500
    const increment = value / (duration / 16)

    const animate = () => {
      start += increment
      if (start >= value) {
        setDisplayValue(value)
      } else {
        setDisplayValue(start)
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [value])

  return <>{Math.floor(displayValue).toLocaleString()}{suffix}</>
}

export function SocialProofSection() {
  const stats = [
    {
      icon: Users,
      label: "Criadores cadastrados",
      value: 2800,
      suffix: "+",
    },
    {
      icon: MousePointerClick,
      label: "Cliques analisados",
      value: 1200000,
      suffix: "+",
    },
    {
      icon: TrendingUp,
      label: "Média de crescimento",
      value: 37,
      suffix: "%",
    },
  ]

  return (
    <section className="w-full px-6 py-16 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-10">
          Quem usa Freelinnk <span className="text-[#7B2BFF]">cresce de verdade</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:shadow-[#7B2BFF]/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#7B2BFF]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-[#7B2BFF]" />
              </div>

              <p className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}