const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'public', 'sprites');
fs.mkdirSync(OUT, { recursive: true });

// ══════════════════════════════════════
// MOTHER2-inspired extended palette
// ══════════════════════════════════════
const PAL = {
  '.': null, // transparent
  // Base
  'k': 0x1a1a2eff, // outline dark
  'K': 0x2a2a3eff, // soft outline
  'w': 0xffffffff, // white
  'W': 0xe8e8e8ff, // off-white
  // Skin tones (warm, MOTHER2 style)
  's': 0xffd8b0ff, // skin light
  'S': 0xeebb88ff, // skin mid
  'e': 0xd49860ff, // skin shadow
  'E': 0xb87840ff, // skin deep shadow
  // Reds (cap/shoes - Ness-like)
  'r': 0xe84848ff, // red bright
  'R': 0xc03030ff, // red dark
  'a': 0x901818ff, // red deepest
  // Blues (shirt/jeans)
  'b': 0x5090e0ff, // blue
  'B': 0x3868b0ff, // blue dark
  '1': 0x284880ff, // blue deeper
  // Yellows
  'y': 0xf8d848ff, // yellow bright
  'Y': 0xd0b030ff, // yellow dark
  '2': 0xa89020ff, // yellow deep
  // Greens (grass, trees - MOTHER2's lush greens)
  'g': 0x58a848ff, // grass green
  'G': 0x408838ff, // grass dark
  '3': 0x306828ff, // grass deeper
  '4': 0x78c858ff, // grass light
  '5': 0x98d878ff, // grass highlight
  // Tree greens (darker, richer)
  'd': 0x48a040ff, // leaf green
  'D': 0x308030ff, // leaf dark
  '6': 0x206020ff, // leaf shadow
  '7': 0x68b858ff, // leaf light
  '8': 0x88d070ff, // leaf highlight
  // Browns (earth, wood, trunks)
  'n': 0x906830ff, // brown
  'N': 0x704818ff, // brown dark
  't': 0x886020ff, // trunk
  'T': 0x684010ff, // trunk dark
  'i': 0xc8a868ff, // light wood
  'I': 0xa08848ff, // mid wood
  // Path/sand colors
  'l': 0xd8c888ff, // beige light
  'L': 0xc0b070ff, // beige dark
  '9': 0xe8d898ff, // sand light
  '0': 0xb8a060ff, // sand dark
  // Grays (stone, metal)
  'm': 0x989898ff, // gray
  'M': 0x707070ff, // gray dark
  'x': 0xb0b0b0ff, // gray light
  'X': 0x585858ff, // gray deep
  // Water (MOTHER2 blue tones)
  'c': 0x58a8d8ff, // water light
  'C': 0x3878a8ff, // water mid
  'h': 0x205880ff, // water dark
  'H': 0x78c8f0ff, // water highlight
  // Oranges
  'o': 0xf08030ff, // orange
  'O': 0xc06020ff, // dark orange
  // Pinks/purples
  'p': 0xe870a0ff, // pink
  'P': 0xb85080ff, // dark pink
  // Cyan
  'q': 0x50d0d0ff, // cyan
  'Q': 0x38a0a0ff, // dark cyan
  // Roof tile colors
  'f': 0xd85040ff, // roof red
  'F': 0xb03828ff, // roof dark red
  'v': 0xa04030ff, // roof deep
  // Window
  'j': 0x88c8f8ff, // window blue
  'J': 0x60a0d0ff, // window dark
  'z': 0xa8d8f8ff, // window highlight
  // Door
  'u': 0xb07030ff, // door brown
  'U': 0x885020ff, // door dark
  // Purple
  'V': 0x8860b0ff, // purple
  'Z': 0x684090ff, // dark purple
};

function makeSprite(rows, w) {
  const h = rows.length;
  const img = new Jimp(w, h, 0x00000000);
  for (let y = 0; y < h; y++) {
    const row = rows[y];
    for (let x = 0; x < w; x++) {
      const ch = x < row.length ? row[x] : '.';
      const c = PAL[ch];
      if (c) img.setPixelColor(c, x, y);
    }
  }
  return img;
}

// ══════════════════════════════════════
// TILE SPRITES (16×16) - MOTHER2 textured
// ══════════════════════════════════════
const sprites = {};

