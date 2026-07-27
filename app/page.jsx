"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    label: "AUDITORIUM",
    kicker: "CONNECTED AUDITORIUM / 01",
    image: "/assets/digital-twin-classroom.png",
    alt: "A modern connected university learning space",
    points: [
      { key: "display", code: "01 / VISUAL CANVAS", title: "Interactive display", description: "A high-clarity teaching surface for content, annotation and shared ideas.", features: ["Teachmint X interactive display", "4K visual clarity", "Precision multi-touch"] },
      { key: "camera", code: "02 / PRESENCE", title: "Intelligent camera", description: "Automatic framing and high-quality video that connects every participant.", features: ["4K camera", "Intelligent framing", "Hybrid learning ready"] },
      { key: "audio", code: "03 / ROOM AUDIO", title: "Invisible intelligence", description: "Ceiling audio and microphone coverage designed around the room, not the device.", features: ["Room-wide voice capture", "Clear reinforcement", "Conferencing integration"] },
      { key: "control", code: "04 / CONTROL", title: "One room experience", description: "Simple control, device monitoring and secure access across the technology environment.", features: ["Connected device health", "NFC access", "Central management"] }
    ]
  },
  {
    label: "BOARDROOM",
    kicker: "EXECUTIVE BOARDROOM / 02",
    image: "/assets/final-boardroom.png",
    alt: "A connected executive boardroom with Teachmint and Logitech technology",
    points: [
      { key: "board-display", code: "01 / TEACHMINT", title: "Teachmint meeting display", description: "The room’s collaborative visual canvas for wireless sharing, interactive whiteboarding and clearer decision-making.", features: ["Interactive whiteboard", "Wireless screen sharing", "Cloud meeting workflow"] },
      { key: "rally-bar", code: "02 / LOGITECH", title: "Logitech Rally Bar", description: "An all-in-one video bar delivering professional camera, speaker and microphone performance for the boardroom.", features: ["AI-powered video", "Integrated room audio", "Automatic framing"] },
      { key: "sight", code: "03 / LOGITECH", title: "Logitech Sight", description: "A tabletop companion camera that gives remote participants a clearer view of people around the table.", features: ["Table-level perspective", "Multi-participant framing", "Rally Bar integration"] },
      { key: "tap", code: "04 / LOGITECH", title: "Logitech Tap", description: "A dedicated meeting-room touch controller for joining calls, sharing content and managing the room.", features: ["One-touch join", "Calendar integration", "Clean cable management"] }
    ]
  }
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
        <a className="brand" href="#main" aria-label="Setarez Technologies home"><b>SETAREZ</b><span>TECHNOLOGIES</span></a>
        <nav aria-label="Primary navigation"><a href="#twin">Digital twin</a><a href="#portfolio">Portfolio</a><a href="#contact">Talk to us</a></nav>
        <div className="theme-id" aria-label="Digital twin experience"><i />DIGITAL TWIN / 03</div>
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
          <div className="twin-title"><p>{rooms[room].kicker}</p><h1>See the room.<br /><em>See what it knows.</em></h1></div>
          <div className="view-toggle" role="group" aria-label="View mode"><span>VIEW MODE</span><button className={!digital ? "active" : ""} aria-pressed={!digital} onClick={() => setDigital(false)}>Physical</button><button className={digital ? "active" : ""} aria-pressed={digital} onClick={() => setDigital(true)}>Digital twin</button></div>
          <div className="room-nav">
            <button onClick={() => changeRoom(-1)} aria-label="Previous room">←</button>
            <div><strong>0{room + 1}</strong><span>/ 02</span><small>{rooms[room].label}</small></div>
            <button onClick={() => changeRoom(1)} aria-label="Next room">→</button>
          </div>
          <div className="telemetry" aria-label="Room capabilities">
            <div><span>ROOM STATUS</span><b><i /> READY</b></div><div><span>DEVICE COVERAGE</span><b>FULL</b></div><div><span>SYSTEM VIEW</span><b>UNIFIED</b></div>
          </div>
          <div className="hint">SELECT A TECHNOLOGY POINT <span>↗</span></div>
          {point && <aside className="point-card" role="dialog" aria-modal="true" aria-labelledby="point-title">
            <button className="point-close" ref={closeRef} onClick={() => setPoint(null)} aria-label="Close technology details">×</button>
            <span className="point-code">{point.code}</span><h2 id="point-title">{point.title}</h2><p>{point.description}</p><ul>{point.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><a href="#contact" onClick={() => setPoint(null)}>Discuss this solution ↗</a>
          </aside>}
        </section>
        <section className="outcomes" aria-labelledby="outcomes-title">
          <p className="eyebrow"><span>01</span> FROM ROOM TO INSTITUTION</p><h2 id="outcomes-title">Every space becomes<br /><em>measurable, manageable, alive.</em></h2>
          <div className="outcome-grid"><article><b>01</b><strong>Teach better</strong><p>Interactive content, EduAI and hybrid participation in one teaching flow.</p></article><article><b>02</b><strong>Operate smarter</strong><p>Live device health, classroom visibility and faster institutional support.</p></article><article><b>03</b><strong>Connect everyone</strong><p>Clear video, intelligent audio and displays designed around human presence.</p></article></div>
        </section>
        <section className="portfolio" id="portfolio" aria-labelledby="portfolio-title"><div className="portfolio-head"><p>THE TECHNOLOGY LAYER</p><h2 id="portfolio-title">One room.<br />Three ecosystems.</h2></div><div className="brand-rail"><article><span>TEACHMINT</span><strong>Learning intelligence</strong><small>X2 Neo · X2 Star · VisionX</small></article><article><span>LOGITECH</span><strong>Human collaboration</strong><small>Video · Audio · Room control</small></article><article><span>ABSEN</span><strong>Visual authority</strong><small>LED · Large format · Immersive canvas</small></article></div></section>
        <section className="contact" id="contact" aria-labelledby="contact-title"><p>BUILD YOUR DIGITAL TWIN</p><h2 id="contact-title">Let’s map your<br />next room.</h2><form action="mailto:hello@setarez.com" method="post" encType="text/plain"><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input type="email" name="email" autoComplete="email" required /></label><label>Tell us about your space<textarea name="project" rows="4" required /></label><button type="submit">Arrange a consultation <span>↗</span></button></form><p className="contact-note">Submitting opens your email application. You can also write to <a href="mailto:hello@setarez.com">hello@setarez.com</a>.</p></section>
      </main>
      <footer><a className="brand" href="#main"><b>SETAREZ</b><span>TECHNOLOGIES</span></a><p>Immersive technology for learning, leadership and shared ideas.</p><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:hello@setarez.com">Contact</a></div><small>© {new Date().getFullYear()} Setarez Technologies.</small></footer>
    </>
  );
}
