import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircleIcon, UserGroupIcon, GlobeAltIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
    title: "About Us - Video Downloader Pro",
    description: "Learn about Video Downloader Pro, our mission, our team, and why we are the best free video downloader on the web.",
    openGraph: {
        title: "About Us - Video Downloader Pro",
        description: "Discover the story behind Video Downloader Pro.",
        url: "https://videodownloaderpro.com/about",
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                        About Video Downloader Pro
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        We are on a mission to make content accessible to everyone, everywhere. Fast, free, and secure.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            At Video Downloader Pro, we believe that the internet is a vast library of knowledge, entertainment, and creativity. However, access to this content is often restricted by platform limitations or connectivity issues.
                        </p>
                        <p className="text-lg text-muted-foreground mb-4">
                            Our mission is to bridge this gap by providing a robust, user-friendly, and completely free tool that empowers users to save and enjoy their favorite videos offline. Whether it's an educational tutorial, a music video, or a funny clip, we ensure you can keep it forever.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <CheckCircleIcon className="w-6 h-6" />
                                <span>100% Free</span>
                            </div>
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <CheckCircleIcon className="w-6 h-6" />
                                <span>No Registration</span>
                            </div>
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <CheckCircleIcon className="w-6 h-6" />
                                <span>Unlimited Downloads</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
                        <GlobeAltIcon className="w-32 h-32 text-primary opacity-80" />
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center">Why Choose Video Downloader Pro?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                                <ShieldCheckIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
                            <p className="text-muted-foreground">
                                We prioritize your privacy. We do not store any user data, download history, or personal information. Our service is encrypted and safe to use.
                            </p>
                        </div>
                        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                                <GlobeAltIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">All Platforms Supported</h3>
                            <p className="text-muted-foreground">
                                From YouTube and Instagram to TikTok and Twitter, we support downloading from over 50+ popular websites and social media platforms.
                            </p>
                        </div>
                        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                                <UserGroupIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">User-Centric Design</h3>
                            <p className="text-muted-foreground">
                                We built our tool with you in mind. No annoying pop-ups, no complicated steps. Just paste the link and download.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="prose prose-lg dark:prose-invert mx-auto bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p>
                        Founded in 2024, Video Downloader Pro started as a passion project by a group of tech enthusiasts who were frustrated with the existing video downloading tools. Most were filled with intrusive ads, malware risks, or required expensive subscriptions.
                    </p>
                    <p>
                        We decided to build something better. A tool that we would want to use ourselves. We focused on speed, simplicity, and safety. What began as a simple script for personal use quickly grew into a full-fledged web application serving thousands of users daily.
                    </p>
                    <p>
                        Today, Video Downloader Pro is a trusted name in the online video downloading space. We are constantly updating our algorithms to stay ahead of platform changes and ensure that our users always have the best experience possible.
                    </p>

                    <h3 className="text-2xl font-bold mt-8 mb-4">Our Commitment</h3>
                    <p>
                        We are committed to keeping Video Downloader Pro free forever. We support the project through non-intrusive advertising (AdSense) to cover server costs and development time. We promise to never compromise on user experience or privacy.
                    </p>
                </div>
            </div>
        </div>
    );
}
