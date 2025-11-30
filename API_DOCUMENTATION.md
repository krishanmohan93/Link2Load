# 📚 API Documentation - Video Downloader Backend

## Overview

This document describes the backend API routes for the video downloader application. All routes are built with Next.js API routes and are serverless-ready.

---

## Base URL

**Local**: `http://localhost:3000`
**Production**: `https://your-domain.vercel.app`

---

## Authentication

No authentication required. Rate limiting is applied per IP address.

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/info` | 30 requests | 60 seconds |
| `/api/download` | 20 requests | 60 seconds |
| `/api/scrape` | 30 requests | 60 seconds |

**Response when rate limited**:
```json
{
  "error": "Rate limit exceeded. Please try again in a minute."
}
```
**Status Code**: `429 Too Many Requests`

---

## Endpoints

### 1. GET `/api/info`

Fetch video information and available download formats using the Super-Fast Scraper API.

#### Request

**Method**: `GET`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The video URL to scrape |

**Example**:
```
GET /api/info?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**cURL Example**:
```bash
curl "http://localhost:3000/api/info?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

#### Response

**Success Response** (200 OK):
```json
{
  "success": true,
  "platform": "YouTube",
  "title": "Rick Astley - Never Gonna Give You Up",
  "description": "The official video for "Never Gonna Give You Up"...",
  "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "duration": "3:33",
  "author": "Rick Astley",
  "views": "1.4B",
  "formats": [
    {
      "quality": "1080p",
      "format": "mp4",
      "size": "45.2 MB",
      "type": "video",
      "downloadUrl": "https://..."
    },
    {
      "quality": "720p",
      "format": "mp4",
      "size": "28.5 MB",
      "type": "video",
      "downloadUrl": "https://..."
    },
    {
      "quality": "Audio",
      "format": "mp3",
      "size": "3.2 MB",
      "type": "audio",
      "downloadUrl": "https://..."
    }
  ],
  "processingTime": "1234ms"
}
```

**Error Responses**:

**400 Bad Request** - Missing or invalid URL:
```json
{
  "error": "URL parameter is required"
}
```

**400 Bad Request** - Invalid URL format:
```json
{
  "error": "Invalid URL format. Please provide a valid video URL."
}
```

**404 Not Found** - No formats available:
```json
{
  "error": "No download formats found for this video. The video may be private or restricted."
}
```

**429 Too Many Requests** - Rate limit exceeded:
```json
{
  "error": "Rate limit exceeded. Please try again in a minute."
}
```

**500 Internal Server Error** - Server error:
```json
{
  "error": "Request timeout. The server is taking too long to respond. Please try again.",
  "details": "AbortError: The operation was aborted"
}
```

#### Supported Platforms

- YouTube (youtube.com, youtu.be)
- Instagram (instagram.com)
- TikTok (tiktok.com)
- Facebook (facebook.com, fb.watch)
- Twitter/X (twitter.com, x.com)
- Reddit (reddit.com, redd.it)
- Pinterest (pinterest.com)
- LinkedIn (linkedin.com)
- ShareChat (sharechat.com)
- Moj (moj.com)
- Chingari (chingari.io)

---

### 2. POST `/api/download`

Download a video file with proper streaming and headers.

#### Request

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Body Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes* | Original video URL |
| `quality` | string | No | Requested quality (e.g., "1080p") |
| `fileUrl` | string | No* | Direct download URL |
| `title` | string | No | Video title (for filename) |
| `format` | string | No | File format (e.g., "mp4") |

*Either `url` or `fileUrl` must be provided. If only `url` is provided, the API will fetch info first.

**Example Request Body**:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "quality": "1080p",
  "fileUrl": "https://...",
  "title": "Rick Astley - Never Gonna Give You Up",
  "format": "mp4"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "quality": "1080p",
    "fileUrl": "https://...",
    "title": "Video Title",
    "format": "mp4"
  }' \
  --output video.mp4
```

**JavaScript Fetch Example**:
```javascript
const response = await fetch('/api/download', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quality: '1080p',
    fileUrl: 'https://...',
    title: 'Video Title',
    format: 'mp4'
  }),
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'video.mp4';
a.click();
```

#### Response

**Success Response** (200 OK):

**Headers**:
```
Content-Type: video/mp4 (or appropriate MIME type)
Content-Disposition: attachment; filename="Video_Title_1080p.mp4"
Content-Length: 47456789
Cache-Control: no-store, no-cache, must-revalidate
Access-Control-Allow-Origin: *
```

**Body**: Binary file data (video/audio file)

**Error Responses**:

**400 Bad Request** - Missing URL:
```json
{
  "error": "URL or fileUrl is required"
}
```

**404 Not Found** - No formats available:
```json
{
  "error": "No download formats available for this video"
}
```

**404 Not Found** - Download URL not available:
```json
{
  "error": "Download URL not available"
}
```

