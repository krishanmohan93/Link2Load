import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Video Downloader Pro",
    description: "Learn about Video Downloader Pro, our mission to provide free and accessible video downloading tools for everyone.",
};

export default function AboutPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
                    About Us
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto bg-card p-8 rounded-2xl border border-border shadow-sm">
                    <p className="lead text-xl text-muted-foreground mb-6">
                        Welcome to Video Downloader Pro, your premier destination for downloading high-quality videos from the web's most popular platforms.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                    <p>
                        At Video Downloader Pro, we believe that content should be accessible. Our mission is to provide a fast, secure, and user-friendly tool that empowers creators, educators, and everyday users to save and share videos offline. We strive to break down the barriers between platforms and users, making video archiving simple and efficient.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">What We Do</h2>
                    <p>
                        We offer a comprehensive suite of downloading tools supporting major social media platforms including YouTube, Instagram, TikTok, Facebook, Twitter (X), and Pinterest. Our technology ensures:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li><strong>High Quality:</strong> Download videos in up to 4K resolution.</li>
                        <li><strong>Speed:</strong> Optimized servers for lightning-fast processing.</li>
                        <li><strong>Security:</strong> No user data is stored; your privacy is our priority.</li>
                        <li><strong>Accessibility:</strong> Completely free to use with no registration required.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Us?</h2>
                    <p>
                        Unlike other downloaders that are cluttered with ads or require software installation, Video Downloader Pro is a purely web-based solution. We focus on a clean user experience (UX) and robust performance. Our team of developers constantly updates our algorithms to stay ahead of platform changes, ensuring reliable service 24/7.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
                    <p>
                        Founded in 2024, Video Downloader Pro started as a small project to help friends save educational content. Recognizing the need for a reliable, all-in-one tool, we expanded our support to multiple platforms and opened our services to the world. Today, we serve thousands of users daily, helping them curate their offline video libraries.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Get in Touch</h2>
                    <p>
                        We love hearing from our users. Whether you have a feature request, a bug report, or just want to say hello, feel free to reach out to us via our <a href="/contact" className="text-primary hover:underline">Contact Page</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
