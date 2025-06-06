# Qantora - Modern Landing Page with Supabase Integration

This project is a modern landing page for Qantora, an AI-driven fintech platform designed specifically for retail traders and investors. The landing page includes a waitlist feature that integrates with Supabase to store user information.

## Features

- **Responsive Design**: Optimized for all screen sizes with consistent visual elements
- **Enhanced UX**: Smooth scroll animations, micro-interactions, and immersive scrolling
- **Modern Aesthetics**: Glassmorphism effects, blur animations, and premium card design
- **Comprehensive Waitlist Flow**: Multi-step conversational UI with detailed user profiling
- **Supabase Integration**: Secure storage of waitlist sign-ups with error handling

## Design System

The website follows a consistent design system with the following elements:

### Colors

- **Primary Background**: White (#FFFFFF)
- **Secondary Background**: Light Gray (#F9FAFB)
- **Accent Background**: Dark Gray (#2b2f36)
- **Text Colors**: Dark Gray (#111827), Medium Gray (#6B7280), Light Gray (#9CA3AF)

### Typography

- **Display Font**: "Clash Display" (headings, brand name)
- **Body Font**: System font stack (paragraphs, UI elements)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Components

- Glassmorphism cards with hover effects
- Animated buttons with pulse effects
- Micro-interactions for improved user engagement
- Scroll-triggered animations
- Responsive header with shrinking effect
- Enhanced footer with social links

## Supabase Integration

The project uses Supabase for storing waitlist sign-ups. Here's how the integration works:

### Database Schema

The waitlist information is stored in a `waitlist` table with the following schema:

\`\`\`sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) NOT NULL,
  preferred_name VARCHAR(100),
  experience VARCHAR(50),
  interests TEXT[],
  referred_by VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending'
);

CREATE INDEX idx_waitlist_email ON waitlist(email);
\`\`\`

### Manual Table Creation (Required)

You need to manually create the waitlist table in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Paste the following SQL and run it:

\`\`\`sql
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) NOT NULL,
  preferred_name VARCHAR(100),
  experience VARCHAR(50),
  interests TEXT[],
  referred_by VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
\`\`\`

### Retrieving Waitlist Data

To retrieve the waitlist data from Supabase, you can use the following methods:

#### 1. Using the Supabase Dashboard

The simplest way to view and manage waitlist entries:

1. Log in to your Supabase project dashboard
2. Navigate to the "Table Editor" in the left sidebar
3. Select the "waitlist" table
4. You'll see all entries with options to filter, sort, and export data

#### 2. Using SQL in Supabase Dashboard

For more complex queries:

1. Go to the SQL Editor in your Supabase dashboard
2. Run queries like:

\`\`\`sql
-- Get all waitlist entries
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Get count of waitlist entries
SELECT COUNT(*) FROM waitlist;

-- Get entries from a specific date range
SELECT * FROM waitlist 
WHERE created_at BETWEEN '2023-01-01' AND '2023-12-31'
ORDER BY created_at DESC;

-- Get entries with specific status
SELECT * FROM waitlist WHERE status = 'pending';
\`\`\`

#### 3. Programmatically Using Supabase Client

To retrieve data in your application code:

\`\`\`typescript
// Server-side retrieval (secure)
import { createServerSupabaseClient } from "@/lib/supabase";

export async function getWaitlistEntries() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching waitlist entries:", error);
    return { success: false, error };
  }
  
  return { success: true, data };
}

// Example usage in a server action or API route
export async function GET() {
  const result = await getWaitlistEntries();
  
  if (!result.success) {
    return new Response(JSON.stringify({ error: "Failed to fetch waitlist data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
\`\`\`

#### 4. Creating an Admin Dashboard

For a more comprehensive solution, you could create an admin dashboard:

1. Create a protected route (e.g., `/admin/waitlist`)
2. Implement authentication to ensure only authorized users can access it
3. Display waitlist data in a table with sorting, filtering, and pagination
4. Add functionality to update status, add notes, or export data

Example admin page structure:

\`\`\`typescript
// app/admin/waitlist/page.tsx
"use client"

import { useState, useEffect } from "react";
import { getWaitlistEntries } from "@/app/actions/admin";

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      const result = await getWaitlistEntries();
      if (result.success) {
        setEntries(result.data);
      }
      setLoading(false);
    }
    
    loadData();
  }, []);
  
  if (loading) return <div>Loading waitlist data...</div>;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Waitlist Entries ({entries.length})</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="py-2 px-4 border-b">{entry.full_name}</td>
                <td className="py-2 px-4 border-b">{entry.email}</td>
                <td className="py-2 px-4 border-b">{entry.username}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(entry.created_at).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{entry.status}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
\`\`\`

### Security Considerations

When retrieving waitlist data, keep these security practices in mind:

1. **Never expose the service role key** in client-side code
2. Always use server-side functions or API routes to fetch sensitive data
3. Implement proper authentication and authorization for admin features
4. Consider using Row Level Security (RLS) in Supabase for additional protection
5. Sanitize and validate all user inputs before storing in the database

### Integration Components

1. **Supabase Client Setup** (`lib/supabase.ts`):
   - Creates separate clients for server-side and client-side operations
   - Handles environment variables and client instantiation
   - Implements singleton pattern for client-side usage

2. **Server Actions** (`app/actions/waitlist.ts`):
   - Provides a server action to submit waitlist entries to Supabase
   - Handles error cases like duplicate emails and missing tables
   - Returns appropriate success/error messages
   - Includes error logging for troubleshooting

3. **Waitlist Form** (`components/waitlist-form.tsx`):
   - Multi-step form with conversational UI
   - Collects detailed user information (name, email, preferences, etc.)
   - Implements smooth animations and transitions
   - Provides visual feedback during submission

### Error Handling

The integration includes robust error handling for common issues:

- **Table does not exist**: Appropriate user message with fallback behavior
- **Duplicate email addresses**: User-friendly message without exposing database errors
- **Network issues**: Graceful degradation with clear error messages
- **Server errors**: Comprehensive logging for troubleshooting

### Environment Variables

The following environment variables are required for the Supabase integration:

\`\`\`
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your Supabase project:
   - Create a new project in Supabase
   - Get the API keys from the project settings
   - Create the waitlist table using the SQL provided above
4. Add the required environment variables to your `.env.local` file
5. Run the development server with `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

### Common Issues

1. **Database table not found error**: 
   - Verify you've run the SQL creation script in your Supabase SQL Editor
   - Check that the table name matches exactly (`waitlist` in lowercase)
   - Ensure your service role key has the necessary permissions

2. **Authentication errors**:
   - Confirm all environment variables are correctly set
   - Make sure your API keys are valid and not expired
   - Check for typos in the environment variable names

3. **Form submission errors**:
   - Look for browser console errors that might indicate client-side issues
   - Check the server logs for any backend errors
   - Verify network connectivity between your application and Supabase

## Deployment

This project can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add your environment variables in the Vercel project settings
4. Deploy!

### Environment Variables in Vercel

Make sure to add these environment variables to your Vercel project:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Performance Considerations

- The glassmorphism effects and animations are optimized for performance
- The project uses responsive images and lazy loading where appropriate
- CSS animations utilize hardware acceleration when possible
- Form submissions are handled asynchronously to maintain UI responsiveness

## Accessibility

- The project follows WCAG guidelines for accessibility
- All interactive elements are keyboard accessible
- Proper contrast ratios are maintained for text readability
- ARIA attributes are used where appropriate

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
