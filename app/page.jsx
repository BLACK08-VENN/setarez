"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    label: "LEARNING",
    kicker: "INTERACTIVE LEARNING / 01",
    image: "/assets/digital-twin-classroom.png",
    alt: "A modern connected university learning space",
    points: [
      { key: "display", code: "01 / INTERACTIVE", title: "Interactive display", description: "A high-clarity teaching surface for content, annotation and shared ideas.", features: ["Interactive flat panel", "Digital classroom software", "Wireless content sharing"] },
      { key: "camera", code: "02 / HYBRID", title: "Connected classroom", description: "Camera and collaboration technology that brings remote participants into the room.", features: ["Intelligent camera", "Hybrid participation", "Simple teacher workflow"] },
      { key: "audio", code: "03 / AUDIO", title: "Room-wide clarity", description: "Classroom audio designed around every learner and every teaching position.", features: ["Clear reinforcement", "Voice capture", "Conferencing integration"] },
      { key: "control", code: "04 / SUPPORT", title: "Confident adoption", description: "Onboarding, training and technical support that keep the room useful beyond installation day.", features: ["Teacher training", "Preventive maintenance", "Local technical support"] }
    ]
  },
  {
    label: "COLLABORATION",
    kicker: "HYBRID COLLABORATION / 02",
    image: "/assets/final-boardroom.png",
    alt: "A connected executive boardroom with professional collaboration technology",
    points: [
      { key: "board-display", code: "01 / VISUAL", title: "Collaborative canvas", description: "A shared visual surface for wireless presentation, annotation and clearer decisions.", features: ["Interactive whiteboard", "Wireless presentation", "Content sharing"] },
      { key: "rally-bar", code: "02 / VIDEO", title: "Professional video", description: "An integrated camera, speaker and microphone system for dependable hybrid meetings.", features: ["AI-powered video", "Integrated room audio", "Automatic framing"] },
      { key: "sight", code: "03 / PRESENCE", title: "Inclusive presence", description: "Room coverage that gives remote participants a natural view of everyone at the table.", features: ["Table-level perspective", "Multi-participant framing", "Platform integration"] },
      { key: "tap", code: "04 / CONTROL", title: "Simple room control", description: "One-touch meeting control, room scheduling and a clean, consistent experience.", features: ["One-touch join", "Room booking", "Clean integration"] }
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

export default function Home() {
  const [room, setRoom] = useState(0);
  const [digital, setDigital] = useState(false);
  const [point, setPoint] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (point) closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && setPoint(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [point]);

  const changeRoom = (direction) => {
    setRoom((current) => (current + direction + rooms.length) % rooms.length);
    setPoint(null);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header>
        <a className="brand" href="#main" aria-label="Setarez Technologies home"><b>SETAREZ</b><span>TECHNOLOGY · INNOVATION · GUIDANCE</span></a>
        <nav aria-label="Primary navigation"><a href="#about">About</a><a href="#solutions">Solutions</a><a href="#process">How we work</a><a href="#contact">Contact</a></nav>
        <div className="theme-id"><i />NAIROBI / EAST AFRICA</div>
      </header>

      <main id="main">
        <section className={`twin${digital ? " digital" : ""}`} id="twin" aria-label="Interactive room explorer">
          {rooms.map((item, index) => (
            <div className={`room-slide${index === room ? " active" : ""}`} aria-hidden={index !== room} key={item.label}>
              <Image className="room-image" src={item.image} alt={item.alt} fill priority={index === 0} sizes="100vw" />
              {item.points.map((itemPoint, pointIndex) => (
                <button className={`hotspot ${itemPoint.key}`} onClick={() => setPoint(itemPoint)} aria-label={`Explore ${itemPoint.title}`} tabIndex={index === room ? 0 : -1} key={itemPoint.key}><i /><span>{String(pointIndex + 1).padStart(2, "0")}</span></button>
              ))}
            </div>
          ))}
          <div className="room-shade" /><div className="scan-plane" />
          <div className="twin-title"><p>{rooms[room].kicker}</p><h1>Technology that<br /><em>connects people and ideas.</em></h1></div>
          <div className="view-toggle" role="group" aria-label="View mode"><span>VIEW MODE</span><button className={!digital ? "active" : ""} aria-pressed={!digital} onClick={() => setDigital(false)}>Physical</button><button className={digital ? "active" : ""} aria-pressed={digital} onClick={() => setDigital(true)}>Integrated</button></div>
          <div className="room-nav">
            <button onClick={() => changeRoom(-1)} aria-label="Previous room">←</button>
            <div><strong>0{room + 1}</strong><span>/ 02</span><small>{rooms[room].label}</small></div>
            <button onClick={() => changeRoom(1)} aria-label="Next room">→</button>
          </div>
          <div className="telemetry" aria-label="Setarez solution model">
            <div><span>OUR ROLE</span><b><i /> UNDERSTAND</b></div><div><span>INTEGRATION</span><b>DESIGN + DELIVER</b></div><div><span>LIFECYCLE</span><b>SUPPORT</b></div>
          </div>
          <div className="hint">SELECT A TECHNOLOGY POINT <span>↗</span></div>
          {point && <aside className="point-card" role="dialog" aria-modal="true" aria-labelledby="point-title">
            <button className="point-close" ref={closeRef} onClick={() => setPoint(null)} aria-label="Close technology details">×</button>
            <span className="point-code">{point.code}</span><h2 id="point-title">{point.title}</h2><p>{point.description}</p><ul>{point.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><a href="#contact" onClick={() => setPoint(null)}>Discuss this solution ↗</a>
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

        <section className="sectors" aria-labelledby="sectors-title">
          <p className="eyebrow"><span>04</span> WHO WE SERVE</p><h2 id="sectors-title">Solutions shaped around<br /><em>each environment.</em></h2>
          <div className="sector-list">{["Schools & universities", "Corporate organisations", "Government & parastatals", "NGOs & development partners", "Hotels & conference centres", "Retail & commercial spaces", "Healthcare facilities", "Architects & consultants"].map((sector, index) => <div key={sector}><span>{String(index + 1).padStart(2, "0")}</span>{sector}</div>)}</div>
          <p className="sector-note">From a single room to a multi-site rollout.</p>
        </section>

        <section className="process" id="process" aria-labelledby="process-title">
          <div className="section-head"><p>05 / HOW WE WORK</p><h2 id="process-title">A disciplined path<br /><em>to lasting value.</em></h2></div>
          <div className="process-grid">{process.map(([number, title, copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="why" aria-labelledby="why-title">
          <div className="why-image"><Image src="/assets/solutions-showroom.png" alt="Immersive Setarez technology experience centre" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div className="why-copy"><p>06 / WHY SETAREZ</p><h2 id="why-title">Technology, innovation<br /><em>and guidance.</em></h2><div>{reasons.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p>START A CONVERSATION</p><h2 id="contact-title">Let’s build a<br />smarter space.</h2>
          <form action="mailto:sales@setarez.com" method="post" encType="text/plain"><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input type="email" name="email" autoComplete="email" required /></label><label>Tell us about your space<textarea name="project" rows="4" required /></label><button type="submit">Talk to our team <span>↗</span></button></form>
          <div className="contact-details"><a href="tel:+254759013661">+254 759 013 661</a><a href="mailto:sales@setarez.com">sales@setarez.com</a><span>Nairobi, Kenya</span></div>
        </section>
      </main>

      <footer><a className="brand" href="#main"><b>SETAREZ</b><span>TECHNOLOGY · INNOVATION · GUIDANCE</span></a><p>Interactive learning, workplace collaboration and professional visual communication across Kenya and East Africa.</p><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:sales@setarez.com">Contact</a></div><small>© {new Date().getFullYear()} Setarez Technologies. Nairobi, Kenya.</small></footer>
    </>
  );
}
