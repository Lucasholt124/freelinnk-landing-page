export function Header() {
  return (
    <header className="w-full py-6 px-6 bg-white/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-[680px] mx-auto flex justify-center md:justify-start">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7B2BFF] to-[#5B1BD9] flex items-center justify-center shadow-lg shadow-[#7B2BFF]/20">
            <span className="text-white font-bold text-base">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Freelinnk</span>
        </div>
      </div>
    </header>
  )
}