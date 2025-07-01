"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Home, Info, Zap, MessageSquare, ArrowRight, Mail, Phone, Plus, Minus } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { Navbar } from "@/components/navbar"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { ResearchContent } from "@/components/research-content"
import { FutureContent } from "@/components/future-content"
import { cn } from "@/lib/utils"
import AnimatedTextCycle from "@/components/ui/animated-text-cycle"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { motion } from "framer-motion"
import { MobileEdgeSection } from "@/components/mobile-edge-section"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [researchSheetOpen, setResearchSheetOpen] = useState(false)
  const [futureSheetOpen, setFutureSheetOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Refs for section transitions
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Updated sections - removed "reserve"
  const sections = useRef([
    { id: "home", icon: Home, label: "Home" },
    { id: "why", icon: Info, label: "Why" },
    { id: "edge", icon: Zap, label: "Edge" },
    { id: "faq", icon: MessageSquare, label: "FAQ" },
  ])

  const faqData = [
    {
      question: "What is Qantora?",
      answer:
        "Qantora is an AI-powered multi-asset trading platform that gives everyday traders improved tools, community support, and learning resources—all under one roof. It's not just software. It's a trading evolution—a movement toward clarity, confidence, and growth.",
    },
    {
      question: "What is Qantora's vision?",
      answer:
        "To democratize intelligent trading by giving retail investors an adaptive edge—powered by AI, enriched by community, and driven by education.",
    },
    {
      question: "I'm new to trading—can Qantora help me learn?",
      answer:
        "Absolutely. Our Learning Hub offers step-by-step modules from the fundamentals to advanced tactics. Pair that with Cato AI's personalized coaching and community feedback, and you'll build real trading wisdom—fast.",
    },
    {
      question: "How do I get started?",
      answer:
        "Click the 'Get Started' button to create your account and begin your journey with Qantora's full suite of tools, AI-powered insights, and our thriving trading community.",
    },
    {
      question: "What features does Qantora offer?",
      answer:
        "Qantora provides AI-powered trading tools, performance tracking, community collaboration, educational resources, Cato AI assistant, MarketView charts, and personalized dashboards—all designed to give you a competitive edge in the market.",
    },
    {
      question: "Is Qantora suitable for beginners?",
      answer:
        "Yes, Qantora is designed for traders of all experience levels. Beginners will benefit from our educational resources and AI guidance, while experienced traders will appreciate our advanced tools and community insights.",
    },
  ]

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Track mouse position for subtle background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for fixed navbar
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight

    // Calculate scroll progress
    const progress = Math.min(scrollY / documentHeight, 1)
    setScrollProgress(progress * 100)

    // Section visibility and active state
    sectionRefs.current.forEach((section) => {
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionId = section.id

      // Active section for navigation
      if (rect.top <= 100 && rect.bottom >= 100) {
        if (activeSection !== sectionId) {
          setActiveSection(sectionId)
        }
      }
    })
  }

  // Handle scroll reveal animations and scroll progress
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  useEffect(() => {
    setMounted(true)

    // Collect all sections
    sectionRefs.current = sections.current.map((section) => document.getElementById(section.id))
  }, [])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Enhanced Scroll Progress Indicator */}
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* New Navbar Component */}
      <Navbar
        items={sections.current.map((section) => ({ id: section.id, label: section.label }))}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      <main className="flex-1 pt-24 md:pt-28">
        {/* Hero Section - Enhanced with beautiful background and improved mobile spacing */}
        <section
          id="home"
          ref={(el) => (sectionRefs.current[0] = el)}
          className="section-fullscreen relative w-full overflow-hidden flex items-center"
        >
          {/* Enhanced modern UI hero background */}
          <div className="hero-background">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

            {/* Soft floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-50/30 to-transparent blur-[80px] animate-float-slow"></div>
              <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-gradient-to-tl from-gray-100/40 to-transparent blur-[60px] animate-float-slow-reverse"></div>
              <div className="absolute top-[40%] right-[15%] w-[25%] h-[25%] rounded-full bg-gradient-to-bl from-gray-50/30 to-transparent blur-[50px] animate-float-medium"></div>
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.015]"></div>

            {/* Interactive glow that follows mouse */}
            <div
              className="absolute w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-blue-50/20 via-white/30 to-gray-50/20 blur-[80px] opacity-70 pointer-events-none"
              style={{
                left: `calc(${mousePosition.x * 100}% - 25vw)`,
                top: `calc(${mousePosition.y * 100}% - 25vw)`,
                transition: "transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1)",
                transform: `translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px)`,
              }}
            ></div>

            {/* Subtle bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto hero-content-mobile">
              <div className={cn("space-y-8 md:space-y-10 w-full", isMobile && "space-y-5")}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <h1
                    className={cn(
                      "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight text-[#111827]",
                      isMobile && "hero-title-mobile",
                    )}
                  >
                    <span className="block">
                      Your{" "}
                      <AnimatedTextCycle
                        words={[
                          "Trading",
                          "Execution",
                          "Strategy",
                          "Precision",
                          "Investing",
                          "Portfolio",
                          "Growth",
                          "Analysis",
                          "Edge",
                          "Workflow",
                        ]}
                        interval={3000}
                        className="text-[#111827]"
                      />
                    </span>
                    <span className="block mt-2 md:mt-3">Superpowered.</span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={cn(
                    "max-w-[800px] text-gray-600 text-lg sm:text-xl md:text-2xl font-light",
                    isMobile && "hero-description-mobile",
                  )}
                >
                  Cut through the chaos. Trade with clarity, confidence, and your own AI-powered edge.
                </motion.p>

                {/* Humorous line with typing animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-gray-600 text-base sm:text-lg italic"
                >
                  <TypingAnimation
                    text="🤝 Just you, your charts, your dog... and Cato AI."
                    speed={40}
                    delay={1000}
                    className="font-medium"
                  />
                </motion.div>

                {/* Enhanced CTA button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className={cn("pt-4", isMobile && "hero-cta-mobile")}
                >
                  <Link href="/auth">
                    <Button className="bg-[#111827] hover:bg-[#1F2937] h-12 md:h-14 px-6 md:px-8 text-base group transition-all duration-500 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 relative overflow-hidden">
                      <span className="relative z-10">Get Started</span>
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                      <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Qantora Section - With alternating background */}
        <section
          id="why"
          ref={(el) => (sectionRefs.current[1] = el)}
          className="section-fullscreen w-full bg-[#F9FAFB] relative overflow-hidden flex items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#111827] shadow-sm">
                  Why Qantora
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#111827]">
                  The Evolution of Trading
                </h2>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-10 md:mt-16 text-center">
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                You've studied the markets, tweaked strategies, and sat through chart after chart. Still, something's
                missing. The tools feel fragmented. The insights? A step behind. And that edge you keep chasing... it's
                either too shallow or too costly.
              </p>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed mt-6 md:mt-8">
                We've been there. The late-night trades, the near-misses, the burnouts. But what if your toolkit evolved
                with you? What if it understood you?
              </p>
              <p className="text-[#111827] text-lg md:text-xl lg:text-2xl font-display font-semibold mt-6 md:mt-8">
                That's where Qantora begins.
              </p>
            </div>
          </div>
        </section>

        {/* Your Edge Section */}
        <section
          id="edge"
          ref={(el) => (sectionRefs.current[2] = el)}
          className="section-fullscreen w-full bg-white relative overflow-hidden flex items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#111827] shadow-sm">
                  Your Edge
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#111827]">
                  What Life Looks Like With Qantora
                </h2>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8 md:mt-12 text-center">
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                Imagine logging in and seeing more than just stats. You see clarity. Your trading journal isn't just a
                record — it's a mirror. Your strategies aren't just guesses — they're informed, evolving, and adaptive.
                You're no longer trading alone. You're trading smarter.
              </p>
              <p className="text-[#111827] text-lg md:text-xl lg:text-2xl font-display font-semibold mt-6 md:mt-8">
                Welcome to your edge:
              </p>
            </div>

            {/* Desktop Grid - Hidden on mobile */}
            <div className="mt-10 md:mt-16 max-w-6xl mx-auto hidden md:block">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 h-full flex flex-col group">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="text-lg md:text-xl font-display flex items-center">
                      <span className="text-[#111827] mr-2 transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Performance Tracking & Journaling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm md:text-base transition-all duration-300 group-hover:text-gray-800">
                      Advanced trade journals. Metrics that matter. Reflect, refine, repeat — all in one place.
                    </p>
                  </CardContent>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 h-full flex flex-col group">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="text-lg md:text-xl font-display flex items-center">
                      <span className="text-[#111827] mr-2 transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Community & Collaboration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm md:text-base transition-all duration-300 group-hover:text-gray-800">
                      You're surrounded by like-minded traders. Share insights, discuss strategies, or just vibe with
                      those who get it.
                    </p>
                  </CardContent>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 h-full flex flex-col group">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="text-lg md:text-xl font-display flex items-center">
                      <span className="text-[#111827] mr-2 transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Educational Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm md:text-base transition-all duration-300 group-hover:text-gray-800">
                      Never stop growing. Access curated learning for every stage of your journey — from beginner
                      blueprints to pro-level breakdowns.
                    </p>
                  </CardContent>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 h-full flex flex-col group">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="text-lg md:text-xl font-display flex items-center">
                      <span className="text-[#111827] mr-2 transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Cato – Your Trading AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm md:text-base transition-all duration-300 group-hover:text-gray-800">
                      Think of it as your second brain. Ask, analyze, forecast. Cato isn't just an assistant — it's
                      intuition with intelligence.
                    </p>
                  </CardContent>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 h-full flex flex-col group">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="text-lg md:text-xl font-display flex items-center">
                      <span className="text-[#111827] mr-2 transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      MarketView
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm md:text-base transition-all duration-300 group-hover:text-gray-800">
                      Unlock live, multi‑asset charts—stocks, forex, crypto, commodities—all in one place with on-chart
                      risk alerts. It's about managing the risks.
                    </p>
                  </CardContent>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 h-full flex flex-col group">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="text-lg md:text-xl font-display flex items-center">
                      <span className="text-[#111827] mr-2 transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Personalization & Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm md:text-base transition-all duration-300 group-hover:text-gray-800">
                      Your space. Your vibe. Custom dashboards, smart notifications, seamless design. Tailored to how
                      you trade best.
                    </p>
                  </CardContent>
                </div>
              </div>
            </div>

            {/* Mobile-specific design */}
            {isMobile && (
              <div className="mt-10 md:hidden">
                <MobileEdgeSection />
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          ref={(el) => (sectionRefs.current[3] = el)}
          className="section-fullscreen w-full bg-[#F9FAFB] relative overflow-hidden flex items-center py-16 md:py-24"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-8 md:mb-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#111827] shadow-sm">FAQ</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#111827]">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[600px] text-gray-600 text-base md:text-lg lg:text-xl font-light">
                  Everything you need to know about Qantora
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* FAQ Accordion */}
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className={cn(
                      "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300",
                      openFaq === index ? "shadow-md" : "",
                    )}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none group hover:bg-gray-50/50 transition-all duration-300"
                    >
                      <h3 className="font-display text-lg md:text-xl font-semibold text-[#111827] group-hover:translate-x-1 transition-transform duration-300">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-4 transition-transform duration-300">
                        {openFaq === index ? (
                          <Minus className="h-5 w-5 text-[#111827] transition-transform duration-300 rotate-90 group-hover:rotate-180" />
                        ) : (
                          <Plus className="h-5 w-5 text-[#111827] transition-transform duration-300 group-hover:rotate-90" />
                        )}
                      </div>
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out",
                        openFaq === index ? "max-h-96" : "max-h-0",
                      )}
                    >
                      <div
                        className={cn(
                          "p-5 pt-0 border-t border-gray-100 transition-all duration-300",
                          openFaq === index ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-6">Ready to experience Qantora?</p>
                <Link href="/auth">
                  <Button className="bg-[#111827] hover:bg-[#1F2937] h-12 px-6 text-base group transition-all duration-300 hover:shadow-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="w-full border-t border-gray-100 py-12 md:py-20 lg:py-24 bg-white">
        <div className="container px-4 md:px-6">
          {/* Enhanced Desktop Footer */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Brand and Description */}
              <div className="md:col-span-5">
                <div className="flex items-center mb-6">
                  <BrandLogo size="lg" className="mr-3" animated />
                  <span className="text-2xl font-display font-bold tracking-tight text-[#111827]">QANTORA</span>
                </div>
                <p className="text-gray-600 text-base max-w-md leading-relaxed mb-8">
                  Built by traders. Powered by intelligence. Designed for your edge. Qantora provides AI-driven tools
                  and resources to help everyday traders succeed in the market.
                </p>
                {/* Social media icons */}
                <div className="flex items-center gap-6">
                  <a
                    href="mailto:qantoratech@gmail.com"
                    className="text-gray-500 hover:text-[#111827] transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                  <a
                    href="https://wa.me/+17165412204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#111827] transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <Phone className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Navigation */}
                  <div>
                    <h3 className="text-xl font-semibold font-display mb-6 text-[#111827]">Navigation</h3>
                    <div className="flex flex-col space-y-4">
                      {sections.current.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                        >
                          {section.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h3 className="text-xl font-semibold font-display mb-6 text-[#111827]">Resources</h3>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => setResearchSheetOpen(true)}
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                      >
                        Research
                      </button>
                      <button
                        onClick={() => setFutureSheetOpen(true)}
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                      >
                        Future
                      </button>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                      >
                        Blog
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                      >
                        Documentation
                      </Link>
                    </div>
                  </div>

                  {/* Legal */}
                  <div>
                    <h3 className="text-xl font-semibold font-display mb-6 text-[#111827]">Legal</h3>
                    <div className="flex flex-col space-y-4">
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                      >
                        Terms of Service
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left hover:translate-x-1 duration-300"
                      >
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Qantora. All rights reserved.</p>
              <p className="text-sm text-gray-500">Crafted with precision for the modern trader.</p>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="lg:hidden">
            <div className="flex flex-col space-y-8">
              {/* Brand and Description */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <BrandLogo size="md" className="mr-2" animated />
                  <span className="text-xl font-display font-bold tracking-tight text-[#111827]">QANTORA</span>
                </div>
                <p className="text-gray-600 text-sm md:text-base max-w-xs mx-auto md:mx-0">
                  Built by traders. Powered by intelligence. Designed for your edge.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                  <a
                    href="mailto:qantoratech@gmail.com"
                    className="text-gray-500 hover:text-[#111827] transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/+17165412204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#111827] transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Mobile-optimized footer links */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold font-display mb-4 text-[#111827]">Explore</h3>
                  <div className="flex flex-col space-y-3">
                    {sections.current.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="text-gray-500 hover:text-[#111827] transition-colors text-left"
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-lg font-semibold font-display mb-4 text-[#111827]">Resources</h3>
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => setResearchSheetOpen(true)}
                      className="text-gray-500 hover:text-[#111827] transition-colors text-left"
                    >
                      Research
                    </button>
                    <button
                      onClick={() => setFutureSheetOpen(true)}
                      className="text-gray-500 hover:text-[#111827] transition-colors text-left"
                    >
                      Future
                    </button>
                    <Link href="#" className="text-gray-500 hover:text-[#111827] transition-colors text-left">
                      Blog
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-[#111827] transition-colors text-left">
                      Documentation
                    </Link>
                  </div>
                </div>

                {/* Legal */}
                <div className="col-span-2 md:col-span-1">
                  <h3 className="text-lg font-semibold font-display mb-4 text-[#111827]">Legal</h3>
                  <div className="flex flex-col space-y-3">
                    <Link href="#" className="text-gray-500 hover:text-[#111827] transition-colors text-left">
                      Privacy Policy
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-[#111827] transition-colors text-left">
                      Terms of Service
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-[#111827] transition-colors text-left">
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Qantora. All rights reserved.</p>
              <p className="text-sm text-gray-500 mt-2 md:mt-0">Crafted with precision for the modern trader.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Bottom Sheets */}
      <BottomSheet isOpen={researchSheetOpen} onClose={() => setResearchSheetOpen(false)} title="Research">
        <ResearchContent />
      </BottomSheet>

      <BottomSheet isOpen={futureSheetOpen} onClose={() => setFutureSheetOpen(false)} title="Future">
        <FutureContent />
      </BottomSheet>
    </div>
  )
}
