const play = require('play-dl');
const fs = require('fs');

async function testPlayDl() {
    const url = 'https://youtu.be/10Oc4u3H7sM';
    console.log('Testing play-dl for:', url);

    try {
        const video_info = await play.video_info(url);
        console.log('Title:', video_info.video_details.title);

        const stream = await play.stream(url);
        console.log('Stream created:', stream.type);

        // Try to read a bit
        const chunks = [];
        stream.stream.on('data', (chunk) => {
            process.stdout.write('.');
            chunks.push(chunk);
            if (chunks.length > 10) {
                stream.stream.destroy();
            }
        });

        stream.stream.on('end', () => {
            console.log('\nStream ended (test)');
        });

        stream.stream.on('error', (err) => {
            console.error('\nStream Error:', err);
        });

    } catch (err) {
        console.error('Play-dl Error:', err);
    }
}

testPlayDl();
