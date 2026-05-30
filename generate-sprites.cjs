const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'public', 'sprites');
fs.mkdirSync(OUT, { recursive: true });

// Extended palette for 32×32 sprites
const PAL = {
  '.': null, // transparent
  'k': 0x1a1a2eff, // outline black
  'w': 0xffffffff, // white
  'W': 0xe8e8e8ff, // light gray
  's': 0xffcc88ff, // skin
  'S': 0xe8aa66ff, // skin shadow
  'H': 0xffd8a8ff, // skin highlight
  'e': 0xd4956aff, // skin dark
  'r': 0xe84040ff, // red
  'R': 0xc03030ff, // dark red
  'a': 0xaa2020ff, // deeper red
  'b': 0x4488eeff, // blue
  'B': 0x3366bbff, // dark blue
  'g': 0x44bb44ff, // green
  'G': 0x338833ff, // dark green
  'y': 0xffdd44ff, // yellow
  'Y': 0xddbb22ff, // dark yellow
  'c': 0x44ddddff, // cyan
  'C': 0x339999ff, // dark cyan
  'p': 0xcc66ccff, // pink
  'P': 0xaa44aaff, // dark pink
  'o': 0xff8844ff, // orange
  'O': 0xdd6622ff, // dark orange
  'n': 0x886644ff, // brown
  'N': 0x664422ff, // dark brown
  'L': 0xbbaa88ff, // dark beige
  'l': 0xddcc99ff, // beige
  'm': 0x888888ff, // gray
  'M': 0x666666ff, // dark gray
  'd': 0x3d6b35ff, // leaf green
  'D': 0x2d5528ff, // dark leaf
  't': 0x8b6914ff, // trunk
  'T': 0x6b4e0fff, // dark trunk
  'i': 0xccaa77ff, // light wood
  'I': 0x997744ff, // mid wood
  'x': 0x556677ff, // steel blue
  'X': 0x445566ff, // dark steel
  'f': 0xff6666ff, // light red
  'F': 0x88ccffff, // sky blue
  'q': 0x44ff88ff, // bright green
  'u': 0xff9900ff, // bright orange
  'U': 0xcc7700ff, // dark orange2
  'j': 0x99dd55ff, // lime
  'z': 0xffaaff,   // light pink (no alpha issue, let me fix)
};
// Fix z - needs alpha
PAL['z'] = 0xffaaffff;

function makeSprite(rows, w) {
  const h = rows.length;
  const img = new Jimp(w, h, 0x00000000); // transparent
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < rows[y].length && x < w; x++) {
      const c = PAL[rows[y][x]];
      if (c) img.setPixelColor(c, x, y);
    }
  }
  return img;
}

// ══════════════════════════════════════
// PLAYER SPRITES (32×40) - MOTHER2's Ness-like boy
// ══════════════════════════════════════
const sprites = {};

// PLAYER DOWN (32 wide, 40 tall)
sprites.player_down = {
  w: 32, rows: [
    '..........kkkkkkkkkkkk..........',
    '.........krrrrrrrrrrrrk.........',
    '........krrrrrrrrrrrrrrk........',
    '........krrrrrrrrrrrrrrk........',
    '.......krrrrrrrrrrrrrrrrk.......',
    '.......kRRRRRRRRRRRRRRRRk......',
    '.......kkkkkkkkkkkkkkkkkkk......',
    '......kHssssssssssssssssHk.....',
    '.....kksssssssssssssssssskk....',
    '.....ksssskssskssksssksssk.....',
    '.....kssskkwBkksskwBkkssskk....',
    '.....ksssskwBkssskwBksssskk....',
    '......kssskssskssksssksssk.....',
    '......ksssssssssssssssssk......',
    '.......ksssssseeeessssk........',
    '.......kksssssssssssskk........',
    '........kksssssssssskk.........',
    '.......kbbbbbbbbbbbbbbk........',
    '......kbbbybbbbbbbbybbbk.......',
    '......kbbbybbbbbbbbybbbk.......',
    '.....kbbbbbbbbbbbbbbbbbk.......',
    '.....kbbbbbbbbbbbbbbbbbk.......',
    '....ksbbbbbbbbbbbbbbbbsbk.....',
    '....kssbbbbbbbbbbbbbbssbk.....',
    '.....kssbbbbbbbbbbbbbsskk.....',
    '......kkbbbbbbbbbbbbkk........',
    '.......kBBBBBkBBBBBBk.........',
    '.......kBBBBBkkBBBBBk.........',
    '......kkBBBBk..kBBBBkk........',
    '......kBBBBkk..kkBBBBk........',
    '.......kkkkk....kkkkk.........',
    '......krrrrk....krrrrk........',
    '......krrrrk....krrrrk........',
    '......kRRRRk....kRRRRk........',
    '.......kkkk......kkkk.........',
  ]
};

