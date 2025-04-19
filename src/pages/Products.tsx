
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProductCategory from "../components/products/ProductCategory";

const productCategories = [
  {
    id: "admixtures",
    title: "Admixtures",
    description: "High-performance admixtures designed to enhance concrete properties, including workability, strength, and durability. Our range includes plasticizers, superplasticizers, and specialty admixtures for various concrete applications.",
    products: [
      { id: "apconex-ultra-lw", name: "APCONEX ULTRA LW" },
      { id: "apconex-ultra-plast-expert", name: "APCONEX ULTRA PLAST EXPERT" },
      { id: "apconex-ultra-sp110-snf", name: "APCONEX ULTRA SP110 SNF" },
      { id: "apconex-ultra-sp111-pc", name: "APCONEX ULTRA SP111 PC" },
      { id: "apconex-ultra-sp220-hipc", name: "APCONEX ULTRA SP220 HIPC" },
      { id: "apconex-ultra-sp330-srv", name: "APCONEX ULTRA SP330 SRV" }
    ]
  },
  {
    id: "bonding-agents",
    title: "Bonding Agents",
    description: "Specialized adhesives that ensure strong bonds between old and new concrete, or between different construction materials. Our bonding agents provide excellent adhesion and durability in various applications.",
    products: [
      { id: "apconex-bond-acr", name: "APCONEX BOND ACR" },
      { id: "apconex-bond-sbr-latex-32", name: "APCONEX BOND SBR Latex 32" },
      { id: "apconex-bond-sbr-42", name: "APCONEX BOND SBR 42" },
      { id: "apconex-hack-free", name: "APCONEX HACK FREE" },
      { id: "apconex-plasto-bond", name: "APCONEX PLASTO BOND" },
      { id: "apconex-gypsofix", name: "APCONEX GYPSOFIX" }
    ]
  },
  {
    id: "dry-mix",
    title: "Dry Mix Products",
    description: "Pre-mixed cementitious products ready for on-site use after adding water. These include precision grouts, repair mortars, and specialized fixing compounds for various construction applications.",
    products: [
      { id: "apconex-block-fixx", name: "APCONEX BLOCK FIXX" },
      { id: "apconex-ready-plast", name: "APCONEX READY PLAST" },
      { id: "apconex-grout-precision-ii", name: "APCONEX GROUT PRECISION II" },
      { id: "apconex-repair-pro-micro", name: "APCONEX REPAIR PRO-MICRO" }
    ]
  },
  {
    id: "joint-sealants",
    title: "Joint Sealants",
    description: "High-performance sealants for sealing joints in buildings and civil engineering structures. Our range offers excellent adhesion, movement capability, and durability under various environmental conditions.",
    products: [
      { id: "apconex-seal-pu-40", name: "APCONEX SEAL PU 40" },
      { id: "apconex-seal-poly-pg", name: "APCONEX SEAL POLY-PG" },
      { id: "apconex-seal-poly-gg", name: "APCONEX SEAL POLY-GG" }
    ]
  },
  {
    id: "surface-treatment",
    title: "Surface Treatment",
    description: "Specialized products for concrete surface treatment, including curing compounds and release agents. These products help protect concrete surfaces and enhance their appearance and durability.",
    products: [
      { id: "apconex-crete-cure-cc-white", name: "APCONEX CRETE CURE-CC WHITE" },
      { id: "apconex-mra-eml-extra", name: "APCONEX MRA EML EXTRA" },
      { id: "apconex-mra-al", name: "APCONEX MRA –AL" }
    ]
  },
  {
    id: "tile-adhesives",
    title: "Tile Adhesives and Grout",
    description: "Premium-quality tile adhesives and grouts for secure, long-lasting tile installations. Our range caters to various tile types and installation environments, from standard residential to challenging industrial applications.",
    products: [
      { id: "apconex-ultra-ft-1001", name: "APCONEX ULTRA FT 1001" },
      { id: "apconex-ultra-wt-1002", name: "APCONEX ULTRA WT 1002" },
      { id: "apconex-ultra-ut-1003", name: "APCONEX ULTRA UT 1003" },
      { id: "apconex-ultra-st-1004", name: "APCONEX ULTRA ST 1004" },
      { id: "apconex-ultra-multi-flex-pu", name: "APCONEX ULTRA MULTI FLEX--PU" },
      { id: "apconex-ultra-joint-tg", name: "APCONEX ULTRA JOINT-TG" },
      { id: "apconex-ultra-grout-ep-2k", name: "APCONEX ULTRA GROUT EP 2K" },
      { id: "apconex-ultra-grout-ep-3k", name: "APCONEX ULTRA GROUT EP 3K" },
      { id: "apconex-ultra-sparkle", name: "APCONEX ULTRA SPARKLE" },
      { id: "apconex-ultra-tile-spacers", name: "APCONEX ULTRA TILE SPACERS" },
      { id: "apconex-ultrashine-tc", name: "APCONEX ULTRASHINE TC" }
    ]
  },
  {
    id: "waterproofing",
    title: "Waterproofing Systems",
    description: "Comprehensive waterproofing solutions for roofs, basements, foundations, and other structures. Our systems provide reliable protection against water ingress, extending the lifespan of buildings and infrastructure.",
    products: [
      { id: "apconex-ultra-acrycoat-1k", name: "APCONEX ULTRA ACRYCOAT 1K" },
      { id: "apconex-ultra-2k", name: "APCONEX ULTRA 2K" },
      { id: "apconex-ulta-flex-200", name: "APCONEX ULTA FLEX 200" },
      { id: "apconex-ulta-flex-200-seal-n-cool", name: "APCONEX ULTA FLEX 200 SEAL N COOL" },
      { id: "apconex-uttra-pu-400", name: "APCONEX UTTRA PU 400" },
      { id: "apconex-ultra-root-protect-900", name: "APCONEX ULTRA ROOT PROTECT 900" },
      { id: "apconex-ultra-bitukoat", name: "APCONEX ULTRA BITUKOAT" }
    ]
  }
];

const Products = () => {
  useEffect(() => {
    // Handle URL hash for direct category access
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-lg md:text-xl text-white/80">
              Comprehensive range of high-performance construction chemical solutions designed for durability, efficiency, and excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Categories overview */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productCategories.map((category) => (
              <a 
                key={category.id}
                href={`#${category.id}`}
                className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-primary">{category.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{category.products.length} Products</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-10">
            {productCategories.map((category, index) => (
              <ProductCategory
                key={category.id}
                id={category.id}
                title={category.title}
                description={category.description}
                products={category.products}
                isOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technical support CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Technical Assistance?</h2>
            <p className="text-lg text-white/80 mb-8">
              Our team of experts is available to help you select the right products for your specific project requirements.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Contact Our Technical Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
