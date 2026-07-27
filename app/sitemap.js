export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://setarez.com";
  return ["", "/privacy", "/terms"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path ? "yearly" : "monthly", priority: path ? 0.3 : 1 }));
}
