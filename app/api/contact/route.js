import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(254, "Email is too long"),
  project: z.string().trim().min(1, "Project details are required").max(5000, "Project details are too long"),
});

// A simple in-memory store for rate limiting.
// For production, consider a more robust solution like Upstash (Redis).
const ipRequestMap = new Map();
const RATE_LIMIT_COUNT = 5; // Max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

export async function POST(request) {
  // Get the IP address from the request headers.
  // "x-forwarded-for" is important for platforms like Vercel.
  const ip = request.headers.get("x-forwarded-for") || request.ip;

  if (ip) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Get and filter requests from this IP within the time window
    const userRequests = (ipRequestMap.get(ip) || []).filter((ts) => ts > windowStart);

    if (userRequests.length >= RATE_LIMIT_COUNT) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    ipRequestMap.set(ip, [...userRequests, now]);
  }

  try {
    const payload = await request.json();
    const validation = contactSchema.safeParse(payload);

    if (!validation.success) {
      // You can optionally return the specific issues for better frontend error handling
      return NextResponse.json({ error: "Invalid input.", issues: validation.error.flatten() }, { status: 400 });
    }

    // Use the validated and sanitized data from zod
    const { name, email, project } = validation.data;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "setarez-website/1.0"
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Setarez Website <website@setarez.com>",
        to: ["sales@setarez.com"],
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\n\nProject details:\n${project}`
      })
    });

    if (!response.ok) return NextResponse.json({ error: "Email delivery was rejected." }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch (error) {
    // It's good practice to log the actual error on the server for debugging
    console.error("Contact API Error:", error);

    if (error instanceof SyntaxError) { // Catches errors from request.json()
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