// GRASS - lush MOTHER2 style with subtle pattern
sprites.grass = {
  w: 16, rows: [
    'gG4gggGg4gggGggg',
    'gg5gGggg4gGgggGg',
    'gGggg4gGggggg4gg',
    'ggggGggg5gGg4ggg',
    'g4ggg5ggGggggGgg',
    'gGgGgggggg4ggggg',
    'ggg4gGgGgggggG4g',
    'gGggggg4gGg5gggg',
    'ggGg4gggggggg4Gg',
    'g4ggGgGg4gggGggg',
    'ggggg4gGggg4ggGg',
    'gGg5ggggGggggggg',
    'gg4gGg4ggg5gGg4g',
    'gggggGggg4ggggGg',
    'gGg4gggg5ggGgggg',
    'ggGggGg4ggggg4Gg',
  ]
};

// PATH - MOTHER2 dirt path
sprites.path = {
  w: 16, rows: [
    'lLl9lLllL9llLl9l',
    'Ll9lllLll0lLlllL',
    'l0lLl9lLllll9lLl',
    'LllllL0llLl0llll',
    'l9lLlll9lllllLl9',
    'llll0lLllL9lLlll',
    'lLl9lllLlll0ll9l',
    'Ll0llLl9llLlllLl',
    'l9lllll0lLlll9ll',
    'lllLl9llllL0lLll',
    'lL0llllLl9lllll9',
    'llll9lLllll9lLll',
    'l9lLlll0lLlllLl0',
    'Lllll9lllll0llll',
    'lLl0lLll9lLlll9l',
    'l9lllll0llllLlll',
  ]
};

// ROAD - asphalt with subtle texture
sprites.road = {
  w: 16, rows: [
    'MXMMMXMMMMXMMMMx',
    'MMMMMMXMMMMMXMMM',
    'XMMxMMMMMXMMMMMM',
    'MMMMMMMXMMMMXMMM',
    'MMXMMMMMMMMMMMxM',
    'MMMMMXMMMMXMMMMM',
    'MxMMMMMXMMMMMMMX',
    'MMMMXMMMMMMMXMMM',
    'MMMMMMMxMMMMMMMM',
    'MXMMMMMMMXMMMxMM',
    'MMMxMMMMMMMMMMMX',
    'MMMMMMXMMMMXMMMM',
    'MxMMMMMMMMMMMMMM',
    'MMMMMxMMXMMMMMxM',
    'MMMMMMMMMMMXMMMM',
    'XMMMxMMMMMMMMMXM',
  ]
};

// SAND - warm beach MOTHER2
sprites.sand = {
  w: 16, rows: [
    '9090990909009900',
    '099009009099090l',
    '90990990090090l9',
    '009009909009909l',
    '990900090990009l',
    '090990900090900l',
    '9009009099009090',
    '0990990090900990',
    '909009009909009l',
    '090990990090990l',
    '9009009009009009',
    '009090990900900l',
    '990900090990099l',
    '099009909009009l',
    '90990090090990l9',
    '009009009900090l',
  ]
};

// STONE - cobblestone texture
sprites.stone = {
  w: 16, rows: [
    'xmmxMxmmMxmxMxmm',
    'mMxmmxmxmmMxmmxm',
    'xmmMxmMxmxmmxmMx',
    'MxmmxmmxMxmMxmmm',
    'mmxMxmxmmxmmMxmx',
    'xmmmmxMxmMxmmxmM',
    'mMxmxmmxmmxmxmmx',
    'xmmMxmMxmMxmMxmx',
    'MxmmxmmxmmxmmxmM',
    'mmxMxmxmMxmxMxmm',
    'xmmmmMxmmxmmmxmx',
    'mxmxmmxmMxmMxmmM',
    'MxmmMxmxmmxmmxmm',
    'mmxmmmMxmxmMxmxm',
    'xmMxmxmmxmmmmxMx',
    'mxmmMxmxMxmxmmxm',
  ]
};

