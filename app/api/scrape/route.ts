import { NextRequest, NextResponse } from "next/server";
import { UnifiedScraper } from "@/lib/scrapers/unified-scraper";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 30; // requests per minute
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > WINDOW_MS) {
        record.count = 0;
        record.lastReset = now;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    rateLimitMap.set(ip, record);
    return true;
}

export async function POST(req: NextRequest) {
    const startTime = Date.now();

    try {
        // Rate Limiting
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please try again in a minute." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json(
                { error: "URL is required" },
                { status: 400 }
            );
        }

        // Validate URL format
        try {
            new URL(url);
        } catch {
            return NextResponse.json(
                { error: "Invalid URL format" },
                { status: 400 }
            );
        }

        console.log(`[Scrape] Processing: ${url}`);

        // Use UnifiedScraper (proven to work with ytdl-core, etc.)
        const scraper = new UnifiedScraper();

        try {
            const result = await scraper.scrape(url);

            const processingTime = Date.now() - startTime;
            console.log(`[Scrape] Fallback scraper success in ${processingTime}ms`);

            return NextResponse.json({
                ...result,
                success: true,
                processingTime: `${processingTime}ms`,
            });

        } catch (scraperError: any) {
            console.error("[Scrape] Primary scraper failed:", scraperError);

            // Final fallback: Try external API service
            try {
                const fallbackResult = await fallbackToExternalService(url);

                const processingTime = Date.now() - startTime;
                console.log(`[Scrape] Fallback success in ${processingTime}ms`);

                return NextResponse.json({
                    ...fallbackResult,
                    success: true,
                    processingTime: `${processingTime}ms`,
                    usedFallback: true,
                });

            } catch (fallbackError: any) {
                console.error("[Scrape] All methods failed:", fallbackError);

                // Return demo data to prevent complete failure
                return NextResponse.json({
                    success: false,
                    platform: "Unknown",
                    title: "Unable to fetch video",
                    description: "The video could not be fetched. It may be private, restricted, or the platform may be blocking automated access.",
                    thumbnail: "https://via.placeholder.com/640x360/8B5CF6/FFFFFF?text=Video+Unavailable",
                    duration: "0:00",
                    author: "Unknown",
                    views: "0",
                    formats: [],
                    error: scraperError.message,
                }, { status: 200 }); // Return 200 to avoid breaking the UI
            }
        }

    } catch (error: any) {
        console.error("[Scrape] API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process request" },
            { status: 500 }
        );
    }
}

async function fallbackToExternalService(url: string) {
    // Try multiple external services in order
    const services = [
        {
            name: 'SuperFast',
            url: 'https://api.superfastscraper.com/scrape',
            transform: (data: any) => normalizeResponse(data, 'superfast'),
        },
        {
            name: 'AllInOne',
            url: 'https://api.allinonedownloader.com/api/download',
            transform: (data: any) => normalizeResponse(data, 'allinone'),
        },
    ];

    for (const service of services) {
        try {
            const response = await fetch(service.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
                body: JSON.stringify({ url }),
                signal: AbortSignal.timeout(8000), // 8s timeout
            });

            if (response.ok) {
                const data = await response.json();
                return service.transform(data);
            }
        } catch (error) {
            console.warn(`[Fallback] ${service.name} failed:`, error);
            continue;
        }
    }

    throw new Error('All fallback services failed');
}

function normalizeResponse(data: any, source: string) {
    const formats = [];

    // Handle different response formats from various APIs
    if (data.formats && Array.isArray(data.formats)) {
        for (const format of data.formats) {
            formats.push({
                quality: format.quality || format.resolution || format.qualityLabel || 'HD',
                format: format.ext || format.format || 'mp4',
                size: format.filesize ? formatFileSize(format.filesize) : 'Unknown',
                type: (format.vcodec && format.vcodec !== 'none') ? 'video' : 'audio',
                downloadUrl: format.url || format.download_url || '',
            });
        }
    } else if (data.video_url || data.download_url || data.url) {
        // Single video URL
        formats.push({
            quality: data.quality || 'HD',
            format: 'mp4',
            size: data.filesize ? formatFileSize(data.filesize) : 'Unknown',
            type: 'video',
            downloadUrl: data.video_url || data.download_url || data.url,
        });
    }

    return {
        platform: detectPlatformFromUrl(data.webpage_url || data.url || ''),
        title: data.title || 'Video',
        description: data.description || '',
        thumbnail: data.thumbnail || data.image || 'https://via.placeholder.com/640x360',
        duration: formatDuration(data.duration || 0),
        author: data.uploader || data.author || data.channel || 'Unknown',
        views: formatViews(data.view_count || data.views || 0),
        formats: formats.filter(f => f.downloadUrl),
    };
}

function detectPlatformFromUrl(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('reddit.com')) return 'Reddit';
    if (url.includes('pinterest.com')) return 'Pinterest';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    return 'Unknown';
}

function formatViews(views: number | string): string {
    const num = typeof views === 'string' ? parseInt(views) : views;
    if (isNaN(num)) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatFileSize(bytes: number | string): string {
    const size = typeof bytes === 'string' ? parseInt(bytes) : bytes;
    if (isNaN(size)) return 'Unknown';
    if (size >= 1073741824) return (size / 1073741824).toFixed(2) + ' GB';
    if (size >= 1048576) return (size / 1048576).toFixed(2) + ' MB';
    if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
    return size + ' bytes';
}

function formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
}

// Handle OPTIONS for CORS
export async function OPTIONS(req: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
