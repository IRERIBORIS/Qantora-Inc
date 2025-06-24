"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: { id: string; label: string }[]
  onItemClick: (id: string) => void
  activeSection: string
}

export function MobileMenu({ isOpen, onClose, items, onItemClick, activeSection }: MobileMenuProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  const backdropVariants = {
    closed: {
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    open: {
      opacity: 1,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const handleItemClick = (id: string) => {
    onItemClick(id)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Premium Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Menu Container */}
          <motion.div
            className="fixed inset-x-4 top-4 bottom-4 z-50 flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Glassmorphism Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col h-full overflow-hidden">
              {/* Elegant Header */}
              <div className="relative p-6 border-b border-gray-100/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BrandLogo size="sm" className="mr-3" />
                    <div>
                      <h2 className="font-display font-bold text-[#111827] text-lg tracking-tight">QANTORA</h2>
                      <p className="text-gray-500 text-xs">Navigation Menu</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 p-6 space-y-3 overflow-y-auto">
                {items.map((item, i) => (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "w-full group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300",
                      activeSection === item.id
                        ? "bg-[#111827] text-white shadow-lg"
                        : "bg-gray-50/80 hover:bg-gray-100/80 text-gray-700 hover:text-[#111827]",
                    )}
                  >
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mr-4 transition-all duration-300",
                            activeSection === item.id ? "bg-white" : "bg-gray-400",
                          )}
                        />
                        <span className="font-medium text-base">{item.label}</span>
                      </div>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 transition-all duration-300 transform group-hover:translate-x-1",
                          activeSection === item.id ? "text-white" : "text-gray-400",
                        )}
                      />
                    </div>

                    {/* Hover effect */}
                    {activeSection !== item.id && (
                      <div className="absolute inset-0 bg-[#111827] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-0 group-hover:opacity-5 rounded-2xl" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Premium CTA */}
              <div className="p-6 border-t border-gray-100/50">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Link href="/waitlist">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#111827] hover:bg-[#1F2937] text-white py-4 px-6 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Join Waitlist
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
