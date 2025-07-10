"use client"

import { useEffect } from "react"
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { X, ArrowRight, Mail, Phone, ExternalLink, Sparkles, Home, Info, Zap, MessageSquare, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ExpandableTabs } from "../new-ui/components/ui/expandable-tabs"

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
        ease: easeInOut,
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
        ease: easeInOut,
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
        ease: easeInOut,
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
    settings: Settings,
  }

  // Tabs for ExpandableTabs
  const tabs = [
    { title: "Home", icon: Home },
    { title: "Why Qantora", icon: Info },
    { type: 'separator' as const },
    { title: "Edge", icon: Zap },
    { title: "FAQ", icon: MessageSquare },
    { title: "Settings", icon: Settings },
  ]

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
            className="fixed inset-4 z-50 mx-auto flex max-w-sm flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Premium Glassmorphism Card */}
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/95 shadow-2xl backdrop-blur-2xl">
              {/* Elegant Header */}
              <div className="relative bg-gradient-to-r from-black to-black/90 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold uppercase tracking-[0.3em] text-white">QANTORA</h2>
                    <p className="mt-1 text-sm text-white/80">Menu</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                    aria-label="Close menu"
                  >
                    <X className="size-5 text-white" />
                  </motion.button>
                </div>

                {/* Decorative elements */}
                <div className="absolute right-0 top-0 size-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5"></div>
                <div className="absolute bottom-0 left-0 size-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5"></div>
              </div>

              {/* ExpandableTabs for navigation */}
              <div className="p-4">
                <ExpandableTabs tabs={tabs} />
              </div>

              {/* Bento Grid Content - No scrolling needed */}
              <div className="flex-1 p-6">
                {/* Navigation Grid - 2x2 */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="mb-4 flex items-center font-display text-lg font-semibold text-black">
                    <Sparkles className="mr-2 size-5 text-black" />
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
                          <span className="text-center text-sm font-medium">{item.label}</span>

                          {/* Hover effect */}
                          {activeSection !== item.id && (
                            <div className="absolute inset-0 origin-left scale-x-0 rounded-2xl bg-gradient-to-br from-black/5 to-black/10 transition-transform duration-300 group-hover:scale-x-100" />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Contact Section - Horizontal cards */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="mb-4 flex items-center font-display text-lg font-semibold text-black">
                    <Phone className="mr-2 size-5 text-black" />
                    Contact
                  </h3>
                  <div className="space-y-3">
                    <motion.div variants={itemVariants}>
                      <a
                        href="mailto:qantoratech@gmail.com"
                        className="to-black/8 group flex items-center rounded-2xl bg-gradient-to-r from-black/5 p-4 transition-all duration-300 hover:from-black/10 hover:to-black/15"
                      >
                        <div className="mr-3 flex size-10 items-center justify-center rounded-xl bg-black/10 transition-colors group-hover:bg-black/20">
                          <Mail className="size-5 text-black" />
                        </div>
                        <div className="flex-1">
                          <span className="block text-sm font-semibold text-black">Email Support</span>
                          <p className="text-xs text-black/60">qantoratech@gmail.com</p>
                        </div>
                        <ExternalLink className="size-4 text-black/40 transition-transform group-hover:translate-x-1" />
                      </a>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <a
                        href="https://wa.me/+17165412204"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="to-black/8 group flex items-center rounded-2xl bg-gradient-to-r from-black/5 p-4 transition-all duration-300 hover:from-black/10 hover:to-black/15"
                      >
                        <div className="mr-3 flex size-10 items-center justify-center rounded-xl bg-black/10 transition-colors group-hover:bg-black/20">
                          <Phone className="size-5 text-black" />
                        </div>
                        <div className="flex-1">
                          <span className="block text-sm font-semibold text-black">WhatsApp</span>
                          <p className="text-xs text-black/60">+1 (716) 541-2204</p>
                        </div>
                        <ExternalLink className="size-4 text-black/40 transition-transform group-hover:translate-x-1" />
                      </a>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Legal Links - Compact grid */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="mb-4 font-display text-lg font-semibold text-black">Legal</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="#"
                      className="rounded-xl p-3 text-center text-sm text-black/60 transition-colors hover:bg-black/5 hover:text-black"
                    >
                      Privacy
                    </Link>
                    <Link
                      href="#"
                      className="rounded-xl p-3 text-center text-sm text-black/60 transition-colors hover:bg-black/5 hover:text-black"
                    >
                      Terms
                    </Link>
                  </div>
                </motion.div>

                {/* Copyright */}
                <motion.div variants={itemVariants}>
                  <p className="py-2 text-center text-xs text-black/40">
                    © {new Date().getFullYear()} Qantora. All rights reserved.
                  </p>
                </motion.div>
              </div>

              {/* Enhanced CTA Button */}
              <div className="from-black/2 border-t border-black/10 bg-gradient-to-t to-transparent p-6">
                <motion.div variants={itemVariants}>
                  <Link href="/auth">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-black to-black/90 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-black/90 hover:to-black hover:shadow-xl"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <Sparkles className="mr-2 size-4" />
                        Get Started
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
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
