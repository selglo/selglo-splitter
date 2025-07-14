import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

// تنظیمات ورودی
const imageUrl = 'https://selglo.github.io/selglo-stats-english/daily/clothing/women/001.png';
const outputDir = 'daily/clothing/women/sliced/';
const itemCount = 10;
const itemWidth = 390;
const itemHeight = 300;

// اطمینان از وجود پوشه خروجی
fs.mkdirSync(outputDir, { recursive: true });

const image = await loadImage(imageUrl);

for (let i = 0; i < itemCount; i++) {
  const canvas = createCanvas(itemWidth, itemHeight);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, i * -itemHeight);

  const outputPath = path.join(outputDir, `p00${i + 1}.png`);
  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
}
