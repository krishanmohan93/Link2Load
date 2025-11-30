import { NextRequest, NextResponse } from "next/server";

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

// Detect platform from URL
function detectPlatform(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('facebook.com') || url.includes('fb.watch')) return 'Facebook';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X';
    if (url.includes('reddit.com') || url.includes('redd.it')) return 'Reddit';
    if (url.includes('pinterest.com')) return 'Pinterest';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('sharechat.com')) return 'ShareChat';
    if (url.includes('moj.com')) return 'Moj';
    if (url.includes('chingari.io')) return 'Chingari';
    return 'Unknown';
}

// Format file size
function formatFileSize(bytes: number | string | undefined): string {
    if (!bytes) return 'Unknown';
    const size = typeof bytes === 'string' ? parseInt(bytes) : bytes;
    if (isNaN(size)) return 'Unknown';
    if (size >= 1073741824) return (size / 1073741824).toFixed(2) + ' GB';
    if (size >= 1048576) return (size / 1048576).toFixed(2) + ' MB';
    if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
    return size + ' bytes';
}

// Format duration
function formatDuration(seconds: number | string | undefined): string {
    if (!seconds) return '0:00';
    const sec = typeof seconds === 'string' ? parseInt(seconds) : seconds;
    if (isNaN(sec)) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
}

// Format views
function formatViews(views: number | string | undefined): string {
    if (!views) return '0';
    const num = typeof views === 'string' ? parseInt(views) : views;
    if (isNaN(num)) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

export async function GET(req: NextRequest) {
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

        // Get URL from query params
        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json(
                { error: "URL parameter is required" },
                { status: 400 }
            );
        }

        // Validate URL format
        try {
            new URL(url);
        } catch {
            return NextResponse.json(
                { error: "Invalid URL format. Please provide a valid video URL." },
                { status: 400 }
            );
        }

        console.log(`[Info API] Processing: ${url}`);

        // Call the Super-Fast Scraper API
        const scraperApiUrl = `https://antigravity-api.vercel.app/api/scrape?url=${encodeURIComponent(url)}`;

        const response = await fetch(scraperApiUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            signal: AbortSignal.timeout(15000), // 15s timeout
        });

        if (!response.ok) {
            throw new Error(`Scraper API returned status ${response.status}`);
        }

        const data = await response.json();

        // Check if scraper returned an error
        if (data.error || !data.success) {
            throw new Error(data.error || 'Failed to fetch video information');
        }

        // Transform the API response to match our frontend format
        const formats: any[] = [];

        // Process media array if available
        if (data.media && Array.isArray(data.media)) {
            // Sort by quality (highest first)
            const sortedMedia = [...data.media].sort((a, b) => {
                const qualityOrder: any = {
                    '2160p': 5, '4K': 5,
                    '1440p': 4, '2K': 4,
                    '1080p': 3, 'FHD': 3,
                    '720p': 2, 'HD': 2,
                    '480p': 1, 'SD': 1,
                    '360p': 0,
                };
                const aQuality = qualityOrder[a.quality] || -1;
                const bQuality = qualityOrder[b.quality] || -1;
                return bQuality - aQuality;
            });

            for (const item of sortedMedia) {
                if (item.url) {
                    formats.push({
                        quality: item.quality || 'HD',
                        format: item.extension || item.ext || 'mp4',
                        size: formatFileSize(item.size || item.filesize),
                        type: item.type === 'audio' ? 'audio' : 'video',
                        downloadUrl: item.url,
                    });
                }
            }
        }

        // Fallback: If no media array, check for direct video/audio URLs
        if (formats.length === 0) {
            if (data.video_url || data.videoUrl || data.url) {
                formats.push({
                    quality: data.quality || 'HD',
                    format: 'mp4',
                    size: formatFileSize(data.filesize || data.size),
                    type: 'video',
                    downloadUrl: data.video_url || data.videoUrl || data.url,
                });
            }

            if (data.audio_url || data.audioUrl) {
                formats.push({
                    quality: 'Audio',
                    format: 'mp3',
                    size: formatFileSize(data.audio_size || data.audioSize),
                    type: 'audio',
                    downloadUrl: data.audio_url || data.audioUrl,
                });
            }
        }

        // If still no formats, return error
        if (formats.length === 0) {
            return NextResponse.json(
                { error: "No download formats found for this video. The video may be private or restricted." },
                { status: 404 }
            );
        }

        const processingTime = Date.now() - startTime;
        console.log(`[Info API] Success in ${processingTime}ms - Found ${formats.length} formats`);

        // Return normalized response
        return NextResponse.json({
            success: true,
            platform: data.platform || detectPlatform(url),
            title: data.title || 'Video',
            description: data.description || '',
            thumbnail: data.thumbnail || data.image || 'https://via.placeholder.com/640x360/8B5CF6/FFFFFF?text=Video',
            duration: formatDuration(data.duration),
            author: data.author || data.uploader || data.channel || 'Unknown',
            views: formatViews(data.views || data.view_count),
            formats: formats,
            processingTime: `${processingTime}ms`,
        });

    } catch (error: any) {
        console.error("[Info API] Error:", error);

        // Return user-friendly error messages
        let errorMessage = "Failed to fetch video information. Please try again.";

        if (error.message.includes('timeout') || error.name === 'AbortError') {
            errorMessage = "Request timeout. The server is taking too long to respond. Please try again.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            errorMessage = "Network error. Please check your internet connection and try again.";
        } else if (error.message.includes('Unsupported platform')) {
            errorMessage = "Unsupported platform. This video source is not supported yet.";
        } else if (error.message.includes('private') || error.message.includes('restricted')) {
            errorMessage = "This video is private or restricted and cannot be downloaded.";
        }

        return NextResponse.json(
            { error: errorMessage, details: error.message },
            { status: 500 }
        );
    }
}

// Handle OPTIONS for CORS
export async function OPTIONS(req: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
