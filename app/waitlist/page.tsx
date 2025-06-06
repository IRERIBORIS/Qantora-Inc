"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import { useToast } from "@/hooks/use-toast"
import { WaitlistForm } from "@/components/waitlist-form"
import { createWaitlistTable } from "@/app/actions/create-table"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { TypingAnimation } from "@/components/ui/typing-animation"

export default function WaitlistPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isSuccess, setIsSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isDbReady, setIsDbReady] = useState(false)
  const [username, setUsername] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Try to check if the waitlist table exists
    const initializeDatabase = async () => {
      try {
        const result = await createWaitlistTable()
        if (result.success) {
          setIsDbReady(true)
        } else {
          console.warn("Database initialization message:", result.message)
          // We'll continue anyway, as the table might be created manually
          setIsDbReady(true)
        }
      } catch (error) {
        console.error("Error checking database:", error)
        // Continue anyway, as we'll handle errors during form submission
        setIsDbReady(true)
      }
    }

    initializeDatabase()

    // Add a subtle background animation
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== "undefined") {
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight

        setMousePosition({ x, y })
        document.documentElement.style.setProperty("--mouse-x", x.toString())
        document.documentElement.style.setProperty("--mouse-y", y.toString())
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleFormComplete = (data: { fullName: string; email: string; username: string }) => {
    // The form component now handles the Supabase submission
    setIsSuccess(true)
    setUsername(data.username)
    toast({
      title: "You're on the list!",
      description: "We'll notify you when early access becomes available.",
      duration: 5000,
    })
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 rounded-md bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </motion.div>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Brand Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BrandLogo size={isMobile ? "lg" : "xl"} animated className="mb-4" />
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-display font-bold text-[#111827] tracking-tight"
              >
                QANTORA
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-gray-600 mt-2"
              >
                Your AI-Powered Trading Edge
              </motion.p>
            </div>
          </div>

          {/* Waitlist Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {!isSuccess ? (
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-display font-bold text-[#111827] mb-2">Join the Waitlist</h2>
                <p className="text-gray-600 mb-6">Be the first to experience Qantora's trading revolution.</p>

                <WaitlistForm
                  onComplete={(data) => {
                    console.log("Form completed with data:", data)
                    setUsername(data.username)
                    setIsSuccess(true)
                    toast({
                      title: "You're on the list!",
                      description: "We'll notify you when early access becomes available.",
                      duration: 5000,
                    })
                  }}
                />
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold font-display tracking-tight text-[#111827] mb-4">You're In!</h2>

                {/* Cato AI welcome message with typing animation */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-start">
                    <div className="bg-[#111827] text-white p-2 rounded-full mr-3">
                      <span className="text-lg">⚡️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Cato AI</p>
                      <TypingAnimation
                        text={`👋 Hey ${username}! I'm Cato AI - your futuristic co-pilot in the fast-changing world of trading and investing.`}
                        speed={30}
                        delay={500}
                        className="text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  Thanks for joining the Qantora waitlist. We'll notify you when early access becomes available.
                </p>
                <Link href="/">
                  <Button className="w-full bg-[#111827] hover:bg-[#1F2937] transition-all duration-300">
                    Return to Home
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Testimonial or Quote */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 bg-white rounded-xl p-6 shadow-md border border-gray-100"
          >
            <blockquote className="text-gray-600 italic text-sm md:text-base">
              "The greatest edge in markets comes from the combination of intelligence, discipline, and the right
              tools."
            </blockquote>
            <p className="mt-2 text-sm font-medium text-gray-500">— Qantora Team</p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Qantora. All rights reserved.</p>
      </footer>
    </div>
  )
}
