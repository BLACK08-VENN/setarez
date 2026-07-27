import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://setarez.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Setarez Technologies — Connected Spaces", template: "%s | Setarez Technologies" },
  description: "Setarez Technologies creates immersive, connected spaces for learning, leadership and shared ideas.",
  keywords: ["digital twin", "connected classrooms", "boardroom technology", "immersive spaces", "Setarez Technologies"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_KE", url: "/", siteName: "Setarez Technologies",
    title: "Setarez Technologies — Connected Spaces",
    description: "Immersive, connected spaces for learning and leadership.",
    images: [{ url: "/assets/digital-twin-classroom.png", width: 1672, height: 941, alt: "Setarez connected learning space" }]
  },
  twitter: { card: "summary_large_image", title: "Setarez Technologies — Connected Spaces", description: "Immersive, connected spaces for learning and leadership.", images: ["/assets/digital-twin-classroom.png"] },
  icons: { icon: "/icon.svg" }
};

export const viewport = { themeColor: "#0c0c0b", colorScheme: "dark" };

export default function RootLayout({ children }) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Setarez Technologies", url: siteUrl, email: "hello@setarez.com" };
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></head><body>{children}</body></html>;
}
