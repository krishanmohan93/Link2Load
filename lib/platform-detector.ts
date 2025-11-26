export type Platform = 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'pinterest' | 'linkedin' | 'reddit' | 'unknown';

export function detectPlatform(url: string): Platform {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
            return 'youtube';
        }
        if (hostname.includes('instagram.com')) {
            return 'instagram';
        }
        if (hostname.includes('tiktok.com')) {
            return 'tiktok';
        }
        if (hostname.includes('facebook.com') || hostname.includes('fb.watch')) {
            return 'facebook';
        }
        if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
            return 'twitter';
        }
        if (hostname.includes('pinterest.com') || hostname.includes('pin.it')) {
            return 'pinterest';
        }
        if (hostname.includes('linkedin.com')) {
            return 'linkedin';
        }
        if (hostname.includes('reddit.com') || hostname.includes('redd.it')) {
            return 'reddit';
        }

        return 'unknown';
    } catch (e) {
        return 'unknown';
    }
}
