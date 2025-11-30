const fs = require('fs');
const ytdl = require('@distube/ytdl-core');

async function testDownload() {
    const url = 'https://youtu.be/10Oc4u3H7sM';
    console.log('Testing download for:', url);

    try {
        console.log('Fetching info...');
        const info = await ytdl.getInfo(url);
        console.log('Info fetched. Title:', info.videoDetails.title);

        // Find 360p format
        const format = info.formats.find(f =>
            f.qualityLabel === '360p' && f.hasVideo && f.hasAudio
        );

        if (!format) {
            console.error('Could not find 360p format with audio');
            return;
        }

        console.log('Found format:', format.qualityLabel, format.container);

        console.log('Starting download stream...');
        const stream = ytdl.downloadFromInfo(info, { format: format });

        const chunks = [];
        stream.on('data', (chunk) => {
            process.stdout.write('.');
            chunks.push(chunk);
        });

        stream.on('end', () => {
            console.log('\nDownload finished!');
            console.log('Total size:', Buffer.concat(chunks).length);
        });

        stream.on('error', (err) => {
            console.error('\nStream Error:', err);
        });

    } catch (err) {
        console.error('Global Error:', err);
    }
}

testDownload();
