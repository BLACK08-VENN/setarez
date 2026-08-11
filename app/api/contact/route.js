import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const payload = await request.json();
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const project = typeof payload.project === "string" ? payload.project.trim() : "";

    if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !project || project.length > 5000) {
      return NextResponse.json({ error: "Please complete all fields with valid information." }, { status: 400 });
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
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\n\nProject details:\n${project}`
      })
    });

    if (!response.ok) return NextResponse.json({ error: "Email delivery was rejected." }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to process the request." }, { status: 500 });
  }
}
