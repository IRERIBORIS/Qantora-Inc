"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const edgeFeatures = [
  {
    id: 1,
    icon: "📊",
    title: "Performance Tracking",
    subtitle: "& Journaling",
    description: "Advanced trade journals with metrics that matter. Reflect, refine, and repeat — all in one place.",
    accent: "bg-[#111827]",
  },
  {
    id: 2,
    icon: "🤝",
    title: "Community",
    subtitle: "& Collaboration",
    description: "Connect with like-minded traders. Share insights, discuss strategies, and grow together.",
    accent: "bg-[#111827]",
  },
  {
    id: 3,
    icon: "📚",
    title: "Educational",
    subtitle: "Resources",
    description: "Curated learning for every stage — from beginner blueprints to pro-level breakdowns.",
    accent: "bg-[#111827]",
  },
  {
    id: 4,
    icon: "🤖",
    title: "Cato AI",
    subtitle: "Your Trading Brain",
    description: "Your second brain for trading. Ask, analyze, forecast — intuition meets intelligence.",
    accent: "bg-[#111827]",
  },
  {
    id: 5,
    icon: "📈",
    title: "MarketView",
    subtitle: "Live Charts",
    description: "Multi-asset charts with real-time data and on-chart risk alerts. Master the markets.",
    accent: "bg-[#111827]",
  },
  {
    id: 6,
    icon: "⚡",
    title: "Personalization",
    subtitle: "& Experience",
    description: "Your space, your vibe. Custom dashboards and smart notifications tailored to you.",
    accent: "bg-[#111827]",
  },
]

export function MobileEdgeSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % edgeFeatures.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + edgeFeatures.length) % edgeFeatures.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentFeature = edgeFeatures[currentIndex]

  return (
    <div ref={containerRef} className="relative">
      {/* Glassmorphism Card Container */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative min-h-[320px] overflow-hidden border border-white/20 bg-white/95 backdrop-blur-xl"
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50" />

            {/* Floating geometric elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute right-4 top-4 size-16 rounded-full border border-gray-200/30"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute bottom-4 left-4 size-8 rounded-lg bg-gray-100/50"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              {/* Header */}
              <div>
                <div className="mb-6 flex items-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                    className="mr-4 flex size-16 items-center justify-center rounded-2xl bg-[#111827] text-2xl text-white shadow-lg"
                  >
                    {currentFeature.icon}
                  </motion.div>
                  <div className="flex items-center">
                    <Sparkles className="mr-2 size-4 text-gray-400" />
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Feature {currentIndex + 1}
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="mb-1 font-display text-2xl font-bold leading-tight text-[#111827]">
                    {currentFeature.title}
                  </h3>
                  <h4 className="mb-4 font-display text-lg font-semibold text-gray-600">{currentFeature.subtitle}</h4>
                  <p className="leading-relaxed text-gray-600">{currentFeature.description}</p>
                </motion.div>
              </div>

              {/* Bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="mt-6 h-1 rounded-full bg-[#111827]"
                style={{ transformOrigin: "left" }}
              />
            </div>

            {/* Glassmorphism overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Elegant navigation */}
      <div className="mt-8 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="flex size-12 items-center justify-center rounded-2xl border border-white/20 bg-white/95 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-gray-50/95 hover:shadow-xl"
        >
          <ChevronLeft className="size-5 text-gray-600" />
        </motion.button>

        {/* Refined dots indicator */}
        <div className="flex space-x-3">
          {edgeFeatures.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                index === currentIndex ? "w-8 h-3 bg-[#111827]" : "w-3 h-3 bg-gray-300 hover:bg-gray-400",
              )}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="flex size-12 items-center justify-center rounded-2xl border border-white/20 bg-white/95 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-gray-50/95 hover:shadow-xl"
        >
          <ChevronRight className="size-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 text-center">
        <div className="mb-2 flex items-center justify-center space-x-2">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} of {edgeFeatures.length}
          </span>
        </div>
        <div className="mx-auto h-1 w-24 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-[#111827]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / edgeFeatures.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}