// DARK - night/indoor tile
sprites.dark = {
  w: 16, rows: [
    'KXKKXKKKXKKKKXKK',
    'KKKKXKXKKKKXKKKX',
    'KXKKKKKXKKKKKKXK',
    'KKKKXKKKKXKXKKKK',
    'KXKKKXKKKKKKKXKK',
    'KKKKKKXKKXKKKKKX',
    'KXKKXKKKKKXKKXKK',
    'KKKKKKXKKKKKKKKX',
    'KXKKKKKXKKXKKKXK',
    'KKXKKXKKKKKKXKKK',
    'KKKKKKKXKKXKKKKX',
    'KXKKXKKKKKKKXKKK',
    'KKKKKKXKKXKKKKKK',
    'KXKKXKKKKKKKXKXK',
    'KKKKKKXKXKKKKKKK',
    'KXKKKKKKKXKKXKKK',
  ]
};

// TREE - round, lush MOTHER2 tree
sprites.tree = {
  w: 16, rows: [
    '....k7887k......',
    '...k788d87k.....',
    '..k78dddd8dk....',
    '.k78dddddddDk..',
    '.k8dddddd7dDk..',
    'k7ddddddd8dDDk.',
    'kddddddddddDDk.',
    'k8dddddddddDDk.',
    '.kddddddddDDk..',
    '..kddddddDDk...',
    '...kkddddkk....',
    '.....kttk.......',
    '.....kTtk.......',
    '.....kTTk.......',
    '....kNTTNk......',
    '....kkkkkk......',
  ]
};

// FLOWER - MOTHER2 grass with flowers
sprites.flower = {
  w: 16, rows: [
    'g4grgGg4ggGgpg4g',
    'gGggggg5gggggGgg',
    'g5gpggGggg4grg5g',
    'gggggggg4ggggggg',
    'gGg4grgggGg5ggGg',
    'ggg5gggGgggggggg',
    'g4gggGg5g4gpgggg',
    'gggpggggggggg4gG',
    'gGg5gg4grggGgggg',
    'gggggggggg5ggg4g',
    'g4grgGg5ggggpggg',
    'ggg5ggggg4gggGgg',
    'gGgggpg4ggggrg5g',
    'g5gggggGg5gggggg',
    'ggg4gGggggG5ggGg',
    'gGggggrggggggg4g',
  ]
};

// WATER - animated-look MOTHER2 water
sprites.water = {
  w: 16, rows: [
    'CCcHCCchCCcHCCch',
    'cCCCcHCCcCCCcHCC',
    'CCchCCCCCCchCCCC',
    'cHCCcCChcHCCcCCh',
    'CCCCcHCCCCCCcHCC',
    'cCchCCCCcCchCCCC',
    'CCCCcCChCCCCcCCh',
    'cHCCCHCCcHCCCHCC',
    'CCchCCCCCCchCCCC',
    'cCCCcHCCcCCCcHCC',
    'CCCCCCchCCCCCCch',
    'cHCCcCCCcHCCcCCC',
    'CCcHCCCCCCcHCCCC',
    'cCCCcCChcCCCcCCh',
    'CCchCHCCCCchCHCC',
    'cCCCCCCCcCCCCCCC',
  ]
};

// FENCE - wooden fence MOTHER2 style
sprites.fence = {
  w: 16, rows: [
    '.n.n..n.n..n.n..',
    '.nIn..nIn..nIn..',
    '.nIn..nIn..nIn..',
    'inIniiNIniinIniI',
    '.nIn..nIn..nIn..',
    '.nIn..nIn..nIn..',
    '.nIn..nIn..nIn..',
    'INiNIInINIINiNII',
    '.NiN..NiN..NiN..',
    '.NiN..NiN..NiN..',
    '.NiN..NiN..NiN..',
    'iNiNiiNINiiNiNiI',
    '.NiN..NiN..NiN..',
    '.NiN..NiN..NiN..',
    '.NiN..NiN..NiN..',
    'INiNIINiNIINiNII',
  ]
};

// ══════════════════════════════════════
// BUILDING SPRITES (32×32) - MOTHER2 warm, detailed
// ══════════════════════════════════════

