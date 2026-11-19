"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export default function SiteHeader({ links, theme, logoHref = "/" }) {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return <header>
    <Link className="brand-logo brand-logo-header" href={logoHref} aria-label="Setarez Technologies home"><Image src="/setarez-logo-white.png" alt="Setarez Technologies — Technology, Innovation, Guidance" width={1848} height={1775} priority /></Link>
    <nav id={navId} className={`primary-nav${open ? " open" : ""}`} aria-label="Primary navigation" onClick={() => setOpen(false)}>{links.map((link) => <Link href={link.href} key={`${link.href}-${link.label}`}>{link.label}</Link>)}</nav>
    <div className={`mobile-menu-scrim${open ? " open" : ""}`} aria-hidden="true" onClick={() => setOpen(false)} />
    <div className="theme-id"><i />{theme}</div>
    <button ref={toggleRef} className="mobile-menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls={navId} onClick={() => setOpen((current) => !current)}><span /><span /></button>
  </header>;
}
