"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader({ links, theme, logoHref = "/" }) {
  const [open, setOpen] = useState(false);

  return <header>
    <Link className="brand-logo brand-logo-header" href={logoHref} aria-label="Setarez Technologies home"><Image src="/setarez-logo-white.png" alt="Setarez Technologies — Technology, Innovation, Guidance" width={1848} height={1775} priority /></Link>
    <nav className={`primary-nav${open ? " open" : ""}`} aria-label="Primary navigation">{links.map((link) => <Link href={link.href} onClick={() => setOpen(false)} key={`${link.href}-${link.label}`}>{link.label}</Link>)}</nav>
    <div className="theme-id"><i />{theme}</div>
    <button className="mobile-menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} onClick={() => setOpen((current) => !current)}><span /><span /></button>
  </header>;
}
