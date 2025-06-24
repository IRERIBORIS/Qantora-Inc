"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const experienceSteps = [
  {
    step: "1",
    title: "Immediate AI Access",
    description:
      "From day one, get hands-on with Cato AI and MarketView charts. Make data-driven decisions from the start.",
  },
  {
    step: "2",
    title: "Community Connection",
    description:
      "Join live discussions with fellow traders. Share insights, strategies, and grow together in a supportive environment.",
  },
  {
    step: "3",
    title: "Evolving Platform",
    description: "Shape the future of Qantora with direct feedback. Early members influence our roadmap and features.",
  },
]

const benefits = [
  "Priority access to all new features",
  "Exclusive educational content",
  "Founding member status & benefits",
  "Direct access to the founding team",
  "Special pricing for early adopters",
]

export function MobileReserveSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-50px" })
  const [currentStep, setCurrentStep] = useState(0)
  const [showBenefits, setShowBenefits] = useState(false)

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
      setCurrentStep((prev) => {
        const next = (prev + 1) % (experienceSteps.length + 1)
        if (next === experienceSteps.length) {
          setShowBenefits(true)
          return 0
        } else {
          setShowBenefits(false)
          return next
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isInView])

  const currentExperienceStep = experienceSteps[currentStep]

  return (
    <div ref={containerRef} className="min-h-[120vh] relative flex flex-col items-center py-12">
      <div className="sticky top-[25vh] w-full max-w-md mx-auto px-4">
        <motion.div
          style={{
            y: smoothY,
            opacity: smoothOpacity,
            scale: smoothScale,
          }}
          className="relative"
        >
          {/* Main glassmorphism card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="relative bg-[#111827] p-8">
              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative text-center">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="h-5 w-5 text-white mr-2" />
                  <span className="text-white text-sm font-medium tracking-wide">EARLY ACCESS</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">The Qantora Experience</h3>
                <p className="text-gray-300 text-sm">Join the trading evolution</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {!showBenefits ? (
                <>
                  {/* Progress indicator */}
                  <div className="flex justify-center mb-8">
                    <div className="flex space-x-2">
                      {experienceSteps.map((_, index) => (
                        <motion.div
                          key={index}
                          className={cn(
                            "h-2 rounded-full transition-all duration-500",
                            index === currentStep ? "w-8 bg-[#111827]" : "w-2 bg-gray-200",
                          )}
                          animate={{
                            scale: index === currentStep ? 1.1 : 1,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Experience step */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="mb-8"
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                          <span className="text-lg font-bold">{currentExperienceStep.step}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-display font-bold text-[#111827] mb-3 leading-tight">
                            {currentExperienceStep.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">{currentExperienceStep.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                /* Benefits showcase */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#111827] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-[#111827] text-xl mb-2">Early Access Benefits</h4>
                    <p className="text-gray-600">Exclusive advantages for founding members</p>
                  </div>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center p-4 bg-gray-50/80 rounded-xl border border-gray-100/50"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#111827]/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Check className="h-3.5 w-3.5 text-[#111827]" />
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/waitlist">
                  <Button className="w-full bg-[#111827] hover:bg-[#1F2937] h-14 text-base group transition-all duration-500 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 relative overflow-hidden rounded-2xl">
                    <span className="relative z-10 flex items-center justify-center font-medium">
                      Join the Waitlist
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 mt-4 text-center">Limited spots available for early access</p>
              </motion.div>
            </div>
          </div>

          {/* Floating accent elements */}
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
            className="absolute -top-4 -right-4 w-8 h-8 bg-[#111827] rounded-lg opacity-20 shadow-lg"
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
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-gray-400 rounded-full opacity-30 shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  )
}
