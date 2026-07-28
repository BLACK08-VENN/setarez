"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    label: "CLASSROOM",
    kicker: "INTERACTIVE CLASSROOM / 01",
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
    kicker: "CONNECTED BOARDROOM / 02",
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
    kicker: "CONNECTED AUDITORIUM / 03",
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

const capabilities = [
  { number: "01", tag: "TEACH", title: "Interactive learning", image: "/assets/interactive-learning.png", alt: "Teacher using an interactive display in a Kenyan classroom", description: "Practical digital classrooms that teachers can use confidently.", items: ["Interactive flat panels", "Digital classroom software", "Wireless content sharing", "Teacher onboarding and training"] },
  { number: "02", tag: "MEET", title: "Hybrid collaboration", image: "/assets/hybrid-collaboration.png", alt: "Professional hybrid meeting in a modern boardroom", description: "Simple, professional meeting spaces for teams in the room and beyond.", items: ["Huddle rooms and boardrooms", "Video, camera and audio", "Teams, Zoom and Google Meet", "Room booking and control"] },
  { number: "03", tag: "DISPLAY", title: "Visual communication", image: "/assets/digital-display.png", alt: "Large-format LED display in a corporate environment", description: "High-impact visual environments that inform, engage and command attention.", items: ["Indoor and outdoor LED walls", "Fine-pitch corporate displays", "Digital signage networks", "Content management systems"] },
  { number: "04", tag: "SUPPORT", title: "Integration & lifecycle", image: "/assets/av-support.png", alt: "AV technician commissioning a professional meeting-room system", description: "Confidence from the first site survey through every day of operation.", items: ["Site surveys and system design", "Installation and commissioning", "User and teacher training", "Remote and on-site support"] }
];

const process = [
  ["01", "Discover", "Understand users, rooms and desired outcomes."],
  ["02", "Design", "Specify the right integrated solution."],
  ["03", "Deliver", "Install, configure and commission."],
  ["04", "Enable", "Train users for confident adoption."],
  ["05", "Support", "Maintain, optimise and upgrade."]
];

const reasons = [
  ["Solution-first", "We begin with the customer’s desired outcome."],
  ["Experience-led", "See and test solutions before investing."],
  ["Local expertise", "Professional installation, training and support."],
  ["Complete ownership", "One accountable partner from design to lifecycle."],
  ["Scalable delivery", "Solutions built to grow by room, campus or branch."],
  ["Long-term value", "Maintenance and upgrades protect every investment."]
];

const enquiryContact = {
  email: "sales@setarez.com",
  phone: "+254759013661"
};

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

function enquiryLinks(subject) {
  const message = `Hello Setarez Technologies, I would like to enquire about ${subject}.`;
  return {
    email: `mailto:${enquiryContact.email}?subject=${encodeURIComponent(`Enquiry: ${subject}`)}&body=${encodeURIComponent(message)}`,
    text: `sms:${enquiryContact.phone}?body=${encodeURIComponent(message)}`
  };
}

