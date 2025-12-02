import { Shield, Lock, CheckCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full px-6 py-12 border-t border-gray-100 bg-white">
      <div className="max-w-[680px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B2BFF] to-[#5B1BD9] flex items-center justify-center shadow-lg shadow-[#7B2BFF]/20">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Freelinnk</span>
        </div>

        <p className="text-gray-500 font-medium mb-6 text-sm">
          Feito com <span className="text-[#7B2BFF] animate-pulse">❤</span> no Brasil para o mundo
        </p>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap font-medium">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50">
            <Shield className="w-3.5 h-3.5 text-[#7B2BFF]" />
            100% Seguro
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50">
            <CheckCircle className="w-3.5 h-3.5 text-[#7B2BFF]" />
            LGPD Compliant
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50">
            <Lock className="w-3.5 h-3.5 text-[#7B2BFF]" />
            SSL 256-bit
          </span>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400">© 2025 Freelinnk. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}