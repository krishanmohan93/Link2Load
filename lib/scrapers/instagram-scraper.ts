import { BaseScraper, ScraperResult, VideoFormat } from './base-scraper';

export class InstagramScraper extends BaseScraper {
    async scrape(url: string): Promise<ScraperResult> {
        // Try multiple methods
        const methods = [
            () => this.scrapeWithGraphQL(url),
            () => this.scrapeWithOEmbed(url),
            () => this.scrapeWithWebPage(url),
        ];

        for (const method of methods) {
            try {
                const result = await method();
                if (result && result.formats.length > 0) {
                    return result;
                }
            } catch (error) {
                console.warn('Instagram scrape method failed:', error);
                continue;
            }
        }

        throw new Error('All Instagram scraping methods failed');
    }

    private async scrapeWithGraphQL(url: string): Promise<ScraperResult> {
        const shortcode = this.extractShortcode(url);
        if (!shortcode) {
            throw new Error('Could not extract shortcode');
        }

        const graphqlUrl = `https://www.instagram.com/graphql/query/?query_hash=2b0673e0dc4580674a88d426fe00ea90&variables=${encodeURIComponent(JSON.stringify({ shortcode }))}`;

        const response = await this.fetchWithRetry(graphqlUrl, {
            headers: {
                'X-IG-App-ID': '936619743392459',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        const data = await response.json();
        const media = data.data?.shortcode_media;

        if (!media) {
            throw new Error('Media not found');
        }

        return this.parseMediaData(media);
    }

    private async scrapeWithOEmbed(url: string): Promise<ScraperResult> {
        const oembedUrl = `https://graph.instagram.com/oembed?url=${encodeURIComponent(url)}&access_token=IGQVJ...`; // Would need access token

        // OEmbed requires access token, so we'll skip to web page method
        throw new Error('OEmbed requires access token');
    }

    private async scrapeWithWebPage(url: string): Promise<ScraperResult> {
        // Ensure URL ends with / for proper Instagram response
        const normalizedUrl = url.endsWith('/') ? url : url + '/';

        const response = await this.fetchWithRetry(normalizedUrl, {
            headers: {
                'User-Agent': this.userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
            },
        });

        const html = await response.text();

        // Extract JSON data from the page
        const jsonMatch = html.match(/<script type="application\/ld\+json">(.+?)<\/script>/);
        if (jsonMatch) {
            const ldJson = JSON.parse(jsonMatch[1]);
            if (ldJson['@type'] === 'VideoObject') {
                return this.parseLDJson(ldJson);
            }
        }

        // Try to extract from shared data
        const sharedDataMatch = html.match(/window\._sharedData = ({.+?});<\/script>/);
        if (sharedDataMatch) {
            const sharedData = JSON.parse(sharedDataMatch[1]);
            const media = sharedData.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
            if (media) {
                return this.parseMediaData(media);
            }
        }

        // Try to extract from additional data
        const additionalDataMatch = html.match(/<script type="application\/json" data-content-type="application\/json" data-content-len="\d+">({.+?})<\/script>/);
        if (additionalDataMatch) {
            const data = JSON.parse(additionalDataMatch[1]);
            const media = data.require?.[0]?.[3]?.[0]?.__bbox?.require?.[0]?.[3]?.[1]?.__bbox?.result?.data?.xdt_shortcode_media;
            if (media) {
                return this.parseMediaData(media);
            }
        }

        throw new Error('Could not extract media data from page');
    }

    private parseMediaData(media: any): ScraperResult {
        const formats: VideoFormat[] = [];

        // Check if it's a video
        if (media.is_video || media.__typename === 'GraphVideo') {
            const videoUrl = media.video_url;

            if (videoUrl) {
                formats.push({
                    quality: 'HD',
                    format: 'mp4',
                    size: 'Unknown',
                    type: 'video',
                    downloadUrl: videoUrl,
                });
            }
        }

        // Check for carousel (multiple items)
        if (media.edge_sidecar_to_children?.edges) {
            for (const edge of media.edge_sidecar_to_children.edges) {
                const node = edge.node;
                if (node.is_video && node.video_url) {
                    formats.push({
                        quality: 'HD',
                        format: 'mp4',
                        size: 'Unknown',
                        type: 'video',
                        downloadUrl: node.video_url,
                    });
                }
            }
        }

        // If no video, it might be an image post
        if (formats.length === 0 && media.display_url) {
            // For image posts, we can't download as video
            throw new Error('This is an image post, not a video');
        }

        return {
            title: media.edge_media_to_caption?.edges?.[0]?.node?.text || 'Instagram Video',
            duration: this.formatDuration(media.video_duration || 0),
            thumbnail: media.display_url || media.thumbnail_src || '',
            author: media.owner?.username || 'Unknown',
            views: this.formatViews(media.video_view_count || media.edge_media_preview_like?.count || 0),
            description: media.edge_media_to_caption?.edges?.[0]?.node?.text || '',
            platform: 'Instagram',
            formats,
        };
    }

    private parseLDJson(ldJson: any): ScraperResult {
        const formats: VideoFormat[] = [];

        if (ldJson.contentUrl) {
            formats.push({
                quality: 'HD',
                format: 'mp4',
                size: ldJson.contentSize || 'Unknown',
                type: 'video',
                downloadUrl: ldJson.contentUrl,
            });
        }

        return {
            title: ldJson.caption || ldJson.name || 'Instagram Video',
            duration: ldJson.duration || '0:00',
            thumbnail: ldJson.thumbnailUrl || '',
            author: ldJson.author?.name || 'Unknown',
            views: ldJson.interactionStatistic?.userInteractionCount || '0',
            description: ldJson.description || ldJson.caption || '',
            platform: 'Instagram',
            formats,
        };
    }

    private extractShortcode(url: string): string | null {
        const patterns = [
            /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
            /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
            /instagram\.com\/tv\/([A-Za-z0-9_-]+)/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }

        return null;
    }
}