// HOME - cozy MOTHER2 house with red roof
sprites.home = {
  w: 32, rows: [
    '................................',
    '..............kkkk..............',
    '.............kffffk.............',
    '............kffffffk............',
    '...........kffffffffk...........',
    '..........kffffffffffk..........',
    '.........kFFffffffffffk.........',
    '........kFFfffffffFFfffk........',
    '.......kFFffffffFFFfffffk.......',
    '......kFFFfffffFFFFffffffk......',
    '.....kFFFffffFFFFFfffffffFk.....',
    '....kkvvvvvvvvvvvvvvvvvvvvkk....',
    '....killllllllllllllllllllIk....',
    '....kIlljjjjklllllkjjjjllIk....',
    '....kIllzjjjkllllllkjjzllIk....',
    '....kIlljJjjklllllkJjjjllIk....',
    '....kIllkkkkkllllllkkkkkllk....',
    '....kIlllllllllllllllllllIk....',
    '....kIlllllllkuuuuklllllIk....',
    '....kIlllllllkUnnUklllllIk....',
    '....kIlllllllkUnnUklllllIk....',
    '....kIlllllllkUnnUklllllIk....',
    '....kkkkkkkkkkkkkkkkkkkkkkk....',
    '................................',
  ]
};

// BANK - grand stone building
sprites.bank = {
  w: 32, rows: [
    '................................',
    '.........kyyyyyyyyyyyk..........',
    '........kYYYYYYYYYYYYYk.........',
    '.......kkkkkkkkkkkkkkkkkk.......',
    '.......kk..kk..kk..kk..k.......',
    '......kkxkkxkkxkkxkkxkkxkk......',
    '......kxWxkxWxkxWxkxWxkxk......',
    '......kxWxkxWxkxWxkxWxkxk......',
    '......kxWxkxWxkxWxkxWxkxk......',
    '......kxWxkxWxkxWxkxWxkxk......',
    '......kxWxkxWxkxWxkxWxkxk......',
    '......kxWxkxWxkxWxkxWxkxk......',
    '......kkkkkkkkkkkkkkkkkkk.......',
    '......kWWWWWkuuuukWWWWWk.......',
    '......kWWWWWkUnUUkWWWWWk.......',
    '......kWWWWWkUnUUkWWWWWk.......',
    '......kWWWWWkUnUUkWWWWWk.......',
    '......kkkkkkkkkkkkkkkkkkkk......',
    '................................',
  ]
};

// SCHOOL - MOTHER2 style school with yellow walls
sprites.school = {
  w: 32, rows: [
    '................................',
    '..............kkkk..............',
    '.............kyyyYk.............',
    '..............kkkk..............',
    '...........kxmmmmmxk...........',
    '..........kxmmmmmmmxk..........',
    '.........kYYYYYYYYYYYYk........',
    '........kYYYYYYYYYYYYYYk.......',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '..kYkjjjjkYYYkjjjjkYYYkjjjkk.',
    '..kYkzjJjkYYYkzjJjkYYYkzjJkk.',
    '..kYkjjjjkYYYkjjjjkYYYkjjjkk.',
    '..kYkkkkkkkYYYkkkkkkkYYkkkkkk.',
    '..kYYYYYYYYYYYYYYYYYYYYYYYYk..',
    '..kYkjjjjkYYYkjjjjkYYYkjjjkk.',
    '..kYkzjJjkYYYkzjJjkYYYkzjJkk.',
    '..kYkjjjjkYYYkjjjjkYYYkjjjkk.',
    '..kYkkkkkkkYYYkkkkkkkYYkkkkkk.',
    '..kYYYYYYYYkuuuuuukYYYYYYYYk..',
    '..kYYYYYYYYkUNnnNUkYYYYYYYYk..',
    '..kYYYYYYYYkUNnnNUkYYYYYYYYk..',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '................................',
  ]
};

// SHOP - colorful awning MOTHER2 style
sprites.shop = {
  w: 32, rows: [
    '................................',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..krrkoorrkoorrkoorrkoorrkk...',
    '..krrkoorrkoorrkoorrkoorrk....',
    '..kkRkOOkRRkOOkRRkOOkRRkkk...',
    '...kkkkkkkkkkkkkkkkkkkkkkk....',
    '..klllllllllllllllllllllllk....',
    '..klkkkkkkkkkkkkkkkkkkkkllk...',
    '..klkgkpkckykgkpkckyklkllk...',
    '..klkgkpkckykgkpkckyklkllk...',
    '..klkgkpkckykgkpkckyklkllk...',
    '..klkkkkkkkkkkkkkkkkkkkkllk...',
    '..klllllllllllllllllllllllk...',
    '..klllllllllkuuuuklllllllk....',
    '..klllllllllkUnUUkllllllk.....',
    '..klllllllllkUnUUklllllk......',
    '..kkkkkkkkkkkkkkkkkkkkkk......',
    '................................',
  ]
};

