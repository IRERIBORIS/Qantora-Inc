"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingAnimationProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  cursorClassName?: string
}

export function TypingAnimation({
  text,
  delay = 1000,
  speed = 50,
  className = "",
  cursorClassName = "",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [isTyping, text, speed])

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {!isComplete && (
        <motion.span
          className={`ml-0.5 inline-block ${cursorClassName}`}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          |
        </motion.span>
      )}
    </div>
  )
}
