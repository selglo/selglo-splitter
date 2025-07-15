import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

// 🔧 تنظیمات برش تصویر
const inputPath = 'stats/daily/clothing/women/001.png';     // مسیر تصویر مبدا (از submodule)
const outputDir = 'docs/clothing/women/';           // مسیر ذخیره خروجی‌ها

const startX = 5;       // از چند پیکسل از چپ تصویر شروع شود
const startY = 5;       // از چند پیکسل از بالا تصویر شروع شود
const cropWidth = 300;  // عرض هر برش
const cropHeight = 200; // ارتفاع هر برش
const itemCount = 10;   // چند آیتم پشت‌سر‌هم برش داده شود (مثلاً 10 ردیف)

const image = await loadImage(inputPath);

// اگر پوشه خروجی وجود ندارد، ایجادش کن
fs.mkdirSync(outputDir, { recursive: true });

// 🔁 حلقه برش و ذخیره
for (let i = 0; i < itemCount; i++) {
  const canvas = createCanvas(cropWidth, cropHeight);
  const ctx = canvas.getContext('2d');

  // برش از تصویر اصلی
  ctx.drawImage(
    image,
    startX,
    startY + i * cropHeight,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  // ذخیره به صورت p001.png تا p010.png
  const filename = p${String(i + 1).padStart(3, '0')}.png;
  const outputPathFull = path.join(outputDir, filename);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPathFull, buffer);
}

console.log(✅ Split done! ${itemCount} items saved in: ${outputDir});
