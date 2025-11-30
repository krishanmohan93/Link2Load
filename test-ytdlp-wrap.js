const YTDlpWrap = require('yt-dlp-wrap').default;
const fs = require('fs');

async function testYtDlpWrap() {
    console.log('Downloading yt-dlp binary...');
    await YTDlpWrap.downloadFromGithub();
    console.log('Binary downloaded.');

    const ytDlpWrap = new YTDlpWrap();
    const url = 'https://youtu.be/10Oc4u3H7sM';
    console.log('Testing yt-dlp for:', url);

    try {
        const metadata = await ytDlpWrap.getVideoInfo(url);
        console.log('Title:', metadata.title);

        // Find 360p format
        const format = metadata.formats.find(f => f.format_note === '360p' && f.acodec !== 'none');
        if (format) {
            console.log('Found 360p format:', format.url);
        } else {
            console.log('No 360p format found');
        }

    } catch (err) {
        console.error('yt-dlp Error:', err);
    }
}

testYtDlpWrap();
