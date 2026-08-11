import Image from "next/image";
import SiteHeader from "../SiteHeader";

export const metadata = {
  title: "AV Product Catalogue | Setarez Technologies",
  description: "Explore interactive displays, video collaboration systems, LED displays and room technology available through Setarez Technologies."
};

export const brands = [
  {
    id: "teachmint", name: "Teachmint", logo: "/assets/logos/teachmint.svg", strapline: "AI-powered interactive learning",
    products: [
      ["Teachmint X2 Neo 65″", "AI interactive display", "A 4K Google EDLA-certified teaching panel with Android 16, EduAI, 8GB/256GB memory, a 48MP 4K camera, eight-array microphone and 40W speakers."],
      ["Teachmint X2 Neo 75″", "AI interactive display", "A 75-inch connected classroom display with EduAI, Android 16, 4K resolution, integrated AI camera, microphone array and 40W room audio."],
      ["Teachmint X2 Neo 86″", "AI interactive display", "An 86-inch teaching canvas with 4K resolution, onboard AI acceleration, integrated 48MP camera, eight-array microphone and 40W speakers."],
      ["Teachmint X2 Star 65″", "Interactive display", "A 65-inch Google EDLA-certified 4K digital teaching board with Android 16, EduAI, 8GB/128GB memory and 30W speakers."],
      ["Teachmint X2 Star 75″", "Interactive display", "A 75-inch 4K classroom display with Android 16 EDLA, onboard AI, responsive multi-touch, 8GB/128GB memory and 30W speakers."],
      ["Click X", "Student response system", "A dedicated response device that enables live quizzes, participation and classroom learning insights."]
    ]
  },
  {
    id: "logitech", name: "Logitech", logo: "/assets/logos/logitech.svg", strapline: "Professional video collaboration",
    products: [
      ["Rally Bar", "Video bar", "An all-in-one video bar with a 4K PTZ camera and room audio for medium and large meeting rooms."],
      ["Rally Bar Mini", "Video bar", "A compact all-in-one collaboration appliance designed for small and medium meeting spaces."],
      ["Rally Plus", "Conference system", "A modular conference-camera and audio system that expands to cover larger rooms."],
      ["Logitech Sight", "Tabletop camera", "An AI-powered companion camera that helps remote attendees see people around the meeting table."],
      ["Tap IP", "Touch controller", "A purpose-built network meeting controller for supported Teams, Zoom and Google room deployments."],
      ["Tap Scheduler", "Room scheduling", "A dedicated scheduling panel that makes meeting-room availability visible at a glance."],
      ["Scribe", "Whiteboard camera", "An AI whiteboard camera that shares physical whiteboard content into video meetings."],
      ["Swytch", "Room connectivity", "A single-cable laptop connection that uses a room’s installed display, camera and speakers."]
    ]
  },
  {
    id: "viewsonic", name: "ViewSonic", logo: "/assets/logos/viewsonic.svg", strapline: "Displays for learning and business",
    products: [
      ["ViewBoard IFP6534", "65-inch interactive display", "An EDLA-certified 4K ViewBoard created for essential classroom needs, with responsive touch, integrated teaching software and secure Google services."],
      ["ViewBoard IFP7550-5", "75-inch interactive display", "A 75-inch 4K collaboration display with up to 40-point touch, USB-C connectivity, wireless casting and the myViewBoard software ecosystem."],
      ["ViewBoard IFP110", "110-inch interactive display", "An expansive 110-inch 4K canvas with Android 13, an octa-core processor, integrated microphone array and triple USB-C connectivity."],
      ["ViewSonic CDE7530", "75-inch presentation display", "A commercial 4K display built for meeting rooms and signage, with USB-C, wireless casting, 24/7 operation and professional AV control support."],
      ["ViewSonic LDM163-182", "163-inch all-in-one LED", "A bezel-free 163-inch Direct View LED system with 600-nit brightness, GOB surface protection, integrated control and powerful room audio."],
      ["VB-CAM-201", "All-in-one conference camera", "A Zoom Rooms certified 4K conference camera with a 121° field of view, voice tracking, 5x digital zoom, stereo speakers and a four-microphone array for medium and large rooms."],
      ["TeamJoin TRS10", "Microsoft Teams Rooms system", "A secure Teams Rooms system combining a Windows 11 IoT computing engine with a 10.1-inch Full HD touch console, one-touch meeting control and direct HDMI ingest for BYOD presentations."],
      ["TeamJoin UMB202", "4K video bar system", "A Microsoft Teams Rooms certified 4K video bar with a Sony camera sensor, intelligent auto-framing, voice tracking, six beamforming microphones and an 8-metre pickup range."],
      ["TeamJoin TRS10-UB", "Microsoft Teams Rooms bundle", "A certified Teams Rooms package combining the MPC310 computing engine, MRC1010 touch console and UMB202 4K video bar system."]
    ]
  },
  {
    id: "absen", name: "Absen", logo: "/assets/logos/absen.png", strapline: "Professional LED display systems",
    products: [
      ["Absen iCon X Series", "Interactive all-in-one LED", "A complete 108, 136 or 163-inch Micro LED collaboration display with optional 20-point touch, Android 11, wireless sharing and integrated 30W audio for meeting rooms and lecture spaces."],
      ["Absen iCon X V2 Series", "Professional all-in-one LED", "A plug-and-play 136 or 163-inch Micro LED display with 2K+ clarity, a 98% screen-to-body ratio, multi-source layouts and integration with Crestron and Extron control systems."],
      ["Absen iCon X Ultrawide", "21:9 all-in-one LED", "A seamless 151, 178 or 205-inch ultrawide display designed for Microsoft Teams Front Row, Zoom and hybrid collaboration, with wireless sharing and an integrated Android platform."],
      ["Absen CL V3 Series", "Premium COB display", "A fine-pitch 0.93 or 1.25mm flagship COB platform with 30,000:1 contrast, anti-glare treatment, DCI-P3 colour and a 7,680Hz refresh rate for premium lobbies, boardrooms and control rooms."],
      ["Absen CPS Series", "Modular commercial LED", "A ready-to-use 1.8, 2.0 or 2.5mm indoor LED platform with flexible sizing, magnetic installation, front maintenance and optional L-shaped corners for commercial and enterprise spaces."],
      ["Absen K V3 Series", "Creative commercial LED", "A lightweight, energy-conscious commercial display system with flexible and right-angle splicing, available in 1.89, 2.5 and 3.9mm pixel pitches for retail and architectural installations."]
    ]
  }
];

