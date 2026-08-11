"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const storageKey = "setarez-product-enquiry";

export default function CatalogueProducts({ brand, images }) {
  const [selected, setSelected] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      setSelected(Array.isArray(saved) ? saved : []);
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, []);

  function updateSelection(items) {
    setSelected(items);
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  function toggleProduct(name) {
    const id = `${brand.id}:${name}`;
    const exists = selected.some((item) => item.id === id);
    updateSelection(exists
      ? selected.filter((item) => item.id !== id)
      : [...selected, { id, name, brand: brand.name }]);
  }

  async function submitEnquiry(event) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const productList = selected.map((item, index) => `${index + 1}. ${item.brand} — ${item.name}`).join("\n");
    const project = `Products requested:\n${productList}\n\nOrganisation: ${data.organisation || "Not provided"}\n\nProject details:\n${data.project}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, project })
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      updateSelection([]);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return <>
    <div className="catalogue-products">{brand.products.map(([name, category, description], index) => {
      const inBasket = selected.some((item) => item.id === `${brand.id}:${name}`);
      return <article key={name}>
        <div className="catalogue-product-photo official"><Image src={images[index % images.length]} alt={`${name} product image`} fill sizes="(max-width: 760px) 100vw, 25vw" /><span>{String(index + 1).padStart(2, "0")}</span><div><Image src={brand.logo} alt="" width={105} height={34} /></div></div>
        <div className="catalogue-product-copy"><span>{category}</span><h2>{name}</h2><p>{description}</p><button type="button" className={inBasket ? "product-enquiry-button selected" : "product-enquiry-button"} onClick={() => toggleProduct(name)} aria-pressed={inBasket}>{inBasket ? "Added to enquiry ✓" : "Add to enquiry +"}</button></div>
      </article>;
    })}</div>

    {selected.length > 0 && <button type="button" className="enquiry-basket-trigger" onClick={() => { setBasketOpen(true); setStatus("idle"); }} aria-label={`Open enquiry with ${selected.length} selected products`}><span>{selected.length}</span> Review enquiry</button>}

    {basketOpen && <div className="enquiry-basket-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBasketOpen(false); }}>
      <aside className="enquiry-basket" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
        <button type="button" className="enquiry-close" onClick={() => setBasketOpen(false)} aria-label="Close enquiry">×</button>
        <p>PRODUCT ENQUIRY</p><h2 id="enquiry-title">Request one quote.</h2><p>Select products from any catalogue and send them together to our sales team.</p>
        <div className="enquiry-selected-list">{selected.map((item) => <div key={item.id}><span>{item.brand}</span><strong>{item.name}</strong><button type="button" onClick={() => updateSelection(selected.filter((selectedItem) => selectedItem.id !== item.id))} aria-label={`Remove ${item.name}`}>Remove</button></div>)}</div>
        {status !== "sent" ? <form onSubmit={submitEnquiry}>
          <label>Name<input name="name" autoComplete="name" required /></label>
          <label>Work email<input type="email" name="email" autoComplete="email" required /></label>
          <label>Organisation <small>Optional</small><input name="organisation" autoComplete="organization" /></label>
          <label>Tell us about your room or project<textarea name="project" rows="4" required /></label>
          <button type="submit" disabled={status === "sending" || selected.length === 0}>{status === "sending" ? "Sending…" : `Send enquiry for ${selected.length} product${selected.length === 1 ? "" : "s"}`} <span>↗</span></button>
          {status === "error" && <p className="enquiry-status error">We couldn’t send your enquiry. Please email sales@setarez.com directly.</p>}
        </form> : <div className="enquiry-success"><strong>Enquiry sent.</strong><p>Thank you. Our sales team will review your product list and contact you.</p><button type="button" onClick={() => setBasketOpen(false)}>Continue browsing</button></div>}
      </aside>
    </div>}
  </>;
}
