import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";
import { getConfig } from "@/lib/config";

const BentoGrid = dynamic(() => import("@/components/sections/BentoGrid"));
const ProductBuy = dynamic(() => import("@/components/sections/ProductBuy"));
const InTheBox = dynamic(() => import("@/components/sections/InTheBox"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Footer = dynamic(() => import("@/components/sections/Footer"));
export default function Home() {
  const config = getConfig();

  return (
    <main style={{ background: "#0a0a0a" }}>
      <Hero price={config.price} />
      <BentoGrid />
      <ProductBuy price={config.price} checkoutLink={config.checkoutLink} />
      <InTheBox />
      <FAQ />
      <Footer />
    </main>
  );
}
