"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function BrochureFlipbook({ pages, pdfHref, title = "Teachmint brochure", cta = "Read the brochure" }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const closeRef = useRef(null);

  const go = useCallback((delta) => {
    setIndex((current) => Math.min(pages.length - 1, Math.max(0, current + delta)));
  }, [pages.length]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, go]);

  function openBook() {
    setIndex(0);
    setOpen(true);
  }

  return (
    <>
      <button type="button" className="button primary brochure-open" onClick={openBook}>
        {cta}
      </button>

      {open && (
        <div
          className="flipbook-backdrop"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
        >
          <div className="flipbook" role="dialog" aria-modal="true" aria-label={`${title} — page ${index + 1} of ${pages.length}`}>
            <div className="flipbook-bar">
              <span className="flipbook-count">
                {String(index + 1).padStart(2, "0")} <i>/</i> {String(pages.length).padStart(2, "0")}
              </span>
              <div className="flipbook-bar-actions">
                <a href={pdfHref} download>Download PDF</a>
                <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close brochure">×</button>
              </div>
            </div>

            <div
              className="flipbook-stage"
              onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
              onTouchEnd={(event) => {
                if (touchStart.current === null) return;
                const delta = event.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
                touchStart.current = null;
              }}
            >
              {pages.map((src, i) => {
                const state = i === index ? "current" : i < index ? "flipped" : "upcoming";
                return (
                  <div className={`flipbook-page ${state}`} key={src} aria-hidden={i !== index}>
                    <Image src={src} alt={`${title} page ${i + 1}`} fill sizes="(max-width: 760px) 90vw, 640px" priority={i === 0} />
                  </div>
                );
              })}
              <button type="button" className="flipbook-nav prev" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous page">‹</button>
              <button type="button" className="flipbook-nav next" onClick={() => go(1)} disabled={index === pages.length - 1} aria-label="Next page">›</button>
            </div>

            <div className="flipbook-progress" aria-hidden="true"><i style={{ width: `${((index + 1) / pages.length) * 100}%` }} /></div>
            <p className="flipbook-hint">Swipe or use the arrows to turn the page</p>
          </div>
        </div>
      )}
    </>
  );
}
