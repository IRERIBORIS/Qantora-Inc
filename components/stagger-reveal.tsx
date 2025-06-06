"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  itemClassName?: string
  threshold?: number
  baseDelay?: number
  staggerDelay?: number
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "scale"
  once?: boolean
  rootMargin?: string
}

export function StaggerReveal({
  children,
  className = "",
  itemClassName = "",
  threshold = 0.1,
  baseDelay = 0,
  staggerDelay = 100,
  animation = "fade-up",
  once = true,
  rootMargin = "0px 0px -100px 0px",
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (containerRef.current) {
              const childElements = Array.from(containerRef.current.children)

              childElements.forEach((child, index) => {
                setTimeout(
                  () => {
                    child.classList.add("animate-in")
                  },
                  baseDelay + index * staggerDelay,
                )
              })

              if (once) {
                observer.unobserve(entry.target)
              }
            }
          } else if (!once) {
            // Reset animations if not once
            if (containerRef.current) {
              const childElements = Array.from(containerRef.current.children)
              childElements.forEach((child) => {
                child.classList.remove("animate-in")
              })
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [threshold, baseDelay, staggerDelay, once, rootMargin])

  return (
    <div ref={containerRef} className={cn("stagger-container", className)}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(`stagger-item stagger-${animation}`, itemClassName)}
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