// PLAYER UP
sprites.player_up = {
  w: 32, rows: [
    '..........kkkkkkkkkkkk..........',
    '.........krrrrrrrrrrrrk.........',
    '........krrrrrrrrrrrrrrk........',
    '........krrrrrrrrrrrrrrk........',
    '.......krrrrrrrrrrrrrrrrk.......',
    '.......kRRRRRRRRRRRRRRRRk......',
    '.......kkkkkkkkkkkkkkkkkkk......',
    '......kNNNNNNNNNNNNNNNNNk.....',
    '.....kkNNNNNNNNNNNNNNNNNkk....',
    '.....kNNNNNNNNNNNNNNNNNNNk....',
    '.....kNNNNNNNNNNNNNNNNNNNk....',
    '.....kNNNNNNNNNNNNNNNNNNNk....',
    '......kNNNNNNNNNNNNNNNNNk.....',
    '......kNNNNNNNNNNNNNNNNk......',
    '.......kNNNNNNNNNNNNNNk........',
    '.......kkNNNNNNNNNNNNkk........',
    '........kkNNNNNNNNNNkk.........',
    '.......kbbbbbbbbbbbbbbk........',
    '......kbbbybbbbbbbbybbbk.......',
    '......kbbbybbbbbbbbybbbk.......',
    '.....kbbbbbbbbbbbbbbbbbk.......',
    '.....kbbbbbbbbbbbbbbbbbk.......',
    '....ksbbbbbbbbbbbbbbbbsbk.....',
    '....kssbbbbbbbbbbbbbbssbk.....',
    '.....kssbbbbbbbbbbbbbsskk.....',
    '......kkbbbbbbbbbbbbkk........',
    '.......kBBBBBkBBBBBBk.........',
    '.......kBBBBBkkBBBBBk.........',
    '......kkBBBBk..kBBBBkk........',
    '......kBBBBkk..kkBBBBk........',
    '.......kkkkk....kkkkk.........',
    '......krrrrk....krrrrk........',
    '......krrrrk....krrrrk........',
    '......kRRRRk....kRRRRk........',
    '.......kkkk......kkkk.........',
  ]
};

// PLAYER LEFT
sprites.player_left = {
  w: 32, rows: [
    '........kkkkkkkkkkkk............',
    '.......krrrrrrrrrrrrk...........',
    '......krrrrrrrrrrrrrrk..........',
    '......krrrrrrrrrrrrrrk..........',
    '.....krrrrrrrrrrrrrrrrk.........',
    '.....kRRRRRRRRRRRRRRRRk........',
    '.....kkkkkkkkkkkkkkkkkkk........',
    '....kHssssssssssssssskk........',
    '...kksssssssssssssssk..........',
    '...kssskkwBksssssssskk.........',
    '...ksskkwBkksssssssskk.........',
    '...kssskkwBkssssssssk..........',
    '....ksssssssssssssskk..........',
    '....ksssssssssssssk............',
    '.....kssssssssssskk............',
    '.....kkssssssssskk..............',
    '......kkssssssskk...............',
    '.....kbbbbbbbbbbbbk.............',
    '....kbbbbybbbbbbbk..............',
    '....kbbbbybbbbbbbk..............',
    '...kbbbbbbbbbbbbk...............',
    '...kbbbbbbbbbbbbk...............',
    '..ksbbbbbbbbbbbk................',
    '..kssbbbbbbbbbk.................',
    '...kssbbbbbbbbk.................',
    '....kkbbbbbbbkk.................',
    '.....kBBBBBBkk..................',
    '.....kBBBBBk....................',
    '....kkBBBBk.....................',
    '....kBBBBk......................',
    '.....kkkk.......................',
    '....krrrrk......................',
    '....krrrrk......................',
    '....kRRRRk......................',
    '.....kkkk.......................',
  ]
};

