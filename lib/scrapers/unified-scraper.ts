import { ScraperResult } from './base-scraper';
import { YouTubeScraper } from './youtube-scraper';
import { TikTokScraper } from './tiktok-scraper';
import { InstagramScraper } from './instagram-scraper';

// Interface for scrapers
interface IScraper {
    scrape(url: string): Promise<ScraperResult>;
}

export class UnifiedScraper {
    private scrapers: Map<string, IScraper>;

    constructor() {
        this.scrapers = new Map<string, IScraper>([
            ['youtube', new YouTubeScraper()],
            ['tiktok', new TikTokScraper()],
            ['instagram', new InstagramScraper()],
        ]);
    }

    async scrape(url: string): Promise<ScraperResult> {
        const platform = this.detectPlatform(url);

        if (!platform) {
            throw new Error('Unsupported platform or invalid URL');
        }

        const scraper = this.scrapers.get(platform);
        if (!scraper) {
            throw new Error(`No scraper available for ${platform}`);
        }

        try {
            return await scraper.scrape(url);
        } catch (error: any) {
            console.error(`Primary scraper failed for ${platform}:`, error);

            // Try fallback with external API
            return await this.fallbackToExternalAPI(url, platform);
        }
    }

    private detectPlatform(url: string): string | null {
        const platformPatterns: Record<string, RegExp[]> = {
            youtube: [
                /(?:youtube\.com|youtu\.be)/i,
            ],
            tiktok: [
                /tiktok\.com/i,
                /vm\.tiktok\.com/i,
            ],
            instagram: [
                /instagram\.com/i,
            ],
            facebook: [
                /facebook\.com/i,
                /fb\.watch/i,
            ],
            twitter: [
                /twitter\.com/i,
                /x\.com/i,
            ],
            reddit: [
                /reddit\.com/i,
                /redd\.it/i,
            ],
            pinterest: [
                /pinterest\.com/i,
                /pin\.it/i,
            ],
            linkedin: [
                /linkedin\.com/i,
            ],
        };

        for (const [platform, patterns] of Object.entries(platformPatterns)) {
            for (const pattern of patterns) {
                if (pattern.test(url)) {
                    return platform;
                }
            }
        }

        return null;
    }

    private async fallbackToExternalAPI(url: string, platform: string): Promise<ScraperResult> {
        // Use SuperFast API as fallback
        const apiUrl = 'https://superfast-scraper-api.p.rapidapi.com/download';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
                'X-RapidAPI-Host': 'superfast-scraper-api.p.rapidapi.com',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error(`External API failed: ${response.statusText}`);
        }

        const data = await response.json();
        return this.normalizeExternalAPIResponse(data, platform);
    }

    private normalizeExternalAPIResponse(data: any, platform: string): ScraperResult {
        // Normalize the external API response to match our format
        const formats = (data.formats || []).map((f: any) => ({
            quality: f.quality || f.resolution || 'Unknown',
            format: f.ext || f.format || 'mp4',
            size: f.filesize ? this.formatFileSize(f.filesize) : 'Unknown',
            type: f.vcodec && f.vcodec !== 'none' ? 'video' : 'audio',
            downloadUrl: f.url || f.download_url || '',
        }));

        return {
            title: data.title || 'Video',
            duration: data.duration ? this.formatDuration(data.duration) : '0:00',
            thumbnail: data.thumbnail || '',
            author: data.uploader || data.channel || 'Unknown',
            views: data.view_count ? this.formatViews(data.view_count) : '0',
            description: data.description || '',
            platform: platform.charAt(0).toUpperCase() + platform.slice(1),
            formats,
        };
    }

    private formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 MB';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    private formatDuration(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
    }

    private formatViews(views: number): string {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views.toString();
    }
}
