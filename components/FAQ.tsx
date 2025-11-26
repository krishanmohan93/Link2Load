"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
    {
        question: "Is Video Downloader Pro completely free to use?",
        answer: "Yes! Video Downloader Pro is 100% free. You can download unlimited videos without any subscription or payment. We offer a premium plan with additional features like faster downloads and ad-free experience, but the core functionality is always free."
    },
    {
        question: "Which platforms are supported?",
        answer: "We support all major platforms including YouTube, Instagram, TikTok, Facebook, Twitter/X, Pinterest, LinkedIn, Reddit, Vimeo, and many more. Our smart detection automatically identifies the platform and fetches available download options."
    },
    {
        question: "What video qualities are available for download?",
        answer: "We offer all available qualities from 144p to 4K (2160p), including 240p, 360p, 480p, 720p, 1080p, and 2K. The available qualities depend on the original video upload. You can also convert videos to MP3, M4A, or WEBM formats."
    },
    {
        question: "Can I download TikTok videos without watermark?",
        answer: "Yes! Our TikTok downloader removes the watermark automatically, giving you clean videos ready to share or repost. This feature works for all TikTok videos and is completely free."
    },
    {
        question: "Is it legal to download videos?",
        answer: "Downloading videos for personal use is generally acceptable, but you must respect copyright laws and platform terms of service. Only download content you have permission to use or that is in the public domain. We are not responsible for how users utilize downloaded content."
    },
    {
        question: "Do I need to install any software?",
        answer: "No installation required! Video Downloader Pro is a web-based tool that works directly in your browser. Simply paste the URL and download - it's that simple. We also offer a Chrome extension for even faster downloads."
    },
    {
        question: "Can I download YouTube playlists?",
        answer: "Yes! Our batch downloader feature allows you to download entire YouTube playlists or multiple videos at once. Simply paste the playlist URL and select which videos you want to download."
    },
    {
        question: "How do I convert YouTube videos to MP3?",
        answer: "After pasting your YouTube URL and clicking 'Get Video', scroll down to the audio formats section. You'll find MP3, M4A, and other audio formats available for download. Select your preferred quality and click download."
    },
    {
        question: "Is my data safe and private?",
        answer: "Absolutely! We don't store any of your data, URLs, or downloaded videos on our servers. All processing happens in real-time, and we don't track your activity. Your privacy is our top priority."
    },
    {
        question: "Can I use this on mobile devices?",
        answer: "Yes! Video Downloader Pro is fully responsive and works perfectly on all devices including smartphones, tablets, and desktops. You can also install our PWA (Progressive Web App) for an app-like experience."
    },
    {
        question: "Why is my download slow?",
        answer: "Download speed depends on your internet connection, video size, and server load. Premium users get access to faster servers with priority processing. For free users, downloads may take slightly longer during peak hours."
    },
    {
        question: "Can I download Instagram Reels and Stories?",
        answer: "Yes! You can download Instagram Reels, Stories, IGTV videos, and regular posts. For Stories, make sure they're still available (within 24 hours) or saved as Highlights. Private accounts require you to be logged in and following the account."
    },
    {
        question: "What's the maximum video length I can download?",
        answer: "There's no strict limit on video length. However, very long videos (over 2 hours) may take longer to process. Premium users can download videos of any length with faster processing."
    },
    {
        question: "Do you offer an API for developers?",
        answer: "Yes! We provide a RESTful API for developers who want to integrate video downloading functionality into their applications. Check our API documentation page for details, pricing, and usage limits."
    },
    {
        question: "How can I download Facebook private videos?",
        answer: "For private Facebook videos, you need to be logged into Facebook and have permission to view the video. Our tool can then access and download it. We cannot download videos from private accounts you don't have access to."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="section-padding">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="heading-md gradient-text mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know about Video Downloader Pro
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="card-modern overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between gap-4 text-left p-6"
                            >
                                <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                                <ChevronDownIcon
                                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-6 pb-6">
                                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Schema Markup for FAQ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(faq => ({
                                "@type": "Question",
                                "name": faq.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.answer
                                }
                            }))
                        })
                    }}
                />
            </div>
        </section>
    );
}