**429 Too Many Requests** - Rate limit exceeded:
```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

**500 Internal Server Error** - Download failed:
```json
{
  "error": "Download timeout. The file is too large or the server is slow. Please try again.",
  "details": "ECONNABORTED: timeout of 45000ms exceeded"
}
```

**500 Internal Server Error** - Access denied:
```json
{
  "error": "Access denied. The video source is blocking downloads.",
  "details": "Request failed with status code 403"
}
```

**500 Internal Server Error** - File not found:
```json
{
  "error": "File not found. The download link may have expired.",
  "details": "Request failed with status code 404"
}
```

#### MIME Types

The API automatically detects and sets the correct MIME type:

| Extension | MIME Type |
|-----------|-----------|
| mp4 | video/mp4 |
| webm | video/webm |
| mkv | video/x-matroska |
| avi | video/x-msvideo |
| mov | video/quicktime |
| mp3 | audio/mpeg |
| m4a | audio/mp4 |
| wav | audio/wav |
| ogg | audio/ogg |
| jpg/jpeg | image/jpeg |
| png | image/png |

---

### 3. POST `/api/scrape` (Legacy - Backward Compatibility)

Legacy endpoint that now uses Super-Fast Scraper API as primary method with fallback to unified scraper.

#### Request

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

#### Response

Same format as `/api/info` endpoint.

**Note**: This endpoint is maintained for backward compatibility. New implementations should use `/api/info` instead.

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "User-friendly error message",
  "details": "Technical error details (optional)"
}
```

### Common Error Messages

| Error Message | Meaning | Solution |
|---------------|---------|----------|
| "Invalid URL format" | URL is malformed | Provide a valid URL |
| "Unsupported platform" | Platform not supported | Use a supported platform |
| "No download formats found" | Video unavailable | Check if video is private/deleted |
| "Request timeout" | Server took too long | Try again or use different quality |
| "Rate limit exceeded" | Too many requests | Wait 60 seconds |
| "Download timeout" | File download took too long | Try smaller quality |
| "Access denied" | Source blocking downloads | Try different video |
| "File not found" | Download link expired | Fetch video info again |
| "Network error" | Connection issue | Check internet connection |

---

## Response Times

| Endpoint | Average | Max |
|----------|---------|-----|
| `/api/info` | 1-3s | 15s |
| `/api/download` | 2-10s | 45s |
| `/api/scrape` | 1-3s | 15s |

**Note**: Response times depend on:
- Video source server speed
- File size (for downloads)
- Network conditions
- Platform being scraped

---

## CORS

All endpoints support CORS with the following headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**OPTIONS** requests are supported on all endpoints.

---

## Caching

**Cache Headers** (for downloads):
```
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Expires: 0
```

Downloads are not cached to ensure fresh content.

---

## Timeouts

| Endpoint | Timeout |
|----------|---------|
| `/api/info` | 15 seconds |
| `/api/download` | 45 seconds |
| Super-Fast Scraper API | 15 seconds |

---

## External Dependencies

### Super-Fast Scraper API

**URL**: `https://antigravity-api.vercel.app/api/scrape`

**Method**: GET

**Query Parameters**: `url` (video URL)

**No API Key Required**

**Response Format**:
```json
{
  "success": true,
  "platform": "YouTube",
  "title": "Video Title",
  "thumbnail": "https://...",
  "duration": 213,
  "author": "Channel Name",
  "views": 1400000000,
  "media": [
    {
      "quality": "1080p",
      "extension": "mp4",
      "size": 47456789,
      "type": "video",
      "url": "https://..."
    }
  ]
}
```

---

## Best Practices

### For Frontend Developers

1. **Always handle errors gracefully**:
   ```javascript
   try {
     const response = await fetch('/api/info?url=' + encodeURIComponent(url));
     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.error);
     }
     const data = await response.json();
   } catch (error) {
     console.error('Failed to fetch video:', error.message);
   }
   ```

2. **Show loading states**:
   - Display spinner while fetching
   - Show progress for downloads (if possible)

3. **Implement retry logic**:
   ```javascript
   async function fetchWithRetry(url, retries = 3) {
     for (let i = 0; i < retries; i++) {
       try {
         const response = await fetch(url);
         if (response.ok) return response;
       } catch (error) {
         if (i === retries - 1) throw error;
         await new Promise(r => setTimeout(r, 1000 * (i + 1)));
       }
     }
   }
   ```

4. **Respect rate limits**:
   - Implement client-side throttling
   - Show user-friendly messages when rate limited

5. **Use AbortController for timeouts**:
   ```javascript
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), 30000);
   
   try {
     const response = await fetch('/api/info?url=' + url, {
       signal: controller.signal
     });
   } finally {
     clearTimeout(timeout);
   }
   ```

---

## Testing

### Test URLs

**YouTube**:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**Instagram** (use real Reel URL):
```
https://www.instagram.com/reel/[REEL_ID]/
```

**TikTok** (use real video URL):
```
https://www.tiktok.com/@user/video/[VIDEO_ID]
```

### Testing with cURL

**Test /api/info**:
```bash
curl "http://localhost:3000/api/info?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ" | jq
```

**Test /api/download**:
```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","quality":"720p"}' \
  --output test_video.mp4
```

---

## Changelog

### v2.0.0 (Current)
- ✅ Added `/api/info` endpoint with Super-Fast Scraper integration
- ✅ Rewrote `/api/download` with proper file streaming
- ✅ Updated `/api/scrape` to use Super-Fast API first
- ✅ Improved error handling across all endpoints
- ✅ Added support for 15+ platforms
- ✅ Implemented rate limiting
- ✅ Added CORS support

### v1.0.0 (Legacy)
- Basic scraping functionality
- Limited platform support
- Basic download functionality

---

## Support

For issues or questions:
1. Check console logs for detailed error messages
2. Verify URL format and platform support
3. Check rate limits
4. Review this documentation

---

**Last Updated**: 2025-11-28
**API Version**: 2.0.0
