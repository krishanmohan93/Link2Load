"use client";

import {
    BoltIcon,
    ShieldCheckIcon,
    CloudArrowDownIcon,
    DevicePhoneMobileIcon,
    SparklesIcon,
    GlobeAltIcon,
    RocketLaunchIcon,
    CpuChipIcon
} from "@heroicons/react/24/outline";

const features = [
    {
        icon: BoltIcon,
        title: "Lightning Fast",
        description: "Download videos in seconds with our optimized servers and CDN network",
        color: "text-yellow-500"
    },
    {
        icon: ShieldCheckIcon,
        title: "100% Secure",
        description: "Your privacy is our priority. No data logging, no tracking, completely anonymous",
        color: "text-green-500"
    },
    {
        icon: CloudArrowDownIcon,
        title: "Cloud Processing",
        description: "Server-side processing means no software installation required",
        color: "text-blue-500"
    },
    {
        icon: DevicePhoneMobileIcon,
        title: "Mobile Friendly",
        description: "Works perfectly on all devices - desktop, tablet, and mobile",
        color: "text-purple-500"
    },
    {
        icon: SparklesIcon,
        title: "No Watermark",
        description: "Download clean videos without any watermarks or branding",
        color: "text-pink-500"
    },
    {
        icon: GlobeAltIcon,
        title: "Multi-Language",
        description: "Available in 20+ languages for users worldwide",
        color: "text-cyan-500"
    },
    {
        icon: RocketLaunchIcon,
        title: "Batch Download",
        description: "Download multiple videos or entire playlists at once",
        color: "text-orange-500"
    },
    {
        icon: CpuChipIcon,
        title: "Smart Detection",
        description: "Automatically detects platform and fetches all available formats",
        color: "text-indigo-500"
    }
];

export default function Features() {
    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="heading-md gradient-text mb-4">
                        Powerful Features
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to download videos from any platform, all in one place
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card-modern card-hover group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
