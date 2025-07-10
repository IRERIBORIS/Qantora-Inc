"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface NavItem {
  id: string
  label: string
}

interface NavbarProps {
  items: NavItem[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

export function Navbar({ items, activeSection, onSectionClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const handleItemClick = (id: string) => {
    onSectionClick(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          scrolled ? "py-3" : "py-6",
        )}
      >
        <div className="container mx-auto px-6">
          <div className="relative">
            {/* Enhanced background with better blur effect */}
            <div
              className={cn(
                "absolute inset-0 rounded-2xl transition-all duration-500",
                scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg border border-white/20" : "bg-transparent",
              )}
            />

            <div className="relative flex h-16 items-center justify-between">
              {/* Enhanced Brand Logo */}
              <div className="shrink-0 transition-all duration-500">
                <Link href="/" className="group flex items-center">
                  <BrandLogo
                    size={scrolled ? "sm" : "md"}
                    withText
                    textClassName={cn(scrolled ? "text-base" : "text-lg", "font-bold tracking-[0.12em]")}
                    animated
                    showLogoOnMobile={!isMobile}
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              {!isMobile && (
                <div className="hidden items-center justify-center space-x-1 transition-all duration-500 md:flex">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSectionClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-xl relative overflow-hidden",
                        activeSection === item.id
                          ? "text-black bg-black/5 shadow-sm"
                          : "text-gray-600 hover:text-black hover:bg-black/5",
                      )}
                    >
                      {item.label}
                      {(hoveredItem === item.id || activeSection === item.id) && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-black"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Enhanced CTA Button / Hamburger */}
              <div className="transition-all duration-500">
                {isMobile ? (
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="group rounded-xl p-2.5 transition-all duration-300 hover:bg-black/5"
                    aria-label="Open menu"
                  >
                    <Menu className="size-5 text-black transition-transform duration-300 group-hover:scale-110" />
                  </button>
                ) : (
                  <Link href="/auth">
                    <Button
                      className={cn(
                        "bg-black hover:bg-black/90 text-white transition-all duration-300 group relative overflow-hidden",
                        "shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
                        "border-0 rounded-xl font-medium",
                        scrolled ? "h-10 px-5 text-sm" : "h-11 px-6 text-sm",
                      )}
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started
                        <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Proper Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                  <BrandLogo size="sm" withText textClassName="text-base font-bold tracking-[0.12em]" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
                    aria-label="Close menu"
                  >
                    <X className="size-5 text-gray-600" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-2">
                    {items.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                        onClick={() => handleItemClick(item.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group",
                          activeSection === item.id
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-black",
                        )}
                      >
                        <span className="font-medium">{item.label}</span>
                        <ArrowRight
                          className={cn(
                            "inline-block ml-2 h-4 w-4 transition-transform duration-200",
                            "group-hover:translate-x-1",
                            activeSection === item.id ? "text-white" : "text-gray-400",
                          )}
                        />
                      </motion.button>
                    ))}
                  </nav>
                </div>

                {/* CTA Section */}
                <div className="border-t border-gray-100 p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="group h-12 w-full rounded-xl bg-black font-medium text-white shadow-lg transition-all duration-300 hover:bg-black/90 hover:shadow-xl">
                        <span className="flex items-center justify-center">
                          Get Started
                          <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
