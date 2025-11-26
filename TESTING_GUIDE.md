# Quick Testing Guide

## 🧪 Test the Download Feature

### 1. Start the Server
```bash
npm run dev
```
Server will start at: http://localhost:3000

### 2. Test Valid URLs

#### YouTube
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

#### Instagram
```
https://www.instagram.com/p/ABC123/
https://www.instagram.com/reel/XYZ789/
```

#### TikTok
```
https://www.tiktok.com/@username/video/1234567890
```

#### Reddit (NEW!)
```
https://www.reddit.com/r/videos/comments/abc123/
https://redd.it/abc123
```

#### Twitter/X
```
https://twitter.com/username/status/1234567890
https://x.com/username/status/1234567890
```

#### Facebook
```
https://www.facebook.com/watch/?v=1234567890
https://fb.watch/abc123/
```

### 3. Test Invalid URLs
```
https://google.com
not-a-url
https://unsupported-site.com
```
**Expected:** Error message displayed

### 4. Test Dark Mode
1. Toggle system dark mode (Windows: Settings → Personalization → Colors)
2. Check that all text is readable
3. Verify buttons are visible
4. Confirm input field has good contrast

### 5. Test Download Flow
1. Paste a valid URL
2. Click "Get Video"
3. Wait for video info to load
4. Click any "Download" button
5. **Expected:** File downloads to your Downloads folder

### 6. Test Error Scenarios
- Empty URL → Click "Get Video"
- Invalid URL → Should show error
- Unsupported platform → Should show error

### 7. Test Mobile Responsiveness
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone/Android
4. Test all features

## ✅ Success Criteria

- [ ] Platform auto-detected from URL
- [ ] Video metadata loads correctly
- [ ] Multiple quality options shown
- [ ] Download button triggers actual download
- [ ] Dark mode text is readable
- [ ] Mobile layout works properly
- [ ] Error messages are clear
- [ ] Loading states show properly

## 🐛 Common Issues & Solutions

### Issue: "Rate limit exceeded"
**Solution:** Wait 1 minute and try again

### Issue: Download doesn't start
**Solution:** Check browser's download settings, try fallback (opens in new tab)

### Issue: "Scraper API unavailable"
**Solution:** App will use demo data automatically

### Issue: Dark mode text invisible
**Solution:** Already fixed! Refresh the page

### Issue: CORS error
**Solution:** API handles this automatically with fallback

## 📊 What to Check

### UI/UX:
- ✅ Clean, modern design
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ Clear feedback messages
- ✅ Loading indicators

### Functionality:
- ✅ URL validation
- ✅ Platform detection
- ✅ API integration
- ✅ Download mechanism
- ✅ Error handling

### Performance:
- ✅ Fast page load
- ✅ Quick API responses
- ✅ Smooth transitions
- ✅ No memory leaks

## 🎯 Next Steps

1. Test with real URLs from each platform
2. Verify downloads work in different browsers
3. Check mobile experience on actual devices
4. Monitor console for any errors
5. Test with slow network (DevTools → Network → Slow 3G)

---

**Happy Testing! 🚀**
