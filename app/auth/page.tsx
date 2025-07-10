"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle authentication logic here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle animated background shapes */}
        <div className="absolute left-1/4 top-1/4 size-96 animate-pulse rounded-full bg-gradient-to-br from-blue-50/20 to-purple-50/10 opacity-60 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-80 animate-pulse rounded-full bg-gradient-to-tl from-gray-100/30 to-blue-50/20 opacity-60 blur-3xl delay-1000" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.02]"></div>
      </div>

      {/* Back button - Enhanced and fully functional */}
      <div className="absolute left-6 top-6 z-20">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group flex size-12 items-center justify-center rounded-2xl border border-white/30 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl"
          >
            <ArrowLeft className="size-5 text-gray-700 transition-colors duration-200 group-hover:text-black" />
          </motion.button>
        </Link>
      </div>

      {/* Main Content - Card Only */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-6">
        {/* Auth Card - Exactly as it was */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/30 bg-white/95 shadow-2xl backdrop-blur-xl"
        >
          {/* Card background decoration */}
          <div className="absolute right-0 top-0 size-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-bl from-gray-50/50 to-transparent" />

          <div className="relative z-10 p-8">
            {/* Welcome Message */}
            <div className="mb-6 text-center">
              <h3 className="mb-2 font-display text-2xl font-bold text-black">
                {isSignUp ? "Join Qantora" : "Welcome Back"}
              </h3>
              <p className="text-gray-600">
                {isSignUp ? "Start your trading journey today" : "Continue your trading journey"}
              </p>
            </div>

            {/* Enhanced Toggle Buttons */}
            <div className="relative mb-6 flex rounded-2xl bg-gray-50 p-1.5">
              <motion.div
                className="absolute inset-y-1.5 rounded-xl bg-white shadow-sm"
                animate={{
                  left: isSignUp ? "50%" : "6px",
                  right: isSignUp ? "6px" : "50%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setIsSignUp(false)}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-300 relative z-10",
                  !isSignUp ? "text-black" : "text-gray-600 hover:text-black",
                )}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-300 relative z-10",
                  isSignUp ? "text-black" : "text-gray-600 hover:text-black",
                )}
              >
                Sign Up
              </button>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field - only for sign up */}
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <div className="group relative">
                      <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-black" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required={isSignUp}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-sm transition-all duration-200 focus:border-black focus:bg-white focus:ring-black/10"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email field */}
              <div>
                <Label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="group relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-black" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-sm transition-all duration-200 focus:border-black focus:bg-white focus:ring-black/10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <Label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="group relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-black" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 px-10 text-sm transition-all duration-200 focus:border-black focus:bg-white focus:ring-black/10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-black"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password field - only for sign up */}
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="group relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-black" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required={isSignUp}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="h-11 rounded-xl border-gray-200 bg-gray-50/50 px-10 text-sm transition-all duration-200 focus:border-black focus:bg-white focus:ring-black/10"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-black"
                      >
                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forgot Password - only for sign in */}
              {!isSignUp && (
                <div className="text-right">
                  <Link href="#" className="text-sm font-medium text-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="group relative mt-6 h-12 w-full overflow-hidden rounded-xl bg-black text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-xl active:translate-y-0"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 ease-out group-hover:translate-x-0" />
              </Button>
            </form>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-xs leading-relaxed text-gray-500">
                By continuing, you agree to our{" "}
                <Link href="#" className="font-medium text-black hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="font-medium text-black hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
