// splitter.mjs
// نسخه نهایی برای برش خودکار همه تصاویر موجود در پوشه daily/clothing/women/
// هر فایل به 10 آیتم (p001 تا p010 و ...) برش داده می‌شود و در مسیر docs/clothing/women/001/ و ... ذخیره می‌گردد

import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

// 🔧 تنظیمات ثابت برش
const inputDir = 'stats/daily/clothing/women/';;     // مسیر ورودی تصاویر اصلی
const outputDirBase = 'docs/clothing/women/'; // پوشه خروجی برای ذخیره برش‌ها

const startX = 0;           // برش از پیکسل افقی
const startY = 30;          // برش از پیکسل عمودی
const cropWidth = 450;      // عرض هر بخش برش خورده
const cropHeight = 516;     // ارتفاع هر بخش
const itemCount = 10;       // تعداد برش از بالا به پایین برای هر تصویر

// 📂 گرفتن لیست فایل‌های PNG از مسیر ورودی
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

// 🔁 حلقه روی هر فایل برای پردازش جداگانه
for (const file of files) {
  const fileNameWithoutExt = path.parse(file).name; // مثلا "001"
  const inputPath = path.join(inputDir, file);      // مسیر کامل فایل مبدا
  const outputDir = path.join(outputDirBase, fileNameWithoutExt); // docs/clothing/women/001

  // اگر پوشه خروجی وجود ندارد، بساز
  fs.mkdirSync(outputDir, { recursive: true });

  const image = await loadImage(inputPath);

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

    // ساخت نام فایل خروجی: p001.png تا p010.png
    const filename = `p${fileNameWithoutExt}${String(i + 1).padStart(2, '0')}.png`;
    const outputPathFull = path.join(outputDir, filename);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPathFull, buffer);
  }

  console.log(`✅ ${file} split into ${itemCount} parts.`);
}

console.log(`🎉 All files processed successfully.`);
