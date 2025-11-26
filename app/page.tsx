import VideoDownloader from "@/components/VideoDownloader";
import PlatformGrid from "@/components/PlatformGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import BlogPreview from "@/components/BlogPreview";
import Stats from "@/components/Stats";
import AdBanner from "@/components/AdBanner";
import VpnBanner from "@/components/VpnBanner";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm animate-fade-in">
              ✨ The Ultimate Video Downloader
            </div>
            <h1 className="heading-xl mb-6 gradient-text animate-slide-up">
              Download Videos from Any Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Save videos from YouTube, Instagram, TikTok, Facebook, and more in 4K quality. Free, fast, and secure.
            </p>
          </div>

          <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-2 rounded-3xl shadow-2xl pulse-glow">
              <VideoDownloader />
            </div>
          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: "0s" }}></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: "2s" }}></div>
      </section>

      {/* Ad Banner */}
      <div className="container-custom">
        <AdBanner slot="header-ad" />
        <VpnBanner />
      </div>

      {/* Supported Platforms */}
      <section className="container-custom">
        <div className="text-center mb-10">
          <h2 className="heading-md mb-4">Supported Platforms</h2>
          <p className="text-muted-foreground">Download from over 50+ websites and social media platforms</p>
        </div>
        <PlatformGrid />
      </section>

      {/* Features */}
      <Features />

      {/* Stats */}
      <Stats />

      {/* How It Works */}
      <HowItWorks />

      {/* Ad Banner */}
      <div className="container-custom">
        <AdBanner slot="content-ad" />
      </div>

      {/* FAQ */}
      <FAQ />

      {/* Blog Preview */}
      <BlogPreview />

      {/* CTA Section */}
      <section className="container-custom">
        <div className="gradient-bg rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="heading-lg mb-6">Ready to Download?</h2>
            <p className="text-xl mb-8 text-white/90">
              Start downloading your favorite videos in the highest quality available. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScrollToTopButton />
              <Link href="/premium" className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-all">
                View Premium Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
