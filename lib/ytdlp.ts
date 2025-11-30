import YTDlpWrap from 'yt-dlp-wrap';
import fs from 'fs';
import path from 'path';

const BINARY_PATH = path.join(process.cwd(), 'yt-dlp');

let ytDlpWrap: YTDlpWrap | null = null;

export async function getYtDlp(): Promise<YTDlpWrap> {
    if (ytDlpWrap) return ytDlpWrap;

    if (!fs.existsSync(BINARY_PATH)) {
        console.log('Downloading yt-dlp binary...');
        await YTDlpWrap.downloadFromGithub(BINARY_PATH);
        console.log('yt-dlp binary downloaded.');
    }

    ytDlpWrap = new YTDlpWrap(BINARY_PATH);
    return ytDlpWrap;
}
