"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Check } from "lucide-react"
import { submitToWaitlist } from "@/app/actions/waitlist"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface WaitlistFormProps {
  onComplete: (data: {
    fullName: string
    email: string
    username: string
  }) => void
}

export function WaitlistForm({ onComplete }: WaitlistFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [animateProgress, setAnimateProgress] = useState(false)
  const { toast } = useToast()

  const inputRefs = {
    fullName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
  }

  // Auto-focus the input field when step changes
  useEffect(() => {
    if (currentStep === 1 && inputRefs.fullName.current) {
      inputRefs.fullName.current.focus()
    } else if (currentStep === 2 && inputRefs.email.current) {
      inputRefs.email.current.focus()
    } else if (currentStep === 3 && inputRefs.username.current) {
      inputRefs.username.current.focus()
    }
  }, [currentStep])

  // Animate progress bar on step change
  useEffect(() => {
    setAnimateProgress(true)
    const timer = setTimeout(() => setAnimateProgress(false), 600)
    return () => clearTimeout(timer)
  }, [currentStep])

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) return
    setCurrentStep(2)
  }

  const handleSubmitStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) return
    setCurrentStep(3)
  }

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setIsSubmitting(true)

    try {
      // Submit to Supabase via server action
      const result = await submitToWaitlist({
        fullName,
        email,
        username,
      })

      if (result.success) {
        // Call onComplete with all collected data
        onComplete({
          fullName,
          email,
          username,
        })
      } else {
        // Show error toast
        toast({
          title: "Submission Error",
          description: result.message || "Failed to join waitlist. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting to waitlist:", error)
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Progress indicator with animation */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
          <div
            className={cn(
              "bg-[#111827] h-full transition-all duration-600 ease-out progress-bar",
              animateProgress && "animate-pulse-subtle",
            )}
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
        <span className="ml-4 text-sm text-gray-500">{currentStep}/3</span>
      </div>

      {/* Step 1: Full Name */}
      <div
        className={cn(
          "transition-all duration-500 transform",
          currentStep === 1 ? "opacity-100 translate-x-0" : "opacity-0 absolute -translate-x-full",
        )}
      >
        {currentStep === 1 && (
          <form onSubmit={handleSubmitStep1} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center">
                <span className="relative">
                  Full Name
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 transition-transform duration-300",
                      focusedField === "fullName" && "scale-x-100",
                    )}
                  />
                </span>
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                className="w-full transition-all duration-300 hover:border-gray-400 focus:border-gray-800 focus:-translate-y-1"
                ref={inputRefs.fullName}
                autoFocus
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#111827] hover:bg-[#1F2937] transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              disabled={!fullName.trim()}
            >
              <span className="relative overflow-hidden inline-block">
                <span className="inline-block transition-transform duration-300 group-hover:opacity-0">Continue</span>
              </span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
        )}
      </div>

      {/* Step 2: Email */}
      <div
        className={cn(
          "transition-all duration-500 transform",
          currentStep === 2 ? "opacity-100 translate-x-0" : "opacity-0 absolute -translate-x-full",
        )}
      >
        {currentStep === 2 && (
          <form onSubmit={handleSubmitStep2} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                <span className="relative">
                  Email Address
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 transition-transform duration-300",
                      focusedField === "email" && "scale-x-100",
                    )}
                  />
                </span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full transition-all duration-300 hover:border-gray-400 focus:border-gray-800 focus:-translate-y-1"
                ref={inputRefs.email}
                autoFocus
                required
              />
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 transition-all duration-300 hover:bg-gray-50 active:bg-gray-100"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#111827] hover:bg-[#1F2937] transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                disabled={!email.trim() || !email.includes("@")}
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="inline-block transition-transform duration-300 group-hover:opacity-0">Continue</span>
                </span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Step 3: Username */}
      <div
        className={cn(
          "transition-all duration-500 transform",
          currentStep === 3 ? "opacity-100 translate-x-0" : "opacity-0 absolute -translate-x-full",
        )}
      >
        {currentStep === 3 && (
          <form onSubmit={handleSubmitFinal} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center">
                <span className="relative">
                  Trading Username
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 transition-transform duration-300",
                      focusedField === "username" && "scale-x-100",
                    )}
                  />
                </span>
              </Label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                className="w-full transition-all duration-300 hover:border-gray-400 focus:border-gray-800 focus:-translate-y-1"
                ref={inputRefs.username}
                autoFocus
                required
              />
              <p className="text-xs text-gray-500">This will be your display name in the Qantora community.</p>
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 transition-all duration-300 hover:bg-gray-50 active:bg-gray-100"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#111827] hover:bg-[#1F2937] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 relative overflow-hidden"
                disabled={!username.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Processing...
                  </span>
                ) : (
                  <>
                    Join Waitlist
                    <Check className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </>
                )}
                {!isSubmitting && (
                  <span className="absolute inset-0 bg-white/10 transform -translate-x-full hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
