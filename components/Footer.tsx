"use client";

import Link from "next/link";
import {
    ArrowDownTrayIcon,
    EnvelopeIcon,
    HeartIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const platformLinks = [
        { name: "YouTube Downloader", href: "/youtube-downloader" },
        { name: "Instagram Downloader", href: "/instagram-downloader" },
        { name: "TikTok Downloader", href: "/tiktok-downloader" },
        { name: "Facebook Downloader", href: "/facebook-downloader" },
        { name: "Twitter Downloader", href: "/twitter-downloader" },
        { name: "Pinterest Downloader", href: "/pinterest-downloader" },
    ];

    const resourceLinks = [
        { name: "Blog", href: "/blog" },
        { name: "API Documentation", href: "/api-docs" },
        { name: "Chrome Extension", href: "/extension" },
        { name: "How to Use", href: "/how-to-use" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
    ];

    const legalLinks = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "DMCA", href: "/dmca" },
        { name: "Cookie Policy", href: "/cookies" },
    ];

    return (
        <footer className="bg-secondary/30 border-t border-border no-print">
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-4 group">
                            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <ArrowDownTrayIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold gradient-text">
                                    Video Downloader Pro
                                </h3>
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            Free, fast, and secure video downloader for all major platforms.
                            Download videos in HD, 4K, or convert to MP3.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300">
                                <span className="text-xl">𝕏</span>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300">
                                <span className="text-xl">f</span>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300">
                                <span className="text-xl">📷</span>
                            </a>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Downloaders</h4>
                        <ul className="space-y-2">
                            {platformLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resource Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get the latest updates and tips delivered to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button className="p-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity">
                                <EnvelopeIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            © {currentYear} Video Downloader Pro. Made with <HeartIcon className="w-4 h-4 text-red-500" /> for video lovers
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                        <strong>Disclaimer:</strong> Video Downloader Pro is not affiliated with YouTube, Instagram, TikTok, Facebook, or any other platform.
                        Users are responsible for respecting copyright laws and platform terms of service.
                        Download content only if you have the right to do so.
                    </p>
                </div>
            </div>
        </footer>
    );
}
