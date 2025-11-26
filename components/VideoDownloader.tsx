"use client";

import { useState, useEffect } from "react";
import {
    MagnifyingGlassIcon,
    ArrowDownTrayIcon,
    ClipboardDocumentIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    UserIcon,
    EyeIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface VideoInfo {
    platform: string;
    title: string;
    thumbnail: string;
    duration: string;
    uploader: string;
    views: string;
    description: string;
    formats: VideoFormat[];
}

interface VideoFormat {
    quality: string;
    format: string;
    size: string;
    type: 'video' | 'audio';
    downloadUrl: string;
}

export default function VideoDownloader() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [error, setError] = useState("");
    const [clipboardDetected, setClipboardDetected] = useState(false);

    // Smart Clipboard Detection
    useEffect(() => {
        const checkClipboard = async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.readText) {
                    const text = await navigator.clipboard.readText();
                    if (isValidUrl(text) && !url) {
                        setClipboardDetected(true);
                        toast.success("URL detected in clipboard! Click to paste.", {
                            duration: 5000,
                            icon: "📋",
                        });
                    }
                }
            } catch (err) {
                // Clipboard access denied - ignore
            }
        };

        checkClipboard();
    }, []);

    const isValidUrl = (string: string) => {
        const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|instagram\.com|tiktok\.com|facebook\.com|twitter\.com|x\.com|pinterest\.com|linkedin\.com|reddit\.com|redd\.it)/i;
        return urlPattern.test(string);
    };

    const detectPlatform = (url: string): string => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
        if (url.includes('instagram.com')) return 'Instagram';
        if (url.includes('tiktok.com')) return 'TikTok';
        if (url.includes('facebook.com')) return 'Facebook';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X';
        if (url.includes('pinterest.com')) return 'Pinterest';
        if (url.includes('linkedin.com')) return 'LinkedIn';
        if (url.includes('reddit.com') || url.includes('redd.it')) return 'Reddit';
        return 'Unknown';
    };

    const pasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
            setClipboardDetected(false);
            toast.success("URL pasted from clipboard!");
        } catch (err) {
            toast.error("Failed to read clipboard");
        }
    };

    const handleFetchVideo = async () => {
        if (!url) {
            toast.error("Please enter a video URL");
            return;
        }

        if (!isValidUrl(url)) {
            setError("Invalid URL. Please enter a valid video URL from supported platforms.");
            return;
        }

        setLoading(true);
        setError("");
        setVideoInfo(null);

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Transform API response to VideoInfo format
            const videoData: VideoInfo = {
                platform: data.platform,
                title: data.title,
                thumbnail: data.thumbnail,
                duration: data.duration,
                uploader: data.author,
                views: data.views,
                description: data.description,
                formats: data.formats
            };

            setVideoInfo(videoData);
            toast.success("Video information fetched successfully!");

            // Save to download history
            saveToHistory(videoData);

        } catch (err: any) {
            console.error("Fetch error:", err);
            setError(err.message || "Failed to fetch video information. Please try again.");
            toast.error(err.message || "Failed to fetch video information");
        } finally {
            setLoading(false);
        }
    };

    const saveToHistory = (info: VideoInfo) => {
        const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
        history.unshift({
            ...info,
            timestamp: new Date().toISOString(),
            url: url
        });
        localStorage.setItem('downloadHistory', JSON.stringify(history.slice(0, 50)));
    };

    const handleDownload = async (format: VideoFormat) => {
        if (!format.downloadUrl || format.downloadUrl === '#') {
            toast.error("Download URL not available for this format");
            return;
        }

        const toastId = toast.loading(`Preparing download: ${format.quality} ${format.format}...`);

        try {
            // Generate filename
            const filename = `${videoInfo?.title.substring(0, 50).replace(/[^a-z0-9]/gi, '_') || 'video'}_${format.quality.replace(/[^a-z0-9]/gi, '_')}.${format.format.toLowerCase()}`;

            // Use proxy API to avoid CORS issues
            const response = await fetch('/api/download-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: format.downloadUrl,
                    filename: filename,
                    quality: format.quality
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Download failed' }));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            // Get the blob from response
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;

            // Trigger download
            document.body.appendChild(a);
            a.click();

            // Cleanup
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);

            toast.success(`Download started: ${format.quality} ${format.format}`, { id: toastId });

        } catch (error: any) {
            console.error("Download error:", error);

            // Fallback: try opening in new tab
            if (format.downloadUrl && format.downloadUrl !== '#') {
                try {
                    window.open(format.downloadUrl, '_blank');
                    toast.success(`Opening download in new tab...`, { id: toastId });
                } catch (fallbackError) {
                    toast.error(`Download failed: ${error.message}`, { id: toastId });
                }
            } else {
                toast.error(`Download failed: ${error.message}`, { id: toastId });
            }
        }
    };

    const getQualityBadgeClass = (quality: string) => {
        if (quality.includes('4K') || quality.includes('2160p')) return 'quality-4k';
        if (quality.includes('2K') || quality.includes('1440p') || quality.includes('1080p') || quality.includes('720p')) return 'quality-hd';
        if (quality.includes('MP3') || quality.includes('M4A') || quality.includes('WEBM')) return 'quality-audio';
        return 'quality-sd';
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* URL Input Section */}
            <div className="glass-card rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleFetchVideo()}
                            placeholder="Paste video URL here (YouTube, Instagram, TikTok, Facebook, Twitter, Reddit...)"
                            className="input-modern w-full pr-12"
                        />
                        {clipboardDetected && (
                            <button
                                onClick={pasteFromClipboard}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-lg transition-colors"
                                title="Paste from clipboard"
                            >
                                <ClipboardDocumentIcon className="w-5 h-5 text-primary" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={handleFetchVideo}
                        disabled={loading}
                        className="btn-primary flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Fetching...</span>
                            </>
                        ) : (
                            <>
                                <MagnifyingGlassIcon className="w-5 h-5" />
                                <span>Get Video</span>
                            </>
                        )}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                        <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-500">{error}</p>
                    </div>
                )}

                {url && isValidUrl(url) && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="text-green-500 font-semibold">Platform detected: {detectPlatform(url)}</p>
                            <p className="text-muted-foreground mt-1">Click "Get Video" to fetch download options</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Loading Skeleton */}
            {loading && (
                <div className="mt-8 glass-card rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="flex gap-6">
                        <div className="skeleton w-48 h-28 flex-shrink-0"></div>
                        <div className="flex-1 space-y-3">
                            <div className="skeleton h-6 w-3/4"></div>
                            <div className="skeleton h-4 w-1/2"></div>
                            <div className="skeleton h-4 w-2/3"></div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="skeleton h-12 w-full"></div>
                        <div className="skeleton h-12 w-full"></div>
                        <div className="skeleton h-12 w-full"></div>
                    </div>
                </div>
            )}

            {/* Video Info & Download Options */}
            {videoInfo && !loading && (
                <div className="mt-8 space-y-6 animate-slide-up">
                    {/* Video Preview Card */}
                    <div className="glass-card rounded-2xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            <img
                                src={videoInfo.thumbnail}
                                alt={videoInfo.title}
                                className="w-full md:w-64 h-auto rounded-xl object-cover"
                            />
                            <div className="flex-1">
                                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-3">
                                    {videoInfo.platform}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-3">{videoInfo.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4" />
                                        <span>{videoInfo.uploader}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>{videoInfo.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <EyeIcon className="w-4 h-4" />
                                        <span>{videoInfo.views}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {videoInfo.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Download Formats */}
                    <div className="glass-card rounded-2xl p-6 md:p-8">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ArrowDownTrayIcon className="w-6 h-6 text-primary" />
                            Available Download Formats
                        </h4>

                        {/* Video Formats */}
                        <div className="mb-8">
                            <h5 className="text-lg font-semibold mb-4 text-primary">Video Formats</h5>
                            <div className="space-y-3">
                                {videoInfo.formats.filter(f => f.type === 'video').map((format, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`quality-badge ${getQualityBadgeClass(format.quality)}`}>
                                                {format.quality}
                                            </span>
                                            <div>
                                                <p className="font-semibold">{format.format}</p>
                                                <p className="text-sm text-muted-foreground">Size: {format.size}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(format)}
                                            className="btn-primary text-sm px-6 py-2 group-hover:scale-105"
                                        >
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Audio Formats */}
                        <div>
                            <h5 className="text-lg font-semibold mb-4 text-primary">Audio Formats</h5>
                            <div className="space-y-3">
                                {videoInfo.formats.filter(f => f.type === 'audio').map((format, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`quality-badge ${getQualityBadgeClass(format.quality)}`}>
                                                {format.format}
                                            </span>
                                            <div>
                                                <p className="font-semibold">{format.quality}</p>
                                                <p className="text-sm text-muted-foreground">Size: {format.size}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(format)}
                                            className="btn-primary text-sm px-6 py-2 group-hover:scale-105"
                                        >
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
