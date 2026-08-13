import { SCHEMA_VERSION, type Node, type ProjectDocument } from "./types";
import { uid } from "@/lib/utils";

export function createDefaultNode(componentType: string): Node {
  return {
    id: uid(),
    componentType,
    props: {},
    styles: {},
    tabletOverride: {},
    mobileOverride: {},
    children: [],
    metadata: { createdAt: new Date().toISOString() },
  };
}

export function createProjectDocument(
  projectId: string,
  name: string,
  sections: Node[]
): ProjectDocument {
  return {
    schemaVersion: SCHEMA_VERSION,
    projectId,
    name,
    theme: {
      presets: {
        color: "blue",
        radius: "soft",
        font: "modern",
        density: "balanced",
        shadow: "soft",
      },
      overrides: {},
    },
    settings: { device: "desktop" },
    pages: [
      {
        id: uid(),
        name: "Beranda",
        sections,
      },
    ],
    assets: [],
    seo: {
      title: "",
      description: "",
    },
  };
}

export function createBlankProject(projectId: string): ProjectDocument {
  return createProjectDocument(projectId, "Website Baru", []);
}

export function createTemplateProject(projectId: string): ProjectDocument {
  const navbar = createDefaultNode("navbar-minimal");
  navbar.props = {
    logoText: "Toko Kita",
    link1Text: "Beranda",
    link1Url: "#",
    link2Text: "Produk",
    link2Url: "#produk",
    link3Text: "Tentang",
    link3Url: "#tentang",
    ctaText: "Hubungi Kami",
    ctaUrl: "#kontak",
  };

  const hero = createDefaultNode("hero-centered");
  hero.props = {
    eyebrow: "Selamat datang di Toko Kita",
    title: "Produk berkualitas untuk kehidupan sehari-hari",
    subtitle:
      "Kami menghadirkan produk pilihan dengan harga terjangkau dan layanan terbaik untuk keluarga Indonesia.",
    ctaText: "Lihat Produk",
    ctaUrl: "#produk",
    secondaryText: "Tentang Kami",
    secondaryUrl: "#tentang",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    imageAlt: "Ilustrasi toko kami",
  };

  const product = createDefaultNode("product-grid-basic");
  product.props = {
    title: "Produk Unggulan Kami",
    subtitle: "Pilihan terbaik yang paling diminati pelanggan kami",
    product1Name: "Paket Hemat",
    product1Price: "Rp 99.000",
    product1ImageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    product2Name: "Paket Keluarga",
    product2Price: "Rp 249.000",
    product2ImageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    product3Name: "Paket Premium",
    product3Price: "Rp 499.000",
    product3ImageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    product4Name: "Paket Spesial",
    product4Price: "Rp 799.000",
    product4ImageUrl:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
  };

  const about = createDefaultNode("about-basic");
  about.props = {
    eyebrow: "Tentang Kami",
    title: "Cerita di balik Toko Kita",
    content:
      "Berdiri sejak 2015, kami berkomitmen memberikan produk terbaik dengan harga jujur. Setiap produk kami pilih langsung dari pengrajin dan pemasok lokal yang terpercaya, sehingga kualitas selalu terjaga.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    imageAlt: "Tim kami sedang bekerja",
    stat1Value: "10+",
    stat1Label: "Tahun pengalaman",
    stat2Value: "5.000+",
    stat2Label: "Pelanggan puas",
    stat3Value: "120+",
    stat3Label: "Produk pilihan",
  };

  const cta = createDefaultNode("cta-basic");
  cta.props = {
    title: "Siap memulai belanja bersama kami?",
    subtitle: "Konsultasi gratis untuk kebutuhan produk Anda.",
    ctaText: "Hubungi Kami",
    ctaUrl: "#kontak",
    secondaryText: "Lihat Produk",
    secondaryUrl: "#produk",
  };

  const footer = createDefaultNode("footer-basic");
  footer.props = {
    brandName: "Toko Kita",
    tagline: "Produk berkualitas untuk keluarga Indonesia.",
    link1Text: "Beranda",
    link1Url: "#",
    link2Text: "Produk",
    link2Url: "#produk",
    link3Text: "Kontak",
    link3Url: "#kontak",
    copyright: "© 2026 Toko Kita. Semua hak dilindungi.",
  };

  return createProjectDocument(projectId, "Website Toko Kita", [
    navbar,
    hero,
    product,
    about,
    cta,
    footer,
  ]);
}