"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EnhancedTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [hasScrolled, setHasScrolled] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [60, 0, 0, 60])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const paragraphs = [
    "From the moment you reserve your spot on Qantora's waitlist, you'll step into a trading ecosystem built around your success.",
    "You'll unlock immediate access to Cato AI, real‑time MarketView charts, personalized dashboards and more — so every decision you make is grounded in data, not guesswork.",
    "As you explore curated learning modules and connect with fellow traders in live chat, you'll feel your confidence grow and watch your strategies evolve.",
    "This is more than early access; it's your invitation to shape the future of intelligent trading alongside a community that shares your ambition.",
  ]

  return (
    <div ref={containerRef} className="relative flex min-h-[150vh] flex-col items-center">
      <div className="sticky top-[30vh] mx-auto w-full max-w-md px-6">
        <motion.div
          style={{
            y: smoothY,
            opacity: smoothOpacity,
            scale: smoothScale,
          }}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
        >
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2 + 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="mb-4 text-gray-600 last:mb-6"
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: paragraphs.length * 0.2 + 0.5 }}
            className="mt-6"
          >
            <Link href="/waitlist">
              <Button className="group relative h-12 w-full overflow-hidden bg-[#111827] text-base transition-all duration-500 hover:-translate-y-1 hover:bg-[#1F2937] hover:shadow-lg active:translate-y-0">
                <span className="relative z-10">Join the Waitlist</span>
                <ArrowRight className="relative z-10 ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 ease-out group-hover:translate-x-0"></span>
              </Button>
            </Link>
            <p className="mt-3 text-center text-xs text-gray-500">Limited spots available for early access</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
