const testUrl = 'https://youtu.be/10Oc4u3H7sM';

console.log('Testing scraper API with URL:', testUrl);

fetch('http://localhost:3000/api/scrape', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: testUrl }),
})
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('\n=== API Response ===');
        console.log('Success:', data.success);
        console.log('Platform:', data.platform);
        console.log('Title:', data.title);
        console.log('Number of formats:', data.formats?.length || 0);

        if (data.formats && data.formats.length > 0) {
            console.log('\n=== Available Formats ===');
            data.formats.forEach((format, index) => {
                console.log(`${index + 1}. ${format.quality} ${format.format} (${format.size})`);
                console.log(`   URL: ${format.downloadUrl ? format.downloadUrl.substring(0, 100) + '...' : 'N/A'}`);
            });
        } else {
            console.log('\n⚠️ No formats found!');
            console.log('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('❌ Error:', error.message);
    });
