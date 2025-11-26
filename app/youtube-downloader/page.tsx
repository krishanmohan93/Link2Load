import { Metadata } from "next";
import VideoDownloader from "@/components/VideoDownloader";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
    title: "YouTube Video Downloader - Download YouTube Videos in HD, 4K, MP3",
    description: "Free YouTube video downloader. Download YouTube videos and shorts in HD, 4K, 1080p, 720p or convert to MP3. Fast, free, and no registration required.",
    keywords: [
        "youtube downloader",
        "download youtube videos",
        "youtube to mp4",
        "youtube to mp3",
        "youtube 4k downloader",
        "youtube hd downloader",
        "youtube shorts downloader",
        "save youtube videos"
    ],
    openGraph: {
        title: "YouTube Video Downloader - Free & Fast",
        description: "Download YouTube videos in any quality. Support for 4K, HD, and MP3 conversion.",
    }
};

export default function YouTubeDownloaderPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="hero-bg section-padding">
                <div className="container-custom">
                    <div className="text-center mb-12 animate-slide-up">
                        <div className="inline-block mb-6">
                            <div className="w-20 h-20 mx-auto gradient-bg rounded-2xl flex items-center justify-center text-4xl shadow-2xl">
                                🎥
                            </div>
                        </div>
                        <h1 className="heading-xl gradient-text mb-6">
                            YouTube Video Downloader
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Download YouTube videos and shorts in HD, 4K, or convert to MP3.
                            Fast, free, and works with all YouTube content including music videos, tutorials, and vlogs.
                        </p>
                    </div>

                    <VideoDownloader />
                </div>
            </section>

            {/* Features */}
            <section className="section-padding bg-secondary/30">
                <div className="container-custom">
                    <h2 className="heading-md gradient-text text-center mb-12">
                        Why Choose Our YouTube Downloader?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card-modern">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="font-bold text-xl mb-2">Lightning Fast</h3>
                            <p className="text-muted-foreground">Download YouTube videos in seconds with our optimized servers</p>
                        </div>
                        <div className="card-modern">
                            <div className="text-4xl mb-4">🎬</div>
                            <h3 className="font-bold text-xl mb-2">All Formats</h3>
                            <p className="text-muted-foreground">Support for MP4, WEBM, MP3, M4A in all qualities up to 4K</p>
                        </div>
                        <div className="card-modern">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="font-bold text-xl mb-2">Mobile Friendly</h3>
                            <p className="text-muted-foreground">Works perfectly on iPhone, Android, tablets, and desktops</p>
                        </div>
                        <div className="card-modern">
                            <div className="text-4xl mb-4">🎵</div>
                            <h3 className="font-bold text-xl mb-2">YouTube to MP3</h3>
                            <p className="text-muted-foreground">Convert YouTube videos to high-quality MP3 audio files</p>
                        </div>
                        <div className="card-modern">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="font-bold text-xl mb-2">Playlist Support</h3>
                            <p className="text-muted-foreground">Download entire YouTube playlists with one click</p>
                        </div>
                        <div className="card-modern">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="font-bold text-xl mb-2">100% Safe</h3>
                            <p className="text-muted-foreground">No malware, no tracking, completely secure downloads</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <HowItWorks />

            {/* SEO Content */}
            <section className="section-padding">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h2 className="heading-md gradient-text mb-6">
                            The Best Free YouTube Video Downloader
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            Looking for a reliable way to download YouTube videos? Our YouTube downloader is the perfect solution
                            for saving your favorite videos, music, tutorials, and more for offline viewing. Whether you want to
                            download in 4K, HD, or convert to MP3, we've got you covered.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">Download YouTube Videos in Any Quality</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Our YouTube downloader supports all video qualities available on YouTube, including 144p, 240p, 360p,
                            480p, 720p (HD), 1080p (Full HD), 2K, and 4K (2160p). Simply paste the YouTube URL, and we'll fetch
                            all available download options for you.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">YouTube to MP3 Converter</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Want to extract audio from YouTube videos? Our built-in YouTube to MP3 converter makes it easy to
                            download just the audio track in high quality. Perfect for music, podcasts, and audiobooks.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">Download YouTube Shorts</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            YouTube Shorts are fully supported! Download your favorite short-form videos in the highest quality
                            available. Great for sharing on other platforms or saving for later.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">Is It Legal to Download YouTube Videos?</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Downloading YouTube videos for personal use is generally acceptable, but you must respect copyright
                            laws and YouTube's terms of service. Only download content you have permission to use or that is in
                            the public domain. We recommend using our tool responsibly and ethically.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ />

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Download YouTube Videos",
                        "description": "Step-by-step guide to download YouTube videos in any quality",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Copy YouTube URL",
                                "text": "Go to YouTube and copy the URL of the video you want to download"
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Paste URL",
                                "text": "Paste the YouTube URL into our downloader and click 'Get Video'"
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Choose Quality",
                                "text": "Select your preferred quality from the available options"
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Download",
                                "text": "Click the download button and save the video to your device"
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}
