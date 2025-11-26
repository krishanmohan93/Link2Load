import type { Metadata } from "next";
import Link from "next/link";
import VpnBanner from "@/components/VpnBanner";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
    title: "YouTube to MP3 Converter Online – High Quality Audio Download",
    description: "Convert YouTube videos to MP3 audio in 320kbps high quality. Fast, free, and secure YouTube to MP3 converter.",
    alternates: {
        canonical: "https://videodownloaderpro.com/blog/youtube-to-mp3-converter",
    },
    openGraph: {
        title: "YouTube to MP3 Converter Online – High Quality Audio Download",
        description: "Convert YouTube videos to MP3 audio in 320kbps high quality.",
        type: "article",
        publishedTime: "2025-01-19T00:00:00.000Z",
        authors: ["Video Downloader Pro"],
    },
};

export default function Page() {
    return (
        <article className="container-custom py-12 max-w-4xl">
            <header className="mb-8 text-center">
                <div className="text-sm text-primary font-semibold mb-2">Updated: January 2025</div>
                <h1 className="heading-lg mb-6 gradient-text">YouTube to MP3 Converter Online</h1>
                <p className="text-xl text-muted-foreground">
                    Extract high-fidelity audio from music videos, podcasts, and lectures.
                </p>
            </header>

            <div className="prose dark:prose-invert prose-lg max-w-none">
                <p>
                    Sometimes you don't need the video—you just want the audio. Whether it's a new song, a podcast episode, or an ASMR track, <strong>Video Downloader Pro</strong> lets you convert YouTube videos to <strong>MP3</strong> format instantly.
                </p>

                <AdBanner slot="blog-top" />

                <h2>Why Convert to MP3?</h2>
                <ul>
                    <li><strong>Listen Anywhere:</strong> Play on your phone, car, or MP3 player.</li>
                    <li><strong>Save Space:</strong> Audio files are much smaller than video files.</li>
                    <li><strong>Background Play:</strong> Listen with your screen off without paying for Premium.</li>
                </ul>

                <VpnBanner />

                <h2>How to Convert YouTube to MP3</h2>

                <ol>
                    <li>Copy the URL of the YouTube video.</li>
                    <li>Go to <Link href="/" className="text-primary hover:underline">Video Downloader Pro</Link>.</li>
                    <li>Paste the link into the search box.</li>
                    <li>Wait for the formats to load.</li>
                    <li>Look for the <strong>Audio</strong> or <strong>MP3</strong> option and click <strong>Download</strong>.</li>
                </ol>

                <AdBanner slot="blog-middle" />

                <h2>Audio Quality Options</h2>
                <p>
                    We support various bitrates to balance quality and file size:
                </p>
                <ul>
                    <li><strong>320kbps:</strong> Highest quality (CD quality).</li>
                    <li><strong>256kbps:</strong> Great balance for music.</li>
                    <li><strong>128kbps:</strong> Standard quality, good for speech/podcasts.</li>
                </ul>

                <h2>FAQ</h2>

                <div itemScope itemType="https://schema.org/FAQPage">
                    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-4">
                        <h3 itemProp="name" className="text-xl font-bold">Is it free to convert videos?</h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                            <div itemProp="text">
                                Yes, our YouTube to MP3 converter is completely free and unlimited.
                            </div>
                        </div>
                    </div>

                    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-4">
                        <h3 itemProp="name" className="text-xl font-bold">Do I need to install software?</h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                            <div itemProp="text">
                                No, everything works directly in your web browser.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="btn-primary inline-block">
                        Convert to MP3 Now
                    </Link>
                </div>
            </div>
        </article>
    );
}
