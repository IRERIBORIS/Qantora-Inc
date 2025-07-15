"use client"
import * as React from 'react'
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
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

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
          ref={(el) => {
            sectionRefs.current[0] = el
          }}
          className="section-fullscreen relative flex w-full items-center overflow-hidden"
        >
          {/* Enhanced modern UI hero background */}
          <div className="hero-background">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

            {/* Soft floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-float-slow absolute left-[5%] top-[10%] size-2/5 rounded-full bg-gradient-to-br from-blue-50/30 to-transparent blur-[80px]"></div>
              <div className="animate-float-slow-reverse absolute bottom-[20%] right-[10%] size-[35%] rounded-full bg-gradient-to-tl from-gray-100/40 to-transparent blur-[60px]"></div>
              <div className="animate-float-medium absolute right-[15%] top-[40%] size-[25%] rounded-full bg-gradient-to-bl from-gray-50/30 to-transparent blur-[50px]"></div>
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.015]"></div>

            {/* Interactive glow that follows mouse */}
            <div
              className="pointer-events-none absolute size-[50vw] rounded-full bg-gradient-to-r from-blue-50/20 via-white/30 to-gray-50/20 opacity-70 blur-[80px]"
              style={{
                left: `calc(${mousePosition.x * 100}% - 25vw)`,
                top: `calc(${mousePosition.y * 100}% - 25vw)`,
                transition: "transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1)",
                transform: `translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px)`,
              }}
            ></div>

            {/* Subtle bottom line */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          <div className="container relative px-4 md:px-6">
            <div className="hero-content-mobile mx-auto flex max-w-4xl flex-col items-center text-center">
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
                    <span className="mt-2 block md:mt-3">Superpowered.</span>
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
                  className="text-base italic text-gray-600 sm:text-lg"
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
                    <Button className="group relative h-12 overflow-hidden bg-[#111827] px-6 text-base transition-all duration-500 hover:-translate-y-1 hover:bg-[#1F2937] hover:shadow-lg active:translate-y-0 md:h-14 md:px-8">
                      <span className="relative z-10">Get Started</span>
                      <ChevronRight className="relative z-10 ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 ease-out group-hover:translate-x-0"></span>
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
          ref={(el) => {
            sectionRefs.current[1] = el as HTMLElement | null;
          }}
          className="section-fullscreen relative flex w-full items-center overflow-hidden bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#111827] shadow-sm">
                  Why Qantora
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#111827] md:text-4xl lg:text-5xl">
                  The Evolution of Trading
                </h2>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-center md:mt-16">
              <p className="text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
                You've studied the markets, tweaked strategies, and sat through chart after chart. Still, something's
                missing. The tools feel fragmented. The insights? A step behind. And that edge you keep chasing... it's
                either too shallow or too costly.
              </p>
              <p className="mt-6 text-base leading-relaxed text-gray-600 md:mt-8 md:text-lg lg:text-xl">
                We've been there. The late-night trades, the near-misses, the burnouts. But what if your toolkit evolved
                with you? What if it understood you?
              </p>
              <p className="mt-6 font-display text-lg font-semibold text-[#111827] md:mt-8 md:text-xl lg:text-2xl">
                That's where Qantora begins.
              </p>
            </div>
          </div>
        </section>

        {/* Your Edge Section */}
        <section
          id="edge"
          ref={el => { sectionRefs.current[2] = el as HTMLElement | null }}
          className="section-fullscreen relative flex w-full items-center overflow-hidden bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#111827] shadow-sm">
                  Your Edge
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#111827] md:text-4xl lg:text-5xl">
                  What Life Looks Like With Qantora
                </h2>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-4xl text-center md:mt-12">
              <p className="text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
                Imagine logging in and seeing more than just stats. You see clarity. Your trading journal isn't just a
                record — it's a mirror. Your strategies aren't just guesses — they're informed, evolving, and adaptive.
                You're no longer trading alone. You're trading smarter.
              </p>
              <p className="mt-6 font-display text-lg font-semibold text-[#111827] md:mt-8 md:text-xl lg:text-2xl">
                Welcome to your edge:
              </p>
            </div>

            {/* Desktop Grid - Hidden on mobile */}
            <div className="mx-auto mt-10 hidden max-w-6xl md:mt-16 md:block">
              <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <div className="group flex h-full flex-col rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="flex items-center font-display text-lg md:text-xl">
                      <span className="mr-2 text-[#111827] transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Performance Tracking & Journaling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800 md:text-base">
                      Advanced trade journals. Metrics that matter. Reflect, refine, repeat — all in one place.
                    </p>
                  </CardContent>
                </div>

                <div className="group flex h-full flex-col rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="flex items-center font-display text-lg md:text-xl">
                      <span className="mr-2 text-[#111827] transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Community & Collaboration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800 md:text-base">
                      You're surrounded by like-minded traders. Share insights, discuss strategies, or just vibe with
                      those who get it.
                    </p>
                  </CardContent>
                </div>

                <div className="group flex h-full flex-col rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="flex items-center font-display text-lg md:text-xl">
                      <span className="mr-2 text-[#111827] transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Educational Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800 md:text-base">
                      Never stop growing. Access curated learning for every stage of your journey — from beginner
                      blueprints to pro-level breakdowns.
                    </p>
                  </CardContent>
                </div>

                <div className="group flex h-full flex-col rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="flex items-center font-display text-lg md:text-xl">
                      <span className="mr-2 text-[#111827] transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Cato – Your Trading AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800 md:text-base">
                      Think of it as your second brain. Ask, analyze, forecast. Cato isn't just an assistant — it's
                      intuition with intelligence.
                    </p>
                  </CardContent>
                </div>

                <div className="group flex h-full flex-col rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="flex items-center font-display text-lg md:text-xl">
                      <span className="mr-2 text-[#111827] transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      MarketView
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800 md:text-base">
                      Unlock live, multi‑asset charts—stocks, forex, crypto, commodities—all in one place with on-chart
                      risk alerts. It's about managing the risks.
                    </p>
                  </CardContent>
                </div>

                <div className="group flex h-full flex-col rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-xl">
                  <CardHeader className="pb-2 transition-all duration-300 group-hover:pb-4">
                    <CardTitle className="flex items-center font-display text-lg md:text-xl">
                      <span className="mr-2 text-[#111827] transition-transform duration-300 group-hover:scale-110">
                        🔹
                      </span>{" "}
                      Personalization & Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800 md:text-base">
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
          ref={(el) => {
            sectionRefs.current[3] = el as HTMLElement | null;
          }}
          className="section-fullscreen relative flex w-full items-center overflow-hidden bg-background py-16 md:py-24 border-border"
        >
          <div className="container px-4 md:px-6">
            <div className="mb-8 flex flex-col items-center justify-center space-y-6 text-center md:mb-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#111827] shadow-sm">FAQ</div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#111827] md:text-4xl lg:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[600px] text-base font-light text-gray-600 md:text-lg lg:text-xl">
                  Everything you need to know about Qantora
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
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
                      className="group flex w-full items-center justify-between p-5 text-left transition-all duration-300 hover:bg-gray-50/50 focus:outline-none"
                    >
                      <h3 className="font-display text-lg font-semibold text-[#111827] transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
                        {faq.question}
                      </h3>
                      <div className="ml-4 shrink-0 transition-transform duration-300">
                        {openFaq === index ? (
                          <Minus className="size-5 rotate-90 text-[#111827] transition-transform duration-300 group-hover:rotate-180" />
                        ) : (
                          <Plus className="size-5 text-[#111827] transition-transform duration-300 group-hover:rotate-90" />
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
                <p className="mb-6 text-gray-600">Ready to experience Qantora?</p>
                <Link href="/auth">
                  <Button className="group h-12 bg-[#111827] px-6 text-base transition-all duration-300 hover:bg-[#1F2937] hover:shadow-lg">
                    Get Started
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="w-full border-t border-gray-100 bg-white py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          {/* Enhanced Desktop Footer */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              {/* Brand and Description */}
              <div className="md:col-span-5">
                <div className="mb-6 flex items-center">
                  <BrandLogo size="lg" className="mr-3" animated />
                  <span className="font-display text-2xl font-bold tracking-tight text-[#111827]">QANTORA</span>
                </div>
                <p className="mb-8 max-w-md text-base leading-relaxed text-gray-600">
                  Built by traders. Powered by intelligence. Designed for your edge. Qantora provides AI-driven tools
                  and resources to help everyday traders succeed in the market.
                </p>
                {/* Social media icons */}
                <div className="flex items-center gap-6">
                  <a
                    href="mailto:qantoratech@gmail.com"
                    className="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-[#111827]"
                    aria-label="Email"
                  >
                    <Mail className="size-6" />
                  </a>
                  <a
                    href="https://wa.me/+17165412204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-[#111827]"
                    aria-label="WhatsApp"
                  >
                    <Phone className="size-6" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-7">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {/* Navigation */}
                  <div>
                    <h3 className="mb-6 font-display text-xl font-semibold text-[#111827]">Navigation</h3>
                    <div className="flex flex-col space-y-4">
                      {sections.current.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                        >
                          {section.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h3 className="mb-6 font-display text-xl font-semibold text-[#111827]">Resources</h3>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => setResearchSheetOpen(true)}
                        className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                      >
                        Research
                      </button>
                      <button
                        onClick={() => setFutureSheetOpen(true)}
                        className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                      >
                        Future
                      </button>
                      <Link
                        href="#"
                        className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                      >
                        Blog
                      </Link>
                      <Link
                        href="#"
                        className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                      >
                        Documentation
                      </Link>
                    </div>
                  </div>

                  {/* Legal */}
                  <div>
                    <h3 className="mb-6 font-display text-xl font-semibold text-[#111827]">Legal</h3>
                    <div className="flex flex-col space-y-4">
                      <Link
                        href="#"
                        className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        href="#"
                        className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                      >
                        Terms of Service
                      </Link>
                      <Link
                        href="#"
                        className="text-left text-gray-500 transition-colors duration-300 hover:translate-x-1 hover:text-[#111827]"
                      >
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Qantora. All rights reserved.</p>
              <p className="text-sm text-gray-500">Crafted with precision for the modern trader.</p>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="lg:hidden">
            <div className="flex flex-col space-y-8">
              {/* Brand and Description */}
              <div className="text-center md:text-left">
                <div className="mb-4 flex items-center justify-center md:justify-start">
                  <BrandLogo size="md" className="mr-2" animated />
                  <span className="font-display text-xl font-bold tracking-tight text-[#111827]">QANTORA</span>
                </div>
                <p className="mx-auto max-w-xs text-sm text-gray-600 md:mx-0 md:text-base">
                  Built by traders. Powered by intelligence. Designed for your edge.
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                  <a
                    href="mailto:qantoratech@gmail.com"
                    className="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-[#111827]"
                    aria-label="Email"
                  >
                    <Mail className="size-5" />
                  </a>
                  <a
                    href="https://wa.me/+17165412204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-[#111827]"
                    aria-label="WhatsApp"
                  >
                    <Phone className="size-5" />
                  </a>
                </div>
              </div>

              {/* Mobile-optimized footer links */}
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                {/* Quick Links */}
                <div>
                  <h3 className="mb-4 font-display text-lg font-semibold text-[#111827]">Explore</h3>
                  <div className="flex flex-col space-y-3">
                    {sections.current.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="text-left text-gray-500 transition-colors hover:text-[#111827]"
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="mb-4 font-display text-lg font-semibold text-[#111827]">Resources</h3>
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => setResearchSheetOpen(true)}
                      className="text-left text-gray-500 transition-colors hover:text-[#111827]"
                    >
                      Research
                    </button>
                    <button
                      onClick={() => setFutureSheetOpen(true)}
                      className="text-left text-gray-500 transition-colors hover:text-[#111827]"
                    >
                      Future
                    </button>
                    <Link href="#" className="text-left text-gray-500 transition-colors hover:text-[#111827]">
                      Blog
                    </Link>
                    <Link href="#" className="text-left text-gray-500 transition-colors hover:text-[#111827]">
                      Documentation
                    </Link>
                  </div>
                </div>

                {/* Legal */}
                <div className="col-span-2 md:col-span-1">
                  <h3 className="mb-4 font-display text-lg font-semibold text-[#111827]">Legal</h3>
                  <div className="flex flex-col space-y-3">
                    <Link href="#" className="text-left text-gray-500 transition-colors hover:text-[#111827]">
                      Privacy Policy
                    </Link>
                    <Link href="#" className="text-left text-gray-500 transition-colors hover:text-[#111827]">
                      Terms of Service
                    </Link>
                    <Link href="#" className="text-left text-gray-500 transition-colors hover:text-[#111827]">
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-100 pt-8 md:flex-row">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Qantora. All rights reserved.</p>
              <p className="mt-2 text-sm text-gray-500 md:mt-0">Crafted with precision for the modern trader.</p>
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
