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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Back button */}
      <div className="absolute left-6 top-6 z-10">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex size-10 items-center justify-center rounded-md bg-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <ArrowLeft className="size-5 text-gray-700" />
          </motion.div>
        </Link>
      </div>

      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="mx-auto w-full max-w-md">
          {/* Brand Logo and Title */}
          <div className="mb-8 text-center">
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
                className="font-display text-3xl font-bold tracking-tight text-[#111827]"
              >
                QANTORA
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-2 text-gray-600"
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
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
          >
            {!isSuccess ? (
              <div className="p-6 md:p-8">
                <h2 className="mb-2 font-display text-2xl font-bold text-[#111827]">Join the Waitlist</h2>
                <p className="mb-6 text-gray-600">Be the first to experience Qantora&apos;s trading revolution.</p>

                <WaitlistForm
                  onComplete={(data) => {
                    console.log("Form completed with data:", data)
                    setUsername(data.username)
                    setIsSuccess(true)
                    toast({
                      title: "You&apos;re on the list!",
                      description: "We&apos;ll notify you when early access becomes available.",
                      duration: 5000,
                    })
                  }}
                />
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex size-20 items-center justify-center rounded-full bg-green-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-[#111827]">You&apos;re In!</h2>

                {/* Cato AI welcome message with typing animation */}
                <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
                  <div className="flex items-start">
                    <div className="mr-3 rounded-full bg-[#111827] p-2 text-white">
                      <span className="text-lg">⚡️</span>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Cato AI</p>
                      <TypingAnimation
                        text={`�� Hey ${username}! I&apos;m Cato AI - your futuristic co-pilot in the fast-changing world of trading and investing.`}
                        speed={30}
                        delay={500}
                        className="text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <p className="mb-6 text-gray-600">
                  Thanks for joining the Qantora waitlist. We&apos;ll notify you when early access becomes available.
                </p>
                <Link href="/">
                  <Button className="w-full bg-[#111827] transition-all duration-300 hover:bg-[#1F2937]">
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
            className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-md"
          >
            <blockquote className="text-sm italic text-gray-600 md:text-base">
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