// STOCK EXCHANGE - modern building with ticker
sprites.stock = {
  w: 32, rows: [
    '................................',
    '...............kkkk.............',
    '..............kqQqQk............',
    '.............kqQqQqQk...........',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk....',
    '..kqQqQqQqQqQqQqQqQqQqQqk.....',
    '..kQqQqQqQqQqQqQqQqQqQqQk.....',
    '..kkkkkkkkkkkkkkkkkkkkkkkkk.....',
    '..kxkjjjjkxkjjjjkxkjjjjkxk....',
    '..kxkzjJjkxkzjJjkxkzjJjkxk....',
    '..kxkjjjjkxkjjjjkxkjjjjkxk....',
    '..kxkkkkkkkxkkkkkkkxkkkkkkkk....',
    '..kxxxxxxxxxxxxxxxxxxxxxkxk.....',
    '..kxkjjjjkxkjjjjkxkjjjjkxk....',
    '..kxkzjJjkxkzjJjkxkzjJjkxk....',
    '..kxkjjjjkxkjjjjkxkjjjjkxk....',
    '..kxkkkkkkxkuuuuukxkkkkkkkk.....',
    '..kxxxxxxxkUxnnxUkxxxxxxxxk.....',
    '..kxxxxxxxkUxnnxUkxxxxxxxxk.....',
    '..kkkkkkkkkkkkkkkkkkkkkkkkk.....',
    '................................',
  ]
};

// STATION - train station MOTHER2 style
sprites.station = {
  w: 32, rows: [
    '................................',
    '......kkkkkkkkkkkkkkkkkk........',
    '.....kMMMMMMMMMMMMMMMMMMk.......',
    '....kmmmmmmmmmmmmmmmmmmmk......',
    '...kMmmmmmmmmmmmmmmmmmmmMk.....',
    '..kMmmmmmmmmmmmmmmmmmmmmmMk....',
    '..kkkkkkkkkkkkkkkkkkkkkkkkk.....',
    '..kWWkkjjjkkWWkWWkkjjjkkWk.....',
    '..kWWkjzjjkkWWkWWkjzjjkkWk.....',
    '..kkkkkkkkkkkkkkkkkkkkkkkk......',
    '..kWWk.....kWWWWk.....kWWk.....',
    '..kWWk.....kWWWWk.....kWWk.....',
    '..kWWk.....kWWWWk.....kWWk.....',
    '..kWWk.....kWWWWk.....kWWk.....',
    '..kkkkkkkkkkkkkkkkkkkkkkkk......',
    '..kLnLnLnLnLnLnLnLnLnLnk......',
    '..kkkkkkkkkkkkkkkkkkkkkkkkk.....',
    '..kMMMMMMMMMMMMMMMMMMMMMMMk.....',
    '..kkkkkkkkkkkkkkkkkkkkkkkkk.....',
    '................................',
  ]
};

// ══════════════════════════════════════
// PLAYER SPRITES (24×32) - Ness-like MOTHER2 boy
// ══════════════════════════════════════

// PLAYER DOWN
sprites.player_down = {
  w: 24, rows: [
    '........kkkkkk..........',
    '.......krrrrrrk.........',
    '......krrrrrrrrk........',
    '......kRrrrrrRRk........',
    '.......kkkkkkkkk........',
    '......ksssssssssk.......',
    '.....ksssksssksssk......',
    '.....kskkwBkskwBksk.....',
    '.....ksskssskskssksk....',
    '......ksssssssssssk.....',
    '.......kssseeessk.......',
    '........kksssskk........',
    '.......kbbbbbbbk........',
    '......kbbbybbybbbk......',
    '......kbbbbbbbbbbbk.....',
    '.....ksbbbbbbbbbbsbk....',
    '.....kssbbbbbbbbsskk....',
    '......kkbbbbbbbbkk......',
    '.......kBBBBkBBBBk......',
    '......kkBBBk.kBBBkk.....',
    '......kBBBkk.kkBBBk.....',
    '.......kkkk...kkkk......',
    '......krrrkk.kkrrrk.....',
    '......kRRRk...kRRRk.....',
    '.......kkkk...kkkk......',
  ]
};

