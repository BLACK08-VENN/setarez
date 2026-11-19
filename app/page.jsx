"use client";

import Image from "next/image";
import { useEffect, useState, useId, useRef } from "react";
import SiteHeader from "./SiteHeader";
import { openWhatsApp } from "../lib/whatsapp";

const enquiryStorageKey = "setarez-product-enquiry";

const capabilities = [
  { tag: "TEACH", title: "Interactive learning", image: "/assets/interactive-learning.png", alt: "Teacher using an interactive display in a Kenyan classroom", description: "Displays, classroom software and teacher training that make digital lessons work." },
  { tag: "MEET", title: "Hybrid collaboration", image: "/assets/hybrid-collaboration.png", alt: "Professional hybrid meeting in a modern boardroom", description: "Video, audio and room control for meetings that work in person and online." },
  { tag: "DISPLAY", title: "Visual communication", image: "/assets/digital-display.png", alt: "Large-format LED display in a corporate environment", description: "LED walls, fine-pitch displays and digital signage for spaces that need to be seen." },
  { tag: "SUPPORT", title: "Integration & lifecycle", image: "/assets/av-support.png", alt: "AV technician commissioning a professional meeting-room system", description: "Survey, design, installation, training and ongoing support from one team." }
];

const reasons = [
  ["Solution-first", "We begin with the customer’s desired outcome."],
  ["Experience-led", "See and test solutions before investing."],
  ["Local expertise", "Professional installation, training and support."],
  ["Complete ownership", "One accountable partner from design to lifecycle."],
  ["Scalable delivery", "Solutions built to grow by room, campus or branch."],
  ["Long-term value", "Maintenance and upgrades protect every investment."]
];

const partnerBrands = [
  { name: "Teachmint", logo: "/assets/logos/teachmint.svg", href: "/catalogue/teachmint" },
  { name: "Logitech", logo: "/assets/logos/logitech.svg", href: "/catalogue/logitech" },
  { name: "ViewSonic", logo: "/assets/logos/viewsonic.svg", href: "/catalogue/viewsonic" },
  { name: "Absen", logo: "/assets/logos/absen.png", href: "/catalogue/absen" }
];

const heroSlides = [
  { image: "/assets/hero/hd-k12-classroom.webp", alt: "Teacher presenting a science lesson on a ViewSonic ViewBoard in a bright classroom", label: "INTERACTIVE LEARNING", title: "Ideas become experiences.", description: "Connected classrooms designed for confident teaching, active participation and clearer learning." },
  { image: "/assets/hero/hd-student-engagement.webp", alt: "Student interacting directly with a ViewSonic classroom display", label: "CONNECTED CLASSROOMS", title: "Teaching without technical friction.", description: "Integrated displays, classroom software and simple controls that educators can use with confidence." },
  { image: "/assets/hero/hd-wireless-collaboration.webp", alt: "Teacher wirelessly sharing lesson content to a classroom display", label: "WIRELESS COLLABORATION", title: "Ideas move freely.", description: "Simple wireless sharing keeps attention on the lesson and makes every device part of the room." },
  { image: "/assets/hero/hd-final-boardroom.webp", alt: "Executive boardroom with professional conferencing technology", label: "EXECUTIVE BOARDROOMS", title: "Decisions deserve total clarity.", description: "Premium boardrooms designed around natural conversation, reliable presentation and one-touch meetings." },
  { image: "/assets/digital-display.png", alt: "Large-format professional digital display installation", label: "VISUAL COMMUNICATION", title: "Make the message impossible to miss.", description: "High-impact LED and digital display environments for communication, information and brand presence." },
  { image: "/assets/digital-twin-classroom.png", alt: "Large connected presentation and auditorium environment", label: "AUDITORIUM SYSTEMS", title: "Reach every seat in the room.", description: "Large-format visual, audio and hybrid systems for lecture theatres, halls and public presentation spaces." },
  { image: "/assets/hero/viewsonic/collaborative-stations.jpg", alt: "Students collaborating with bright ViewSonic portable displays", label: "ACTIVE LEARNING", title: "Every student joins in.", description: "Flexible learning stations designed for shared discovery, participation and hands-on collaboration." },
  { image: "/assets/hero/hd-av-support.webp", alt: "AV specialist supporting an installed technology system", label: "LIFECYCLE SUPPORT", title: "Performance that lasts beyond installation.", description: "Commissioning, training, maintenance and responsive local support throughout the system lifecycle." }
];

