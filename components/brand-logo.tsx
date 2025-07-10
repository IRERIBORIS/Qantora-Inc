"use client"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  withText?: boolean
  textClassName?: string
  animated?: boolean
  showLogoOnMobile?: boolean
}

export function BrandLogo({
  size = "md",
  className,
  withText = false,
  textClassName,
  animated = false,
  showLogoOnMobile = true,
}: BrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Enhanced size mapping for logo
  const sizeMap = {
    xs: "w-7 h-7",
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  }

  // Refined text sizing with perfect letter spacing
  const textSizeMap = {
    xs: "text-sm",
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  }

  // Optimized spacing between logo and text
  const gapMap = {
    xs: "gap-2",
    sm: "gap-2.5",
    md: "gap-3",
    lg: "gap-4",
    xl: "gap-5",
  }

  return (
    <div
      className={cn("flex items-center group", gapMap[size])}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Logo with better prominence */}
      {showLogoOnMobile && (
        <div
          className={cn(
            "relative transition-all duration-500 flex-shrink-0",
            sizeMap[size],
            animated && "group-hover:scale-110 group-hover:rotate-3",
            className,
          )}
        >
          <Image
            src="/images/qantora-logo.png"
            alt="Qantora Logo"
            fill
            className="object-contain drop-shadow-sm"
            priority
          />
          {/* Enhanced glow effect */}
          {animated && (
            <div className="absolute inset-0 rounded-full bg-black/5 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40" />
          )}
        </div>
      )}

      {withText && (
        <span
          className={cn(
            "font-display font-bold text-black transition-all duration-300 select-none",
            // Enhanced letter spacing and styling
            "tracking-[0.15em] uppercase",
            textSizeMap[size],
            textClassName,
            animated && "group-hover:tracking-[0.2em]",
          )}
          style={{
            fontFeatureSettings: '"ss01" 1, "ss02" 1',
            textRendering: "optimizeLegibility",
          }}
        >
          QANTORA
          {/* Refined underline effect */}
          <span className="mt-0.5 block h-0.5 origin-left scale-x-0 rounded-full bg-black/80 transition-transform duration-300 group-hover:scale-x-100"></span>
        </span>
      )}
    </div>
  )
}