// PLAYER UP
sprites.player_up = {
  w: 24, rows: [
    '........kkkkkk..........',
    '.......krrrrrrk.........',
    '......krrrrrrrrk........',
    '......kRrrrrrRRk........',
    '.......kkkkkkkkk........',
    '......kNNNNNNNNNk.......',
    '.....kNNNNNNNNNNNk......',
    '.....kNNNNNNNNNNNNk.....',
    '.....kNNNNNNNNNNNNk.....',
    '......kNNNNNNNNNNk......',
    '.......kNNNNNNNNk.......',
    '........kkNNNNkk........',
    '.......kbbbbbbbk........',
    '......kbbbybbybbbk......',
    '......kbbbbbbbbbbbk.....',
    '.....ksbbbbbbbbbbsbk....',
    '.....kssbbbbbbbbsskk....',
    '......kkbbbbbbbbkk......',
    '.......kBBBBkBBBBk......',
    '......kkBBBk.kBBBkk.....',
    '......kBBBkk.kkBBBk.....',
    '.......kkkk...kkkk......',
    '......krrrkk.kkrrrk.....',
    '......kRRRk...kRRRk.....',
    '.......kkkk...kkkk......',
  ]
};

// PLAYER LEFT
sprites.player_left = {
  w: 24, rows: [
    '......kkkkkk............',
    '.....krrrrrrk...........',
    '....krrrrrrrrk..........',
    '....kRRrrrrrRk..........',
    '.....kkkkkkkkk..........',
    '....ksssssssssk.........',
    '...kkBwkksssksk.........',
    '...kBwkksssssk..........',
    '...kksssksssskk.........',
    '....ksssssssssk.........',
    '.....ksseesssk..........',
    '......kksskk............',
    '.....kbbbbbbbk..........',
    '....kbbbybbbbk..........',
    '....kbbbbbbbk...........',
    '...ksbbbbbbbk...........',
    '...kssbbbbbk............',
    '....kkbbbbkk............',
    '.....kBBBBk.............',
    '....kkBBBk..............',
    '....kBBBk...............',
    '.....kkkk...............',
    '....krrrk...............',
    '....kRRRk...............',
    '.....kkkk...............',
  ]
};

// PLAYER RIGHT
sprites.player_right = {
  w: 24, rows: [
    '............kkkkkk......',
    '...........krrrrrrk.....',
    '..........krrrrrrrrk....',
    '..........kRrrrrrRRk....',
    '...........kkkkkkkkk....',
    '.........ksssssssssk....',
    '.........ksksskkwBkk...',
    '...........kssssskwBk...',
    '.........kkssssksssk...',
    '.........kssssssssskk...',
    '..........ksseesssk.....',
    '............kksskk......',
    '..........kbbbbbbbk.....',
    '..........kbbbbybbbk....',
    '...........kbbbbbbbk....',
    '...........kbbbbbbsbk...',
    '............kbbbbbssk...',
    '............kkbbbbkk....',
    '.............kBBBBk.....',
    '..............kBBBkk....',
    '...............kBBBk....',
    '...............kkkk.....',
    '...............krrrk....',
    '...............kRRRk....',
    '...............kkkk.....',
  ]
};

// ══════════════════════════════════════
// VEHICLE SPRITES - MOTHER2 style
// ══════════════════════════════════════

// BIKE (20×20)
sprites.bike = {
  w: 20, rows: [
    '.........kk.........',
    '........knsk........',
    '........knsk........',
    '.......knnnnk.......',
    '.......k..knk.......',
    '......k...k.k.......',
    '......k..k..kk......',
    '.....k..k....kk.....',
    '....kkkkk..kkkkk....',
    '...kmmmkkkkkmmmk....',
    '..kmmmmkkkkmmmmk....',
    '.kmMmMk....kMmMk....',
    'kmmmmk......kmmmmk..',
    'kmmmmk......kmmmmk..',
    '.kmmk........kmmk...',
    '..kk..........kk....',
  ]
};