const equipment = {
  teachmint75: { brand: "Teachmint", name: "Teachmint X 75″", role: "Interactive learning display", specs: "True 4K UHD · 40-point touch · ≤5ms response · 40W speakers" },
  teachmint86: { brand: "Teachmint", name: "Teachmint X 86″", role: "Large classroom display", specs: "48MP 4K camera · 8-array microphone · 8GB/128GB · Android 16 EDLA" },
  rallyMini: { brand: "Logitech", name: "Rally Bar Mini", role: "Small-room video bar", specs: "4K camera · 120° diagonal field of view · 6 beamforming microphones" },
  rallyBar: { brand: "Logitech", name: "Rally Bar", role: "Medium-to-large-room video bar", specs: "4K PTZ camera · 15× HD zoom · 7m microphone pickup" },
  rallyPlus: { brand: "Logitech", name: "Rally Plus", role: "Expandable large-room conference system", specs: "Ultra-HD camera · 2 speakers · 2 Rally Mic Pods · expandable audio" },
  tap: { brand: "Logitech", name: "Tap IP", role: "Room touch controller", specs: "10.1″ 1280 × 800 display · 10-point touch · Power over Ethernet" },
  sight: { brand: "Logitech", name: "Sight", role: "Tabletop companion camera", specs: "Dual-lens 4K · 315° horizontal view · 7 beamforming microphones" },
  micPod: { brand: "Logitech", name: "Rally Mic Pod", role: "Expandable table microphone", specs: "4.5m pickup range · 4 beamforming microphones · AEC and AI noise suppression" },
  scribe: { brand: "Logitech", name: "Scribe", role: "AI whiteboard camera", specs: "1080p AI-enhanced output · presenter removal · supports boards up to 1.2 × 1.8m" },
  scheduler: { brand: "Logitech", name: "Tap Scheduler", role: "Room booking panel", specs: "10.1″ touchscreen · calendar integration · remote management with Logitech Sync" },
  swytch: { brand: "Logitech", name: "Swytch", role: "Bring-your-own-laptop room connection", specs: "Single USB connection · uses the room display, camera and speakers · up to 4K output" },
  absen108: { brand: "Absen", name: "Absen X Series 108″", role: "All-in-one Micro LED display", specs: "Optional 20-point touch · 1mm touch accuracy · 2 × 15W speakers" },
  absen136: { brand: "Absen", name: "Absen X Series 136″", role: "Lecture theatre / conference display", specs: "Micro LED · Android 11 · 4GB/32GB · complete installation kit" },
  absen163: { brand: "Absen", name: "Absen X Series 163″", role: "Auditorium-scale presentation display", specs: "Micro LED · 100,000-hour service life · optional interactive touch" }
};

