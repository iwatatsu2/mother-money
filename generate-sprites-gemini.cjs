const { GoogleGenerativeAI } = require('@google/generative-ai');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const API_KEY = 'AIzaSyCJ1fm6toSg_vfL47rGHmV3VLQ1k7_uOBM';
const OUT = path.join(__dirname, 'public', 'sprites');
fs.mkdirSync(OUT, { recursive: true });

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const STYLE_INSTRUCTION = `You are a professional pixel artist specializing in MOTHER 2 / EarthBound (SNES, 1994) style sprites.

OUTPUT FORMAT: Return ONLY a JSON object with this structure:
{
  "palette": { "a": "#ff0000", "b": "#0000ff", ... },
  "rows": ["abc..", "def..", ...]
}

Rules:
- "." means transparent pixel
- Each character in palette maps to a hex color
- Use single lowercase/uppercase letters or digits as palette keys
- Every row must be EXACTLY the specified width
- Number of rows must be EXACTLY the specified height
- Use warm, rich colors typical of MOTHER2/EarthBound
- Include proper shading (light source from upper-left)
- Use black (#1a1a2e) outlines around sprites
- Make it look like authentic SNES pixel art with 2-3 shading levels per color`;

const SPRITES = [
  // Tiles 16×16
  { name: 'grass', w: 16, h: 16, prompt: 'A lush green grass ground tile. Seamless tileable. Multiple shades of green with subtle variation pattern. NO outline needed for tiles.' },
  { name: 'path', w: 16, h: 16, prompt: 'A warm dirt/earth path tile. Seamless tileable. Beige/tan/brown tones.' },
  { name: 'water', w: 16, h: 16, prompt: 'A blue water tile with gentle wave highlights. Seamless tileable. Blue tones with white/cyan wave crests.' },
  { name: 'tree', w: 16, h: 16, prompt: 'A single round tree top-down view. Lush round green canopy (dark green shadow on right, light green highlight on left), brown trunk visible at bottom center. Transparent background around the tree.' },
  { name: 'flower', w: 16, h: 16, prompt: 'Green grass tile with small scattered flowers (red, pink, yellow, white dots). Seamless tileable.' },
  { name: 'fence', w: 16, h: 16, prompt: 'A wooden fence tile with vertical posts and horizontal rails. Brown wood tones. Transparent or dark background between slats.' },
  { name: 'road', w: 16, h: 16, prompt: 'A dark gray asphalt road tile with very subtle texture. Seamless tileable.' },
  { name: 'sand', w: 16, h: 16, prompt: 'A warm sandy beach tile. Yellow-beige tones with subtle grain. Seamless tileable.' },
  { name: 'stone', w: 16, h: 16, prompt: 'A gray cobblestone/brick tile. Light and dark gray stones with mortar lines between them. Seamless tileable.' },
  { name: 'dark', w: 16, h: 16, prompt: 'A very dark indoor floor tile. Dark blue-purple-gray tones. Seamless tileable.' },

  // Buildings 32×32
  { name: 'home', w: 32, h: 32, prompt: 'A cozy house like in EarthBound. Red/orange triangular roof on top half, cream/beige walls on bottom half, two blue windows with white frames, brown wooden door at bottom center. Front-facing view. Transparent background.' },
  { name: 'bank', w: 32, h: 32, prompt: 'A grand bank building like in EarthBound. Classical facade with 4 white columns, triangular pediment on top with gold/yellow trim, stone gray walls, large wooden door. Front-facing view. Transparent background.' },
  { name: 'school', w: 32, h: 32, prompt: 'A school building like in EarthBound. Yellow/cream walls, small clock tower on top, 3 rows of blue windows, red/brown entrance door at bottom. Front-facing view. Transparent background.' },
  { name: 'shop', w: 32, h: 32, prompt: 'A cute shop/store like in EarthBound. Red and white striped awning on top, large display window showing colorful items, welcoming brown door at bottom. Front-facing view. Transparent background.' },
  { name: 'stock', w: 32, h: 32, prompt: 'A modern stock exchange building like in EarthBound. Teal/cyan glass facade, electronic ticker display across the front showing green/red numbers, sleek entrance. Front-facing view. Transparent background.' },
  { name: 'station', w: 32, h: 32, prompt: 'A train station like in EarthBound. Wide gray/blue roof with platform canopy, clock on front, arched entrance with track lines visible, brick base. Front-facing view. Transparent background.' },

  // Player 24×32
  { name: 'player_down', w: 24, h: 32, prompt: 'A boy character facing DOWN (toward viewer) like Ness from EarthBound. Big round head, red baseball cap, round black eyes, smile. Blue striped yellow shirt, blue shorts, red shoes. Chibi proportions (head is 40% of body). Standing pose. Transparent background.' },
  { name: 'player_up', w: 24, h: 32, prompt: 'Same boy character facing UP (back view, away from viewer). Red cap visible from behind, yellow/blue shirt back, blue shorts, red shoes. Standing. Transparent background.' },
  { name: 'player_left', w: 24, h: 32, prompt: 'Same boy character facing LEFT. Side profile, red cap brim visible, one eye visible, yellow/blue shirt, blue shorts, red shoes. Standing. Transparent background.' },
  { name: 'player_right', w: 24, h: 32, prompt: 'Same boy character facing RIGHT. Side profile mirror of left, red cap brim visible, yellow/blue shirt, blue shorts, red shoes. Standing. Transparent background.' },

  // Vehicles
  { name: 'bike', w: 24, h: 24, prompt: 'A small red bicycle, side view, simple cute pixel art style. Red frame, black wheels with spokes, silver handlebars. Transparent background.' },
  { name: 'car', w: 32, h: 24, prompt: 'A cute small red car, 3/4 top-down view. Rounded body, windshield, two black wheels visible, white headlights. Transparent background.' },
  { name: 'plane', w: 32, h: 28, prompt: 'A small white airplane, top-down view. Wings spread, two engines, tail fin, cockpit windshield in blue. Transparent background.' },
  { name: 'rocket', w: 24, h: 32, prompt: 'A rocket ship pointing up. White body, red nose cone, red fins at bottom, circular blue window, orange flames shooting from bottom. Transparent background.' },
];

