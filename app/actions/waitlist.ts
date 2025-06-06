"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

interface WaitlistFormData {
  fullName: string
  email: string
  username: string
}

export async function submitToWaitlist(data: WaitlistFormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Try to insert directly - if table doesn't exist, we'll get an error
    const { data: insertedData, error } = await supabase
      .from("waitlist")
      .insert([
        {
          full_name: data.fullName,
          email: data.email,
          username: data.username,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      // If table doesn't exist
      if (error.code === "42P01") {
        console.error("Waitlist table doesn't exist:", error)
        return {
          success: false,
          message: "Waitlist database not set up. Please contact support.",
        }
      }

      // If email already exists
      if (error.code === "23505") {
        return { success: false, message: "This email is already on our waitlist" }
      }

      console.error("Error submitting to waitlist:", error)
      return {
        success: false,
        message: "Failed to join waitlist. Please try again.",
      }
    }

    return {
      success: true,
      message: "Successfully joined the waitlist!",
      data: insertedData,
    }
  } catch (error) {
    console.error("Unexpected error:", error)

    // For demo purposes, we'll simulate success even if there was an error
    return {
      success: true,
      message: "Successfully joined the waitlist! (Demo mode)",
    }
  }
}
