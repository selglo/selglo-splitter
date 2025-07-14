import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

// گرفتن آرگومان ورودی مثل --input=stats/daily/clothing/women/001.png
const args = process.argv.slice(2);
const inputArg = args.find(arg => arg.startsWith('--input='));

if (!inputArg) {
  console.error('❌ Input path is required. Use --input=...');
  process.exit(1);
}

const INPUT_PATH = inputArg.split('=')[1];
const RELATIVE_PATH = INPUT_PATH.replace(/^stats\/daily\//, '').replace('.png', '');
const OUTPUT_DIR = path.join('daily', RELATIVE_PATH, 'sliced');

const NUM_ITEMS = 10;
const WIDTH = 390;
const HEIGHT_PER_ITEM = 300;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const run = async () => {
  const image = await loadImage(INPUT_PATH);

  for (let i = 0; i < NUM_ITEMS; i++) {
    const canvas = createCanvas(WIDTH, HEIGHT_PER_ITEM);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      0, i * HEIGHT_PER_ITEM,
      WIDTH, HEIGHT_PER_ITEM,
      0, 0,
      WIDTH, HEIGHT_PER_ITEM
    );

    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join(OUTPUT_DIR, `p${String(i + 1).padStart(3, '0')}.png`);
    fs.writeFileSync(outputPath, buffer);
  }

  console.log(`✅ Slicing completed: ${OUTPUT_DIR}`);
};

run();