// CAR (28×18)
sprites.car = {
  w: 28, rows: [
    '......kkkkkkkkkkkkkk........',
    '.....krrrrrrrrrrrrrrk.......',
    '....krrjjjkrrrrkjjjrrk.....',
    '...krrrrrrrrrrrrrrrrrrrk....',
    '..kkrrrrrrrrrrrrrrrrrrrkk...',
    '.kRRRRRRRRRRRRRRRRRRRRRRk..',
    '.krrrrrrrrrrrrrrrrrrrrrrrk..',
    '.krrrrrrrrrrrrrrrrrrrrrrrk..',
    '..kkrrrrrrkkkkkkkrrrrrrkk...',
    '...kkrrkkk.......kkkrrkk...',
    '...kmmmmk.........kmmmmk...',
    '..kmMmMmk.........kmMmMk...',
    '..kmmmmmmk.......kmmmmmmk..',
    '...kkkkkk.........kkkkkk...',
  ]
};

// PLANE (28×22)
sprites.plane = {
  w: 28, rows: [
    '.............kkk............',
    '............kwwwk...........',
    '............kwwwk...........',
    '...........kwwwwwk..........',
    '...........kwjwjwk..........',
    '..........kwwwwwwwk.........',
    '..........kwwwwwwwk.........',
    '.........kwwwwwwwwwk........',
    '........kwwwwwwwwwwwk.......',
    '......kkwwwwwwwwwwwwwkk.....',
    '...kkkwwwwwwwwwwwwwwwwwkkk..',
    '.kkwwwwwwwwwwwwwwwwwwwwwwkk.',
    'kwwwbwwwwwwwwwwwwwwwwbwwwwk.',
    '.kkkkwwwwwwwwwwwwwwwwkkkkk..',
    '......kwwwwwwwwwwwwwk.......',
    '.......kwwwwwwwwwwwk........',
    '........kwwwwwwwwwk.........',
    '.........kwwbbbbwk..........',
    '..........kbbwwbk...........',
    '...........kbbbbk...........',
    '............kkkk............',
  ]
};

// ROCKET (24×28)
sprites.rocket = {
  w: 24, rows: [
    '...........kk...........',
    '..........kwwk..........',
    '.........kwwwwk.........',
    '.........kwwwwk.........',
    '........kwwwwwwk........',
    '........kwwjwwwk........',
    '.......kwwwjwwwwk.......',
    '.......kwwwwwwwwk.......',
    '......kwwwwwwwwwwk......',
    '......kwwwwwwwwwwk......',
    '.....kwwwwwwwwwwwwk.....',
    '.....kwwwwwwwwwwwwk.....',
    '....kkwwwwwwwwwwwwkk....',
    '...krwwwwwwwwwwwwwwrk...',
    '..krrwwwwwwwwwwwwwwrrk..',
    '..krkwwwwwwwwwwwwwwkrk..',
    '..krkwwwwwrrrrrwwwwkrk..',
    '..kkkwwwrrrrrrrrrwwkkk..',
    '...kkwwrrrrrrrrrrrrwkk..',
    '....kwwrrrrrrrrrrrwwk...',
    '.....kyoooooooooooyk....',
    '......kyoooooooooyk.....',
    '.......kyooooooyk.......',
    '........kyyyyyk.........',
    '.........kkkkk..........',
  ]
};

// ══════════════════════════════════════
// GENERATE ALL PNGs
// ══════════════════════════════════════
async function generateAll() {
  let count = 0;
  for (const [name, data] of Object.entries(sprites)) {
    const { w, rows } = data;
    rows.forEach((row, i) => {
      if (row.length < w) rows[i] = row + '.'.repeat(w - row.length);
      else if (row.length > w) rows[i] = row.substring(0, w);
    });
    const img = makeSprite(rows, w);
    const outPath = path.join(OUT, `${name}.png`);
    await img.writeAsync(outPath);
    console.log(`✓ ${name} (${w}×${rows.length}) → ${outPath}`);
    count++;
  }
  console.log(`\nDone! ${count} sprites generated.`);
}

generateAll().catch(console.error);
