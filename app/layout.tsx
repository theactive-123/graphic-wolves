import type { Metadata } from "next";
import Script from "next/script";
import ScrollChatVisibility from "@/components/layout/ScrollChatVisibility";
import "./globals.css";
import BackToTopButton from "@/components/layout/BackToTopButton/BackToTopButton";
import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll";
export const metadata: Metadata = {
  // IMPORTANT: change this to your real production domain.
  metadataBase: new URL("https://graphicwolves.com"),

  title: {
    default: "Top Design & Development Agency | Graphic Wolves",
    template: "%s | Graphic Wolves",
  },

  description:
    "Elevate your brand with a top design & development agency. Graphic Wolves delivers standout graphic design, branding, and website development services.",

  keywords: [
    "Graphic Wolves",
    "branding",
    "web development",
    "e-commerce",
    "creative agency",
  ],

  robots: {
    index: true,
    follow: true,
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Graphic Wolves",
  description:
    "Creative agency for branding, development and e-commerce.",
  sameAs: [
    "https://www.facebook.com/graphicwolves",
    "https://www.instagram.com/graphic_wolves",
    "https://x.com/graphicwolves",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/borscha-typeface/Borscha-Regular-BF69c8e64155413.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <Script
          id="crm-source-tracking"
          src={new URL('/crm-source.js', process.env.CRM_BASE_URL || 'https://the-active-solutions.vercel.app').href}
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FJNDHD2F27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FJNDHD2F27');
          `}
        </Script>
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {};
            var Tawk_LoadStart = new Date();
            function syncTawkVisibility() {
              if (document.documentElement.dataset.chatVisible === "true") {
                Tawk_API.showWidget();
              } else {
                Tawk_API.hideWidget();
              }
            }
            Tawk_API.onBeforeLoad = syncTawkVisibility;
            Tawk_API.onLoad = syncTawkVisibility;
            (function() {
              var s1 = document.createElement("script");
              var s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/61747e9bf7c0440a591fafb4/1fingt435";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>

        {/* Global Lenis Smooth Scroll */}
        <SmoothScroll />
        <BackToTopButton />
        <ScrollChatVisibility />

        {children}
      </body>
    </html>
  );
}