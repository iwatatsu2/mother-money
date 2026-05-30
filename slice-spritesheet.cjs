const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const SRC = '/Users/iwamototatsuya/Downloads/Gemini_Generated_Image_e2kqq3e2kqq3e2kq.png';
const OUT = path.join(__dirname, 'public', 'sprites');
fs.mkdirSync(OUT, { recursive: true });

// 2816×1536 sprite sheet - coordinates from pixel analysis
const SPRITES = [
  // Row 1 - Tiles (pixel-analyzed: each ~308px wide at y:22-330)
  ['grass',    22,   22,  308, 308],
  ['path',     374,  22,  308, 308],
  ['water',    726,  22,  308, 308],
  ['tree',     1431, 23,  306, 320],

  // Row 2 - More tiles (y:300-600)
  ['flower',   22,   300, 309, 400],
  ['fence',    374,  300, 309, 400],
  ['road',     727,  300, 306, 400],
  ['sand',     1078, 300, 308, 400],

  // Row 3 - 6 large buildings (y:650-1100)
  ['home',     58,   710, 236, 390],
  ['bank',     375,  710, 306, 390],
  ['school',   727,  710, 306, 390],
  ['shop',     1079, 710, 306, 390],
  ['stock',    1548, 650, 482, 410],
  ['station',  2252, 650, 424, 410],

  // Row 4 - Characters (start y=1140 to avoid Row 3 artifacts)
  ['player_down',   70,  1140, 201, 390],
  ['player_up',    434,  1140, 200, 390],
  ['player_left',  797,  1140, 177, 390],
  ['player_right', 1149, 1140, 177, 390],

  // Row 4 - Vehicles (pixel-analyzed)
  ['bike',    1466, 1254, 224, 212],
  ['car',     1818, 1254, 271, 236],
  ['plane',   2170, 1219, 236, 259],
  ['rocket',  2571, 1184, 152, 341],
];

// Also need: dark, stone (not in sprite sheet - keep existing)

async function sliceAll() {
  console.log('Loading sprite sheet...');
  const img = await Jimp.read(SRC);
  console.log(`Loaded: ${img.getWidth()}×${img.getHeight()}\n`);

  for (const [name, x, y, w, h] of SPRITES) {
    const cx = Math.max(0, Math.min(x, img.getWidth()));
    const cy = Math.max(0, Math.min(y, img.getHeight()));
    const cw = Math.min(w, img.getWidth() - cx);
    const ch = Math.min(h, img.getHeight() - cy);

    const cropped = img.clone().crop(cx, cy, cw, ch);

    // Remove white/near-white background → transparent
    const WHITE_THRESH = 235;
    cropped.scan(0, 0, cropped.getWidth(), cropped.getHeight(), function(px, py, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      if (r > WHITE_THRESH && g > WHITE_THRESH && b > WHITE_THRESH) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    // Autocrop transparent borders
    let minX = cw, minY = ch, maxX = 0, maxY = 0;
    cropped.scan(0, 0, cropped.getWidth(), cropped.getHeight(), function(px, py, idx) {
      if (this.bitmap.data[idx + 3] > 0) {
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      }
    });

    const result = (minX < maxX && minY < maxY)
      ? cropped.clone().crop(minX, minY, maxX - minX + 1, maxY - minY + 1)
      : cropped;

    const outPath = path.join(OUT, `${name}.png`);
    await result.writeAsync(outPath);
    console.log(`✓ ${name} (${result.getWidth()}×${result.getHeight()}) → ${outPath}`);
  }

  console.log(`\nDone! ${SPRITES.length} sprites sliced.`);
  console.log('Note: dark.png and stone.png kept from previous generation.');
}

sliceAll().catch(console.error);