export default function Home() {
  const [room, setRoom] = useState(0);
  const [point, setPoint] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [finderUse, setFinderUse] = useState("conferencing");
  const [finderArea, setFinderArea] = useState(20);
  const [finderSeats, setFinderSeats] = useState(6);
  const closeRef = useRef(null);
  const recommendation = recommendEquipment(finderUse, Number(finderArea) || 1, Number(finderSeats) || 1);

  useEffect(() => {
    if (point) closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && setPoint(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [point]);

  const changeRoom = (index) => {
    setRoom(index);
    setPoint(null);
  };

  const stepPoint = (direction) => {
    const roomPoints = rooms[room].points;
    const currentIndex = Math.max(0, roomPoints.findIndex((item) => item.key === point?.key));
    setPoint(roomPoints[(currentIndex + direction + roomPoints.length) % roomPoints.length]);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header>
        <a className="brand-logo brand-logo-header" href="#main" aria-label="Setarez Technologies home"><Image src="/setarez-logo-white.png" alt="Setarez Technologies — Technology, Innovation, Guidance" width={1848} height={1775} priority /></a>
        <nav aria-label="Primary navigation"><a href="#about">About</a><a href="#solutions">Solutions</a><a href="#finder">Solution finder</a><a href="#process">How we work</a><a href="#contact">Contact</a></nav>
        <div className="theme-id"><i />NAIROBI / EAST AFRICA</div>
      </header>

      <main id="main">
        <section className="twin" id="twin" aria-label="Interactive room explorer">
          {rooms.map((item, index) => (
            <div className={`room-slide${index === room ? " active" : ""}`} aria-hidden={index !== room} key={item.label}>
              <Image className="room-image" src={item.image} alt={item.alt} fill priority={index === 0} sizes="100vw" />
              {item.points.map((itemPoint, pointIndex) => (
                <button
                  className={`hotspot ${itemPoint.key}${point?.key === itemPoint.key ? " selected" : ""}`}
                  onClick={() => setPoint({ ...itemPoint, roomLabel: item.label, pointNumber: pointIndex + 1 })}
                  aria-label={`Explore ${itemPoint.title}`}
                  aria-expanded={point?.key === itemPoint.key}
                  aria-controls="technology-detail"
                  tabIndex={index === room ? 0 : -1}
                  key={itemPoint.key}
                ><i /><span>{String(pointIndex + 1).padStart(2, "0")}</span></button>
              ))}
            </div>
          ))}
          <div className="room-shade" />
          <div className="twin-title"><p>{rooms[room].kicker}</p><h1>Technology that<br /><em>connects people and ideas.</em></h1></div>
          <div className="view-toggle" role="group" aria-label="Choose a room"><span>EXPLORE ROOM</span>{rooms.map((item, index) => <button className={room === index ? "active" : ""} aria-pressed={room === index} onClick={() => changeRoom(index)} key={item.label}>{item.label}</button>)}</div>
          <div className="telemetry" aria-label="Setarez solution model">
            <div><span>OUR ROLE</span><b><i /> UNDERSTAND</b></div><div><span>INTEGRATION</span><b>DESIGN + DELIVER</b></div><div><span>LIFECYCLE</span><b>SUPPORT</b></div>
          </div>
          <div className="hint">SELECT A TECHNOLOGY POINT <span>↗</span></div>
          {point && <aside className="point-card" id="technology-detail" key={`${room}-${point.key}`} role="dialog" aria-modal="true" aria-labelledby="point-title">
            <button className="point-close" ref={closeRef} onClick={() => setPoint(null)} aria-label="Close technology details">×</button>
            <span className="point-code">{point.code}</span>
            <span className="point-status"><i /> TECHNICAL DETAIL AVAILABLE</span>
            <h2 id="point-title">{point.title}</h2>
            <p>{point.description}</p>
            <ul>{point.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div className="point-actions">
              <a href={enquiryLinks(point.title).email}>Email enquiry ↗</a>
              <a href={enquiryLinks(point.title).text}>Text enquiry ↗</a>
            </div>
            <div className="point-pagination" aria-label="Browse technology points">
              <button onClick={() => stepPoint(-1)} aria-label="Previous technology point">←</button>
              <span>{String(rooms[room].points.findIndex((item) => item.key === point.key) + 1).padStart(2, "0")} / {String(rooms[room].points.length).padStart(2, "0")}</span>
              <button onClick={() => stepPoint(1)} aria-label="Next technology point">→</button>
            </div>
          </aside>}
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div><p className="eyebrow"><span>01</span> WHO WE ARE</p><p className="about-lead">Technology should make every space work better.</p></div>
          <div><h2 id="about-title">An integrated AV partner<br /><em>for East Africa.</em></h2><p>Setarez Technologies is an audio-visual and workplace technology solutions company. We design, supply, install and support interactive learning, conferencing, collaboration and digital display systems for organisations across Kenya and East Africa.</p><div className="role-line"><span>UNDERSTAND</span><span>DESIGN</span><span>INTEGRATE</span><span>SUPPORT</span></div></div>
        </section>

        <section className="solutions" id="solutions" aria-labelledby="solutions-title">
          <div className="section-head"><p>02 / WHAT WE DO</p><h2 id="solutions-title">Four capabilities.<br /><em>One integrated partner.</em></h2></div>
          <div className="capability-list">{capabilities.map((capability) => <article className="capability" key={capability.tag}>
            <div className="capability-image"><Image src={capability.image} alt={capability.alt} fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
            <div className="capability-copy"><span>{capability.number} / {capability.tag}</span><h3>{capability.title}</h3><p>{capability.description}</p><ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </article>)}</div>
        </section>

        <section className="portfolio" aria-labelledby="portfolio-title">
          <div className="portfolio-head"><p>03 / SOLUTION PORTFOLIO</p><h2 id="portfolio-title">One partner across<br />the full AV environment.</h2></div>
          <div className="portfolio-grid">
            <article><span>EDUCATION</span><strong>Interactive classrooms</strong><p>Panels · Classroom software · Teacher training · Multi-room rollout</p></article>
            <article><span>COLLABORATION</span><strong>Connected meetings</strong><p>Video conferencing · Boardrooms · Wireless presentation · Scheduling</p></article>
            <article><span>VISUAL</span><strong>Powerful communication</strong><p>LED screens · Digital signage · Commercial displays · Content management</p></article>
            <article><span>SERVICES</span><strong>Lifecycle confidence</strong><p>Consultation · Installation · Maintenance contracts · Upgrades</p></article>
          </div>
        </section>

        <section className="finder" id="finder" aria-labelledby="finder-title">
          <div className="finder-head"><p>04 / SOLUTION FINDER</p><h2 id="finder-title">Not sure what<br /><em>your room needs?</em></h2><p>Enter the room’s approximate floor area and capacity. We’ll suggest a practical starting system for education or video conferencing.</p></div>
          <div className="finder-tool">
            <form className="finder-form" onSubmit={(event) => event.preventDefault()}>
              <fieldset><legend>01 / ROOM PURPOSE</legend><div className="finder-options"><button type="button" className={finderUse === "conferencing" ? "active" : ""} aria-pressed={finderUse === "conferencing"} onClick={() => setFinderUse("conferencing")}>Video conferencing</button><button type="button" className={finderUse === "education" ? "active" : ""} aria-pressed={finderUse === "education"} onClick={() => setFinderUse("education")}>Education</button></div></fieldset>
              <label><span>02 / FLOOR AREA</span><strong>{finderArea || 0} m²</strong><input type="range" min="8" max="220" step="1" value={finderArea} onChange={(event) => setFinderArea(event.target.value)} aria-label="Room floor area in square metres" /><small>Approximate length × width</small></label>
              <label><span>03 / PEOPLE</span><strong>{finderSeats}</strong><input type="range" min="2" max="150" step="1" value={finderSeats} onChange={(event) => setFinderSeats(event.target.value)} aria-label="Maximum number of people" /><small>Maximum expected capacity</small></label>
            </form>
            <div className="finder-result" aria-live="polite">
              <div className="result-intro"><span>STARTING RECOMMENDATION · {recommendation.products.length} COMPONENT SYSTEM</span><h3>{recommendation.size}</h3><p>{recommendation.summary}</p></div>
              <div className="equipment-list">{recommendation.products.map((product) => {
                const links = enquiryLinks(product.name);
                return <article key={product.name}><div><span>{product.brand}</span><h4>{product.name}</h4><p>{product.role}</p></div><p>{product.specs}</p><div className="equipment-enquiry"><a href={links.email} aria-label={`Email an enquiry about ${product.name}`}>Email enquiry ↗</a><a href={links.text} aria-label={`Text an enquiry about ${product.name}`}>Text enquiry ↗</a></div></article>;
              })}</div>
              <div className="finder-note"><strong>Planning guidance, not a final specification.</strong><p>Room shape, viewing distance, acoustics, lighting, platform licences, network and mounting must be confirmed through a Setarez site survey.</p><a href="#contact">Request a room assessment ↗</a></div>
            </div>
          </div>
        </section>

        <section className="sectors" aria-labelledby="sectors-title">
          <p className="eyebrow"><span>05</span> WHO WE SERVE</p><h2 id="sectors-title">Solutions shaped around<br /><em>each environment.</em></h2>
          <div className="sector-list">{["Schools & universities", "Corporate organisations", "Government & parastatals", "NGOs & development partners", "Hotels & conference centres", "Retail & commercial spaces", "Healthcare facilities", "Architects & consultants"].map((sector, index) => <div key={sector}><span>{String(index + 1).padStart(2, "0")}</span>{sector}</div>)}</div>
          <p className="sector-note">From a single room to a multi-site rollout.</p>
        </section>

        <section className="process" id="process" aria-labelledby="process-title">
          <div className="section-head"><p>06 / HOW WE WORK</p><h2 id="process-title">A disciplined path<br /><em>to lasting value.</em></h2></div>
          <div className="process-grid">{process.map(([number, title, copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="why" aria-labelledby="why-title">
          <div className="why-image"><Image src="/assets/solutions-showroom.png" alt="Immersive Setarez technology experience centre" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div className="why-copy"><p>07 / WHY SETAREZ</p><h2 id="why-title">Technology, innovation<br /><em>and guidance.</em></h2><div>{reasons.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p>START A CONVERSATION</p><h2 id="contact-title">Let’s build a<br />smarter space.</h2>
          <form action="mailto:sales@setarez.com" method="post" encType="text/plain"><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input type="email" name="email" autoComplete="email" required /></label><label>Tell us about your space<textarea name="project" rows="4" required /></label><button type="submit">Talk to our team <span>↗</span></button></form>
          <div className="contact-details"><a href="tel:+254759013661">+254 759 013 661</a><a href="mailto:sales@setarez.com">sales@setarez.com</a><span>Nairobi, Kenya</span></div>
        </section>
      </main>

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
