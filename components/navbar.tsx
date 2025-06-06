"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus, Menu } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { cn } from "@/lib/utils"
import { MobileMenu } from "@/components/mobile-menu"

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
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hideNavbar, setHideNavbar] = useState(false)
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

      // Apply scrolled styles
      if (scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      setLastScrollY(scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          scrolled ? "py-2" : "py-6",
        )}
      >
        <div className="container mx-auto px-4">
          {/* Navbar Content */}
          <div className="relative">
            {/* Background with blur effect - only visible when scrolled */}
            <div
              className={cn(
                "absolute inset-0 rounded-2xl transition-all duration-500",
                scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border border-gray-100/20" : "bg-transparent",
              )}
            />

            <div className="relative flex items-center justify-between h-16">
              {/* Logo - Left aligned on large screens, centered when scrolled on mobile */}
              <div className="flex-shrink-0 transition-all duration-500">
                <Link href="/" className="flex items-center group">
                  <BrandLogo
                    size={scrolled ? "sm" : "md"}
                    withText
                    textClassName={scrolled ? "text-sm" : "text-lg"}
                    animated
                  />
                </Link>
              </div>

              {/* Navigation Links - Only on desktop */}
              {!isMobile && (
                <div className="hidden md:flex items-center justify-center space-x-8 transition-all duration-500">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSectionClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative overflow-hidden",
                        activeSection === item.id
                          ? "text-gray-900 bg-gray-100/80"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80",
                      )}
                    >
                      {item.label}
                      {(hoveredItem === item.id || activeSection === item.id) && (
                        <span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform transition-transform duration-300 origin-left"
                          style={{
                            transform: "scaleX(1)",
                            opacity: hoveredItem === item.id ? 0.6 : 1,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* CTA Button on desktop, Hamburger on mobile */}
              <div className="transition-all duration-500">
                {isMobile ? (
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 rounded-lg hover:bg-gray-100/80 transition-all duration-300"
                    aria-label="Open menu"
                  >
                    <Menu className="h-6 w-6 text-gray-800" />
                  </button>
                ) : (
                  <Link href="/waitlist">
                    <Button
                      className="bg-[#111827] hover:bg-[#1F2937] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-98"
                      size={scrolled ? "sm" : "default"}
                    >
                      <UserPlus className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                          Join Waitlist
                        </span>
                        <span className="absolute top-0 left-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          Join Waitlist
                        </span>
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={items}
        onItemClick={onSectionClick}
        activeSection={activeSection}
      />
    </>
  )
}
