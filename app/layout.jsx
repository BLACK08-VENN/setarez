import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://setarez.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Setarez Technologies — Technology That Connects People and Ideas", template: "%s | Setarez Technologies" },
  description: "Setarez Technologies designs, installs and supports interactive learning, workplace collaboration and professional visual communication systems across Kenya and East Africa.",
  keywords: ["audio visual Kenya", "interactive classrooms", "video conferencing", "LED displays", "digital signage", "Setarez Technologies"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_KE", url: "/", siteName: "Setarez Technologies",
    title: "Setarez Technologies — Technology That Connects People and Ideas",
    description: "Integrated AV solutions for learning, collaboration and visual communication across East Africa.",
    images: [{ url: "/assets/digital-twin-classroom.png", width: 1672, height: 941, alt: "Setarez connected learning space" }]
  },
  twitter: { card: "summary_large_image", title: "Setarez Technologies — Technology That Connects People and Ideas", description: "Integrated AV solutions for learning, collaboration and visual communication across East Africa.", images: ["/assets/digital-twin-classroom.png"] },
  icons: {
    icon: [{ url: "/setarez-logo-white.png", type: "image/png" }],
    shortcut: "/setarez-logo-white.png",
    apple: "/setarez-logo-white.png"
  }
};

export const viewport = { themeColor: "#0c0c0b", colorScheme: "dark" };

export default function RootLayout({ children }) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Setarez Technologies", url: siteUrl, email: "sales@setarez.com", telephone: "+254713190778", address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" }, areaServed: ["Kenya", "East Africa"] };
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></head><body>{children}<Analytics /></body></html>;
}
