"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { ArrowRight, Sparkles, Users, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: Zap,
    title: "Immediate AI Access",
    description: "Get hands-on with Cato AI from day one",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Users,
    title: "Community Connection",
    description: "Join live discussions with fellow traders",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "Evolving Platform",
    description: "Shape the future with direct feedback",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Sparkles,
    title: "Founding Member",
    description: "Exclusive benefits and early access",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
]

export function MobileReserveSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-50px" })
  const [currentStep, setCurrentStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  // Auto-advance through steps
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2000)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={containerRef} className="min-h-[120vh] relative flex flex-col items-center">
      <div className="sticky top-[25vh] w-full max-w-sm mx-auto px-4">
        <motion.div
          style={{
            y: smoothY,
            opacity: smoothOpacity,
            scale: smoothScale,
          }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#111827] to-gray-800 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-display font-bold mb-2">The Qantora Experience</h3>
              <p className="text-gray-200 text-sm">Your journey to smarter trading starts here</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      step === currentStep ? "bg-[#111827] w-6" : "bg-gray-200",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Animated benefits */}
            <div className="space-y-4 mb-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3, x: -20 }}
                  animate={{
                    opacity: index === currentStep ? 1 : 0.3,
                    x: index === currentStep ? 0 : -20,
                    scale: index === currentStep ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "flex items-start p-4 rounded-xl transition-all duration-500",
                    index === currentStep ? benefit.bg : "bg-gray-50",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-all duration-500",
                      index === currentStep ? "bg-white shadow-md" : "bg-white/50",
                    )}
                  >
                    <benefit.icon
                      className={cn(
                        "h-5 w-5 transition-all duration-500",
                        index === currentStep ? benefit.color : "text-gray-400",
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={cn(
                        "font-semibold mb-1 transition-all duration-500",
                        index === currentStep ? "text-[#111827]" : "text-gray-500",
                      )}
                    >
                      {benefit.title}
                    </h4>
                    <p
                      className={cn(
                        "text-sm transition-all duration-500",
                        index === currentStep ? "text-gray-700" : "text-gray-400",
                      )}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/waitlist">
                <Button className="w-full bg-[#111827] hover:bg-[#1F2937] h-12 text-base group transition-all duration-500 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 relative overflow-hidden">
                  <span className="relative z-10">Join the Waitlist</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                  <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                </Button>
              </Link>
              <p className="text-xs text-gray-500 mt-3 text-center">Limited spots available for early access</p>
            </motion.div>
          </div>

          {/* Bottom decoration */}
          <div className="h-1 bg-gradient-to-r from-[#111827] via-gray-600 to-[#111827]"></div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-80"
        />
      </div>
    </div>
  )
}