export function enquiryLink(product) {
  const subject = `Product enquiry: ${product}`;
  const body = `Hello Setarez Technologies, I would like availability, pricing and installation guidance for ${product}.`;
  return `mailto:sales@setarez.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Catalogue() {
  return <>
    <SiteHeader theme="PRODUCT CATALOGUE" links={[{ href: "/", label: "Home" }, { href: "#brands", label: "Brands" }, { href: "/#finder", label: "Solution finder" }]} />
    <main className="catalogue-page">
      <section className="catalogue-hero">
        <p>SETAREZ / PRODUCT CATALOGUE</p>
        <h1>Technology selected<br />for <em>better spaces.</em></h1>
        <div><p>Explore professional AV products available through Setarez Technologies. We help you choose, integrate and support the right system—not just purchase individual equipment.</p><a className="button primary" href="/#finder">Find the right system</a></div>
      </section>
      <section className="catalogue-brand-gallery" id="brands">
        <div className="catalogue-brand-gallery-head"><p>OUR TECHNOLOGY PARTNERS</p><h2>Trusted brands.<br /><em>Expertly integrated.</em></h2><p>Explore professional platforms selected for performance, reliability and long-term support.</p></div>
        <div className="catalogue-brand-selector">{brands.map((brand, index) => <a href={`/catalogue/${brand.id}`} key={brand.id}>
          <div className="catalogue-selector-image catalogue-selector-logo"><span>0{index + 1}</span><Image src={brand.logo} alt={`${brand.name} logo`} width={260} height={90} /><small>SETAREZ PARTNER</small><b>OPEN CATALOGUE <i>↗</i></b></div>
          <div><span>{brand.products.length} PRODUCTS / {brand.name.toUpperCase()}</span><p>{brand.strapline}</p><strong><span>View {brand.products.length} products</span><i>→</i></strong></div>
        </a>)}</div>
      </section>
      <section className="catalogue-cta"><p>NEED HELP CHOOSING?</p><h2>Tell us about your room.<br /><em>We’ll specify the system.</em></h2><a className="button primary" href="/#contact">Talk to our team</a></section>
    </main>
  </>;
}
