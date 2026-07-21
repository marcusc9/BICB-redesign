import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "lenis/dist/lenis.css";
import "@/app/globals.css";
import { ScrollExperience } from "@/components/scroll-experience";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap"
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.communitybuildingmcr.co.uk"),
  title: {
    default: `${site.name} - Manchester`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  openGraph: {
    title: `${site.name} - Manchester`,
    description: site.description,
    siteName: site.name,
    locale: "en_GB",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <ScrollExperience />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
