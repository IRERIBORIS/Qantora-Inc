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
            className="relative min-h-[320px] bg-white/95 backdrop-blur-xl border border-white/20 overflow-hidden"
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
                className="absolute top-4 right-4 w-16 h-16 border border-gray-200/30 rounded-full"
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
                className="absolute bottom-4 left-4 w-8 h-8 bg-gray-100/50 rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              {/* Header */}
              <div>
                <div className="flex items-center mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                    className="w-16 h-16 rounded-2xl bg-[#111827] flex items-center justify-center text-white text-2xl mr-4 shadow-lg"
                  >
                    {currentFeature.icon}
                  </motion.div>
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                      Feature {currentIndex + 1}
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-display font-bold text-[#111827] mb-1 leading-tight">
                    {currentFeature.title}
                  </h3>
                  <h4 className="text-lg font-display font-semibold text-gray-600 mb-4">{currentFeature.subtitle}</h4>
                  <p className="text-gray-600 leading-relaxed">{currentFeature.description}</p>
                </motion.div>
              </div>

              {/* Bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="h-1 bg-[#111827] rounded-full mt-6"
                style={{ transformOrigin: "left" }}
              />
            </div>

            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Elegant navigation */}
      <div className="flex items-center justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:bg-gray-50/95"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
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
          className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:bg-gray-50/95"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Progress indicator */}
      <div className="text-center mt-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} of {edgeFeatures.length}
          </span>
        </div>
        <div className="w-24 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-[#111827] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / edgeFeatures.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}
