import { NextRequest, NextResponse } from "next/server";

// Rate limiter
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
        const { url, filename, quality } = body;

        if (!url) {
            return NextResponse.json(
                { error: "Download URL is required" },
                { status: 400 }
            );
        }

        // Validate URL
        try {
            new URL(url);
        } catch {
            return NextResponse.json(
                { error: "Invalid download URL" },
                { status: 400 }
            );
        }

        console.log(`[Download] Fetching: ${url}`);

        // Fetch the file from the source
        // Fetch the file from the source with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout for source fetch

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': new URL(url).origin,
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'cross-site',
                'Upgrade-Insecure-Requests': '1',
            },
            // @ts-ignore - Next.js supports this
            redirect: 'follow',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`[Download] Failed: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: `Failed to fetch file: ${response.statusText}` },
                { status: response.status }
            );
        }

        // Get the content type
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const contentLength = response.headers.get('content-length');

        // Stream the response
        const blob = await response.blob();

        // Create response with proper headers
        const headers = new Headers();
        headers.set('Content-Type', contentType);
        headers.set('Content-Disposition', `attachment; filename="${filename || 'download'}"`);

        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        // CORS headers
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type');

        console.log(`[Download] Success: ${filename} (${contentType})`);

        return new NextResponse(blob, {
            status: 200,
            headers,
        });

    } catch (error: any) {
        console.error("[Download] Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to download file" },
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
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
