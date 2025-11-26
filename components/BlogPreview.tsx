"use client";

const blogPosts = [
    {
        title: "How to Download YouTube Videos in 4K Quality",
        excerpt: "Learn the best methods to download YouTube videos in stunning 4K resolution for offline viewing...",
        category: "Tutorial",
        readTime: "5 min read",
        image: "https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=YouTube+4K",
        href: "/blog/download-youtube-4k"
    },
    {
        title: "TikTok Downloader: Remove Watermark in 2024",
        excerpt: "Complete guide to downloading TikTok videos without watermark using our free tool...",
        category: "Guide",
        readTime: "4 min read",
        image: "https://via.placeholder.com/400x250/EC4899/FFFFFF?text=TikTok+Guide",
        href: "/blog/tiktok-no-watermark"
    },
    {
        title: "Instagram Reels Downloader: Save Reels to Gallery",
        excerpt: "Step-by-step tutorial on how to download Instagram Reels directly to your phone or computer...",
        category: "Tutorial",
        readTime: "3 min read",
        image: "https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Instagram+Reels",
        href: "/blog/instagram-reels-download"
    }
];

export default function BlogPreview() {
    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="heading-md gradient-text mb-2">
                            Latest from Our Blog
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Tips, tutorials, and guides for video downloading
                        </p>
                    </div>
                    <a href="/blog" className="btn-outline hidden md:inline-flex">
                        View All Posts
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <a
                            key={index}
                            href={post.href}
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
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{post.readTime}</span>
                                    <span className="text-primary font-semibold">Read More →</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="text-center mt-8 md:hidden">
                    <a href="/blog" className="btn-outline">
                        View All Posts
                    </a>
                </div>
            </div>
        </section>
    );
}
