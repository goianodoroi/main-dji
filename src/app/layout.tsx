import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { getConfig } from "@/lib/config";
import Script from "next/script";

export const metadata: Metadata = {
  title: "DJI — Capture o impossível",
  description:
    "DJI: tecnologia de ponta em drones, câmeras e estabilizadores. Capture vídeos e fotos profissionais com o equipamento mais avançado do mundo.",
  keywords: "DJI, drone, câmera, estabilizador, Mavic, Osmo, Mini, quadricóptero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getConfig();

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://se-cdn.djiits.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://customer-siyy2ilzb5oakkgv.cloudflarestream.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://imagedelivery.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://imagedelivery.net" />
        <link
          rel="preload"
          as="image"
          href="https://imagedelivery.net/jmgC06hj1Xh1brKwMMi-2Q/1fc2c2ec-bd4a-49d7-13fb-787a4f02a600/public"
          fetchPriority="high"
        />
        <link rel="preload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video.min.js" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video-js.min.css" crossOrigin="anonymous" />
        {config.scripts.map((scriptTag, index) => {
          const innerContentMatch = scriptTag.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
          const innerContent = innerContentMatch ? innerContentMatch[1] : scriptTag;
          const srcMatch = scriptTag.match(/src=["'](.*?)["']/i);
          const src = srcMatch ? srcMatch[1] : undefined;

          if (src) {
            return (
              <Script 
                key={index} 
                src={src} 
                strategy="lazyOnload"
                {...(innerContent.trim() ? { dangerouslySetInnerHTML: { __html: innerContent } } : {})}
              />
            );
          }

          return (
            <Script 
              key={index} 
              id={`config-script-${index}`}
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{ __html: innerContent }} 
            />
          );
        })}
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{
          background: "#0a0a0a",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
