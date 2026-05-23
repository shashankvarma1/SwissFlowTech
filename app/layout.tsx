import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Swiss Flow Tech — Web & AI Solutions, Hyderabad",
    template: "%s | Swiss Flow Tech",
  },
  description:
    "Swiss Flow Tech builds scalable web applications, AI-powered platforms, and world-class digital products for startups and enterprises. Based in Hyderabad, India.",
  keywords: [
    "web development hyderabad",
    "AI solutions india",
    "Next.js development",
    "startup tech company hyderabad",
    "SaaS development",
    "Swiss Flow Tech",
  ],
  authors: [{ name: "Swiss Flow Tech", url: "www.swissflowtech.com" }],
  creator: "Swiss Flow Tech",
  metadataBase: new URL("https://www.swissflowtech.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.swissflowtech.com",
    siteName: "Swiss Flow Tech",
    title: "Swiss Flow Tech — Web & AI Solutions",
    description:
      "Building scalable web apps, AI platforms, and digital experiences. Based in Hyderabad, India.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Swiss Flow Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiss Flow Tech — Web & AI Solutions",
    description:
      "Building scalable web apps, AI platforms, and digital experiences. Based in Hyderabad, India.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}