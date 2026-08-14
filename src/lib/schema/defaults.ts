import { SCHEMA_VERSION, type Node, type ProjectDocument, type ProjectType } from "./types";
import { DEFAULT_THEME_PRESETS } from "@/lib/theme/presets";
import { uid } from "@/lib/utils";

export function createDefaultNode(componentType: string, name?: string): Node {
  return {
    id: uid(),
    name: name ?? componentType,
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
  sections: Node[],
  projectType: ProjectType = "landing"
): ProjectDocument {
  const presets = { ...DEFAULT_THEME_PRESETS };
  delete (presets as { density?: string }).density;
  delete (presets as { shadow?: string }).shadow;

  if (projectType === "dashboard") {
    presets.style = "mira";
    presets.density = "compact";
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    projectId,
    name,
    projectType,
    theme: {
      presets,
      overrides: {},
    },
    settings: { device: "desktop" },
    pages: [
      {
        id: uid(),
        name: projectType === "dashboard" ? "Overview Dashboard" : "Beranda",
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

export function createBlankProject(
  projectId: string,
  projectType: ProjectType = "landing"
): ProjectDocument {
  const title = projectType === "dashboard" ? "Dashboard Baru" : "Landing Page Baru";
  return createProjectDocument(projectId, title, [], projectType);
}

export function createDashboardTemplate(projectId: string): ProjectDocument {
  const sidebar = createDefaultNode("app-sidebar", "Navigation Sidebar");
  const header = createDefaultNode("dashboard-header", "Dashboard Header");
  
  const kpiGrid = createDefaultNode("grid-container", "KPI Metrics Row");
  kpiGrid.props = { columns: 4 };

  const kpi1 = createDefaultNode("kpi-card", "Revenue KPI");
  kpi1.props = { title: "Total Revenue", value: "Rp 128.450.000", change: "+14.2%", trend: "up", period: "vs bulan lalu" };
  const kpi2 = createDefaultNode("kpi-card", "Users KPI");
  kpi2.props = { title: "Pengguna Aktif", value: "14.280", change: "+8.1%", trend: "up", period: "30 hari terakhir" };
  const kpi3 = createDefaultNode("kpi-card", "Conversion KPI");
  kpi3.props = { title: "Tingkat Konversi", value: "3.42%", change: "-0.4%", trend: "down", period: "vs target 4%" };
  const kpi4 = createDefaultNode("kpi-card", "Orders KPI");
  kpi4.props = { title: "Pesanan Baru", value: "1.890", change: "+22.5%", trend: "up", period: "minggu ini" };
  kpiGrid.children = [kpi1, kpi2, kpi3, kpi4];

  const chartCard = createDefaultNode("chart-card", "Revenue Analytics Chart");
  chartCard.props = {
    title: "Tren Pendapatan & Pengguna",
    chartType: "area",
    dataJson: JSON.stringify([
      { label: "Jan", val1: 40, val2: 24 },
      { label: "Feb", val1: 52, val2: 30 },
      { label: "Mar", val1: 63, val2: 38 },
      { label: "Apr", val1: 58, val2: 42 },
      { label: "Mei", val1: 78, val2: 55 },
      { label: "Jun", val1: 92, val2: 68 },
      { label: "Jul", val1: 128, val2: 84 },
    ]),
  };

  const dataTable = createDefaultNode("data-table", "Recent Transactions Table");
  dataTable.props = {
    title: "Transaksi Terbaru",
    subtitle: "Daftar 5 transaksi pelanggan paling mutakhir",
  };

  return createProjectDocument(
    projectId,
    "Analytics Admin Dashboard",
    [sidebar, header, kpiGrid, chartCard, dataTable],
    "dashboard"
  );
}

export function createTemplateProject(
  projectId: string,
  projectType: ProjectType = "landing"
): ProjectDocument {
  if (projectType === "dashboard") {
    return createDashboardTemplate(projectId);
  }

  const navbar = createDefaultNode("navbar-minimal", "Navigation Bar");
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

  const hero = createDefaultNode("hero-centered", "Hero Section");
  hero.props = {
    badgeText: "🛍️ Selamat datang di Toko Kita",
    title: "Produk berkualitas untuk kehidupan sehari-hari",
    description:
      "Kami menghadirkan produk pilihan dengan harga terjangkau dan layanan terbaik untuk keluarga Indonesia.",
    primaryCtaText: "Lihat Produk",
    primaryCtaUrl: "#produk",
    secondaryCtaText: "Tentang Kami",
    secondaryCtaUrl: "#tentang",
  };

  const product = createDefaultNode("product-grid-basic", "Product Catalog");
  product.props = {
    sectionTitle: "Produk Unggulan Kami",
    sectionSubtitle: "Pilihan terbaik yang paling diminati pelanggan kami",
    productsJson: JSON.stringify([
      { id: "p1", name: "Paket Hemat", price: "Rp 99.000", tag: "Terlaris" },
      { id: "p2", name: "Paket Keluarga", price: "Rp 249.000", tag: "Baru" },
      { id: "p3", name: "Paket Premium", price: "Rp 499.000", tag: "Diskon" },
      { id: "p4", name: "Paket Spesial", price: "Rp 799.000", tag: "" },
    ]),
  };

  const about = createDefaultNode("about-basic", "About Us Section");
  about.props = {
    title: "Cerita di balik Toko Kita",
    description:
      "Berdiri sejak 2015, kami berkomitmen memberikan produk terbaik dengan harga jujur. Setiap produk kami pilih langsung dari pengrajin dan pemasok lokal yang terpercaya, sehingga kualitas selalu terjaga.",
    stat1Number: "10+",
    stat1Label: "Tahun pengalaman",
    stat2Number: "5.000+",
    stat2Label: "Pelanggan puas",
    stat3Number: "120+",
    stat3Label: "Produk pilihan",
  };

  const cta = createDefaultNode("cta-basic", "Call To Action");
  cta.props = {
    title: "Siap memulai belanja bersama kami?",
    description: "Konsultasi gratis untuk kebutuhan produk Anda.",
    buttonText: "Hubungi Kami",
    buttonUrl: "#kontak",
  };

  const footer = createDefaultNode("footer-basic", "Footer");
  footer.props = {
    copyrightText: "© 2026 Toko Kita. Semua hak dilindungi.",
    link1Text: "Beranda",
    link1Url: "#",
    link2Text: "Produk",
    link2Url: "#produk",
    link3Text: "Kontak",
    link3Url: "#kontak",
  };

  return createProjectDocument(projectId, "Website Toko Kita", [
    navbar,
    hero,
    product,
    about,
    cta,
    footer,
  ], "landing");
}