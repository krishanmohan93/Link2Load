/**
 * Download Helper - Fetches actual file data from download URLs
 * Returns buffer, filename, and MIME type for direct download
 */

export interface DownloadResult {
    buffer: Buffer;
    filename: string;
    mime: string;
}

export async function fetchFileAsBuffer(
    downloadUrl: string,
    defaultFilename: string = 'video.mp4'
): Promise<DownloadResult> {
    try {
        console.log(`[DownloadHelper] Fetching file from: ${downloadUrl}`);

        // Fetch the file with proper headers
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

        const urlObj = new URL(downloadUrl);
        const origin = `${urlObj.protocol}//${urlObj.hostname}`;

        const response = await fetch(downloadUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'identity',
                'Origin': origin,
                'Referer': origin + '/',
                'Sec-Fetch-Dest': 'video',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Range': 'bytes=0-', // Support partial content
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`[DownloadHelper] HTTP Error: ${response.status} ${response.statusText}`);
            console.error(`[DownloadHelper] URL: ${downloadUrl}`);
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }

        // Get MIME type from response
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const mime = contentType.split(';')[0].trim();

        // Extract filename from Content-Disposition header or URL
        let filename = defaultFilename;
        const contentDisposition = response.headers.get('content-disposition');

        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1].replace(/['"]/g, '');
            }
        } else {
            // Extract from URL
            const urlPath = new URL(downloadUrl).pathname;
            const urlFilename = urlPath.split('/').pop();
            if (urlFilename && urlFilename.includes('.')) {
                filename = urlFilename;
            }
        }

        // Ensure filename has correct extension based on MIME type
        filename = ensureCorrectExtension(filename, mime);

        // Convert response to buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`[DownloadHelper] Success: ${filename} (${mime}, ${buffer.length} bytes)`);

        return {
            buffer,
            filename,
            mime,
        };

    } catch (error: any) {
        console.error('[DownloadHelper] Error:', error);

        // Provide more specific error messages
        if (error.name === 'AbortError') {
            throw new Error('Download timeout - file too large or connection too slow');
        }

        throw new Error(`Failed to download file: ${error.message}`);
    }
}

/**
 * Ensure filename has the correct extension based on MIME type
 */
function ensureCorrectExtension(filename: string, mime: string): string {
    const mimeToExt: Record<string, string> = {
        'video/mp4': 'mp4',
        'video/webm': 'webm',
        'video/quicktime': 'mov',
        'video/x-msvideo': 'avi',
        'video/x-matroska': 'mkv',
        'audio/mpeg': 'mp3',
        'audio/mp4': 'm4a',
        'audio/webm': 'webm',
        'audio/wav': 'wav',
        'audio/ogg': 'ogg',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
    };

    const expectedExt = mimeToExt[mime];
    if (!expectedExt) return filename;

    const currentExt = filename.split('.').pop()?.toLowerCase();

    // If filename already has the correct extension, return as-is
    if (currentExt === expectedExt) return filename;

    // Remove current extension if it exists and add the correct one
    const baseName = filename.includes('.')
        ? filename.substring(0, filename.lastIndexOf('.'))
        : filename;

    return `${baseName}.${expectedExt}`;
}

/**
 * Detect MIME type from file extension
 */
export function getMimeFromExtension(ext: string): string {
    const extToMime: Record<string, string> = {
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'mov': 'video/quicktime',
        'avi': 'video/x-msvideo',
        'mkv': 'video/x-matroska',
        'mp3': 'audio/mpeg',
        'm4a': 'audio/mp4',
        'wav': 'audio/wav',
        'ogg': 'audio/ogg',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
    };

    return extToMime[ext.toLowerCase()] || 'application/octet-stream';
}