// PLAYER RIGHT
sprites.player_right = {
  w: 32, rows: [
    '............kkkkkkkkkkkk........',
    '...........krrrrrrrrrrrrk.......',
    '..........krrrrrrrrrrrrrrk......',
    '..........krrrrrrrrrrrrrrk......',
    '.........krrrrrrrrrrrrrrrrk.....',
    '........kRRRRRRRRRRRRRRRRk.....',
    '........kkkkkkkkkkkkkkkkkkk.....',
    '........kksssssssssssssHk......',
    '..........ksssssssssssssskk....',
    '.........kksssssssskBwkksssk...',
    '.........kksssssssskkBwkkssk...',
    '..........kssssssssskBwkkssk...',
    '..........kkssssssssssssskk....',
    '............kssssssssssskk.....',
    '............kksssssssssk.......',
    '..............kkssssssskk......',
    '...............kksssssskk......',
    '.............kbbbbbbbbbbbbk....',
    '..............kbbbbbbbybbbbk...',
    '..............kbbbbbbbybbbbk...',
    '...............kbbbbbbbbbbbbk..',
    '...............kbbbbbbbbbbbbk..',
    '................kbbbbbbbbbbbsk.',
    '.................kbbbbbbbbssk..',
    '.................kbbbbbbbbsskk.',
    '.................kkbbbbbbbkk...',
    '..................kkBBBBBBk....',
    '....................kBBBBBk....',
    '.....................kBBBBkk...',
    '......................kBBBBk...',
    '.......................kkkk....',
    '......................krrrrk...',
    '......................krrrrk...',
    '......................kRRRRk...',
    '.......................kkkk....',
  ]
};

// ══════════════════════════════════════
// VEHICLE SPRITES
// ══════════════════════════════════════

// BIKE (28×32)
sprites.bike = {
  w: 28, rows: [
    '............kk..............',
    '...........knsk.............',
    '...........knsk.............',
    '..........knnnnk............',
    '..........k..knk............',
    '.........k...k.k...........',
    '.........k..k..kk..........',
    '........k..k....kk.........',
    '.......kkkkk..kkkkkkk......',
    '......kmmmkkkkkmmmkk.......',
    '.....kmmmmkkkkmmmmk........',
    '....kmMmMk....kMmMk........',
    '...kmmmmk......kmmmmk......',
    '...kmmmmk......kmmmmk......',
    '....kmmk........kmmk.......',
    '.....kk..........kk........',
  ]
};

// CAR (32×20)
sprites.car = {
  w: 32, rows: [
    '........kkkkkkkkkkkkkk..........',
    '.......krrrrrrrrrrrrrrk.........',
    '......krrrrrrrrrrrrrrrrkk.......',
    '.....kkccckrrrrrrkccckkkk......',
    '....krrrrrkrrrrrrkrrrrrrkk.....',
    '...krrrrrrrrrrrrrrrrrrrrrk.....',
    '..kkrrrrrrrrrrrrrrrrrrrrrkkk...',
    '.kRRRRRRRRRRRRRRRRRRRRRRRRRk..',
    '.krrrrrrrrrrrrrrrrrrrrrrrrrrk..',
    '.krrrrrrrrrrrrrrrrrrrrrrrrrk...',
    '..kkrrrrrrkkkkkkkkkrrrrrrkkk...',
    '...kkrrkkk.........kkkrrkk....',
    '...kmmmmk...........kmmmmk....',
    '..kmMmMmk...........kmMmMk....',
    '..kmmmmmmk.........kmmmmmmk...',
    '...kkkkkkk.........kkkkkkk....',
  ]
};

// PLANE (32×28)
sprites.plane = {
  w: 32, rows: [
    '..............kkk...............',
    '.............kwwwk..............',
    '.............kwwwk..............',
    '............kwwwwwk.............',
    '............kwwcwwk.............',
    '............kwwcwwk.............',
    '...........kwwwwwwwk............',
    '...........kwwwwwwwk............',
    '..........kwwwwwwwwwk...........',
    '.........kwwwwwwwwwwwk..........',
    '.......kkwwwwwwwwwwwwwkk........',
    '....kkkwwwwwwwwwwwwwwwwwkkk.....',
    '..kkwwwwwwwwwwwwwwwwwwwwwwkk....',
    '.kwwwwwwwwwwwwwwwwwwwwwwwwwwk...',
    'kwwwbwwwwwwwwwwwwwwwwwwbwwwwk...',
    '.kkkkkwwwwwwwwwwwwwwwwkkkkkk....',
    '......kwwwwwwwwwwwwwwk..........',
    '.......kwwwwwwwwwwwwk...........',
    '........kwwwwwwwwwwk............',
    '.........kwwbbbbwwk.............',
    '..........kwbwwbwk..............',
    '...........kbbbbk...............',
    '............kkkkk...............',
  ]
};

