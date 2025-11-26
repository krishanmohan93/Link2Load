"use client";

const platforms = [
    { name: "YouTube", icon: "🎥", color: "from-red-500 to-red-600", href: "/youtube-downloader" },
    { name: "Instagram", icon: "📸", color: "from-pink-500 to-purple-600", href: "/instagram-downloader" },
    { name: "TikTok", icon: "🎵", color: "from-black to-gray-800", href: "/tiktok-downloader" },
    { name: "Facebook", icon: "👥", color: "from-blue-500 to-blue-600", href: "/facebook-downloader" },
    { name: "Twitter/X", icon: "𝕏", color: "from-sky-400 to-blue-500", href: "/twitter-downloader" },
    { name: "Pinterest", icon: "📌", color: "from-red-600 to-red-700", href: "/pinterest-downloader" },
    { name: "LinkedIn", icon: "💼", color: "from-blue-600 to-blue-700", href: "/linkedin-downloader" },
    { name: "Reddit", icon: "🔴", color: "from-orange-500 to-red-600", href: "/reddit-downloader" },
    { name: "Vimeo", icon: "🎬", color: "from-cyan-500 to-blue-500", href: "/vimeo-downloader" },
];

export default function PlatformGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {platforms.map((platform) => (
                <a
                    key={platform.name}
                    href={platform.href}
                    className="card-modern card-hover group text-center"
                >
                    <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-3xl md:text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        {platform.icon}
                    </div>
                    <h3 className="font-semibold text-sm md:text-base mb-1">{platform.name}</h3>
                    <p className="text-xs text-muted-foreground">Download videos & posts</p>
                </a>
            ))}
        </div>
    );
}
