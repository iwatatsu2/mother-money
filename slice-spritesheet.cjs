const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const SRC = '/Users/iwamototatsuya/Downloads/Gemini_Generated_Image_e2kqq3e2kqq3e2kq.png';
const OUT = path.join(__dirname, 'public', 'sprites');
fs.mkdirSync(OUT, { recursive: true });

// 2816×1536 sprite sheet layout (Gemini MOTHER2 style)
// Row 1 (y:10-305): grass, path, water, tree(1st), [tree2], home_s, bank_s, school_s
// Row 2 (y:320-610): flower, fence, road, sand, [gap], stock_big, station_big
// Row 3 (y:630-1050): home, bank, school, shop, stock, station
// Row 4 (y:1080-1500): player×4, bike, car, plane, rocket

const SPRITES = [
  // Row 1 - Tiles (~270px each)
  ['grass',    15,   15,  265, 265],
  ['path',     295,  15,  265, 265],
  ['water',    575,  15,  265, 265],
  ['tree',     860,  10,  230, 300],

  // Row 1 right - small buildings (for reference, using Row 3 large versions instead)
  // tree2 ~1130,10  home_s ~1430,30  bank_s ~1750,30  school_s ~2050,30

  // Row 2 - More tiles
  ['flower',   15,   330, 265, 265],
  ['fence',    305,  330, 255, 265],
  ['road',     580,  330, 265, 265],
  ['sand',     870,  330, 265, 265],

  // Row 3 - All 6 large buildings
  ['home',     20,   690, 400, 400],
  ['bank',     420,  690, 430, 400],
  ['school',   860,  680, 440, 410],
  ['shop',     1320, 680, 440, 410],
  ['stock',    1760, 680, 360, 410],
  ['station',  2200, 680, 500, 410],

  // Row 4 - Characters (Ness-like)
  ['player_down',   10,  1080, 260, 430],
  ['player_up',    240,  1080, 260, 430],
  ['player_left',  470,  1080, 260, 430],
  ['player_right', 680,  1080, 260, 430],

  // Row 4 - Vehicles
  ['bike',    930,  1130, 310, 380],
  ['car',     1250, 1160, 370, 330],
  ['plane',   1660, 1130, 450, 360],
  ['rocket',  2200, 1060, 320, 450],
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
    // Use flood-fill from corners approach: any pixel connected to corners that is white
    const WHITE_THRESH = 242;
    cropped.scan(0, 0, cropped.getWidth(), cropped.getHeight(), function(px, py, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      if (r > WHITE_THRESH && g > WHITE_THRESH && b > WHITE_THRESH) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    // Auto-crop transparent borders
    const autoCropped = cropped.autocrop({ tolerance: 0, cropOnlyFrames: false });

    const outPath = path.join(OUT, `${name}.png`);
    await autoCropped.writeAsync(outPath);
    console.log(`✓ ${name} (${autoCropped.getWidth()}×${autoCropped.getHeight()}) → ${outPath}`);
  }

  console.log(`\nDone! ${SPRITES.length} sprites sliced.`);
  console.log('Note: dark.png and stone.png kept from previous generation.');
}

sliceAll().catch(console.error);
