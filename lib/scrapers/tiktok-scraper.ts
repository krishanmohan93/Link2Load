import { BaseScraper, ScraperResult, VideoFormat } from './base-scraper';

export class TikTokScraper extends BaseScraper {
    private readonly API_ENDPOINTS = [
        'https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/',
        'https://www.tiktok.com/oembed',
    ];

    async scrape(url: string): Promise<ScraperResult> {
        // Try multiple methods
        const methods = [
            () => this.scrapeWithOEmbed(url),
            () => this.scrapeWithWebPage(url),
            () => this.scrapeWithMobileAPI(url),
        ];

        for (const method of methods) {
            try {
                const result = await method();
                if (result && result.formats.length > 0) {
                    return result;
                }
            } catch (error) {
                console.warn('TikTok scrape method failed:', error);
                continue;
            }
        }

        throw new Error('All TikTok scraping methods failed');
    }

    private async scrapeWithOEmbed(url: string): Promise<ScraperResult> {
        const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
        const response = await this.fetchWithRetry(oembedUrl);
        const data = await response.json();

        // OEmbed gives us basic info, but we need to extract video URL from the page
        const videoId = this.extractVideoId(url);
        if (!videoId) {
            throw new Error('Could not extract video ID');
        }

        const videoUrl = await this.extractVideoUrl(url);

        return {
            title: data.title || 'TikTok Video',
            duration: '0:00', // TikTok doesn't provide duration in OEmbed
            thumbnail: data.thumbnail_url || '',
            author: data.author_name || 'Unknown',
            views: '0',
            description: data.title || '',
            platform: 'TikTok',
            formats: [
                {
                    quality: 'HD',
                    format: 'mp4',
                    size: 'Unknown',
                    type: 'video',
                    downloadUrl: videoUrl,
                },
            ],
        };
    }

    private async scrapeWithWebPage(url: string): Promise<ScraperResult> {
        const response = await this.fetchWithRetry(url, {
            headers: {
                'User-Agent': this.userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
            },
        });

        const html = await response.text();

        // Extract JSON data from the page
        const jsonMatch = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">(.+?)<\/script>/);
        if (!jsonMatch) {
            throw new Error('Could not extract video data');
        }

        const data = JSON.parse(jsonMatch[1]);
        const videoData = data.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemInfo?.itemStruct;

        if (!videoData) {
            throw new Error('Video data not found');
        }

        const video = videoData.video;
        const formats: VideoFormat[] = [];

        // Add download URL (watermark-free if available)
        if (video.downloadAddr) {
            formats.push({
                quality: 'HD (No Watermark)',
                format: 'mp4',
                size: this.formatFileSize(video.downloadAddr.dataSize || 0),
                type: 'video',
                downloadUrl: video.downloadAddr,
            });
        }

        // Add play URL (with watermark)
        if (video.playAddr) {
            formats.push({
                quality: 'HD',
                format: 'mp4',
                size: this.formatFileSize(video.playAddr.dataSize || 0),
                type: 'video',
                downloadUrl: video.playAddr,
            });
        }

        // Add audio
        if (videoData.music?.playUrl) {
            formats.push({
                quality: 'High Quality',
                format: 'm4a',
                size: 'Unknown',
                type: 'audio',
                downloadUrl: videoData.music.playUrl,
            });
        }

        return {
            title: videoData.desc || 'TikTok Video',
            duration: this.formatDuration(video.duration || 0),
            thumbnail: video.cover || video.dynamicCover || '',
            author: videoData.author?.nickname || 'Unknown',
            views: this.formatViews(videoData.stats?.playCount || 0),
            description: videoData.desc || '',
            platform: 'TikTok',
            formats,
        };
    }

    private async scrapeWithMobileAPI(url: string): Promise<ScraperResult> {
        const videoId = this.extractVideoId(url);
        if (!videoId) {
            throw new Error('Could not extract video ID');
        }

        // Use mobile API endpoint
        const apiUrl = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}`;

        const response = await this.fetchWithRetry(apiUrl, {
            headers: {
                'User-Agent': 'com.zhiliaoapp.musically/2022600040 (Linux; U; Android 7.1.2; en_US; Redmi 4X; Build/N2G47H; Cronet/TTNetVersion:b4d74d15 2020-04-23 QuicVersion:0144d358 2020-03-24)',
            },
        });

        const data = await response.json();
        const videoData = data.aweme_list?.[0];

        if (!videoData) {
            throw new Error('Video not found in API response');
        }

        const video = videoData.video;
        const formats: VideoFormat[] = [];

        // Extract video URLs
        if (video.download_addr?.url_list?.[0]) {
            formats.push({
                quality: 'HD (No Watermark)',
                format: 'mp4',
                size: this.formatFileSize(video.download_addr.data_size || 0),
                type: 'video',
                downloadUrl: video.download_addr.url_list[0],
            });
        }

        if (video.play_addr?.url_list?.[0]) {
            formats.push({
                quality: 'HD',
                format: 'mp4',
                size: this.formatFileSize(video.play_addr.data_size || 0),
                type: 'video',
                downloadUrl: video.play_addr.url_list[0],
            });
        }

        return {
            title: videoData.desc || 'TikTok Video',
            duration: this.formatDuration(video.duration / 1000 || 0),
            thumbnail: video.cover?.url_list?.[0] || '',
            author: videoData.author?.nickname || 'Unknown',
            views: this.formatViews(videoData.statistics?.play_count || 0),
            description: videoData.desc || '',
            platform: 'TikTok',
            formats,
        };
    }

    private extractVideoId(url: string): string | null {
        const patterns = [
            /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
            /tiktok\.com\/v\/(\d+)/,
            /vm\.tiktok\.com\/([A-Za-z0-9]+)/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }

        return null;
    }

    private async extractVideoUrl(url: string): Promise<string> {
        const response = await this.fetchWithRetry(url);
        const html = await response.text();

        // Try to extract video URL from various sources in the HTML
        const patterns = [
            /"downloadAddr":"([^"]+)"/,
            /"playAddr":"([^"]+)"/,
            /src="([^"]+\.mp4[^"]*)"/,
        ];

        for (const pattern of patterns) {
            const match = html.match(pattern);
            if (match) {
                return match[1].replace(/\\u002F/g, '/');
            }
        }

        throw new Error('Could not extract video URL');
    }
}
