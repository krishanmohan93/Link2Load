import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Video Downloader Pro - Download Videos from YouTube, Instagram, TikTok & More",
  description: "Free online video downloader for YouTube, Instagram, TikTok, Facebook, Twitter, Pinterest, LinkedIn. Download videos in HD, 4K, or convert to MP3. Fast, free, and secure.",
  keywords: "video downloader, youtube downloader, instagram downloader, tiktok downloader, facebook downloader, mp3 converter, 4k video downloader",
  authors: [{ name: "Video Downloader Pro" }],
  creator: "Video Downloader Pro",
  publisher: "Video Downloader Pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://videodownloaderpro.com",
    title: "Video Downloader Pro - All-in-One Video Downloader",
    description: "Download videos from YouTube, Instagram, TikTok, and more in high quality. No software required.",
    siteName: "Video Downloader Pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Video Downloader Pro Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Downloader Pro - All-in-One Video Downloader",
    description: "Download videos from YouTube, Instagram, TikTok, and more in high quality.",
    images: ["/twitter-image.png"],
    creator: "@videodownloader",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Video Downloader Pro",
              "url": "https://videodownloaderpro.com",
              "description": "Free online tool to download videos from YouTube, Instagram, TikTok, and more.",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
            }),
          }}
        />
        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-placeholder'}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
