"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const edgeFeatures = [
  {
    id: 1,
    icon: "📊",
    title: "Performance Tracking & Journaling",
    description: "Advanced trade journals. Metrics that matter. Reflect, refine, repeat — all in one place.",
    color: "from-blue-50 to-blue-100",
    accent: "bg-blue-500",
  },
  {
    id: 2,
    icon: "🤝",
    title: "Community & Collaboration",
    description:
      "You're surrounded by like-minded traders. Share insights, discuss strategies, or just vibe with those who get it.",
    color: "from-green-50 to-green-100",
    accent: "bg-green-500",
  },
  {
    id: 3,
    icon: "📚",
    title: "Educational Resources",
    description:
      "Never stop growing. Access curated learning for every stage of your journey — from beginner blueprints to pro-level breakdowns.",
    color: "from-purple-50 to-purple-100",
    accent: "bg-purple-500",
  },
  {
    id: 4,
    icon: "🤖",
    title: "Cato – Your Trading AI",
    description:
      "Think of it as your second brain. Ask, analyze, forecast. Cato isn't just an assistant — it's intuition with intelligence.",
    color: "from-orange-50 to-orange-100",
    accent: "bg-orange-500",
  },
  {
    id: 5,
    icon: "📈",
    title: "MarketView",
    description:
      "Unlock live, multi‑asset charts—stocks, forex, crypto, commodities—all in one place with on-chart risk alerts. It's about managing the risks.",
    color: "from-red-50 to-red-100",
    accent: "bg-red-500",
  },
  {
    id: 6,
    icon: "⚡",
    title: "Personalization & Experience",
    description:
      "Your space. Your vibe. Custom dashboards, smart notifications, seamless design. Tailored to how you trade best.",
    color: "from-indigo-50 to-indigo-100",
    accent: "bg-indigo-500",
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
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Main card container */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
            className={cn(
              "bg-gradient-to-br p-6 min-h-[280px] flex flex-col justify-between relative overflow-hidden",
              edgeFeatures[currentIndex].color,
            )}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="text-6xl transform rotate-12 translate-x-4 -translate-y-2">
                {edgeFeatures[currentIndex].icon}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mr-4",
                    edgeFeatures[currentIndex].accent,
                  )}
                >
                  {edgeFeatures[currentIndex].icon}
                </div>
                <div className={cn("w-2 h-2 rounded-full", edgeFeatures[currentIndex].accent)}></div>
              </div>

              <h3 className="text-xl font-display font-bold text-[#111827] mb-3 leading-tight">
                {edgeFeatures[currentIndex].title}
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed">{edgeFeatures[currentIndex].description}</p>
            </div>

            {/* Bottom accent line */}
            <div className={cn("absolute bottom-0 left-0 right-0 h-1", edgeFeatures[currentIndex].accent)}></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {edgeFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-[#111827] w-6" : "bg-gray-300 hover:bg-gray-400",
              )}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Feature counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500">
          {currentIndex + 1} of {edgeFeatures.length}
        </span>
      </div>
    </div>
  )
}
