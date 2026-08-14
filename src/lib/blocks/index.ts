import type { Node, NodeProps } from "@/lib/schema/types";
import { createDefaultNode } from "@/lib/schema/defaults";
import { uid } from "@/lib/utils";

export type BlockCategory = "landing" | "portfolio" | "store" | "company";

export interface BlockSectionSpec {
  componentType: string;
  props?: NodeProps;
}

export interface BlockManifest {
  id: string;
  name: string;
  description: string;
  category: BlockCategory;
  tier: "free" | "pro";
  tags: string[];
  sections: BlockSectionSpec[];
}

export const blockRegistry: BlockManifest[] = [
  {
    id: "landing-toko",
    name: "Landing Toko",
    description: "Halaman utama toko: hero, produk unggulan, ajakan, dan footer.",
    category: "store",
    tier: "free",
    tags: ["toko", "produk", "jualan"],
    sections: [
      { componentType: "navbar-minimal" },
      {
        componentType: "hero-centered",
        props: {
          eyebrow: "Selamat datang",
          title: "Belanja kebutuhan Anda di satu tempat",
          subtitle:
            "Temukan produk pilihan dengan harga terbaik, dikirim cepat ke seluruh Indonesia.",
          ctaText: "Lihat Katalog",
          secondaryText: "Tentang Kami",
        },
      },
      {
        componentType: "product-grid-basic",
        props: {
          title: "Produk Unggulan",
          subtitle: "Paling laris minggu ini",
        },
      },
      {
        componentType: "cta-basic",
        props: { title: "Siap mulai berbelanja?" },
      },
      { componentType: "footer-basic" },
    ],
  },
  {
    id: "landing-sederhana",
    name: "Landing Sederhana",
    description: "Halaman satu bagian untuk bisnis kecil atau portofolio pribadi.",
    category: "landing",
    tier: "free",
    tags: ["bisnis", "personal", "sederhana"],
    sections: [
      { componentType: "navbar-minimal" },
      {
        componentType: "hero-centered",
        props: {
          eyebrow: "Halo, saya",
          title: "Membangun sesuatu yang berarti",
          subtitle:
            "Saya membantu bisnis kecil tampil profesional di dunia digital.",
          ctaText: "Hubungi Saya",
          secondaryText: "Lihat Karya",
        },
      },
      { componentType: "about-basic" },
      { componentType: "cta-basic", props: { title: "Mari bekerja sama" } },
      { componentType: "footer-basic" },
    ],
  },
  {
    id: "portfolio",
    name: "Portofolio Kreatif",
    description: "Tampilkan karya Anda dengan hero berkesan dan profil singkat.",
    category: "portfolio",
    tier: "pro",
    tags: ["desainer", "fotografer", "karya"],
    sections: [
      { componentType: "navbar-minimal" },
      {
        componentType: "hero-centered",
        props: {
          eyebrow: "Portofolio",
          title: "Desain yang bercerita",
          subtitle:
            "Fotografi, ilustrasi, dan brand identity untuk klien di seluruh dunia.",
          ctaText: "Lihat Portofolio",
        },
      },
      { componentType: "about-basic" },
      { componentType: "footer-basic" },
    ],
  },
  {
    id: "storefront",
    name: "Toko Lengkap",
    description: "Storefront dua grid produk dengan semua elemen konversi.",
    category: "store",
    tier: "pro",
    tags: ["toko", "lengkap", "e-commerce"],
    sections: [
      { componentType: "navbar-minimal" },
      {
        componentType: "hero-centered",
        props: {
          eyebrow: "Koleksi baru",
          title: "Gaya terbaru, harga terbaik",
          subtitle:
            "Belanja koleksi musim ini dengan gratis ongkir untuk pesanan di atas Rp 300.000.",
          ctaText: "Belanja Sekarang",
          secondaryText: "Lihat Promo",
        },
      },
      {
        componentType: "product-grid-basic",
        props: {
          title: "Koleksi Terbaru",
          subtitle: "Baru tiba minggu ini",
        },
      },
      {
        componentType: "product-grid-basic",
        props: {
          title: "Paling Laris",
          subtitle: "Favorit pelanggan kami",
        },
      },
      { componentType: "cta-basic", props: { title: "Jangan lewatkan promo" } },
      { componentType: "footer-basic" },
    ],
  },
];

export const blockMap: Record<string, BlockManifest> = Object.fromEntries(
  blockRegistry.map((b) => [b.id, b])
);

export const BLOCK_CATEGORY_LABELS: Record<BlockCategory, string> = {
  landing: "Landing",
  portfolio: "Portofolio",
  store: "Toko",
  company: "Perusahaan",
};

export function getBlock(id: string): BlockManifest | undefined {
  return blockMap[id];
}

/** Membangun Node sections dari spesifikasi blok (dengan id baru). */
export function buildBlockNodes(block: BlockManifest): Node[] {
  return block.sections.map((spec) => {
    const node = createDefaultNode(spec.componentType);
    node.id = uid();
    node.metadata = { createdAt: new Date().toISOString() };
    if (spec.props) {
      node.props = { ...node.props, ...spec.props };
    }
    return node;
  });
}