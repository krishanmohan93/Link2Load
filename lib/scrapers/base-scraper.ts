// Base scraper with retry logic and fallback support
export interface ScraperResult {
    title: string;
    duration: string;
    thumbnail: string;
    author: string;
    views: string;
    description: string;
    platform: string;
    formats: VideoFormat[];
}

export interface VideoFormat {
    quality: string;
    format: string;
    size: string;
    type: 'video' | 'audio';
    downloadUrl: string;
}

export interface ScraperOptions {
    timeout?: number;
    retries?: number;
    userAgent?: string;
}

export abstract class BaseScraper {
    protected timeout: number;
    protected retries: number;
    protected userAgent: string;

    constructor(options: ScraperOptions = {}) {
        this.timeout = options.timeout || 10000;
        this.retries = options.retries || 3;
        this.userAgent = options.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
    }

    abstract scrape(url: string): Promise<ScraperResult>;

    protected async fetchWithRetry(url: string, options: RequestInit = {}): Promise<Response> {
        let lastError: Error | null = null;

        for (let i = 0; i < this.retries; i++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        'User-Agent': this.userAgent,
                        ...options.headers,
                    },
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    return response;
                }

                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            } catch (error: any) {
                lastError = error;
                if (i < this.retries - 1) {
                    await this.delay(1000 * (i + 1)); // Exponential backoff
                }
            }
        }

        throw lastError || new Error('Failed to fetch');
    }

    protected delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    protected formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 MB';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    protected formatDuration(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
    }

    protected formatViews(views: number): string {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views.toString();
    }
}
