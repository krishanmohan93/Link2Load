export interface VideoFormat {
    quality: string;
    format: string;
    url: string;
    hasAudio: boolean;
    hasVideo: boolean;
    size?: string;
    mimeType?: string;
}

export interface VideoMetadata {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    author: string;
    views: number;
    platform: string;
    formats: VideoFormat[];
}

export interface Scraper {
    canHandle(url: string): boolean;
    getVideoInfo(url: string): Promise<VideoMetadata>;
}
