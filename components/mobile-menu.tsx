"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Mail, Phone, ExternalLink, Sparkles, Home, Info, Zap, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
      backdropFilter: "blur(24px)",
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
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    open: {
      opacity: 1,
      y: 0,
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

  // Icon mapping for navigation items
  const iconMap: { [key: string]: any } = {
    home: Home,
    why: Info,
    edge: Zap,
    faq: MessageSquare,
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Menu Container - iPhone-style with bento grid */}
          <motion.div
            className="fixed inset-x-4 top-4 bottom-4 z-50 flex flex-col max-w-sm mx-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Premium Glassmorphism Card */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 flex flex-col h-full overflow-hidden">
              {/* Elegant Header */}
              <div className="relative p-6 bg-gradient-to-r from-black to-black/90 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-bold text-white text-xl tracking-[0.3em] uppercase">QANTORA</h2>
                    <p className="text-white/80 text-sm mt-1">Menu</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-white" />
                  </motion.button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>

              {/* Bento Grid Content - No scrolling needed */}
              <div className="flex-1 p-6">
                {/* Navigation Grid - 2x2 */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-black font-display font-semibold text-lg mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-black" />
                    Navigation
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {items.map((item) => {
                      const IconComponent = iconMap[item.id] || Home
                      return (
                        <motion.button
                          key={item.id}
                          variants={itemVariants}
                          onClick={() => handleItemClick(item.id)}
                          className={cn(
                            "group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 aspect-square flex flex-col items-center justify-center",
                            activeSection === item.id
                              ? "bg-black text-white shadow-lg transform scale-[1.02]"
                              : "bg-black/5 hover:bg-black/10 text-black hover:shadow-md hover:transform hover:scale-[1.01]",
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "h-6 w-6 mb-2 transition-all duration-300",
                              activeSection === item.id ? "text-white" : "text-black/70",
                            )}
                          />
                          <span className="font-medium text-sm text-center">{item.label}</span>

                          {/* Hover effect */}
                          {activeSection !== item.id && (
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl" />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Contact Section - Horizontal cards */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="font-display font-semibold text-black text-lg mb-4 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-black" />
                    Contact
                  </h3>
                  <div className="space-y-3">
                    <motion.div variants={itemVariants}>
                      <a
                        href="mailto:qantoratech@gmail.com"
                        className="flex items-center p-4 bg-gradient-to-r from-black/5 to-black/8 hover:from-black/10 hover:to-black/15 rounded-2xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-black/20 transition-colors">
                          <Mail className="h-5 w-5 text-black" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-black block">Email Support</span>
                          <p className="text-xs text-black/60">qantoratech@gmail.com</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-black/40 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <a
                        href="https://wa.me/+17165412204"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gradient-to-r from-black/5 to-black/8 hover:from-black/10 hover:to-black/15 rounded-2xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-black/20 transition-colors">
                          <Phone className="h-5 w-5 text-black" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-black block">WhatsApp</span>
                          <p className="text-xs text-black/60">+1 (716) 541-2204</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-black/40 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Legal Links - Compact grid */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="font-display font-semibold text-black text-lg mb-4">Legal</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="#"
                      className="text-sm text-black/60 hover:text-black transition-colors p-3 hover:bg-black/5 rounded-xl text-center"
                    >
                      Privacy
                    </Link>
                    <Link
                      href="#"
                      className="text-sm text-black/60 hover:text-black transition-colors p-3 hover:bg-black/5 rounded-xl text-center"
                    >
                      Terms
                    </Link>
                  </div>
                </motion.div>

                {/* Copyright */}
                <motion.div variants={itemVariants}>
                  <p className="text-xs text-black/40 text-center py-2">
                    © {new Date().getFullYear()} Qantora. All rights reserved.
                  </p>
                </motion.div>
              </div>

              {/* Enhanced CTA Button */}
              <div className="p-6 border-t border-black/10 bg-gradient-to-t from-black/2 to-transparent">
                <motion.div variants={itemVariants}>
                  <Link href="/auth">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-black to-black/90 hover:from-black/90 hover:to-black text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get Started
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
