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
}

export function BrandLogo({
  size = "md",
  className,
  withText = false,
  textClassName,
  animated = false,
}: BrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Size mapping
  const sizeMap = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  }

  const textSizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  }

  return (
    <div
      className="flex items-center gap-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative transition-all duration-500",
          sizeMap[size],
          animated && "group-hover:scale-110 group-hover:rotate-3",
          className,
        )}
      >
        <Image src="/images/qantora-logo.png" alt="Qantora Logo" fill className="object-contain" priority />
      </div>
      {withText && (
        <span
          className={cn(
            "font-display font-bold tracking-tight transition-all duration-300",
            textSizeMap[size],
            textClassName,
            animated && "group-hover:tracking-wider",
          )}
        >
          QANTORA
          <span className="block h-0.5 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </span>
      )}
    </div>
  )
}
