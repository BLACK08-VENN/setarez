"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SiteHeader from "./SiteHeader";

const enquiryStorageKey = "setarez-product-enquiry";

const roomCatalog = [
  {
    label: "CLASSROOM",
    kicker: "INTERACTIVE CLASSROOM / 02",
    image: "/assets/teachmint-classroom.png",
    alt: "A Teachmint connected classroom with an interactive display and student tablets",
    points: [
      { key: "display", code: "01 / TEACHMINT X", title: "75″ or 86″ interactive display", description: "Teachmint X combines a True 4K UHD teaching canvas with zero-bonded glass and a response time of 5ms or less.", features: ["40-point multi-touch", "3.2mm 9H hardened glass", "Blue-light filter"] },
      { key: "camera", code: "02 / TEACHMINT X", title: "Integrated AI classroom camera", description: "An inbuilt 48MP 4K camera supports wide-angle capture and AI-based motion tracking for connected lessons.", features: ["48MP 4K camera", "AI motion tracking", "Wide-angle room view"] },
      { key: "audio", code: "03 / TEACHMINT X", title: "Room-ready classroom audio", description: "Integrated sound and voice capture keep teaching clear without separate front-of-room devices.", features: ["40W inbuilt speakers", "8-array omni-directional mic", "Mid-to-large classroom coverage"] },
      { key: "control", code: "04 / TEACHMINT X", title: "EDLA-certified performance", description: "The current Teachmint X platform pairs Android 16 EDLA with an octa-core processor and onboard AI acceleration.", features: ["8GB RAM + 128GB storage", "NFC secure login", "Dual-band Wi-Fi"] }
    ]
  },
  {
    label: "BOARDROOM",
    kicker: "CONNECTED BOARDROOM / 03",
    image: "/assets/teachmint-boardroom.png",
    alt: "A Teachmint connected boardroom with an interactive meeting display and touch controller",
    points: [
      { key: "board-display", code: "01 / TEACHMINT X", title: "Interactive 4K collaboration surface", description: "A large-format Teachmint X display gives teams a precise, shared surface for presenting and annotating content.", features: ["75″ or 86″ True 4K UHD", "40-point multi-touch", "5ms or less response"] },
      { key: "rally-bar", code: "02 / LOGITECH RALLY BAR", title: "All-in-one video collaboration", description: "Designed for medium-to-large rooms, Rally Bar integrates a motorised PTZ camera, AI Viewfinder and room audio in one device.", features: ["4K camera + 15× HD zoom", "6 beamforming microphones", "2 integrated speakers"] },
      { key: "sight", code: "03 / LOGITECH SIGHT", title: "Tabletop participant camera", description: "Sight works with the front-of-room camera to use video and AI to detect and frame people around the table.", features: ["Dual-lens 4K camera", "315° horizontal field of view", "7 beamforming microphones"] },
      { key: "tap", code: "04 / LOGITECH TAP IP", title: "Network meeting-room controller", description: "A dedicated touch controller connects over the network and keeps meeting-room operation simple and consistent.", features: ["10.1″ 1280 × 800 touchscreen", "Power over Ethernet", "Teams, Zoom Rooms + Google Meet"] }
    ]
  },
  {
    label: "AUDITORIUM",
    kicker: "CONNECTED AUDITORIUM / 01",
    image: "/assets/digital-twin-classroom.png",
    alt: "A connected auditorium with a large presentation display and tiered seating",
    points: [
      { key: "aud-display", code: "01 / TEACHMINT X", title: "Large-format interactive stage display", description: "The 86-inch Teachmint X brings True 4K content and responsive annotation to teaching, training and presentation spaces.", features: ["86″ True 4K UHD", "40-point multi-touch", "60,000+ hour working life"] },
      { key: "aud-camera", code: "02 / LOGITECH RALLY BAR", title: "AI-enabled front-of-room video", description: "Rally Bar combines 4K capture, motorised pan and tilt, and RightSight intelligent framing for hybrid sessions.", features: ["15× HD zoom", "132.1° total horizontal coverage", "AI Viewfinder"] },
      { key: "aud-audio", code: "03 / RALLY MIC PODS", title: "Expandable voice coverage", description: "Rally Bar supports additional Rally Mic Pods to extend clear voice pickup through larger collaboration spaces.", features: ["Up to 4 additional Mic Pods", "AEC and voice activity detection", "AI noise suppression"] },
      { key: "aud-control", code: "04 / LOGITECH TAP IP", title: "Simple session control", description: "Tap IP provides a purpose-built network controller for starting calls and managing supported room platforms.", features: ["10-point multi-touch", "PoE connectivity", "Logitech Sync management"] }
    ]
  }
];

