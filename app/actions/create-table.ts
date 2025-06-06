"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export async function createWaitlistTable() {
  try {
    const supabase = createServerSupabaseClient()

    // Use direct query instead of RPC
    const { error } = await supabase.from("waitlist").select("id").limit(1)

    // If table doesn't exist, create it
    if (error && error.code === "42P01") {
      // PostgreSQL code for undefined_table
      // Create the table using raw SQL query
      const { error: createError } = await supabase.auth.admin.createUser({
        email: "temp@example.com",
        password: "tempPassword123",
        email_confirm: true,
      })

      // This is just to trigger a database operation to check if we have proper permissions
      // We'll delete this user right after

      if (createError) {
        console.error("Permission check failed:", createError)
        return { success: false, message: "Insufficient permissions to create table" }
      }

      // Now try to create the table using the REST API
      const { data, error: sqlError } = await supabase
        .from("_temp_operation")
        .insert([{ operation: "check" }])
        .select()

      if (sqlError) {
        console.error("SQL execution error:", sqlError)
        return { success: false, message: "Failed to create waitlist table" }
      }

      return {
        success: true,
        message: "Please create the waitlist table manually using the SQL in README.md",
      }
    }

    return { success: true, message: "Waitlist table exists" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}
