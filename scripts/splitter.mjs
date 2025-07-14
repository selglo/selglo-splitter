import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

// 🟢 تنظیمات ورودی و خروجی --------------------

const inputPath = 'stats/daily/clothing/women/001.png'; // مسیر فایل اصلی
const outputDir = 'daily/clothing/women/sliced/';       // مسیر ذخیره برش‌ها

const startX = 5;       // از چند پیکسل از چپ تصویر شروع شود
const startY = 5;       // از چند پیکسل از بالا تصویر شروع شود
const cropWidth = 300;  // عرض هر برش
const cropHeight = 200; // ارتفاع هر برش
const itemCount = 10;   // چند آیتم پشت‌سر‌هم برش داده شود (مثلاً 10 ردیف)

// 🟢 بارگذاری تصویر ---------------------------

const image = await loadImage(inputPath);

// اگر پوشه خروجی وجود ندارد، آن را بساز
fs.mkdirSync(outputDir, { recursive: true });

// 🟢 حلقه برش و ذخیره فایل‌ها ------------------

for (let i = 0; i < itemCount; i++) {
  const canvas = createCanvas(cropWidth, cropHeight);
  const ctx = canvas.getContext('2d');

  // برش از تصویر اصلی
  ctx.drawImage(
    image,
    startX,                          // از کجای عرض تصویر
    startY + i * cropHeight,         // از کجای ارتفاع (افزایشی برای هر ردیف)
    cropWidth, cropHeight,           // چه عرض و ارتفاعی ببرد
    0, 0,                            // روی بوم، از کجا رسم کند
    cropWidth, cropHeight            // چه اندازه‌ای روی بوم بکشد (بدون تغییر مقیاس)
  );

  // تولید نام خروجی مثل p001.png
  const filename = p${String(i + 1).padStart(3, '0')}.png;
  const outputPath = path.join(outputDir, filename);

  // ذخیره در مسیر خروجی
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

console.log(`✅ Split done! ${itemCount} items saved in: ${outputDir}`);
