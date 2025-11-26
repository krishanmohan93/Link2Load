import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://videodownloaderpro.com';

    const routes = [
        '',
        '/youtube-downloader',
        '/instagram-downloader',
        '/tiktok-downloader',
        '/facebook-downloader',
        '/twitter-downloader',
        '/premium',
        '/blog',
        '/blog/how-to-download-youtube-videos-2025',
        '/blog/best-free-tiktok-downloader',
        '/blog/instagram-reel-downloader-guide',
        '/blog/twitter-video-downloader-online',
        '/blog/youtube-to-mp3-converter',
        '/api-docs',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
