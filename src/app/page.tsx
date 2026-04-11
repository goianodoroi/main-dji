import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";
import { getConfig } from "@/lib/config";

const BentoGrid = dynamic(() => import("@/components/sections/BentoGrid"));
const BentoGrid360 = dynamic(() => import("@/components/sections/BentoGrid360"));
const ProductBuy = dynamic(() => import("@/components/sections/ProductBuy"));
const InTheBox = dynamic(() => import("@/components/sections/InTheBox"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Footer = dynamic(() => import("@/components/sections/Footer"));
export default function Home() {
  const config = getConfig();
  const pocket3Price = config.products.find(p => p.id === "pocket3")?.price || "117";

  return (
    <main style={{ background: "#0a0a0a" }}>
      <Hero price={pocket3Price} />
      <BentoGrid />
      <BentoGrid360 />
      <ProductBuy products={config.products} />
      <InTheBox />
      <FAQ />
      <Footer />
    </main>
  );
}
