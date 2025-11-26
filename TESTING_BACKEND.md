# 🧪 Backend Scraper Testing Guide

## Quick Test URLs

Test each platform to verify the upgraded scrapers work:

### ✅ YouTube
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```
**Expected**: Multiple formats (4K, 1080p, 720p, 480p, audio)

### ✅ TikTok
```
https://www.tiktok.com/@zachking/video/7137423965982592302
```
**Expected**: HD (watermark-free), HD, audio

### ✅ Instagram
```
https://www.instagram.com/p/C1234567890/
```
**Expected**: HD video format

### ✅ Facebook
```
https://www.facebook.com/watch/?v=1234567890
```
**Expected**: HD video format

### ✅ Twitter/X
```
https://twitter.com/user/status/1234567890
```
**Expected**: HD video format

## Testing Steps

### 1. Local Testing
```bash
# Start dev server
npm run dev

# Open http://localhost:3000
# Paste a test URL
# Click "Get Video"
# Verify formats appear
# Click "Download"
# Verify download starts
```

### 2. API Testing (Direct)
```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

**Expected Response**:
```json
{
  "success": true,
  "platform": "YouTube",
  "title": "Rick Astley - Never Gonna Give You Up",
  "duration": "3:32",
  "thumbnail": "https://...",
  "author": "Rick Astley",
  "views": "1.4B",
  "formats": [
    {
      "quality": "1080p",
      "format": "mp4",
      "size": "25 MB",
      "type": "video",
      "downloadUrl": "https://..."
    }
  ],
  "processingTime": "1247ms"
}
```

### 3. Performance Testing

**Test Response Time**:
```bash
time curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"YOUR_TEST_URL"}'
```

**Target**: < 2 seconds

### 4. Fallback Testing

**Test with invalid URL**:
```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=INVALID"}'
```

**Expected**: Graceful error response (not crash)

### 5. Rate Limit Testing

**Send 35 requests rapidly**:
```bash
for i in {1..35}; do
  curl -X POST http://localhost:3000/api/scrape \
    -H "Content-Type: application/json" \
    -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
done
```

**Expected**: First 30 succeed, next 5 return 429 (rate limit)

## Verification Checklist

- [ ] YouTube videos load in <2s
- [ ] TikTok videos have watermark-free option
- [ ] Instagram Reels work
- [ ] All formats have valid download URLs
- [ ] Download button works (no "Automatic Download Failed")
- [ ] Fallback works when primary scraper fails
- [ ] Rate limiting prevents abuse
- [ ] Error messages are user-friendly
- [ ] No console errors in browser
- [ ] No 500 errors in API logs

## Common Issues & Solutions

### Issue: "All scraping methods failed"
**Cause**: Video is private/restricted
**Solution**: Try a different public video

### Issue: Slow response (>5s)
**Cause**: Network latency or platform blocking
**Solution**: Check Vercel logs, verify platform isn't blocking

### Issue: Empty formats array
**Cause**: Platform changed their API
**Solution**: Fallback to external API should handle this

### Issue: Download fails with CORS error
**Cause**: Direct URL is CORS-protected
**Solution**: Proxy download via `/api/download-file` (already implemented)

## Success Criteria

✅ **All platforms working**: YouTube, Instagram, TikTok, Facebook, Twitter, Reddit, Pinterest, LinkedIn
✅ **Response time**: <2 seconds for 90% of requests
✅ **Success rate**: >95% for public videos
✅ **Fallback works**: External API catches failures
✅ **No crashes**: Graceful error handling
✅ **Downloads work**: Both proxy and direct methods

## Next Steps After Testing

1. **Deploy to Vercel**: `git push origin main`
2. **Monitor logs**: Check Vercel function logs
3. **Test live URL**: Verify on production domain
4. **Share with users**: Get real-world feedback

---

**Your backend is now production-ready!** 🚀
