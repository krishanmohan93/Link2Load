import { BaseScraper, ScraperResult, VideoFormat } from './base-scraper';

export class YouTubeScraper extends BaseScraper {
    private readonly API_ENDPOINTS = [
        'https://www.youtube.com/youtubei/v1/player',
        'https://www.youtube.com/get_video_info',
    ];

    async scrape(url: string): Promise<ScraperResult> {
        const videoId = this.extractVideoId(url);
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        // Try multiple methods in order
        const methods = [
            () => this.scrapeWithYouTubei(videoId),
            () => this.scrapeWithGetVideoInfo(videoId),
            () => this.scrapeWithEmbed(videoId),
        ];

        for (const method of methods) {
            try {
                const result = await method();
                if (result && result.formats.length > 0) {
                    return result;
                }
            } catch (error) {
                console.warn('YouTube scrape method failed:', error);
                continue;
            }
        }

        throw new Error('All YouTube scraping methods failed');
    }

    private extractVideoId(url: string): string | null {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
            /youtube\.com\/embed\/([^&\n?#]+)/,
            /youtube\.com\/v\/([^&\n?#]+)/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }

        return null;
    }

    private async scrapeWithYouTubei(videoId: string): Promise<ScraperResult> {
        const response = await this.fetchWithRetry(this.API_ENDPOINTS[0], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-YouTube-Client-Name': '1',
                'X-YouTube-Client-Version': '2.20231219.04.00',
            },
            body: JSON.stringify({
                videoId,
                context: {
                    client: {
                        clientName: 'WEB',
                        clientVersion: '2.20231219.04.00',
                    },
                },
            }),
        });

        const data = await response.json();
        return this.parseYouTubeiResponse(data, videoId);
    }

    private async scrapeWithGetVideoInfo(videoId: string): Promise<ScraperResult> {
        const url = `${this.API_ENDPOINTS[1]}?video_id=${videoId}`;
        const response = await this.fetchWithRetry(url);
        const text = await response.text();
        const params = new URLSearchParams(text);

        const playerResponse = JSON.parse(params.get('player_response') || '{}');
        return this.parseYouTubeiResponse(playerResponse, videoId);
    }

    private async scrapeWithEmbed(videoId: string): Promise<ScraperResult> {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const response = await this.fetchWithRetry(embedUrl);
        const html = await response.text();

        // Extract player config from embed page
        const configMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
        if (!configMatch) {
            throw new Error('Could not extract player config');
        }

        const playerResponse = JSON.parse(configMatch[1]);
        return this.parseYouTubeiResponse(playerResponse, videoId);
    }

    private parseYouTubeiResponse(data: any, videoId: string): ScraperResult {
        const videoDetails = data.videoDetails || {};
        const streamingData = data.streamingData || {};

        const formats: VideoFormat[] = [];

        // Process adaptive formats (video + audio separate)
        const adaptiveFormats = streamingData.adaptiveFormats || [];
        const videoFormats = adaptiveFormats.filter((f: any) => f.mimeType?.includes('video'));
        const audioFormats = adaptiveFormats.filter((f: any) => f.mimeType?.includes('audio'));

        // Add video formats
        for (const format of videoFormats) {
            const quality = format.qualityLabel || format.quality || 'Unknown';
            const url = format.url || this.decipherUrl(format);

            if (url) {
                formats.push({
                    quality,
                    format: 'mp4',
                    size: this.formatFileSize(parseInt(format.contentLength || '0')),
                    type: 'video',
                    downloadUrl: url,
                });
            }
        }

        // Add audio formats
        for (const format of audioFormats.slice(0, 2)) { // Top 2 audio qualities
            const quality = format.audioQuality || 'High Quality';
            const url = format.url || this.decipherUrl(format);

            if (url) {
                formats.push({
                    quality,
                    format: format.mimeType?.includes('webm') ? 'webm' : 'm4a',
                    size: this.formatFileSize(parseInt(format.contentLength || '0')),
                    type: 'audio',
                    downloadUrl: url,
                });
            }
        }

        // Process combined formats (video + audio)
        const combinedFormats = streamingData.formats || [];
        for (const format of combinedFormats) {
            const quality = format.qualityLabel || format.quality || 'Unknown';
            const url = format.url || this.decipherUrl(format);

            if (url) {
                formats.push({
                    quality,
                    format: 'mp4',
                    size: this.formatFileSize(parseInt(format.contentLength || '0')),
                    type: 'video',
                    downloadUrl: url,
                });
            }
        }

        return {
            title: videoDetails.title || 'YouTube Video',
            duration: this.formatDuration(parseInt(videoDetails.lengthSeconds || '0')),
            thumbnail: videoDetails.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            author: videoDetails.author || 'Unknown',
            views: this.formatViews(parseInt(videoDetails.viewCount || '0')),
            description: videoDetails.shortDescription || '',
            platform: 'YouTube',
            formats: this.deduplicateFormats(formats),
        };
    }

    private decipherUrl(format: any): string | null {
        // If URL is directly available
        if (format.url) return format.url;

        // If signatureCipher is present, we need to decipher it
        // For production, you'd implement full signature decryption
        // For now, return null and rely on other methods
        if (format.signatureCipher || format.cipher) {
            console.warn('Signature cipher detected - requires decryption');
            return null;
        }

        return null;
    }

    private deduplicateFormats(formats: VideoFormat[]): VideoFormat[] {
        const seen = new Set<string>();
        return formats.filter(format => {
            const key = `${format.quality}-${format.type}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }
}
