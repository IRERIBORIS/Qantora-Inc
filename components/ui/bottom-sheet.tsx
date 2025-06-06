"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function BottomSheet({ isOpen, onClose, title, children, className }: BottomSheetProps) {
  const sheetRef = React.useRef<HTMLDivElement>(null)

  // Handle clicks outside the sheet content to close it
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
      // Prevent scrolling when sheet is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Handle ESC key to close
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscKey)
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in">
      <div className="fixed inset-x-0 bottom-0 z-50 mt-auto flex h-full max-h-[90vh] flex-col rounded-t-[20px] bg-white shadow-lg animate-slide-in-bottom">
        <div ref={sheetRef} className={cn("h-full overflow-y-auto", className)}>
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 p-4 backdrop-blur-sm">
            {title && <h3 className="text-xl font-display font-semibold">{title}</h3>}
            <button
              onClick={onClose}
              className="ml-auto rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 md:p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