async function generateSprite(sprite) {
  const { name, w, h, prompt } = sprite;
  console.log(`\nGenerating ${name} (${w}×${h})...`);

  const fullPrompt = `${STYLE_INSTRUCTION}

Generate a ${w}×${h} pixel sprite:
${prompt}

IMPORTANT: Output ONLY valid JSON. The "rows" array must have exactly ${h} strings, each exactly ${w} characters long. Use "." for transparent pixels.`;

  try {
    const result = await model.generateContent(fullPrompt);
    let text = result.response.text();

    // Extract JSON from response (may be wrapped in markdown code block)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log(`  ✗ ${name}: No JSON found in response`);
      console.log(`  Response: ${text.substring(0, 200)}`);
      return false;
    }

    const data = JSON.parse(jsonMatch[0]);
    const { palette, rows } = data;

    if (!palette || !rows || !Array.isArray(rows)) {
      console.log(`  ✗ ${name}: Invalid JSON structure`);
      return false;
    }

    // Normalize rows
    const normalizedRows = rows.map(row => {
      if (row.length < w) return row + '.'.repeat(w - row.length);
      if (row.length > w) return row.substring(0, w);
      return row;
    });

    // Pad or truncate rows array
    while (normalizedRows.length < h) normalizedRows.push('.'.repeat(w));
    if (normalizedRows.length > h) normalizedRows.length = h;

    // Convert hex string to jimp color
    function hexToColor(hex) {
      const clean = hex.replace('#', '');
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return Jimp.rgbaToInt(r, g, b, 255);
    }

    // Build color map
    const colorMap = {};
    for (const [key, hex] of Object.entries(palette)) {
      try {
        colorMap[key] = hexToColor(hex);
      } catch (e) {
        console.log(`  Warning: Invalid color for '${key}': ${hex}`);
      }
    }

    // Create image
    const img = new Jimp(w, h, 0x00000000);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ch = normalizedRows[y][x];
        if (ch !== '.' && colorMap[ch] !== undefined) {
          img.setPixelColor(colorMap[ch], x, y);
        }
      }
    }

    const outPath = path.join(OUT, `${name}.png`);
    await img.writeAsync(outPath);
    console.log(`  ✓ ${name} → ${outPath} (palette: ${Object.keys(palette).length} colors)`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Generating ${SPRITES.length} MOTHER2-style sprites via Gemini 2.0 Flash...\n`);

  let success = 0, fail = 0;

  for (const sprite of SPRITES) {
    const ok = await generateSprite(sprite);
    if (ok) success++; else fail++;
    // Rate limit: free tier is 15 RPM
    await new Promise(r => setTimeout(r, 4500));
  }

  console.log(`\n════════════════════`);
  console.log(`Done! ${success} succeeded, ${fail} failed out of ${SPRITES.length}.`);
}

main().catch(console.error);
