# 🚀 Video Downloader Pro

A production-ready, multi-platform video downloader built with Next.js, TypeScript, and TailwindCSS. Supports YouTube, Instagram, TikTok, Facebook, Twitter/X, and more.

![Video Downloader Pro](public/og-image.png)

## ✨ Features

- **Multi-Platform Support**: Download videos from YouTube, Instagram, TikTok, Facebook, Twitter, Pinterest, LinkedIn.
- **High Quality**: Support for 4K, 1080p, 720p resolutions.
- **Audio Extraction**: Convert videos to MP3/M4A.
- **Modern UI/UX**: Glassmorphism design, dark/light mode, smooth animations.
- **PWA Ready**: Installable as a native app on mobile and desktop.
- **SEO Optimized**: 100/100 Lighthouse score potential with schema markup and dynamic sitemap.
- **Secure**: Rate limiting, input validation, and privacy-focused (no data logging).
- **Monetization Ready**: AdSense placeholders and Premium subscription UI.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS v4
- **Backend**: Next.js API Routes (Serverless)
- **Scraping**: ytdl-core (YouTube), Modular scraper architecture
- **State Management**: React Hooks
- **Styling**: TailwindCSS + CSS Variables
- **Icons**: Heroicons
- **Deployment**: Docker, Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/video-downloader.git
   cd video-downloader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open http://localhost:3000**

### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t video-downloader .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 video-downloader
   ```

### Docker Compose (with Redis)

```bash
docker-compose up -d
```

## 📁 Project Structure

```
video-downloader/
├── app/
│   ├── api/download/          # API endpoint
│   ├── youtube-downloader/    # Platform pages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles (Tailwind v4)
├── components/                # React components
├── lib/
│   ├── scrapers/              # Platform scrapers
│   │   ├── youtube.ts         # YouTube implementation
│   │   └── types.ts           # Scraper interfaces
│   └── platform-detector.ts   # URL detection logic
├── public/                    # Static assets
├── Dockerfile                 # Docker build config
├── docker-compose.yml         # Docker Compose config
└── next.config.ts             # Next.js configuration
```

## 📚 Blog & SEO

The project includes 5 pre-built, SEO-optimized blog articles to help rank for keywords:

- [How to Download YouTube Videos in 2025](/app/blog/how-to-download-youtube-videos-2025/page.tsx)
- [Best Free TikTok Video Downloader](/app/blog/best-free-tiktok-downloader/page.tsx)
- [Instagram Reel Downloader Guide](/app/blog/instagram-reel-downloader-guide/page.tsx)
- [Twitter/X Video Downloader](/app/blog/twitter-video-downloader-online/page.tsx)
- [YouTube to MP3 Converter](/app/blog/youtube-to-mp3-converter/page.tsx)

## 💰 Monetization

The app comes pre-configured with:
1. **Google AdSense**: Placeholders in `components/AdBanner.tsx`. Replace `ca-pub-placeholder` in `app/layout.tsx` with your ID.
2. **Affiliate Marketing**: `components/VpnBanner.tsx` promotes a VPN service. Update the link with your affiliate URL.
3. **Premium Upsell**: `/premium` page with pricing tiers (UI only, connect to Stripe).

## 🔌 API Documentation

### POST /api/download

Fetch video metadata and download links.

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response:**
```json
{
  "id": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  "duration": "3:32",
  "platform": "youtube",
  "formats": [
    {
      "quality": "1080p",
      "format": "mp4",
      "url": "https://...",
      "hasAudio": true,
      "hasVideo": true
    }
  ]
}
```

## 🛡️ Legal & Compliance

This tool is for educational purposes only. Users must respect copyright laws and platform Terms of Service.

- **DMCA**: We comply with DMCA takedown requests. Contact `dmca@videodownloaderpro.com`.
- **Privacy**: We do not store user data or download history on our servers.
- **Disclaimer**: Only download content you own or have permission to use.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT
