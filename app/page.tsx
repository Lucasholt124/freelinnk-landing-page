import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SocialProofSection } from "@/components/social-proof"
import { Benefits } from "@/components/benefits"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] selection:bg-[#7B2BFF] selection:text-white overflow-x-hidden">
      {/* Background Decorativo Otimizado para não pesar no carregamento */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#7B2BFF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <SocialProofSection />
        <Benefits />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  )
}