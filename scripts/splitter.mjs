// splitter.mjs
// Crop daily image into 100 vertical parts (each item gets its own stat image)

import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

// مسیر ورودی تصویر کامل روزانه
const inputPath = 'daily/clothing/women/001.png';

// مسیر خروجی برای ذخیره تصاویر برش‌خورده
const outputDir = 'daily/clothing/women/sliced';

// تعداد آیتم‌هایی که در تصویر هستند (می‌تونه کمتر از 100 هم باشه)
const itemCount = 100;

// سایز هر آیتم (عرض و ارتفاع هر برش)
const itemWidth = 390;
const itemHeight = 300;

(async () => {
  // بارگذاری تصویر اصلی
  const image = await loadImage(inputPath);

  // اطمینان از وجود پوشه خروجی
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < itemCount; i++) {
    const canvas = createCanvas(itemWidth, itemHeight);
    const ctx = canvas.getContext('2d');

    // برش تصویر با استفاده از موقعیت y متغیر
    ctx.drawImage(image, 0, -i * itemHeight);

    // ساخت نام فایل مثل p001، p002، …، p100
    const filename = p${String(i + 1).padStart(3, '0')}.png;
    const outputPath = path.join(outputDir, filename);

    // نوشتن فایل خروجی
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
  }
})();
