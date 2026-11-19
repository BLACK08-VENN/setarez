"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export default function SiteHeader({ links, theme, logoHref = "/" }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("dark");
  const navId = useId();
  const toggleRef = useRef(null);

  useEffect(() => {
    let saved = "";
    try { saved = localStorage.getItem("setarez-theme") || ""; } catch {}
    const initial = saved === "light" || saved === "dark" ? saved : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setMode(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

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

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("setarez-theme", next); } catch {}
  };

  return <header>
    <Link className="brand-logo brand-logo-header" href={logoHref} aria-label="Setarez Technologies home"><Image src="/setarez-logo-white.png" alt="Setarez Technologies — Technology, Innovation, Guidance" width={1848} height={1775} priority /></Link>
    <nav id={navId} className={`primary-nav${open ? " open" : ""}`} aria-label="Primary navigation" onClick={() => setOpen(false)}>{links.map((link) => <Link href={link.href} key={`${link.href}-${link.label}`}>{link.label}</Link>)}</nav>
    <div className={`mobile-menu-scrim${open ? " open" : ""}`} aria-hidden="true" onClick={() => setOpen(false)} />
    <div className="header-actions">
      {theme ? <div className="theme-id"><i />{theme}</div> : null}
      <button className="theme-toggle" type="button" aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"} aria-pressed={mode === "light"} onClick={toggleMode}>{mode === "light" ? "☾" : "☀"}</button>
      <button ref={toggleRef} className="mobile-menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls={navId} onClick={() => setOpen((current) => !current)}><span /><span /></button>
    </div>
  </header>;
}
