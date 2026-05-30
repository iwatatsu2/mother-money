const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'public', 'sprites');
fs.mkdirSync(OUT, { recursive: true });

// ══════════════════════════════════════
// All sprite data from 4 Claude agents
// ══════════════════════════════════════

const ALL_SPRITES = {
  // ── TILES (16×16) ──
  "grass": {
    "palette": {"a": "#78c858", "b": "#58a848", "c": "#408838", "d": "#306828"},
    "rows": [
      "bbabbbcbbabbbbab",
      "babbbabbbabbabbb",
      "bbabbbbabbbbbbab",
      "abbbcbbbabcbabbb",
      "bbbabbbbbbbbbbcb",
      "bbbbbbcbbabbbbbb",
      "babbbbbbbbbcbbab",
      "bbbabbbdbbbbbbbb",
      "bbbbcbbbbbabbabb",
      "abbbbbbbabbbbbbb",
      "bbbabbcbbbbbcbbb",
      "bbbbbbbbdbbabbbb",
      "bcbbabbbbbbbbbcb",
      "bbbbbbbbbcbbbbbb",
      "abbcbbabbbbbabbb",
      "bbbbbbbbbabbbbcb"
    ]
  },
  "path": {
    "palette": {"a": "#e8d898", "b": "#d0b878", "c": "#b8a060", "d": "#a08848"},
    "rows": [
      "bbabbbcbbabbbbab",
      "babbbabbbabbabbb",
      "bbbbbbbabbbbbbab",
      "abbbcbbbabcbbbbb",
      "bbbabbbbbbbbbbcb",
      "bbbbbbcbbabbbbbb",
      "babbbbdbbbbcbbab",
      "bbbabbbbbbbbbbbb",
      "bbbbcbbbbbabbabb",
      "abbbbbbbabbbbbdb",
      "bbbabbcbbbbbcbbb",
      "bbbbbbbbdbbabbbb",
      "bcbbabbbbbbbbbcb",
      "bbbbbabbbcbbbbbb",
      "abbcbbabbbbbabbb",
      "bbbbbbbbbabbbbcb"
    ]
  },
  "water": {
    "palette": {"a": "#88d0f0", "b": "#58a8d8", "c": "#3878a8", "d": "#205880"},
    "rows": [
      "ccccbccccccccbcc",
      "cccccccbcccccccc",
      "aabbccccccaabbcc",
      "ccccccaabbcccccc",
      "cccccccccccccccc",
      "cccdcccccccdcccc",
      "cccccccdcccccccc",
      "cccccccccccccccc",
      "ccaabbccccccaabb",
      "bbccccccaabbcccc",
      "cccccccccccccccc",
      "cdcccccccdcccccc",
      "cccccdcccccccccc",
      "cccccccccccccccc",
      "ccccccaabbcccccc",
      "aabbccccccccaabb"
    ]
  },
  "tree": {
    "palette": {"a": "#88d070", "b": "#68b858", "c": "#48a040", "d": "#308030", "e": "#206020", "t": "#886020", "s": "#684010", "o": "#1a1a2e"},
    "rows": [
      "......oooo......",
      "....oabbbo......",
      "...oaabbbboo....",
      "..oaabbbbbcco...",
      "..oabbbbbbcco...",
      ".oaabbbbbcccdo..",
      ".oabbbbbcccddo..",
      ".oabbbbbccdddo..",
      ".obbbbbbccddeo..",
      ".obbbbbccddeo...",
      "..obbbcccdeo....",
      "..oobccddeo.....",
      "....oooeoo......",
      ".....otso.......",
      ".....otso.......",
      "......oo........"
    ]
  },
  "flower": {
    "palette": {"a": "#78c858", "b": "#58a848", "c": "#408838", "d": "#306828", "r": "#e84848", "p": "#e870a0", "y": "#f8d848", "w": "#ffffff"},
    "rows": [
      "bbabbbcbbabbbbab",
      "babrbabbbabbabbb",
      "bbabbbbabbbbwbab",
      "abbbcbbbabcbabbb",
      "bbbabbbbbybbbbcb",
      "bbbbbbcbbabbbbbb",
      "babbpbbbbbrcbbab",
      "bbbabbbdbbbbbbbb",
      "bbbbcbbbbbabbabb",
      "abbbbbwbabbbbbbb",
      "bbbabbcbbbbbcbbb",
      "bbybbbbbrbbabbbb",
      "bcbbabbbbbpbbbcb",
      "bbbbbbbbbcbbbbbb",
      "abbcbbabbbbbabbb",
      "bbbwbbbbbabbybcb"
    ]
  },
  "fence": {
    "palette": {"a": "#c8a868", "b": "#a08040", "c": "#785820", "d": "#604010"},
    "rows": [
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "aabbaabbaabbaabb",
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "ccbbccbbccbbccbb",
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "bbccbbccbbccbbcc",
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "..ab..ab..ab....",
      "..cd..cd..cd...."
    ]
  },
  "road": {
    "palette": {"a": "#606060", "b": "#585858", "c": "#505050", "d": "#484848"},
    "rows": [
      "bbbbcbbbbbbabbbb",
      "bbbbbbbcbbbbbbbb",
      "bbcbbbbbbbbbbcbb",
      "bbbbbbbbbbbbbbbb",
      "bbbbbbbbbcbbbbbb",
      "bbbbcbbbbbbbbbbb",
      "bbbbbbbbbbbbcbbb",
      "bcbbbbbbcbbbbbbb",
      "bbbbbbbbbbbdbbbb",
      "bbbbcbbbbbbbbcbb",
      "bbbbbbbbbbbbbbbb",
      "bbbbbbbcbbbbbbbb",
      "bbcbbbbbbbbbbbcb",
      "bbbbbbbbbcbbbbbb",
      "bbbbbbbbbbbbbbbb",
      "bbbcbbbbbbbbcbbb"
    ]
  },
  "sand": {
    "palette": {"a": "#f0e0a8", "b": "#e0d090", "c": "#d0c078", "d": "#c0b068"},
    "rows": [
      "bbabbbbcbbbbabbb",
      "bbbbbabbbbbbbbcb",
      "bbbbbbbbabbbbbbb",
      "bcbbabbbbbcbbbbb",
      "bbbbbbbbbbbbbabb",
      "bbbbcbbbbbbabbbb",
      "abbbbbbbcbbbbbbb",
      "bbbbbabbbbbbbcbb",
      "bbcbbbbbbbabbbbb",
      "bbbbbbcbbbbbbabb",
      "bbbabbbbbbbbbbbb",
      "bbbbbbbbdbbcbbbb",
      "bcbbbbbbbbbbbabb",
      "bbbbbcbbbbbbbbbb",
      "bbbbbbbbabbcbbbb",
      "babbbbcbbbbbbbbb"
    ]
  },
  "stone": {
    "palette": {"a": "#b0b0b0", "b": "#909090", "c": "#787878", "d": "#585858"},
    "rows": [
      "aabbbbddaabbbcdd",
      "abbbbbddabbbbcdd",
      "abbbcbddabbbccdd",
      "dddddddddddddddd",
      "bbbccddaabbbbdda",
      "bbbbcddabbbbddab",
      "bbbccddbbbbbddab",
      "dddddddddddddddd",
      "abbbddaabbccddab",
      "bbbcddaabbbbddab",
      "bbccddabbbbbddbb",
      "dddddddddddddddd",
      "bbddaabbbcddabbb",
      "bcddabbbccddabbb",
      "bcddabbbccddabbb",
      "dddddddddddddddd"
    ]
  },
  "dark": {
    "palette": {"a": "#303048", "b": "#2a2a3e", "c": "#282838", "d": "#222230"},
    "rows": [
      "bbbbcbbbbbbbabbb",
      "bbbbbbbcbbbbbbbb",
      "bbcbbbbbbbbbbcbb",
      "bbbbbbbbbbbbbbbb",
      "bbbbbbbbbcbbbbbb",
      "bbbbcbbbbbbbbbbb",
      "bbbbbbbbbbbbcbbb",
      "bcbbbbbbcbbbbbbb",
      "bbbbbbbbbbbdbbbb",
      "bbbbcbbbbbbbbcbb",
      "bbbbbbbbbbbbbbbb",
      "bbbbbbbcbbbbbbbb",
      "bbcbbbbbbbbbbbcb",
      "bbbbbbbbbcbbbbbb",
      "bbbbbbbbbbbbbbbb",
      "bbbcbbbbbbbbcbbb"
    ]
  },

  // ── BUILDINGS (32×32) ──
  "home": {
    "palette": {"k":"#1a1a2e","R":"#e84848","r":"#c03030","d":"#901818","W":"#e8d8c0","w":"#d0c0a0","v":"#b8a880","B":"#88c8f8","b":"#60a0d0","F":"#ffffff","D":"#b07030","e":"#885020","G":"#f8d848","C":"#e0e0e0"},
    "rows": [
      "................................",
      "................................",
      "...............kk...............",
      "..............kRRk..............",
      ".............kRRRRk.............",
      "............kRRRRRRk............",
      "...........kRRRrRRRRk..........",
      "..........kRRRrrRRRRRk.........",
      ".........kRRRRrrrRRRRRk........",
      "........kRRRRrrrrRRRRRRk.......",
      ".......kRRRRrrrrrRRRRRRRk......",
      "......kRRRRrrrrrrRRRRRRRRk.....",
      ".....kRRRRrrrrrrrRRRRRRRRRk....",
      "....kRRRRrrrrrrrrRRRRRRRRRRk...",
      "...kdddddddddddddddddddddddk..",
      "...kWWWWWWWWWWWWWWWWWWWWWWWWk..",
      "...kWWWWWWWWWWWWWWWWWWWWWWWWk..",
      "...kWWkBBBBkWWWWWWkBBBBkWWWWk..",
      "...kWWkBbBbkWWWWWWkBbBbkWWWWk..",
      "...kWWkBbBbkWWWWWWkBbBbkWWWWk..",
      "...kWWkBBBBkWWWWWWkBBBBkWWWWk..",
      "...kwwwwwwwwwwwwwwwwwwwwwwwwwk..",
      "...kwwwwwwwwkDDDDkwwwwwwwwwwk..",
      "...kwwwwwwwwkDeDDkwwwwwwwwwwk..",
      "...kwwwwwwwwkDDDDkwwwwwwwwwwk..",
      "...kwwwwwwwwkDeGDkwwwwwwwwwwk..",
      "...kvvvvvvvvkDDDDkvvvvvvvvvvk..",
      "...kvvvvvvvvkDDDDkvvvvvvvvvvk..",
      "...kkkkkkkkkkkkkkkkkkkkkkkkkk..",
      "................................",
      "................................",
      "................................"
    ]
  },
  "bank": {
    "palette": {"k":"#1a1a2e","G":"#f8d848","g":"#d0b030","F":"#ffffff","E":"#e0e0e0","C":"#c0c0c0","A":"#a0a0a0","H":"#808080","D":"#785020","d":"#604018"},
    "rows": [
      "................................",
      "................................",
      "..............kGGk..............",
      ".............kGGGGk.............",
      "............kGgGGGGk............",
      "...........kGgGGGGGGk..........",
      "..........kGgGGGGGGGGk.........",
      ".........kGgGGGGgGGGGGk........",
      "........kGgGGGggGGGGGGGk.......",
      ".......kGgGGGgggGGGGGGGGk......",
      "......kGgGGGggggGGGGGGGGGk.....",
      ".....kGgGFGgGgggGGGGGFGGGGk....",
      "....kgggggggggggggggggggggggk...",
      "....kCCkFFkCCCkFFkCCCkFFkCCk...",
      "....kCCkFEkCCCkFEkCCCkFEkCCk...",
      "....kCCkFEkCCCkFEkCCCkFEkCCk...",
      "....kAAkFEkAAAkFEkAAAkFEkAAk...",
      "....kAAkFEkAAAkFEkAAAkFEkAAk...",
      "....kAAkFEkAAAkFEkAAAkFEkAAk...",
      "....kAAkECkAAAkECkAAAkECkAAk...",
      "....kAAkECkAAAkECkAAAkECkAAk...",
      "....kHHkCCkHHHkCCkHHHkCCkHHk...",
      "....kHHHHHHHkAAAkHHHHHHHHHHk...",
      "....kHHHHHHkAkkkAkHHHHHHHHHk...",
      "....kHHHHHkAkDDDkAkHHHHHHHHk...",
      "....kHHHHHkAkDdDkAkHHHHHHHHk...",
      "....kHHHHHkAkDDDkAkHHHHHHHHk...",
      "....kHHHHHkAkDdDkAkHHHHHHHHk...",
      "....kkkkkkkkkDDDkkkkkkkkkkkkk...",
      "................................",
      "................................",
      "................................"
    ]
  },
  "school": {
    "palette": {"k":"#1a1a2e","A":"#a0a0a0","H":"#808080","F":"#ffffff","Y":"#f8e878","y":"#e0c850","t":"#c8b040","B":"#88c8f8","b":"#60a0d0","R":"#c03030","r":"#901818","C":"#c0c0c0"},
    "rows": [
      "................................",
      ".............kkkkkkk............",
      ".............kAAAHAk............",
      ".............kAFFFAk............",
      ".............kAFkFAk............",
      ".............kAFFFAk............",
      ".............kHAAAHk............",
      "....kkkkkkkkkkkAAkkkkkkkkkkkk...",
      "....kYYYYYYYYYYYYYYYYYYYYYYk...",
      "....kYYYYYYYYYYYYYYYYYYYYYYk...",
      "....kyyyyyyyyyyyyyyyyyyyyyyyk...",
      "....kyykBBBkykBBBkykBBBkyytk...",
      "....kyykBbBkykBbBkykBbBkyytk...",
      "....kyykBBBkykBBBkykBBBkyytk...",
      "....kyyyyyyyyyyyyyyyyyyyyyyyk...",
      "....kyyyyyyyyyyyyyyyyyyyyyyyk...",
      "....ktttttttttttttttttttttttk...",
      "....kttkBBBktkBBBktkBBBktttk...",
      "....kttkBbBktkBbBktkBbBktttk...",
      "....kttkBBBktkBBBktkBBBktttk...",
      "....ktttttttttttttttttttttttk...",
      "....ktttttttttttttttttttttttk...",
      "....kttttttttkRRRRktttttttttk...",
      "....kttttttttkRRrRktttttttttk...",
      "....kttttttttkRRRRktttttttttk...",
      "....kttttttttkRRrRktttttttttk...",
      "....kttttttttkRrrRktttttttttk...",
      "....kttttttttkRRRRktttttttttk...",
      "....kkkkkkkkkkkkkkkkkkkkkkkk....",
      "................................",
      "................................",
      "................................"
    ]
  },
  "shop": {
    "palette": {"k":"#1a1a2e","R":"#e84848","r":"#c03030","F":"#ffffff","E":"#e0e0e0","W":"#e8d8c0","w":"#d0c0a0","G":"#c8e8f8","g":"#a0d0e8","D":"#b07030","d":"#885020","P":"#f870a8","Y":"#f8d848","T":"#40c040","B":"#88c8f8"},
    "rows": [
      "................................",
      "................................",
      "................................",
      "....kkkkkkkkkkkkkkkkkkkkkkkkk...",
      "....kRRRRFFFFRRRRFFFFRRRRFFk...",
      "....kRRRRFFFFRRRRFFFFRRRRFFk...",
      "....krRRRFFFFreRRFFFFreRRFFk...",
      "....krRRrFFFFrrRrFFFFrrRrEFk...",
      "...kkrRrkkFFkkrrkkkFFkkrrkkkk..",
      "...kkrrkkEFFkkkrkEEFkkkkrkEkk..",
      "...kkkkkEEEEkkkkEEEEkkkkkEkkk..",
      "...kWWWWWWWWWWWWWWWWWWWWWWWWk..",
      "...kWWWWWWWWWWWWWWWWWWWWWWWWk..",
      "...kWWkGGGGGGGGGGGGkWWWWWWWk..",
      "...kWWkGGPGGGGYGGTGkWWWWWWWk..",
      "...kWWkGGGGBGGGGGGGkWWWWWWWk..",
      "...kWWkGGGGGGPGGYGGkWWWWWWWk..",
      "...kWWkGGTGGGGGGGGGkWWWWWWWk..",
      "...kWWkGGGGGGGGGBGGkWWWWWWWk..",
      "...kWWkGGGGGGGGGGGGkWWWWWWWk..",
      "...kwwwwwwwwwwwwwwwwwwwwwwwwk..",
      "...kwwwwwwwwwwwkDDDDkwwwwwwwk..",
      "...kwwwwwwwwwwwkDdDDkwwwwwwwk..",
      "...kwwwwwwwwwwwkDDDDkwwwwwwwk..",
      "...kwwwwwwwwwwwkDdDDkwwwwwwwk..",
      "...kwwwwwwwwwwwkDDDDkwwwwwwwk..",
      "...kwwwwwwwwwwwkDDDDkwwwwwwwk..",
      "...kkkkkkkkkkkkkDDDDkkkkkkkkk..",
      "................................",
      "................................",
      "................................",
      "................................"
    ]
  },
  "stock": {
    "palette": {"k":"#1a1a2e","H":"#707070","T":"#40b0b0","t":"#308888","s":"#206060","A":"#a0a0a0","G":"#40c040","R":"#e84848","D":"#80d0d0","C":"#c0c0c0","F":"#ffffff"},
    "rows": [
      "................................",
      "..............kkk...............",
      "..............kAk...............",
      "..............kAk...............",
      "..............kHk...............",
      "....kkkkkkkkkkkkkkkkkkkkkkkkk...",
      "....kHHHHHHHHHHHHHHHHHHHHHHk...",
      "....kAAAAAAAAAAAAAAAAAAAAAAAAk...",
      "....kTTTTTTTTTTTTTTTTTTTTTTk...",
      "....kTTTtTTTTTTTTTTTTtTTTTTk...",
      "....kTTTtTTTTTTTTTTTTtTTTTTk...",
      "....kTTTtTTTTTTTTTTTTtTTTTTk...",
      "....ktttttttttttttttttttttttk...",
      "....kTTTtTTTTTTTTTTTTtTTTTTk...",
      "....kkkkkkkkkkkkkkkkkkkkkkkkkk..",
      "....kGRGRGGRGGRGRRGGRGGRGRGk...",
      "....kRGGRRGRGRRGRGGRGRRGGRRk...",
      "....kkkkkkkkkkkkkkkkkkkkkkkkkk..",
      "....kTTTtTTTTTTTTTTTTtTTTTTk...",
      "....kTTTtTTTTTTTTTTTTtTTTTTk...",
      "....ktttttttttttttttttttttttk...",
      "....ksTTtsTTTTTTTTTTstTTTsTk...",
      "....ksTTtssTTTTTTTTssTTTsTk....",
      "....kssstsssTTTTTTsssTTTssk....",
      "....ksssssssTTDDTTsssssssssk...",
      "....ksssssssTDDDDTsssssssssk...",
      "....ksssssssTDDDDTsssssssssk...",
      "....ksssssssTDDDDTsssssssssk...",
      "....kkkkkkkkkkDDDkkkkkkkkkkkk..",
      "................................",
      "................................",
      "................................"
    ]
  },
  "station": {
    "palette": {"k":"#1a1a2e","H":"#808080","h":"#606060","A":"#a0a0a0","F":"#ffffff","B":"#c09060","b":"#a07848","Y":"#f8d848","D":"#2a2a3e","C":"#c0c0c0","E":"#e0e0e0"},
    "rows": [
      "................................",
      "................................",
      "..kkkkkkkkkkkkkkkkkkkkkkkkkkk...",
      "..kAAAAAAAAAAAAAAAAAAAAAAAAAk...",
      "..kHHHHHHHHHHHHHHHHHHHHHHHHk...",
      "..kHHHHHHHHHHHHHHHHHHHHHHHHk...",
      "..khhhhhhhhhhhhhhhhhhhhhhhhhk...",
      "..khhhhhhhhhhhhhhhhhhhhhhhhkk...",
      "..kkkkkkkkkkkkkkkkkkkkkkkkkkk...",
      "...kBBBBBBBBBBBBBBBBBBBBBBBk...",
      "...kBBBBBBBkFFFkBBBBBBBBBBBk...",
      "...kBBBBBBBkFkFkBBBBBBBBBBBk...",
      "...kBBBBBBBkFFFkBBBBBBBBBBBk...",
      "...kbbbbbbbbbbbbbbbbbbbbbbbBk...",
      "...kbbbbbbbbbbbbbbbbbbbbbbbbk...",
      "...kbbkCCCCkbbbbbbkCCCCkbbbk...",
      "...kbbkCCCCkbbbbbbkCCCCkbbbk...",
      "...kbbkCCCCkbbbbbbkCCCCkbbbk...",
      "...kbbbbbbbbbbbbbbbbbbbbbbbbk...",
      "...kBBBBBBBBBBBBBBBBBBBBBBBk...",
      "...kBBBBBBkkkkkkkkkkBBBBBBBk...",
      "...kBBBBBkDDDDDDDDDDkBBBBBBk...",
      "...kBBBBkDDDDDDDDDDDDkBBBBBk...",
      "...kBBBBkDDDDDDDDDDDDkBBBBBk...",
      "...kBBBBkDDDDDDDDDDDDkBBBBBk...",
      "...kBBBBkDDDDDDDDDDDDkBBBBBk...",
      "...kbbbBkDDDDDDDDDDDDkbbbbbk...",
      "...kbbbbkDDDDDDDDDDDDkbbbbbk...",
      "...kkkkkkkkkkkkkkkkkkkkkkkkk....",
      "..kYYYYYYYYYYYYYYYYYYYYYYYYYk..",
      "..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..",
      "................................"
    ]
  },

  // ── PLAYER (24×32) ──
  "player_down": {
    "palette": {"k":"#1a1a2e","r":"#e84848","R":"#c03030","D":"#901818","s":"#ffd8b0","S":"#eebb88","d":"#d49860","b":"#5090e0","y":"#f8d848","B":"#3868b0","G":"#284880","e":"#e84848","E":"#c03030","w":"#ffffff","h":"#604020"},
    "rows": [
      "........................",
      "........................",
      "........kkkkkkkk........",
      ".......krrrrrrrrk.......",
      "......krrrrrrrrrrk......",
      "......krrrrrrrrrrk......",
      ".....kRRRRRRRRRRRRk.....",
      ".....kDDDDDDDDDDDDk.....",
      "....kssssssssssssssk....",
      "....kssksssssssksssk....",
      "....kssksssssssksssk....",
      "....kssssssssssssssk....",
      ".....kssssskkssssk......",
      ".....kssssssssssk.......",
      "......kksssssskkk.......",
      "......kssSSSSSssk.......",
      ".......kbbbbbbk.........",
      ".......kbyybbyyk........",
      ".......kbbbbbbk.........",
      ".......kbyybbyyk........",
      ".......kbbbbbbk.........",
      "........kbbbbk..........",
      ".......kkBBBBkk.........",
      "......kBBBBBBBBk........",
      "......kBBkkkBBBk........",
      ".......kkk.kkBk.........",
      "......keeek.kEEk.......",
      "......keeek.kEEk.......",
      "......kkkkk.kkkkk.......",
      "........................",
      "........................",
      "........................"
    ]
  },
  "player_up": {
    "palette": {"k":"#1a1a2e","r":"#e84848","R":"#c03030","D":"#901818","s":"#ffd8b0","S":"#eebb88","d":"#d49860","b":"#5090e0","y":"#f8d848","B":"#3868b0","G":"#284880","e":"#e84848","E":"#c03030","h":"#604020"},
    "rows": [
      "........................",
      "........................",
      "........kkkkkkkk........",
      ".......krrrrrrrrk.......",
      "......krrrrrrrrrrk......",
      "......krrrrrrrrrrk......",
      ".....krrrrrrrrrrrrk.....",
      ".....kRRRRRRRRRRRRk.....",
      "....khhhhhhhhhhhhhhk....",
      "....khhhhhhhhhhhhhhk....",
      "....khhhhhhhhhhhhhhk....",
      "....kSSSSSSSSSSSSSsk....",
      ".....kSSSSSSSSSSSSk.....",
      ".....kssssssssssSk......",
      "......kksssssskkk.......",
      "......ksSSSSSSSsk.......",
      ".......kbbbbbbk.........",
      ".......kbyybbyyk........",
      ".......kbbbbbbk.........",
      ".......kbyybbyyk........",
      ".......kbbbbbbk.........",
      "........kbbbbk..........",
      ".......kkBBBBkk.........",
      "......kBBBBBBBBk........",
      "......kBBkkkBBBk........",
      ".......kkk.kkBk.........",
      "......keeek.kEEk.......",
      "......keeek.kEEk.......",
      "......kkkkk.kkkkk.......",
      "........................",
      "........................",
      "........................"
    ]
  },
  "player_left": {
    "palette": {"k":"#1a1a2e","r":"#e84848","R":"#c03030","D":"#901818","s":"#ffd8b0","S":"#eebb88","d":"#d49860","b":"#5090e0","y":"#f8d848","B":"#3868b0","G":"#284880","e":"#e84848","E":"#c03030","h":"#604020"},
    "rows": [
      "........................",
      "........................",
      ".......kkkkkkkk.........",
      "......krrrrrrrrk........",
      ".....krrrrrrrrrrk.......",
      "....krrrrrrrrrrrrk......",
      "...kDDDDDDDDDDDDrrk.....",
      "...kDDDDDDDDDDDDrrk.....",
      "...kssssssssssssssk.....",
      "...kskssssssssssssk.....",
      "...kskssssssssssssk.....",
      "...kssssssssssssSSk.....",
      "....kssssssssssSk.......",
      "....kksssssssssk........",
      ".....kkkssssskk.........",
      "......ksSSSSSk..........",
      ".......kbbbbbk..........",
      ".......kbyybyk..........",
      ".......kbbbbbk..........",
      ".......kbyybyk..........",
      ".......kbbbbbk..........",
      "........kbbbk...........",
      ".......kkBBBkk..........",
      "......kBBBBBBBk.........",
      "......kBBkkBBBk.........",
      ".......kkk.kkk..........",
      "......keek.kEk..........",
      "......keek.kEk..........",
      "......kkkk.kkkk.........",
      "........................",
      "........................",
      "........................"
    ]
  },
  "player_right": {
    "palette": {"k":"#1a1a2e","r":"#e84848","R":"#c03030","D":"#901818","s":"#ffd8b0","S":"#eebb88","d":"#d49860","b":"#5090e0","y":"#f8d848","B":"#3868b0","G":"#284880","e":"#e84848","E":"#c03030","h":"#604020"},
    "rows": [
      "........................",
      "........................",
      ".........kkkkkkkk.......",
      "........krrrrrrrrk......",
      ".......krrrrrrrrrrk.....",
      "......krrrrrrrrrrrrk....",
      ".....krrDDDDDDDDDDDDk...",
      ".....krrDDDDDDDDDDDDk...",
      ".....kssssssssssssssk...",
      ".....kssssssssssssksk...",
      ".....kssssssssssssksk...",
      ".....kSSsssssssssssskk..",
      ".......kSssssssssssk....",
      "........kssssssssskk....",
      ".........kksssssskk.....",
      "..........kSSSSSsk......",
      "..........kbbbbbk.......",
      "..........kbyybyk.......",
      "..........kbbbbbk.......",
      "..........kbyybyk.......",
      "..........kbbbbbk.......",
      "...........kbbbk........",
      "..........kkBBBkk.......",
      ".........kBBBBBBBk......",
      ".........kBBBkkBBk......",
      "..........kkk.kkk.......",
      "..........kEk.keek......",
      "..........kEk.keek......",
      ".........kkkk.kkkk......",
      "........................",
      "........................",
      "........................"
    ]
  },

  // ── VEHICLES ──
  "bike": {
    "palette": {"k":"#1a1a2e","r":"#e84848","d":"#c03030","s":"#c0c0c0","h":"#a0a0a0","b":"#a07040","w":"#606060"},
    "rows": [
      "........................",
      "........................",
      "...........ss...........",
      "...........sk...........",
      "............k...........",
      "............ks..........",
      ".....bb....k............",
      ".....kkk..k.............",
      "......k..k..............",
      "......krk...............",
      ".......rkk..............",
      ".......rr.k.............",
      "......krr..k............",
      ".....kr.r..k............",
      "....kr..rkkkk...........",
      "...kk...k...kk.........",
      "..khhk.....khhk........",
      ".kshhsk...kshhsk........",
      ".kshsk.....kshsk........",
      "..khk.......khk........",
      "...k.........k.........",
      "........................",
      "........................",
      "........................"
    ]
  },
  "car": {
    "palette": {"k":"#1a1a2e","r":"#e84848","d":"#c03030","x":"#901818","b":"#88c8f8","B":"#60a0d0","w":"#ffffff","s":"#c0c0c0","h":"#606060"},
    "rows": [
      "................................",
      "................................",
      "................................",
      "........kkkkkkkk................",
      ".......kbbbbbbbbk...............",
      "......kbbbBBBBbbbk..............",
      ".....kbbbBBBBBBbbbk.............",
      "....kkkkkkkkkkkkkkkkk...........",
      "...krrrrrrrrrrrrrrrrrkk.........",
      "..krrrrrrrrrrrrrrrrrrrdkk.......",
      ".krrrrrrrrrrrrrrrrrrrrdddk......",
      ".krrrrrrrrrrrrrrrrrrrrdddk......",
      ".kwrrrrrrrrrrrrrrrrrrrdddkk.....",
      ".kwrrrrrrrrrrrrrrrrrrrddxdk.....",
      ".ksrrrrrrrrrrrrrrrrrrrdddxk.....",
      "..kdddddddddddddddddddxxk.....",
      "..kkdddddddddddddddddxxkk.....",
      "...kkkhkkkkkkkkkkkkhkkkk........",
      "...kkhhhk.........khhhk.........",
      "....khkk...........khk..........",
      ".....k...............k..........",
      "................................",
      "................................",
      "................................"
    ]
  },
  "plane": {
    "palette": {"k":"#1a1a2e","w":"#ffffff","l":"#e0e0e0","g":"#c0c0c0","e":"#606060","b":"#88c8f8","r":"#e84848"},
    "rows": [
      "...............kk...............",
      "..............kwwk..............",
      "..............kwwk..............",
      ".............kwbbwk.............",
      ".............kwbbwk.............",
      ".............kwwwwk.............",
      "............kwrrwwk.............",
      "............kwrrwlk.............",
      "...........kwwrrwlk.............",
      "...........kwwrrwlk.............",
      "..........kwwwrrwlgk............",
      ".........kwwwwrrwlgk............",
      ".kkkkkkkkwwwwwrrwlggkkkkkkkk...",
      "kwwwwwwwwwwwwwrrwlggggggggggk..",
      ".kkkekkkwwwwwrrwlgggggkekkkk...",
      ".........kwwwwrrwlgk............",
      "..........kwwwrrwlgk............",
      "...........kwwrrwlk.............",
      "...........kwwrrwlk.............",
      "............kwrrwlk.............",
      "............kwrrwlk.............",
      ".............kwwwlk.............",
      "............kwwwwlgk............",
      "...........kwwwwlggk............",
      "...........kgggggggk............",
      "............kkkkkkk.............",
      "................................",
      "................................"
    ]
  },
  "rocket": {
    "palette": {"k":"#1a1a2e","w":"#ffffff","l":"#e0e0e0","g":"#c0c0c0","r":"#e84848","d":"#c03030","b":"#88c8f8","B":"#60a0d0","o":"#f8a030","y":"#f8d848"},
    "rows": [
      "...........k............",
      "..........krk...........",
      "..........krk...........",
      ".........krrdk..........",
      ".........krrdk..........",
      "........krrddk..........",
      "........kwwwlk..........",
      ".......kwwwwlk..........",
      ".......kwwwwlk..........",
      ".......kwwwwlk..........",
      "......kwwwwwlgk.........",
      "......kwwwwwlgk.........",
      "......kwwbbwlgk.........",
      "......kwbbbBlgk.........",
      "......kwbBBBlgk.........",
      "......kwwbbwlgk.........",
      "......kwwwwwlgk.........",
      "......kwwrwwlgk.........",
      "......kwwrwwlgk.........",
      "......kwwrwwlgk.........",
      ".....kwwwrwwlgk.........",
      ".....kwwwrwwlggk........",
      "....krwwwrwwlggdk.......",
      "...krrwwwwwwlggddk......",
      "..krrkkkkkkkkkkdddk.....",
      ".krdk...kwwlk..kdddk....",
      ".kdk....kowk....kddk....",
      "..k.....koyk.....kk.....",
      "........kyyk............",
      "........kywk............",
      ".........kk.............",
      "........................"
    ]
  }
};

// ══════════════════════════════════════
// PNG Generator
// ══════════════════════════════════════
function hexToColor(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return Jimp.rgbaToInt(r, g, b, 255);
}

async function generateAll() {
  let count = 0;
  for (const [name, data] of Object.entries(ALL_SPRITES)) {
    const { palette, rows } = data;
    const w = rows[0].length;
    const h = rows.length;

    // Build color map
    const colorMap = {};
    for (const [key, hex] of Object.entries(palette)) {
      if (key !== '.') {
        try { colorMap[key] = hexToColor(hex); } catch(e) {}
      }
    }

    // Create image
    const img = new Jimp(w, h, 0x00000000);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ch = x < rows[y].length ? rows[y][x] : '.';
        if (ch !== '.' && colorMap[ch] !== undefined) {
          img.setPixelColor(colorMap[ch], x, y);
        }
      }
    }

    const outPath = path.join(OUT, `${name}.png`);
    await img.writeAsync(outPath);
    console.log(`✓ ${name} (${w}×${h}, ${Object.keys(palette).length} colors) → ${outPath}`);
    count++;
  }
  console.log(`\nDone! ${count} sprites generated.`);
}

generateAll().catch(console.error);
