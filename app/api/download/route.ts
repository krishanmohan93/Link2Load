import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getYtDlp } from "@/lib/ytdlp";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 20; // requests per minute
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

// Generate safe filename
function generateFilename(title: string, quality: string, format: string): string {
    const safeTitle = title
        .substring(0, 50)
        .replace(/[^a-z0-9\s\-_]/gi, '')
        .replace(/\s+/g, '_')
        .trim() || 'video';

    const safeQuality = quality.replace(/[^a-z0-9]/gi, '_');
    const safeFormat = format.toLowerCase().replace(/[^a-z0-9]/gi, '');

    return `${safeTitle}_${safeQuality}.${safeFormat}`;
}

export async function POST(req: NextRequest) {
    try {
        // Rate Limiting
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { url, quality, fileUrl, title, format } = body;

        if (!url) {
            return NextResponse.json(
                { error: "URL is required" },
                { status: 400 }
            );
        }

        console.log(`[Download API] Processing: ${url}`);

        let downloadUrl = fileUrl;
        let videoTitle = title || 'video';
        let videoFormat = format || 'mp4';

        // If no fileUrl, we need to fetch it using yt-dlp
        if (!downloadUrl) {
            console.log('[Download API] No fileUrl provided, fetching with yt-dlp...');
            const ytDlp = await getYtDlp();
            const metadata = await ytDlp.getVideoInfo(url);

            videoTitle = metadata.title;

            // Find best format
            const formats = metadata.formats;
            let selectedFormat;

            if (quality) {
                selectedFormat = formats.find((f: any) =>
                    (f.format_note === quality || f.format_id === quality) && f.acodec !== 'none'
                );
            }

            if (!selectedFormat) {
                // Fallback to best video+audio
                selectedFormat = formats.reverse().find((f: any) => f.vcodec !== 'none' && f.acodec !== 'none');
            }

            if (selectedFormat) {
                downloadUrl = selectedFormat.url;
                videoFormat = selectedFormat.ext;
                console.log(`[Download API] Found format via yt-dlp: ${selectedFormat.format_note}`);
            }
        }

        if (!downloadUrl) {
            return NextResponse.json(
                { error: "Could not find download URL" },
                { status: 404 }
            );
        }

        console.log(`[Download API] Downloading from: ${downloadUrl.substring(0, 50)}...`);

        // Stream the file
        const response = await axios.get(downloadUrl, {
            responseType: 'arraybuffer',
            timeout: 60000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            maxRedirects: 5,
            validateStatus: (status) => status >= 200 && status < 400,
        });

        const buffer = Buffer.from(response.data);
        const filename = generateFilename(videoTitle, quality || 'HD', videoFormat);
        const mimeType = response.headers['content-type'] || 'video/mp4';

        console.log(`[Download API] Success: ${filename} (${buffer.length} bytes)`);

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": mimeType,
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": buffer.length.toString(),
                "Cache-Control": "no-store, no-cache, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });

    } catch (error: any) {
        console.error("[Download API] Error:", error.message);
        return NextResponse.json(
            { error: "Failed to download file", details: error.message },
            { status: 500 }
        );
    }
}

export async function OPTIONS(req: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
