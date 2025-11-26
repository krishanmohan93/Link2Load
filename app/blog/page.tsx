"use client";

const blogPosts = [
    {
        id: 1,
        title: "How to Download YouTube Videos in 4K Quality - Complete Guide 2024",
        slug: "download-youtube-4k-guide",
        excerpt: "Learn the best methods to download YouTube videos in stunning 4K resolution. This comprehensive guide covers everything from basic downloads to advanced techniques for preserving maximum quality.",
        category: "Tutorial",
        author: "Sarah Johnson",
        date: "2024-01-15",
        readTime: "8 min read",
        image: "https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=YouTube+4K+Guide",
        tags: ["YouTube", "4K", "Tutorial", "Video Quality"]
    },
    {
        id: 2,
        title: "TikTok Video Downloader Without Watermark - 5 Best Methods",
        slug: "tiktok-no-watermark-methods",
        excerpt: "Discover the top 5 methods to download TikTok videos without watermark in 2024. Compare tools, learn pros and cons, and find the best solution for your needs.",
        category: "Guide",
        author: "Mike Chen",
        date: "2024-01-12",
        readTime: "6 min read",
        image: "https://via.placeholder.com/800x450/EC4899/FFFFFF?text=TikTok+No+Watermark",
        tags: ["TikTok", "No Watermark", "Guide", "Social Media"]
    },
    {
        id: 3,
        title: "Instagram Reels Downloader: Save Reels to Your Phone Gallery",
        slug: "instagram-reels-download-tutorial",
        excerpt: "Step-by-step tutorial on downloading Instagram Reels directly to your phone or computer. Works for both public and private accounts you follow.",
        category: "Tutorial",
        author: "Emma Davis",
        date: "2024-01-10",
        readTime: "5 min read",
        image: "https://via.placeholder.com/800x450/F59E0B/FFFFFF?text=Instagram+Reels",
        tags: ["Instagram", "Reels", "Mobile", "Tutorial"]
    },
    {
        id: 4,
        title: "YouTube to MP3 Converter: Best Quality Audio Extraction",
        slug: "youtube-to-mp3-best-quality",
        excerpt: "Convert YouTube videos to MP3 with the highest audio quality. Learn about bitrates, formats, and the best tools for music lovers and podcast enthusiasts.",
        category: "Guide",
        author: "David Martinez",
        date: "2024-01-08",
        readTime: "7 min read",
        image: "https://via.placeholder.com/800x450/10B981/FFFFFF?text=YouTube+to+MP3",
        tags: ["YouTube", "MP3", "Audio", "Conversion"]
    },
    {
        id: 5,
        title: "Facebook Video Downloader: Download HD Videos from Facebook",
        slug: "facebook-video-downloader-hd",
        excerpt: "Complete guide to downloading Facebook videos in HD quality. Learn how to save videos from your feed, groups, and pages.",
        category: "Tutorial",
        author: "Lisa Anderson",
        date: "2024-01-05",
        readTime: "6 min read",
        image: "https://via.placeholder.com/800x450/3B82F6/FFFFFF?text=Facebook+Videos",
        tags: ["Facebook", "HD", "Social Media", "Tutorial"]
    },
    {
        id: 6,
        title: "Twitter Video Downloader: Save Videos and GIFs from X",
        slug: "twitter-video-downloader-guide",
        excerpt: "How to download videos and GIFs from Twitter (X). Simple methods for desktop and mobile users.",
        category: "Guide",
        author: "James Wilson",
        date: "2024-01-03",
        readTime: "4 min read",
        image: "https://via.placeholder.com/800x450/0EA5E9/FFFFFF?text=Twitter+Videos",
        tags: ["Twitter", "X", "Videos", "GIFs"]
    }
];

export default function BlogPage() {
    const categories = ["All", "Tutorial", "Guide", "News", "Tips"];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="hero-bg section-padding">
                <div className="container-custom text-center">
                    <h1 className="heading-xl gradient-text mb-6">
                        Video Download Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Tips, tutorials, and guides for downloading videos from any platform
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section className="section-padding bg-secondary/30">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-6 py-2 rounded-full bg-background hover:bg-primary hover:text-white transition-all duration-300 font-medium"
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Featured Post */}
                    <div className="card-modern overflow-hidden mb-12 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            <img
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                className="w-full h-full object-cover"
                            />
                            <div className="p-8 flex flex-col justify-center">
                                <div className="inline-block mb-4">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                                        Featured Post
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                                <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                    <span>{blogPosts[0].author}</span>
                                    <span>•</span>
                                    <span>{blogPosts[0].date}</span>
                                    <span>•</span>
                                    <span>{blogPosts[0].readTime}</span>
                                </div>
                                <a href={`/blog/${blogPosts[0].slug}`} className="btn-primary inline-flex w-fit">
                                    Read Full Article
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.slice(1).map((post) => (
                            <a
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="card-modern card-hover group overflow-hidden p-0"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-xs font-semibold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{post.author}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-secondary rounded text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <button className="btn-outline">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="section-padding gradient-bg text-white">
                <div className="container-custom max-w-3xl text-center">
                    <h2 className="heading-lg mb-6">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Get the latest tips, tutorials, and updates delivered to your inbox weekly
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="btn-primary bg-white text-purple-600 hover:bg-gray-100 px-8">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-sm mt-4 opacity-75">
                        No spam. Unsubscribe anytime.
                    </p>
                </div>
            </section>
        </div>
    );
}
