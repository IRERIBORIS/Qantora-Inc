"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
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
  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  }

  const handleItemClick = (id: string) => {
    onItemClick(id)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-50 shadow-xl flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header with brand */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center">
                <BrandLogo size="sm" withText textClassName="text-sm" />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <nav className="flex flex-col space-y-2">
                {items.map((item, i) => (
                  <motion.button
                    key={item.id}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "py-3 px-4 text-left rounded-lg transition-all duration-300 flex items-center",
                      activeSection === item.id
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300",
                        activeSection === item.id ? "bg-[#111827]" : "bg-gray-300",
                      )}
                    ></span>
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100">
              <Link href="/waitlist">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-[#111827] hover:bg-[#1F2937] text-white rounded-lg transition-all duration-300 font-medium"
                >
                  Join Waitlist
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
