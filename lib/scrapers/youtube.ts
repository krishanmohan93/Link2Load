import ytdl from 'ytdl-core';
import { Scraper, VideoMetadata, VideoFormat } from './types';

export class YouTubeScraper implements Scraper {
    canHandle(url: string): boolean {
        return ytdl.validateURL(url);
    }

    async getVideoInfo(url: string): Promise<VideoMetadata> {
        try {
            const info = await ytdl.getInfo(url);
            const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

            const videoFormats: VideoFormat[] = formats.map(format => ({
                quality: format.qualityLabel || 'Unknown',
                format: format.container,
                url: format.url,
                hasAudio: format.hasAudio,
                hasVideo: format.hasVideo,
                size: format.contentLength ? (parseInt(format.contentLength) / (1024 * 1024)).toFixed(2) + ' MB' : undefined,
                mimeType: format.mimeType
            }));

            // Add audio only formats
            const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
            audioFormats.forEach(format => {
                videoFormats.push({
                    quality: 'Audio (' + (format.audioBitrate || 128) + 'kbps)',
                    format: format.container,
                    url: format.url,
                    hasAudio: true,
                    hasVideo: false,
                    size: format.contentLength ? (parseInt(format.contentLength) / (1024 * 1024)).toFixed(2) + ' MB' : undefined,
                    mimeType: format.mimeType
                });
            });

            return {
                id: info.videoDetails.videoId,
                title: info.videoDetails.title,
                description: info.videoDetails.description || '',
                thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
                duration: this.formatDuration(parseInt(info.videoDetails.lengthSeconds)),
                author: info.videoDetails.author.name,
                views: parseInt(info.videoDetails.viewCount),
                platform: 'youtube',
                formats: videoFormats
            };
        } catch (error) {
            console.error('Error fetching YouTube info:', error);
            throw new Error('Failed to fetch video information');
        }
    }

    private formatDuration(seconds: number): string {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`;
    }
}
