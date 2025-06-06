"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypingText({ text, delay = 0, speed = 40, className = "", onComplete }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!startTyping) return

    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }, speed)

    return () => clearInterval(typingInterval)
  }, [text, speed, startTyping, onComplete])

  return (
    <div className={`typing-container ${className}`}>
      <span className="typing-text">{displayText}</span>
      {!isComplete && <span className="cursor-blink">▌</span>}
    </div>
  )
}
