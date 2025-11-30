const youtubedl = require('youtube-dl-exec');

async function testYtDlp() {
    const url = 'https://youtu.be/10Oc4u3H7sM';
    console.log('Testing yt-dlp for:', url);

    try {
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: [
                'referer:youtube.com',
                'user-agent:googlebot'
            ]
        });

        console.log('Title:', output.title);
        console.log('Formats:', output.formats.length);

        // Find a format
        const format = output.formats.find(f => f.format_note === '360p' && f.acodec !== 'none');
        if (format) {
            console.log('Found 360p format:', format.url);
        } else {
            console.log('No 360p format found');
        }

    } catch (err) {
        console.error('yt-dlp Error:', err);
    }
}

testYtDlp();