const rooms = [roomCatalog[2], roomCatalog[0], roomCatalog[1]];

const capabilities = [
  { number: "01", tag: "TEACH", title: "Interactive learning", image: "/assets/interactive-learning.png", alt: "Teacher using an interactive display in a Kenyan classroom", description: "Practical digital classrooms that teachers can use confidently.", items: ["Interactive flat panels", "Digital classroom software", "Wireless content sharing", "Teacher onboarding and training"] },
  { number: "02", tag: "MEET", title: "Hybrid collaboration", image: "/assets/hybrid-collaboration.png", alt: "Professional hybrid meeting in a modern boardroom", description: "Simple, professional meeting spaces for teams in the room and beyond.", items: ["Huddle rooms and boardrooms", "Video, camera and audio", "Teams, Zoom and Google Meet", "Room booking and control"] },
  { number: "03", tag: "DISPLAY", title: "Visual communication", image: "/assets/digital-display.png", alt: "Large-format LED display in a corporate environment", description: "High-impact visual environments that inform, engage and command attention.", items: ["Indoor and outdoor LED walls", "Fine-pitch corporate displays", "Digital signage networks", "Content management systems"] },
  { number: "04", tag: "SUPPORT", title: "Integration & lifecycle", image: "/assets/av-support.png", alt: "AV technician commissioning a professional meeting-room system", description: "Confidence from the first site survey through every day of operation.", items: ["Site surveys and system design", "Installation and commissioning", "User and teacher training", "Remote and on-site support"] }
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
  { image: "/assets/hero/viewsonic/k12-classroom.jpg", alt: "Teacher presenting a science lesson on a ViewSonic ViewBoard in a bright classroom", label: "INTERACTIVE LEARNING", title: "Ideas become experiences.", description: "Connected classrooms designed for confident teaching, active participation and clearer learning." },
  { image: "/assets/hero/viewsonic/student-engagement.jpg", alt: "Student interacting directly with a ViewSonic classroom display", label: "CONNECTED CLASSROOMS", title: "Teaching without technical friction.", description: "Integrated displays, classroom software and simple controls that educators can use with confidence." },
  { image: "/assets/hero/viewsonic/wireless-collaboration.jpg", alt: "Teacher wirelessly sharing lesson content to a classroom display", label: "WIRELESS COLLABORATION", title: "Ideas move freely.", description: "Simple wireless sharing keeps attention on the lesson and makes every device part of the room." },
  { image: "/assets/final-boardroom.png", alt: "Executive boardroom with professional conferencing technology", label: "EXECUTIVE BOARDROOMS", title: "Decisions deserve total clarity.", description: "Premium boardrooms designed around natural conversation, reliable presentation and one-touch meetings." },
  { image: "/assets/digital-display.png", alt: "Large-format professional digital display installation", label: "VISUAL COMMUNICATION", title: "Make the message impossible to miss.", description: "High-impact LED and digital display environments for communication, information and brand presence." },
  { image: "/assets/digital-twin-classroom.png", alt: "Large connected presentation and auditorium environment", label: "AUDITORIUM SYSTEMS", title: "Reach every seat in the room.", description: "Large-format visual, audio and hybrid systems for lecture theatres, halls and public presentation spaces." },
  { image: "/assets/hero/viewsonic/collaborative-stations.jpg", alt: "Students collaborating with bright ViewSonic portable displays", label: "ACTIVE LEARNING", title: "Every student joins in.", description: "Flexible learning stations designed for shared discovery, participation and hands-on collaboration." },
  { image: "/assets/av-support.png", alt: "AV specialist supporting an installed technology system", label: "LIFECYCLE SUPPORT", title: "Performance that lasts beyond installation.", description: "Commissioning, training, maintenance and responsive local support throughout the system lifecycle." }
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
  const [activeHero, setActiveHero] = useState(1);
  const [heroDirection, setHeroDirection] = useState(1);
  const [contactStatus, setContactStatus] = useState("idle");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState("idle");
  const recommendation = recommendEquipment(finderUse, Number(finderArea) || 1, Number(finderSeats) || 1);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(enquiryStorageKey));
      setSelectedProducts(Array.isArray(saved) ? saved : []);
    } catch {
      localStorage.removeItem(enquiryStorageKey);
    }
  }, []);

  useEffect(() => {
    if (heroDirection === 0) return undefined;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const constrained = window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "");
    if (constrained) return undefined;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setActiveHero((current) => (current + heroDirection + heroSlides.length) % heroSlides.length);
    }, 4500);
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

  async function submitProductEnquiry(event) {
    event.preventDefault();
    setEnquiryStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const productList = selectedProducts.map((item, index) => `${index + 1}. ${item.brand} — ${item.name}`).join("\n");
    const project = `Products requested:\n${productList}\n\nOrganisation: ${data.organisation || "Not provided"}\n\nProject details:\n${data.project}`;
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.name, email: data.email, project }) });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      updateSelectedProducts([]);
      setEnquiryStatus("sent");
    } catch {
      setEnquiryStatus("error");
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader logoHref="#main" theme="NAIROBI / EAST AFRICA" links={[{ href: "#solutions", label: "Solutions" }, { href: "/catalogue", label: "Catalogue" }, { href: "/catalogue#brands", label: "Brands" }, { href: "#finder", label: "Solution finder" }]} />

      <main id="main">
        <section className="hero-showcase" aria-label="Featured technology experiences">
          <div className="hero-carousel" onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const ratio = (event.clientX - bounds.left) / bounds.width;
            setHeroDirection(ratio < .4 ? -1 : ratio > .6 ? 1 : 0);
          }} onPointerLeave={() => setHeroDirection(1)}>
            <div className="hero-cinematic">
              <div className="hero-flip-deck" aria-label="Featured solution slides">{heroSlides.map((slide, index) => {
                let offset = (index - activeHero + heroSlides.length) % heroSlides.length;
                if (offset > heroSlides.length / 2) offset -= heroSlides.length;
                const distance = Math.abs(offset);
                return <button type="button" className={offset === 0 ? "active" : ""} data-offset={offset} key={slide.title} onFocus={() => { setActiveHero(index); setHeroDirection(0); }} onClick={() => { setActiveHero(offset === 0 ? (index + 1) % heroSlides.length : index); setHeroDirection(0); }} aria-label={offset === 0 ? `Next slide after ${slide.label}` : `Show ${slide.label}`} aria-pressed={offset === 0} style={{ "--card-y": "0px", "--card-rotate": "0deg", "--card-scale": offset === 0 ? 1 : .92, "--card-opacity": distance > 3 ? 0 : Math.max(.34, 1 - distance * .18), "--card-z": 20 - distance, pointerEvents: distance > 3 ? "none" : "auto" }}>
                  {distance <= 1 && <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 760px) 72vw, 34vw" quality={68} priority={index === 1} />}
                  <div className="hero-card-label">{slide.label}</div>
                </button>;
              })}</div>
              <div className="hero-carousel-controls" aria-label="Carousel controls"><button type="button" onClick={() => { setActiveHero((current) => (current - 1 + heroSlides.length) % heroSlides.length); setHeroDirection(0); }} aria-label="Previous slide">←</button><span>{String(activeHero + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span><button type="button" onClick={() => { setActiveHero((current) => (current + 1) % heroSlides.length); setHeroDirection(0); }} aria-label="Next slide">→</button></div>
            </div>
          </div>
          <div className="hero-showcase-main compact-delivery">
            <div className="hero-copy">
              <p className="eyebrow"><span>01</span> WHAT WE DELIVER</p>
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
          <div className="finder-head"><p>02 / SOLUTION FINDER</p><h2 id="finder-title">Not sure what<br /><em>your room needs?</em></h2><p>Enter the room’s approximate floor area and capacity. We’ll suggest a practical starting system for education or video conferencing.</p></div>
          <div className="finder-tool">
            <form className="finder-form" onSubmit={(event) => event.preventDefault()}>
              <fieldset><legend>01 / ROOM PURPOSE</legend><div className="finder-options"><button type="button" className={finderUse === "conferencing" ? "active" : ""} aria-pressed={finderUse === "conferencing"} onClick={() => setFinderUse("conferencing")}>Video conferencing</button><button type="button" className={finderUse === "education" ? "active" : ""} aria-pressed={finderUse === "education"} onClick={() => setFinderUse("education")}>Education</button></div></fieldset>
              <label><span>02 / FLOOR AREA</span><strong>{finderArea || 0} m²</strong><input type="range" min="8" max="220" step="1" value={finderArea} onChange={(event) => setFinderArea(event.target.value)} aria-label="Room floor area in square metres" /><small>Approximate length × width</small></label>
              <label><span>03 / PEOPLE</span><strong>{finderSeats}</strong><input type="range" min="2" max="150" step="1" value={finderSeats} onChange={(event) => setFinderSeats(event.target.value)} aria-label="Maximum number of people" /><small>Maximum expected capacity</small></label>
            </form>
            <div className="finder-result" aria-live="polite">
              <div className="result-intro"><span>STARTING RECOMMENDATION · {recommendation.products.length} COMPONENT SYSTEM</span><h3>{recommendation.size}</h3><p>{recommendation.summary}</p></div>
              <div className="equipment-list">{recommendation.products.map((product) => {
                const id = `${product.brand.toLowerCase()}:${product.name}`;
                const inBasket = selectedProducts.some((item) => item.id === id);
                return <article key={product.name}><div><span>{product.brand}</span><h4>{product.name}</h4><p>{product.role}</p></div><p>{product.specs}</p><button type="button" className={inBasket ? "finder-enquiry-button selected" : "finder-enquiry-button"} onClick={() => toggleRecommendedProduct(product)} aria-pressed={inBasket}>{inBasket ? "Added ✓" : "Add to enquiry +"}</button></article>;
              })}</div>
              <div className="finder-note"><strong>Planning guidance, not a final specification.</strong><p>Room shape, viewing distance, acoustics, lighting, platform licences, network and mounting must be confirmed through a Setarez site survey.</p><a href="#contact">Request a room assessment ↗</a></div>
            </div>
          </div>
          <div className="partner-strip partner-strip-finder" aria-label="Technology partners">
            <div className="partner-strip-head"><p className="partner-label">TECHNOLOGY PARTNERS</p><p>Globally trusted platforms.<br />Locally designed and supported.</p></div>
            <div className="partner-grid">{partnerBrands.map((partner, index) => <a className="partner-pill" href={partner.href} aria-label={`View the ${partner.name} product catalogue`} title={`Explore ${partner.name} products`} key={partner.name}><small>0{index + 1}</small><Image src={partner.logo} alt={`${partner.name} logo`} width={120} height={36} /><span>Explore catalogue <b>↗</b></span></a>)}</div>
          </div>
        </section>

        <section className="solutions" id="solutions" aria-labelledby="solutions-title">
          <div className="section-head"><p>02 / WHAT WE DO</p><h2 id="solutions-title">Four capabilities.<br /><em>One integrated partner.</em></h2></div>
          <div className="capability-list">{capabilities.map((capability) => <article className="capability" key={capability.tag}>
            <div className="capability-image"><Image src={capability.image} alt={capability.alt} fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
            <div className="capability-copy"><span>{capability.number} / {capability.tag}</span><h3>{capability.title}</h3><p>{capability.description}</p><ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </article>)}</div>
        </section>

        <section className="audience-proof" id="sectors" aria-labelledby="audience-proof-title">
          <div className="audience-proof-head"><p className="eyebrow"><span>03</span> WHO WE SERVE / WHY SETAREZ</p><h2 id="audience-proof-title">Built for your environment.<br /><em>Backed for the long term.</em></h2></div>
          <div className="audience-proof-grid">
            <div className="audience-list"><span>ENVIRONMENTS</span><div>{["Schools & universities", "Corporate organisations", "Government & parastatals", "NGOs & development partners", "Hotels & conference centres", "Retail & commercial spaces", "Healthcare facilities", "Architects & consultants"].map((sector, index) => <p key={sector}><small>{String(index + 1).padStart(2, "0")}</small>{sector}</p>)}</div><strong>From one room to a multi-site rollout.</strong></div>
            <div className="proof-list"><span>THE SETAREZ DIFFERENCE · PROVEN CAPABILITIES</span><div>{reasons.map(([title, copy], index) => <article className="proof-badge" key={title}><div className="proof-medal" aria-hidden="true"><small>SETAREZ</small><b>{String(index + 1).padStart(2, "0")}</b><i>★</i></div><div><em>CAPABILITY BADGE</em><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p>START A CONVERSATION</p><h2 id="contact-title">Let’s build a<br />smarter space.</h2>
          <form onSubmit={async (event) => {
            event.preventDefault();
            setContactStatus("sending");
            const form = event.currentTarget;
            const data = Object.fromEntries(new FormData(form));
            try {
              const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
              if (!response.ok) throw new Error("Delivery failed");
              form.reset();
              setContactStatus("sent");
            } catch {
              setContactStatus("error");
            }
          }}><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input type="email" name="email" autoComplete="email" required /></label><label>Tell us about your space<textarea name="project" rows="4" required /></label><button type="submit" disabled={contactStatus === "sending"}>{contactStatus === "sending" ? "Sending…" : "Talk to our team"} <span>↗</span></button>{contactStatus === "sent" && <p className="contact-form-status success">Thank you. Your enquiry has been sent to our sales team.</p>}{contactStatus === "error" && <p className="contact-form-status error">We couldn’t send your enquiry. Please email sales@setarez.com directly.</p>}</form>
          <div className="contact-details"><a href="tel:+254759013661">+254 759 013 661</a><a href="mailto:sales@setarez.com">sales@setarez.com</a><span>Nairobi, Kenya</span></div>
        </section>
      </main>

      {selectedProducts.length > 0 && <button type="button" className="enquiry-basket-trigger home-enquiry-trigger" onClick={() => { setBasketOpen(true); setEnquiryStatus("idle"); }} aria-label={`Open enquiry with ${selectedProducts.length} selected products`}><span>{selectedProducts.length}</span> Review enquiry</button>}
      {basketOpen && <div className="enquiry-basket-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBasketOpen(false); }}><aside className="enquiry-basket" role="dialog" aria-modal="true" aria-labelledby="home-enquiry-title">
        <button type="button" className="enquiry-close" onClick={() => setBasketOpen(false)} aria-label="Close enquiry">×</button>
        <p>PRODUCT ENQUIRY</p><h2 id="home-enquiry-title">Request one quote.</h2><p>Your Solution Finder recommendations and catalogue selections can be sent together.</p>
        <div className="enquiry-selected-list">{selectedProducts.map((item) => <div key={item.id}><span>{item.brand}</span><strong>{item.name}</strong><button type="button" onClick={() => updateSelectedProducts(selectedProducts.filter((selectedItem) => selectedItem.id !== item.id))} aria-label={`Remove ${item.name}`}>Remove</button></div>)}</div>
        {enquiryStatus !== "sent" ? <form onSubmit={submitProductEnquiry}><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input type="email" name="email" autoComplete="email" required /></label><label>Organisation <small>Optional</small><input name="organisation" autoComplete="organization" /></label><label>Tell us about your room or project<textarea name="project" rows="4" required /></label><button type="submit" disabled={enquiryStatus === "sending" || selectedProducts.length === 0}>{enquiryStatus === "sending" ? "Sending…" : `Send enquiry for ${selectedProducts.length} product${selectedProducts.length === 1 ? "" : "s"}`} <span>↗</span></button>{enquiryStatus === "error" && <p className="enquiry-status error">We couldn’t send your enquiry. Please email sales@setarez.com directly.</p>}</form> : <div className="enquiry-success"><strong>Enquiry sent.</strong><p>Thank you. Our sales team will review your product list and contact you.</p><button type="button" onClick={() => setBasketOpen(false)}>Continue browsing</button></div>}
      </aside></div>}

      <aside className={`support-widget${chatOpen ? " open" : ""}`} aria-label="WhatsApp support">
        <div className="support-panel" aria-hidden={!chatOpen}>
          <div className="support-panel-head">
            <span className="support-avatar" aria-hidden="true"><i /><i /><b>⌣</b></span>
            <div><strong>Setarez Support</strong><small><i /> Online on WhatsApp</small></div>
            <button onClick={() => setChatOpen(false)} aria-label="Close WhatsApp support">×</button>
          </div>
          <div className="support-conversation">
            <span>Boop! 👋</span>
            <p>Hi, how can we help with your classroom, meeting room or display project?</p>
            <small>Typically replies during business hours</small>
          </div>
          <a href="https://wa.me/254759013661?text=Hello%20Setarez%20Technologies%2C%20I%27d%20like%20to%20talk%20about%20a%20technology%20solution." target="_blank" rel="noreferrer">Start WhatsApp chat <span>↗</span></a>
        </div>
        <button className="support-tab" onClick={() => setChatOpen((open) => !open)} aria-expanded={chatOpen} aria-label={`${chatOpen ? "Close" : "Open"} WhatsApp support`}>
          <span className="support-tab-robot" aria-hidden="true"><i /><i /><b>⌣</b></span>
          <span><strong>Tech robot · WhatsApp</strong><small><i /> Tap Boop for support</small></span>
          <b aria-hidden="true">{chatOpen ? "×" : "↑"}</b>
        </button>
      </aside>

      <footer><a className="brand-logo brand-logo-footer" href="#main" aria-label="Setarez Technologies home"><Image src="/setarez-logo-white.png" alt="Setarez Technologies — Technology, Innovation, Guidance" width={1848} height={1775} /></a><p>Interactive learning, workplace collaboration and professional visual communication across Kenya and East Africa.</p><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:sales@setarez.com">Contact</a></div><small>© {new Date().getFullYear()} Setarez Technologies. Nairobi, Kenya.</small></footer>
    </>
  );
}
