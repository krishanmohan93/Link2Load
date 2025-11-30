import { BaseScraper, ScraperResult, VideoFormat } from './base-scraper';
import { getYtDlp } from '../ytdlp';

export class YouTubeScraper extends BaseScraper {
    async scrape(url: string): Promise<ScraperResult> {
        try {
            console.log('[YouTube Scraper] Fetching info using yt-dlp for:', url);

            const ytDlp = await getYtDlp();
            const metadata = await ytDlp.getVideoInfo(url);

            const videoDetails = {
                title: metadata.title,
                duration: metadata.duration,
                thumbnail: metadata.thumbnail,
                author: metadata.uploader,
                views: metadata.view_count,
                description: metadata.description,
            };

            const formats: VideoFormat[] = [];
            const allFormats = metadata.formats;

            // Filter for formats with http/https protocol
            const validFormats = allFormats.filter((f: any) => f.protocol === 'https' || f.protocol === 'http');

            // Combined formats (video + audio)
            const combinedFormats = validFormats.filter((f: any) =>
                f.vcodec !== 'none' && f.acodec !== 'none'
            );

            for (const format of combinedFormats) {
                const quality = format.format_note || format.height + 'p' || 'Unknown';
                const size = this.formatFileSize(format.filesize || 0);

                formats.push({
                    quality: quality,
                    format: format.ext || 'mp4',
                    size: size,
                    type: 'video',
                    downloadUrl: format.url,
                });
            }

            // Audio formats
            const audioFormats = validFormats.filter((f: any) =>
                f.vcodec === 'none' && f.acodec !== 'none'
            ).slice(0, 2);

            for (const format of audioFormats) {
                const size = this.formatFileSize(format.filesize || 0);

                formats.push({
                    quality: 'Audio',
                    format: format.ext || 'm4a',
                    size: size,
                    type: 'audio',
                    downloadUrl: format.url,
                });
            }

            // Video-only formats (High Quality - 2K/4K/8K)
            // Always add top 3 highest quality video-only formats
            const videoOnly = validFormats
                .filter((f: any) => f.vcodec !== 'none' && f.acodec === 'none')
                .sort((a: any, b: any) => (b.height || 0) - (a.height || 0)) // Sort by height descending
                .slice(0, 3); // Top 3

            for (const format of videoOnly) {
                // Only add if it's better than 1080p (or if we have very few formats)
                if ((format.height || 0) > 1080 || formats.length < 3) {
                    const quality = format.format_note || format.height + 'p' || 'Unknown';
                    const size = this.formatFileSize(format.filesize || 0);

                    formats.push({
                        quality: quality + ' (No Audio)',
                        format: format.ext || 'mp4',
                        size: size,
                        type: 'video',
                        downloadUrl: format.url,
                    });
                }
            }

            return {
                title: videoDetails.title || 'YouTube Video',
                duration: this.formatDuration(videoDetails.duration || 0),
                thumbnail: videoDetails.thumbnail || '',
                author: videoDetails.author || 'Unknown',
                views: this.formatViews(videoDetails.views || 0),
                description: videoDetails.description || '',
                platform: 'YouTube',
                formats: this.deduplicateFormats(formats),
            };

        } catch (error: any) {
            console.error('[YouTube Scraper] Error:', error.message);
            throw new Error(`Failed to scrape YouTube video: ${error.message}`);
        }
    }

    private deduplicateFormats(formats: VideoFormat[]): VideoFormat[] {
        const seen = new Map<string, VideoFormat>();
        for (const format of formats) {
            const key = `${format.quality}-${format.type}-${format.format}`;
            if (!seen.has(key)) {
                seen.set(key, format);
            }
        }
        return Array.from(seen.values());
    }
}