// ROCKET (28×36)
sprites.rocket = {
  w: 28, rows: [
    '.............kk.............',
    '............kwwk............',
    '...........kwwwwk...........',
    '...........kwwwwk...........',
    '..........kwwwwwwk..........',
    '..........kwwwwwwk..........',
    '.........kwwwccwwwk.........',
    '.........kwwwccwwwk.........',
    '.........kwwwwwwwwk.........',
    '.........kwwwwwwwwk.........',
    '........kwwwwwwwwwwk........',
    '........kwwwwwwwwwwk........',
    '.......kwwwwwwwwwwwwk.......',
    '.......kwwwwwwwwwwwwk.......',
    '......kkwwwwwwwwwwwwkk......',
    '.....krwwwwwwwwwwwwwwrk.....',
    '....krrwwwwwwwwwwwwwwrrk....',
    '...krrwwwwwwwwwwwwwwwwrrk...',
    '...krkwwwwwwwwwwwwwwwwkrk...',
    '...krkwwwwwwwwwwwwwwwwkrk...',
    '..kkrkwwwwwwrrrrrwwwwkrkkk..',
    '..kkkwwwrrrrrrrrrrrwwwkkk...',
    '...kkwwrrrrrrrrrrrrrrwwkk...',
    '....kwwrrrrrrrrrrrrrwwk....',
    '.....kyoooooooooooooyk.....',
    '......kyoooooooooooyk......',
    '.......kyooooooooyk........',
    '........kyyyyyyyk..........',
    '.........kkkkkk............',
  ]
};

// ══════════════════════════════════════
// BUILDING SPRITES (32×32)
// ══════════════════════════════════════

// HOME
sprites.home = {
  w: 32, rows: [
    '..............nkk...................',
    '.............nnkkk..................',
    '............krrrrk.................',
    '...........krrrrrrk................',
    '..........krrrrrrrrk...............',
    '.........krrrrrrrrrrkk.............',
    '........krrrrrrrrrrrrrkk...........',
    '.......kRrrrrrrrrrrrrrRkk..........',
    '......kRRrrrrrrrrrrrrrrRRk.........',
    '.....kRRRrrrrrrrrrrrrrrRRRk........',
    '....kRRRRrrrrrrrrrrrrrrRRRRk.......',
    '...kRRRRRrrrrrrrrrrrrrrRRRRRk......',
    '..kllllllllllllllllllllllllllk.....',
    '..klllkbbBBkllllllllkbbBBklllk.....',
    '..klllkbbBBkllllllllkbbBBklllk.....',
    '..klllkBBbbkllllllllkBBbbklllk.....',
    '..klllkBBbbkllllllllkBBbbklllk.....',
    '..kllllllllllllllllllllllllllk.....',
    '..kllllllllllllllllllllllllllk.....',
    '..klllllllllknnnnkllllllllllk.....',
    '..klllllllllknNNnkllllllllllk.....',
    '..klllllllllknNNnkllllllllllk.....',
    '..klllllllllknNNnkllllllllllk.....',
    '..klllllllllknNNnkllllllllllk.....',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk.....',
  ]
};

// BANK
sprites.bank = {
  w: 32, rows: [
    '..........kkyyyyyykkk...........',
    '.........kyyyyyyyyyyyyk.........',
    '........kYYyyyyyyyyYYYYk........',
    '.......kYYYYYYYYYYYYYYYYk.......',
    '......kYYYYYYYYYYYYYYYYYYk......',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kwkk..kwkk..kwkk..kwkk..kwk..',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '..kWWWWWknnnnkkWWWWWWWWWWWWWk..',
    '..kWWWWWknNNnkkWWWWWWWWWWWWWk..',
    '..kWWWWWknNNnkkWWWWWWWWWWWWWk..',
    '..kWWWWWknNNnkkWWWWWWWWWWWWWk..',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
  ]
};

