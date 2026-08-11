import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

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
        reply_to: normalizedEmail,
        subject: "New client email from the Setarez website",
        text: `A client submitted their email through the Setarez website:\n\n${normalizedEmail}`
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Email delivery was rejected." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to process the request." }, { status: 500 });
  }
}