function recommendEquipment(useCase, area, seats) {
  if (useCase === "education") {
    if (area <= 55 && seats <= 35) return { size: "Standard classroom", summary: "A focused interactive and hybrid-ready teaching setup for clear visibility and everyday lesson delivery.", products: [equipment.teachmint75, equipment.rallyMini, equipment.tap] };
    if (area <= 90 && seats <= 60) return { size: "Large classroom", summary: "A larger teaching surface with extended voice coverage and simple session control for in-person or hybrid learning.", products: [equipment.teachmint86, equipment.rallyBar, equipment.micPod, equipment.tap, equipment.scribe] };
    const display = area > 160 || seats > 120 ? equipment.absen163 : area > 110 || seats > 80 ? equipment.absen136 : equipment.absen108;
    const micPods = seats > 100 ? [equipment.micPod, { ...equipment.micPod, name: "Rally Mic Pod — additional coverage" }] : [equipment.micPod];
    return { size: "Lecture hall / auditorium", summary: "A large-format teaching and presentation system with expandable hybrid-learning, whiteboard and room-control coverage.", products: [display, equipment.rallyPlus, ...micPods, equipment.tap, equipment.scribe, equipment.scheduler] };
  }

  if (area <= 25 && seats <= 8) return { size: "Huddle / small meeting room", summary: "A compact one-touch conferencing setup with flexible laptop connectivity for a short table and close camera distance.", products: [equipment.rallyMini, equipment.tap, equipment.swytch, equipment.scheduler] };
  if (area <= 55 && seats <= 14) return { size: "Medium boardroom", summary: "An all-in-one system with optical zoom, table-level framing and expanded audio for a longer meeting table.", products: [equipment.rallyBar, equipment.tap, equipment.swytch, ...(seats >= 10 ? [equipment.sight, equipment.micPod] : [equipment.scheduler])] };
  const display = area > 140 || seats > 30 ? equipment.absen163 : area > 85 || seats > 20 ? equipment.absen136 : equipment.absen108;
  return { size: "Large boardroom / conference room", summary: "An expandable conferencing system with equitable participant framing, extended voice pickup and a seamless large-format presentation canvas.", products: [equipment.rallyPlus, equipment.sight, equipment.micPod, equipment.tap, equipment.swytch, equipment.scheduler, equipment.scribe, display] };
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [finderUse, setFinderUse] = useState("conferencing");
  const [finderArea, setFinderArea] = useState(20);
  const [finderSeats, setFinderSeats] = useState(6);
  const [equipmentExpanded, setEquipmentExpanded] = useState(false);
  const [activeHero, setActiveHero] = useState(1);
  const [heroDirection, setHeroDirection] = useState(1);
  const heroTouchX = useRef(null);
  const heroSwipedAt = useRef(0);
  const [contactState, setContactState] = useState({ status: "idle", errors: null });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [enquiryState, setEnquiryState] = useState({ status: "idle", errors: null });
  const recommendation = recommendEquipment(finderUse, Number(finderArea) || 1, Number(finderSeats) || 1);
  const formId = useId();
  const contactNameId = `${formId}-contact-name`;
  const contactEmailId = `${formId}-contact-email`;
  const contactProjectId = `${formId}-contact-project`;
  const enquiryNameId = `${formId}-enquiry-name`;
  const enquiryEmailId = `${formId}-enquiry-email`;
  const enquiryProjectId = `${formId}-enquiry-project`;


  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(enquiryStorageKey));
      setSelectedProducts(Array.isArray(saved) ? saved : []);
    } catch {
      localStorage.removeItem(enquiryStorageKey);
    }
  }, []);

  useEffect(() => {
    setEquipmentExpanded(false);
  }, [finderUse, finderArea, finderSeats]);

  useEffect(() => {
    if (heroDirection === 0) return undefined;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const constrained = window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 760px)").matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "");
    if (constrained) return undefined;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setActiveHero((current) => (current + heroDirection + heroSlides.length) % heroSlides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [heroDirection]);

  function updateSelectedProducts(items) {
    setSelectedProducts(items);
    localStorage.setItem(enquiryStorageKey, JSON.stringify(items));
  }

  function toggleRecommendedProduct(product) {
    const id = `${product.brand.toLowerCase()}:${product.name}`;
    const exists = selectedProducts.some((item) => item.id === id);
    updateSelectedProducts(exists
      ? selectedProducts.filter((item) => item.id !== id)
      : [...selectedProducts, { id, name: product.name, brand: product.brand }]);
  }

  function submitProductEnquiry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const productList = selectedProducts.map((item, index) => `${index + 1}. ${item.brand} — ${item.name}`).join("\n");
    const message = `Hello Setarez Technologies,\n\nName: ${data.name}\nEmail: ${data.email}\nOrganisation: ${data.organisation || "Not provided"}\n\nProducts requested:\n${productList}\n\nProject details:\n${data.project}`;
    openWhatsApp(message);
    form.reset();
    updateSelectedProducts([]);
    setEnquiryState({ status: "sent", errors: null });
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader logoHref="#main" links={[{ href: "#solutions", label: "Solutions" }, { href: "/catalogue", label: "Catalogue" }, { href: "/catalogue#brands", label: "Brands" }, { href: "#finder", label: "Solution finder" }]} />

      <main id="main">
        <section className="hero-showcase" aria-label="Featured technology experiences">
          <div className="hero-carousel" onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const ratio = (event.clientX - bounds.left) / bounds.width;
            setHeroDirection(ratio < .4 ? -1 : ratio > .6 ? 1 : 0);
          }} onPointerLeave={() => setHeroDirection(1)} onTouchStart={(event) => { heroTouchX.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
            if (heroTouchX.current === null) return;
            const delta = event.changedTouches[0].clientX - heroTouchX.current;
            heroTouchX.current = null;
            if (Math.abs(delta) < 45) return;
            heroSwipedAt.current = Date.now();
            setActiveHero((current) => (current + (delta < 0 ? 1 : -1) + heroSlides.length) % heroSlides.length);
            setHeroDirection(0);
          }}>
            <div className="hero-cinematic">
              <div className="hero-flip-deck" aria-label="Featured solution slides">{heroSlides.map((slide, index) => {
                let offset = (index - activeHero + heroSlides.length) % heroSlides.length;
                if (offset > heroSlides.length / 2) offset -= heroSlides.length;
                const distance = Math.abs(offset);
                return <button type="button" className={offset === 0 ? "active" : ""} data-offset={offset} key={slide.title} onFocus={() => { setActiveHero(index); setHeroDirection(0); }} onClick={() => { if (Date.now() - heroSwipedAt.current < 450) return; setActiveHero(offset === 0 ? (index + 1) % heroSlides.length : index); setHeroDirection(0); }} aria-label={offset === 0 ? `Next slide after ${slide.label}` : `Show ${slide.label}`} aria-pressed={offset === 0} style={{ "--card-y": "0px", "--card-rotate": "0deg", "--card-scale": offset === 0 ? 1 : .92, "--card-opacity": distance > 3 ? 0 : Math.max(.34, 1 - distance * .18), "--card-z": 20 - distance, pointerEvents: distance > 3 ? "none" : "auto" }}>
                  {distance <= 2 && <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 760px) 72vw, 42vw" quality={68} priority={index === 1} />}
                  <div className="hero-card-label">{slide.label}</div>
                </button>;
              })}</div>
            </div>
          </div>
          <div className="hero-showcase-main compact-delivery">
            <div className="hero-copy">
              <p className="eyebrow">WHAT WE DELIVER</p>
              <h1>Smarter spaces, built around you.</h1>
              <p className="hero-subcopy">Professional AV solutions for classrooms, meeting rooms and digital environments across East Africa.</p>
              <div className="hero-actions">
                <a className="button primary" href="#finder">Find your solution</a>
                <a className="button secondary" href="#contact">Book a site survey</a>
              </div>
            </div>
          </div>
        </section>

        <section className="finder" id="finder" aria-labelledby="finder-title">
          <div className="finder-head"><p>SOLUTION FINDER</p><h2 id="finder-title">Not sure what<br /><em>your room needs?</em></h2><p>Enter the room’s approximate floor area and capacity. We’ll suggest a practical starting system for education or video conferencing.</p></div>
          <div className="finder-tool">
            <form className="finder-form" onSubmit={(event) => event.preventDefault()}>
              <fieldset><legend>ROOM PURPOSE</legend><div className="finder-options"><button type="button" className={finderUse === "conferencing" ? "active" : ""} aria-pressed={finderUse === "conferencing"} onClick={() => setFinderUse("conferencing")}>Video conferencing</button><button type="button" className={finderUse === "education" ? "active" : ""} aria-pressed={finderUse === "education"} onClick={() => setFinderUse("education")}>Education</button></div></fieldset>
              <label><span>FLOOR AREA</span><strong>{finderArea || 0} m²</strong><input type="range" min="8" max="220" step="1" value={finderArea} onChange={(event) => setFinderArea(event.target.value)} aria-label="Room floor area in square metres" /><small>Approximate length × width</small></label>
              <label><span>PEOPLE</span><strong>{finderSeats}</strong><input type="range" min="2" max="150" step="1" value={finderSeats} onChange={(event) => setFinderSeats(event.target.value)} aria-label="Maximum number of people" /><small>Maximum expected capacity</small></label>
            </form>
            <div className="finder-result" aria-live="polite">
              <div className="result-intro"><span>STARTING RECOMMENDATION · {recommendation.products.length} COMPONENT SYSTEM</span><h3>{recommendation.size}</h3><p>{recommendation.summary}</p></div>
              <div id={`${formId}-equipment`} className={`equipment-list${equipmentExpanded ? " expanded" : ""}`}>{recommendation.products.map((product, index) => {
                const id = `${product.brand.toLowerCase()}:${product.name}`;
                const inBasket = selectedProducts.some((item) => item.id === id);
                return <article data-extra={index >= 3 ? "true" : undefined} key={product.name}><div><span>{product.brand}</span><h4>{product.name}</h4><p>{product.role}</p></div><ul className="spec-chips">{product.specs.split("·").map((spec) => <li key={spec.trim()}>{spec.trim()}</li>)}</ul><button type="button" className={inBasket ? "finder-enquiry-button selected" : "finder-enquiry-button"} onClick={() => toggleRecommendedProduct(product)} aria-pressed={inBasket}>{inBasket ? "Added ✓" : "Add to enquiry +"}</button></article>;
              })}</div>
              {recommendation.products.length > 3 && <button type="button" className="equipment-more" aria-expanded={equipmentExpanded} aria-controls={`${formId}-equipment`} onClick={() => setEquipmentExpanded((expanded) => !expanded)}>{equipmentExpanded ? "Show fewer components" : `Show all ${recommendation.products.length} components`}</button>}
              <div className="finder-note"><strong>Planning guidance, not a final specification.</strong><p>Room shape, viewing distance, acoustics, lighting, platform licences, network and mounting must be confirmed through a Setarez site survey.</p><a href="#contact">Request a room assessment ↗</a></div>
            </div>
          </div>
          <div className="partner-strip partner-strip-finder" aria-label="Technology partners">
            <div className="partner-strip-head"><p className="partner-label">TECHNOLOGY PARTNERS</p><p>Globally trusted platforms.<br />Locally designed and supported.</p></div>
            <div className="partner-grid">{partnerBrands.map((partner) => <a className="partner-pill" href={partner.href} aria-label={`View the ${partner.name} product catalogue`} title={`Explore ${partner.name} products`} key={partner.name}><Image src={partner.logo} alt={`${partner.name} logo`} width={120} height={36} /><span>{partner.name} <b>↗</b></span></a>)}</div>
          </div>
        </section>

        <section className="solutions" id="solutions" aria-labelledby="solutions-title">
          <div className="section-head"><p>WHAT WE DO</p><h2 id="solutions-title">Four capabilities.<br /><em>One integrated partner.</em></h2></div>
          <div className="capability-list">{capabilities.map((capability) => <article className="capability" key={capability.tag}>
            <div className="capability-image"><Image src={capability.image} alt={capability.alt} fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
            <div className="capability-copy"><span>{capability.tag}</span><h3>{capability.title}</h3><p>{capability.description}</p></div>
          </article>)}</div>
        </section>

        <section className="audience-proof" id="sectors" aria-labelledby="audience-proof-title">
          <div className="audience-proof-head"><p className="eyebrow">WHO WE SERVE / WHY SETAREZ</p><h2 id="audience-proof-title">Built for your environment.<br /><em>Backed for the long term.</em></h2></div>
          <div className="audience-proof-grid">
            <div className="audience-list"><span>ENVIRONMENTS</span><div>{["Schools & universities", "Corporate organisations", "Government & parastatals", "NGOs & development partners", "Hotels & conference centres", "Retail & commercial spaces", "Healthcare facilities", "Architects & consultants"].map((sector) => <p key={sector}>{sector}</p>)}</div><strong>From one room to a multi-site rollout.</strong></div>
            <div className="proof-list"><span>THE SETAREZ DIFFERENCE</span><div>{reasons.map(([title, copy]) => <article className="proof-badge" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p>START A CONVERSATION</p><h2 id="contact-title">Let’s build a<br />smarter space.</h2>
          <form onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const data = Object.fromEntries(new FormData(form));
            const message = `Hello Setarez Technologies,\n\nName: ${data.name}\nEmail: ${data.email}\n\nProject details:\n${data.project}`;
            openWhatsApp(message);
            form.reset();
            setContactState({ status: "sent", errors: null });
          }}><label htmlFor={contactNameId}>Name<input id={contactNameId} name="name" autoComplete="name" required aria-invalid={!!contactState.errors?.name} aria-describedby={contactState.errors?.name ? `${contactNameId}-error` : undefined} />{contactState.errors?.name && <small id={`${contactNameId}-error`} className="form-error" role="alert">{contactState.errors.name[0]}</small>}</label><label htmlFor={contactEmailId}>Work email<input id={contactEmailId} type="email" name="email" autoComplete="email" required aria-invalid={!!contactState.errors?.email} aria-describedby={contactState.errors?.email ? `${contactEmailId}-error` : undefined} />{contactState.errors?.email && <small id={`${contactEmailId}-error`} className="form-error" role="alert">{contactState.errors.email[0]}</small>}</label><label htmlFor={contactProjectId}>Tell us about your space<textarea id={contactProjectId} name="project" rows="4" required aria-invalid={!!contactState.errors?.project} aria-describedby={contactState.errors?.project ? `${contactProjectId}-error` : undefined} />{contactState.errors?.project && <small id={`${contactProjectId}-error`} className="form-error" role="alert">{contactState.errors.project[0]}</small>}</label><button type="submit">Chat on WhatsApp <span>↗</span></button>{contactState.status === "sent" && <p className="contact-form-status success">WhatsApp opened — send your message to reach our team.</p>}</form>
          <div className="contact-details"><a href="tel:+254713190778">0713 190 778</a><a href="https://wa.me/254713190778" target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:sales@setarez.com">sales@setarez.com</a><span>Nairobi, Kenya</span></div>
          <div className="contact-legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        </section>
      </main>

      {selectedProducts.length > 0 && <button type="button" className="enquiry-basket-trigger home-enquiry-trigger" onClick={() => { setBasketOpen(true); setEnquiryState({ status: "idle", errors: null }); }} aria-label={`Open enquiry with ${selectedProducts.length} selected products`}><span>{selectedProducts.length}</span> Review enquiry</button>}
      {basketOpen && <div className="enquiry-basket-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBasketOpen(false); }}><aside className="enquiry-basket" role="dialog" aria-modal="true" aria-labelledby="home-enquiry-title">
        <button type="button" className="enquiry-close" onClick={() => setBasketOpen(false)} aria-label="Close enquiry">×</button>
        <p>PRODUCT ENQUIRY</p><h2 id="home-enquiry-title">Request one quote.</h2><p>Your Solution Finder recommendations and catalogue selections can be sent together.</p>
        <div className="enquiry-selected-list">{selectedProducts.map((item) => <div key={item.id}><span>{item.brand}</span><strong>{item.name}</strong><button type="button" onClick={() => updateSelectedProducts(selectedProducts.filter((selectedItem) => selectedItem.id !== item.id))} aria-label={`Remove ${item.name}`}>Remove</button></div>)}</div>
        {enquiryState.status !== "sent" ? <form onSubmit={submitProductEnquiry}><label htmlFor={enquiryNameId}>Name<input id={enquiryNameId} name="name" autoComplete="name" required aria-invalid={!!enquiryState.errors?.name} aria-describedby={enquiryState.errors?.name ? `${enquiryNameId}-error` : undefined} />{enquiryState.errors?.name && <small id={`${enquiryNameId}-error`} className="form-error" role="alert">{enquiryState.errors.name[0]}</small>}</label><label htmlFor={enquiryEmailId}>Work email<input id={enquiryEmailId} type="email" name="email" autoComplete="email" required aria-invalid={!!enquiryState.errors?.email} aria-describedby={enquiryState.errors?.email ? `${enquiryEmailId}-error` : undefined} />{enquiryState.errors?.email && <small id={`${enquiryEmailId}-error`} className="form-error" role="alert">{enquiryState.errors.email[0]}</small>}</label><label>Organisation <small>Optional</small><input name="organisation" autoComplete="organization" /></label><label htmlFor={enquiryProjectId}>Tell us about your room or project<textarea id={enquiryProjectId} name="project" rows="4" required aria-invalid={!!enquiryState.errors?.project} aria-describedby={enquiryState.errors?.project ? `${enquiryProjectId}-error` : undefined} />{enquiryState.errors?.project && <small id={`${enquiryProjectId}-error`} className="form-error" role="alert">{enquiryState.errors.project[0]}</small>}</label><button type="submit" disabled={selectedProducts.length === 0}>Chat on WhatsApp for {selectedProducts.length} product{selectedProducts.length === 1 ? "" : "s"} <span>↗</span></button></form> : <div className="enquiry-success"><strong>WhatsApp opened.</strong><p>Send your message to reach our sales team.</p><button type="button" onClick={() => setBasketOpen(false)}>Continue browsing</button></div>}
      </aside></div>}

      <aside className={`support-widget${chatOpen ? " open" : ""}`} aria-label="Steve on WhatsApp">
        <div className="support-panel" aria-hidden={!chatOpen}>
          <div className="support-panel-head">
            <span className="support-avatar" aria-hidden="true">👨🏿</span>
            <div><strong>Steve · Setarez Support</strong><small><i /> Online on WhatsApp</small></div>
            <button onClick={() => setChatOpen(false)} aria-label="Close WhatsApp support">×</button>
          </div>
          <div className="support-conversation">
            <span>Hi 👋</span>
            <p>I'm Steve. Tell me about your classroom, meeting room or display project.</p>
            <small>Typically replies during business hours</small>
          </div>
          <a href="https://wa.me/254713190778?text=Hello%20Setarez%20Technologies%2C%20I%27d%20like%20to%20talk%20about%20a%20technology%20solution." target="_blank" rel="noreferrer">Start WhatsApp chat <span>↗</span></a>
        </div>
        <button className="support-tab" onClick={() => setChatOpen((open) => !open)} aria-expanded={chatOpen} aria-label={`${chatOpen ? "Close" : "Open"} Steve on WhatsApp`}>
          <span className="support-tab-avatar" aria-hidden="true">👨🏿</span>
          <span><strong>Steve · WhatsApp</strong><small><i /> Tap to chat</small></span>
          <b aria-hidden="true">{chatOpen ? "×" : "↑"}</b>
        </button>
      </aside>
    </>
  );
}
