import * as cheerio from 'cheerio';
import axios from 'axios';
import { Scraper, VideoMetadata, VideoFormat } from './types';

export class GenericScraper implements Scraper {
    canHandle(url: string): boolean {
        return true; // Fallback for any URL
    }

    async getVideoInfo(url: string): Promise<VideoMetadata> {
        try {
            // Fake User-Agent to avoid immediate blocking
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.9',
                },
                timeout: 5000
            });

            const $ = cheerio.load(response.data);

            const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Unknown Video';
            const description = $('meta[property="og:description"]').attr('content') || '';
            const thumbnail = $('meta[property="og:image"]').attr('content') || 'https://via.placeholder.com/640x360';
            const siteName = $('meta[property="og:site_name"]').attr('content') || new URL(url).hostname;
            const videoUrl = $('meta[property="og:video"]').attr('content') || $('meta[property="og:video:url"]').attr('content');

            const formats: VideoFormat[] = [];

            if (videoUrl) {
                formats.push({
                    quality: 'HD',
                    format: 'mp4',
                    url: videoUrl,
                    hasAudio: true,
                    hasVideo: true,
                    mimeType: 'video/mp4'
                });
            } else {
                // Fallback mock format if no direct video link found (common for Instagram/TikTok without specialized scrapers)
                formats.push({
                    quality: 'HD',
                    format: 'mp4',
                    url: '#', // Placeholder
                    hasAudio: true,
                    hasVideo: true,
                    size: 'Unknown',
                    mimeType: 'video/mp4'
                });
            }

            return {
                id: url,
                title: title,
                description: description,
                thumbnail: thumbnail,
                duration: 'Unknown',
                author: siteName,
                views: 0,
                platform: siteName.toLowerCase(),
                formats: formats
            };
        } catch (error) {
            console.error('Generic scraper error:', error);
            // Return a safe fallback instead of crashing
            return {
                id: url,
                title: 'Video Not Found',
                description: 'Could not fetch video details. The platform might be blocking automated requests.',
                thumbnail: 'https://via.placeholder.com/640x360',
                duration: '0:00',
                author: 'Unknown',
                views: 0,
                platform: 'unknown',
                formats: []
            };
        }
    }
}
