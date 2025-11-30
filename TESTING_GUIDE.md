# 🧪 Testing Guide - Debug Download Issues

## Test the APIs Directly

### 1. Test `/api/scrape` (Get Video Info)

Open your browser and go to:
```
http://localhost:3000
```

Open browser console (F12) and run:

```javascript
// Test scraping
fetch('/api/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
})
.then(r => r.json())
.then(data => {
    console.log('Scrape Result:', data);
    console.log('Number of formats:', data.formats?.length);
    console.log('Formats:', data.formats);
});
```

**Expected Output**:
```json
{
  "success": true,
  "platform": "YouTube",
  "title": "Rick Astley - Never Gonna Give You Up",
  "formats": [
    { "quality": "1080p", "format": "mp4", "downloadUrl": "https://..." },
    { "quality": "720p", "format": "mp4", "downloadUrl": "https://..." },
    { "quality": "480p", "format": "mp4", "downloadUrl": "https://..." },
    { "quality": "360p", "format": "mp4", "downloadUrl": "https://..." },
    { "quality": "Audio", "format": "m4a", "downloadUrl": "https://..." }
  ]
}
```

### 2. Test `/api/download` (Download File)

In browser console:

```javascript
// Test download
fetch('/api/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        quality: '360p'
    })
})
.then(r => {
    console.log('Response status:', r.status);
    console.log('Response headers:', r.headers);
    return r.blob();
})
.then(blob => {
    console.log('Blob size:', blob.size);
    console.log('Blob type:', blob.type);
    
    // Try to download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test.mp4';
    a.click();
});
```

**Expected Output**:
- Response status: 200
- Blob size: > 0 (should be several MB)
- File should download

### 3. Check Server Logs

Look at your terminal where `npm run dev` is running. You should see:

```
[Scrape] Processing: https://www.youtube.com/watch?v=dQw4w9WgXcQ
[YouTube Scraper] Found X formats
[Download API] Processing: https://www.youtube.com/watch?v=dQw4w9WgXcQ
[Download API] Selected: 360p mp4
[Download API] Downloading from: https://...
[Download API] Success: filename.mp4 (12345678 bytes)
```

### 4. Common Issues & Fixes

#### Issue: "Only showing one quality (360p)"
**Cause**: ytdl-core not returning multiple formats
**Fix**: Check if ytdl-core is working:
```javascript
// In browser console
fetch('/api/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
})
.then(r => r.json())
.then(data => console.log('Formats count:', data.formats?.length));
```

If it returns only 1 format, ytdl-core might be outdated or blocked.

#### Issue: "Access denied" error
**Cause**: YouTube URL expired or requires signature
**Fix**: ytdl-core should handle this automatically. If not, the URL might be region-locked.

#### Issue: "Download not starting"
**Cause**: Blob not being created or download not triggered
**Fix**: Check browser console for errors

### 5. Manual Test

1. Go to http://localhost:3000
2. Paste: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. Click "Get Video"
4. Check how many quality options appear
5. Click "Download" on any quality
6. Check browser console and terminal for errors

### 6. If Still Not Working

Run these commands in terminal:

```bash
# Update ytdl-core to latest
npm install ytdl-core@latest

# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

Then test again.

---

## Expected Behavior

✅ **Scrape API** should return 5-10 formats (1080p, 720p, 480p, 360p, audio)
✅ **Download API** should return a file blob (several MB)
✅ **Frontend** should trigger download immediately
✅ **No "Access denied" errors**

---

## Debug Checklist

- [ ] `/api/scrape` returns multiple formats
- [ ] Each format has a valid `downloadUrl`
- [ ] `/api/download` returns status 200
- [ ] Response has `Content-Disposition: attachment` header
- [ ] Blob size is > 0
- [ ] Browser triggers download
- [ ] No console errors

---

**Run the tests above and let me know what you see!**