// SCHOOL
sprites.school = {
  w: 32, rows: [
    '..............kkkk..............',
    '.............kyyyYk.............',
    '.............kyyyYk.............',
    '..............kkkk..............',
    '...........kmmmmmmmk...........',
    '..........kmmmmmmmmmmk.........',
    '.........kYYYYYYYYYYYYYk........',
    '........kYYYYYYYYYYYYYYYk.......',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '..klkbbBBklllkbbBBklllkbbBBklk..',
    '..klkbbBBklllkbbBBklllkbbBBklk..',
    '..klkBBbbklllkBBbbklllkBBbbklk..',
    '..klkBBbbklllkBBbbklllkBBbbklk..',
    '..kllllllllllllllllllllllllllk..',
    '..klkbbBBklllkbbBBklllkbbBBklk..',
    '..klkbbBBklllkbbBBklllkbbBBklk..',
    '..klkBBbbklllkBBbbklllkBBbbklk..',
    '..klkBBbbklllkBBbbklllkBBbbklk..',
    '..kllllllllllllllllllllllllllk..',
    '..kllllllllknnnnnnkllllllllllk..',
    '..kllllllllknNNNNnkllllllllllk..',
    '..kllllllllknNNNNnkllllllllllk..',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
  ]
};

// SHOP
sprites.shop = {
  w: 32, rows: [
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '..kowowowowowowowowowowowowowk..',
    '..kwowowowowowowowowowowowOWk..',
    '..kowowowowowowowowowowowowowk..',
    '..kkOkOkOkOkOkOkOkOkOkOkOkOk..',
    '..kllllllllllllllllllllllllllk..',
    '..kllllllllllllllllllllllllllk..',
    '..klkkkkkkkkkkkkkkkkkkkkkkklk..',
    '..klkgkgkpkpkckcklkkkkkkknlk..',
    '..klkgkgkpkpkckcklkkkkkkknlk..',
    '..klkgkgkpkpkckcklkkkkkkknlk..',
    '..klkkkkkkkkkkkkkkkkkkkkkkklk..',
    '..kllllllllllllllllllllllnnlk..',
    '..kllllllllllllllllllllllnnlk..',
    '..kllllllllllllllllllllllnnlk..',
    '..kllllllllllllllllllllllnnlk..',
    '..kllllllllllllllllllllllnnlk..',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
  ]
};

// STOCK EXCHANGE
sprites.stock = {
  w: 32, rows: [
    '...............kkkk.............',
    '................kkk.............',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..kcCcCcCcCcCcCcCcCcCcCcCcCk...',
    '..kcCcCcCcCcCcCcCcCcCcCcCcCk...',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..kgkkgkkgkkgkkgkkgkkgkkgkkk...',
    '..kkgkkgkkgkkgkkgkkgkkgkkgkk...',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..kmmmmmmmmmmmmmmmmmmmmmmmmMk..',
    '..kmmmmmmmmmmmmmmmmmmmmmmmmMk..',
    '..kmmkbbBBkmmmmmmkbbBBkmmmmk...',
    '..kmmkbbBBkmmmmmmkbbBBkmmmmk...',
    '..kmmkBBbbkmmmmmmkBBbbkmmmmk...',
    '..kmmkBBbbkmmmmmmkBBbbkmmmmk...',
    '..kmmmmmmmmmmmmmmmmmmmmmmmMk...',
    '..kmmmmmmknnnnkmmmmmmmmmmMk....',
    '..kmmmmmmknNNnkmmmmmmmmmmMk....',
    '..kmmmmmmknNNnkmmmmmmmmmmMk....',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkkk...',
  ]
};

// STATION
sprites.station = {
  w: 32, rows: [
    '.......kkkkkkkkkkkkkkkkk........',
    '.....kkmmmmmmmmmmmmmmmmkkk.....',
    '....kmmmmmmmmmmmmmmmmmmmmk.....',
    '...kMmmmmmmmmmmmmmmmmmmmMk....',
    '..kMmmmmmmmmmmmmmmmmmmmmmMk...',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..kWWWWkkwwykkkWWkWWWWWWWWk...',
    '..kWWWWkyWWkkkkWWkWWWWWWWWk...',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..kWWkk....kkWWWkk....kkWWk...',
    '..kWWk.....kWWWWk.....kWWWk...',
    '..kWWk.....kWWWWk.....kWWWk...',
    '..kWWk.....kWWWWk.....kWWWk...',
    '..kWWk.....kWWWWk.....kWWWk...',
    '..kWWk.....kWWWWk.....kWWWk...',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..kLnLnLnLnLnLnLnLnLnLnLnk...',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk...',
    '..kMMMMMMMMMMMMMMMMMMMMMMMk....',
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk...',
  ]
};

