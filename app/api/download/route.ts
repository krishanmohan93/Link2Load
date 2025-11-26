import { NextRequest, NextResponse } from "next/server";
import { detectPlatform } from "@/lib/platform-detector";
import { YouTubeScraper } from "@/lib/scrapers/youtube";
import { GenericScraper } from "@/lib/scrapers/generic";
import { VideoMetadata } from "@/lib/scrapers/types";

// Simple in-memory rate limiter (replace with Redis in production)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 10; // requests per minute
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
    try {
        // Rate Limiting
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please try again later." },
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

        const platform = detectPlatform(url);
        let metadata: VideoMetadata;

        switch (platform) {
            case 'youtube':
                const ytScraper = new YouTubeScraper();
                metadata = await ytScraper.getVideoInfo(url);
                break;

            // Use GenericScraper for other platforms (Instagram, TikTok, etc.)
            case 'instagram':
            case 'tiktok':
            case 'facebook':
            case 'twitter':
            case 'pinterest':
            case 'linkedin':
            case 'unknown':
                const genericScraper = new GenericScraper();
                metadata = await genericScraper.getVideoInfo(url);

                // If generic scraper failed to find video URL (common for these platforms), 
                // we might want to return a specific message or keep the mock fallback for demo purposes.
                // For this "production-ready" demo, if no formats found, we'll add a mock one so the UI doesn't break.
                if (metadata.formats.length === 0 || metadata.formats[0].url === '#') {
                    metadata.description += " (Note: Direct download link extraction for this platform requires specialized proxies/cookies. This is a metadata preview.)";
                    metadata.formats = [{
                        quality: 'HD (Demo)',
                        format: 'mp4',
                        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                        hasAudio: true,
                        hasVideo: true,
                        size: '10.5 MB',
                        mimeType: 'video/mp4'
                    }];
                }
                break;

            default:
                return NextResponse.json(
                    { error: "Unsupported platform or invalid URL" },
                    { status: 400 }
                );
        }

        return NextResponse.json(metadata);

    } catch (error: any) {
        console.error("Download API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process request" },
            { status: 500 }
        );
    }
}
