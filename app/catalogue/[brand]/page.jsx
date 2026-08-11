import Image from "next/image";
import { notFound } from "next/navigation";
import { brands } from "../page";
import CatalogueProducts from "./CatalogueProducts";
import SiteHeader from "../../SiteHeader";

const brandImages = {
  teachmint: ["/assets/teachmint-classroom.png", "/assets/interactive-learning.png", "/assets/digital-twin-classroom.png"],
  logitech: ["/assets/hybrid-collaboration.png", "/assets/teachmint-boardroom.png", "/assets/final-boardroom.png"],
  viewsonic: ["/assets/interactive-learning.png", "/assets/digital-display.png", "/assets/solutions-showroom.png"],
  absen: ["/assets/digital-display.png", "/assets/solutions-showroom.png", "/assets/digital-twin-classroom.png"]
};

const productImages = {
  teachmint: [
    "/assets/catalogue/teachmint/x2-neo-65.png",
    "/assets/catalogue/teachmint/x2-neo-75.png",
    "/assets/catalogue/teachmint/x2-neo-86.png",
    "/assets/catalogue/teachmint/x2-star-65.png",
    "/assets/catalogue/teachmint/x2-star-75.png",
    "/assets/catalogue/teachmint/click-x.webp"
  ],
  viewsonic: [
    "/assets/catalogue/viewsonic/ifp6534.jpg",
    "/assets/catalogue/viewsonic/ifp7550-5.jpg",
    "/assets/catalogue/viewsonic/ifp110.png",
    "/assets/catalogue/viewsonic/cde7530.jpg",
    "/assets/catalogue/viewsonic/ldm163-182.jpg",
    "/assets/catalogue/viewsonic/vb-cam-201.jpg",
    "/assets/catalogue/viewsonic/teamjoin-trs10.png",
    "/assets/catalogue/viewsonic/umb202.png",
    "/assets/catalogue/viewsonic/teamjoin-trs10-ub.png"
  ],
  logitech: [
    "/assets/catalogue/logitech/rally-bar.jpg",
    "/assets/catalogue/logitech/rally-bar-mini.jpg",
    "/assets/catalogue/logitech/rally-plus.jpg",
    "/assets/catalogue/logitech/sight.jpg",
    "/assets/catalogue/logitech/tap-ip.png",
    "/assets/catalogue/logitech/tap-scheduler.png",
    "/assets/catalogue/logitech/scribe.png",
    "/assets/catalogue/logitech/swytch.png"
  ],
  absen: [
    "/assets/catalogue/absen/x-series.jpg",
    "/assets/catalogue/absen/x-v2-series.jpg",
    "/assets/catalogue/absen/x-ultrawide.jpg",
    "/assets/catalogue/absen/cl-v3-series.png",
    "/assets/catalogue/absen/cps-series.png",
    "/assets/catalogue/absen/k-v3-series.png"
  ]
};

export function generateStaticParams() {
  return brands.map((brand) => ({ brand: brand.id }));
}

export async function generateMetadata({ params }) {
  const { brand: brandId } = await params;
  const brand = brands.find((item) => item.id === brandId);
  return brand ? { title: `${brand.name} Product Catalogue | Setarez Technologies`, description: `Explore ${brand.name} ${brand.strapline.toLowerCase()} products available through Setarez Technologies.` } : {};
}

export default async function BrandCatalogue({ params }) {
  const { brand: brandId } = await params;
  const brand = brands.find((item) => item.id === brandId);
  if (!brand) notFound();
  const images = productImages[brand.id] || brandImages[brand.id];
  const usesOfficialProductImages = Boolean(productImages[brand.id]);

  return <>
    <SiteHeader theme={`${brand.name.toUpperCase()} CATALOGUE`} links={[{ href: "/", label: "Home" }, { href: "/catalogue", label: "All brands" }, { href: "/#finder", label: "Solution finder" }]} />
    <main className="catalogue-page brand-catalogue-page">
      <section className="brand-catalogue-hero">
        <div><a href="/catalogue">← All catalogues</a><Image src={brand.logo} alt={`${brand.name} logo`} width={210} height={70} priority /><h1>{brand.strapline}.</h1><p>Products available through Setarez Technologies, with solution design, installation, training and local support.</p></div>
        <div className={`brand-catalogue-hero-image${usesOfficialProductImages ? " official" : ""}`}><Image src={images[0]} alt={`${brand.name} technology solution`} fill sizes="(max-width: 760px) 100vw, 50vw" priority /></div>
      </section>
      <section className="catalogue-brand standalone">
        <div className="catalogue-brand-head"><span>PRODUCT RANGE</span><div><p>Explore the {brand.name}<br />catalogue.</p></div><strong>{brand.products.length} PRODUCTS</strong></div>
        <CatalogueProducts brand={brand} images={images} />
      </section>
      <section className="catalogue-cta"><p>{brand.name.toUpperCase()} SOLUTION SUPPORT</p><h2>Specify the right product<br /><em>for your space.</em></h2><a className="button primary" href="/#contact">Talk to our team</a></section>
    </main>
  </>;
}
