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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle animated background shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50/20 to-purple-50/10 rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-gray-100/30 to-blue-50/20 rounded-full blur-3xl animate-pulse delay-1000 opacity-60" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.02]"></div>
      </div>

      {/* Back button - Enhanced and fully functional */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 group"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors duration-200" />
          </motion.button>
        </Link>
      </div>

      {/* Main Content - Card Only */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        {/* Auth Card - Exactly as it was */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden relative max-w-md mx-auto w-full"
        >
          {/* Card background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="p-8 relative z-10">
            {/* Welcome Message */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-black mb-2">
                {isSignUp ? "Join Qantora" : "Welcome Back"}
              </h3>
              <p className="text-gray-600">
                {isSignUp ? "Start your trading journey today" : "Continue your trading journey"}
              </p>
            </div>

            {/* Enhanced Toggle Buttons */}
            <div className="flex bg-gray-50 rounded-2xl p-1.5 mb-6 relative">
              <motion.div
                className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-sm"
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
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Full Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required={isSignUp}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 h-11 rounded-xl border-gray-200 focus:border-black focus:ring-black/10 transition-all duration-200 bg-gray-50/50 focus:bg-white text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email field */}
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-11 rounded-xl border-gray-200 focus:border-black focus:ring-black/10 transition-all duration-200 bg-gray-50/50 focus:bg-white text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-11 rounded-xl border-gray-200 focus:border-black focus:ring-black/10 transition-all duration-200 bg-gray-50/50 focus:bg-white text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Confirm Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required={isSignUp}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-11 rounded-xl border-gray-200 focus:border-black focus:ring-black/10 transition-all duration-200 bg-gray-50/50 focus:bg-white text-sm"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forgot Password - only for sign in */}
              {!isSignUp && (
                <div className="text-right">
                  <Link href="#" className="text-sm text-black hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/90 h-12 text-base group transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden rounded-xl font-semibold mt-6"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              </Button>
            </form>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By continuing, you agree to our{" "}
                <Link href="#" className="text-black hover:underline font-medium">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-black hover:underline font-medium">
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
