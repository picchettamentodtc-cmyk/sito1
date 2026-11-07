import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Suspense } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "Mercurius Search",
    template: "%s · Mercurius Search",
  },
  description:
    "Shop clothes, perfumes, apparel, and streetwear. A demonstration store with a session cart and checkout.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <Suspense fallback={<div className="headerSpace" aria-hidden="true" />}>
          <SiteHeader />
        </Suspense>
        <div id="content" className="content">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
