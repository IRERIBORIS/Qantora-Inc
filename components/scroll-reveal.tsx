"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "slide-up" | "slide-in"
  duration?: number
  stagger?: boolean
  staggerDelay?: number
  rootMargin?: string
}

export function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
  delay = 0,
  animation = "fade-up",
  duration = 800,
  stagger = false,
  staggerDelay = 100,
  rootMargin = "0px 0px -100px 0px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animation type class
            setTimeout(() => {
              entry.target.classList.add("animate-in")

              // If stagger is enabled, animate children with delays
              if (stagger && ref.current) {
                const children = Array.from(ref.current.children)
                children.forEach((child, index) => {
                  setTimeout(
                    () => {
                      child.classList.add("animate-in")
                    },
                    delay + index * staggerDelay,
                  )
                })
              }
            }, delay)

            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, delay, stagger, staggerDelay, rootMargin])

  // Determine animation class based on prop
  const animationClass = `reveal-${animation}`

  // Apply duration as a style
  const style = { "--reveal-duration": `${duration}ms` } as React.CSSProperties

  return (
    <div ref={ref} className={`reveal ${animationClass} ${stagger ? "reveal-stagger" : ""} ${className}`} style={style}>
      {children}
    </div>
  )
}
