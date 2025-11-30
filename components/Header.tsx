"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
    SunIcon,
    MoonIcon,
    Bars3Icon,
    XMarkIcon,
    ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "YouTube Downloader", href: "/youtube-downloader" },
        { name: "Instagram Downloader", href: "/instagram-downloader" },
        { name: "TikTok Downloader", href: "/tiktok-downloader" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "API", href: "/api-docs" },
    ];

    return (
        <header className="sticky top-0 z-50 glass-card border-b no-print">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 gradient-bg rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <ArrowDownTrayIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl md:text-2xl font-bold gradient-text">
                                Video Downloader Pro
                            </h1>
                            <p className="text-xs text-muted-foreground">Fast & Free</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-lg hover:bg-secondary transition-colors duration-200"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? (
                                    <SunIcon className="w-5 h-5" />
                                ) : (
                                    <MoonIcon className="w-5 h-5" />
                                )}
                            </button>
                        )}

                        {/* Premium Button */}
                        <Link
                            href="/premium"
                            className="hidden md:inline-flex btn-primary text-sm px-4 py-2"
                        >
                            Go Premium
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border animate-slide-up">
                        <div className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 py-2"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/premium"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn-primary text-sm text-center mt-2"
                            >
                                Go Premium
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