// ══════════════════════════════════════
// TILE SPRITES (16×16)
// ══════════════════════════════════════

// TREE
sprites.tree = {
  w: 16, rows: [
    '.....kddddDk....',
    '....kddddddDk...',
    '...kdddddddDDk..',
    '..kddddddddDDDk.',
    '.kdddddddddDDDDk',
    'kddddDddddddDDDk',
    'kdddDDdddddDDDDk',
    '.kdddDddddddDDk.',
    '..kddddddddDDk..',
    '...kkddddddkk...',
    '......kttk......',
    '......kttk......',
    '......kTTk......',
    '......kTTk......',
    '.....kkTTkk.....',
    '.....kkkkkk.....',
  ]
};

// FLOWER
sprites.flower = {
  w: 16, rows: [
    'gg.rgg.pgggg.rgg',
    'ggggggggggggggyg',
    'g.pgggggrg.ggggg',
    'ggggygggggggrgrg',
    'ggrggggg.pgggggg',
    'ggggggyggggggpgg',
    'g.ggrggggyggg.rg',
    'ggggggggggggggyg',
    'gg.pgg.rggggrg.g',
    'ggggggggggygggyg',
    'g.rgggygggggg.gg',
    'gggggggggggrggyg',
    'ggrg.pgggrgggggg',
    'ggggygggggggg.pg',
    'g.ggggggrggyggyg',
    'ggggrgggggggggyg',
  ]
};

// WATER
sprites.water = {
  w: 16, rows: [
    'bbBBbbccbbBBbbcc',
    'bBBbbBBbbBBbbBBb',
    'BBbbBBbbcBbbBBbb',
    'BbbBBbbBBbbBBbbB',
    'bbBBbbccbbBBbbcc',
    'bBBbbBBbbBBbbBBb',
    'BBbbcBbbBBbbBBbb',
    'BbbBBbbBBbbBBbbB',
    'bbBBbbccbbBBbbcc',
    'bBBbbBBbbBBbbBBb',
    'BBbbBBbbcBbbBBbb',
    'BbbBBbbBBbbBBbbB',
    'bbBBbbccbbBBbbcc',
    'bBBbbBBbbBBbbBBb',
    'BBbbcBbbBBbbBBbb',
    'BbbBBbbBBbbBBbbB',
  ]
};

// FENCE
sprites.fence = {
  w: 16, rows: [
    '.n...n...n...n..',
    '.n...n...n...n..',
    '.n...n...n...n..',
    'nnnnnnnnnnnnnnnn',
    '.n...n...n...n..',
    '.n...n...n...n..',
    '.n...n...n...n..',
    'nNnNnNnNnNnNnNnN',
    '.N...N...N...N..',
    '.N...N...N...N..',
    '.N...N...N...N..',
    'NNNNNNNNNNNNNNNN',
    '.N...N...N...N..',
    '.N...N...N...N..',
    '.N...N...N...N..',
    'nNnNnNnNnNnNnNnN',
  ]
};

// ══════════════════════════════════════
// GENERATE ALL PNGs
// ══════════════════════════════════════

async function generateAll() {
  for (const [name, data] of Object.entries(sprites)) {
    const { w, rows } = data;
    // Validate row lengths
    let valid = true;
    rows.forEach((row, i) => {
      if (row.length !== w) {
        console.warn(`  WARNING: ${name} row ${i} has ${row.length} chars, expected ${w}`);
        // Pad or truncate
        if (row.length < w) rows[i] = row + '.'.repeat(w - row.length);
        else rows[i] = row.substring(0, w);
        valid = false;
      }
    });

    const img = makeSprite(rows, w);
    const outPath = path.join(OUT, `${name}.png`);
    await img.writeAsync(outPath);
    console.log(`✓ ${name} (${w}×${rows.length}) → ${outPath}`);
  }
  console.log('\nDone! All sprites generated.');
}

generateAll().catch(console.error);
