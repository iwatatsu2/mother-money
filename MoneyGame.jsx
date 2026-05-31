import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Home, TreePine, Car, Sofa, Gamepad2, Landmark, TrendingUp,
  ShoppingBag, BookOpen, Star, Phone, X, Coins, PiggyBank, BarChart3,
  ArrowUp, ArrowDown, Minus, Gift, Lamp, Monitor,
  Frame, Music, Cat, Dog, Fish, Flower2, Crown, Gem, Trophy, Zap,
  Pizza, IceCream, Bike, Plane, Rocket, Globe, Sun,
  Newspaper, Sparkles, AlertTriangle,
  Wallet, GraduationCap, Shield, Flame,
  HelpCircle, CheckCircle, Brain,
  LayoutGrid, Package, HandCoins,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Cpu, Building2, Umbrella, Fuel, Palmtree, Bitcoin,
  Target, TrendingDown, Sprout, CircleDollarSign,
  Filter, ListOrdered, PieChart, Award, Lock
} from 'lucide-react';

// ══════════════════════════════════════
//  CSS
// ══════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
html,body{margin:0;padding:0;overflow:hidden;position:fixed;width:100%;height:100%;touch-action:none}
.pixel{font-family:'DotGothic16',monospace}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes shake{0%,100%{transform:translateX(0)}10%{transform:translateX(-3px)}20%{transform:translateX(3px)}30%{transform:translateX(-2px)}40%{transform:translateX(2px)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes pop{0%{transform:scale(0.7);opacity:0}60%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
@keyframes slideUp{0%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:1}}
@keyframes slideDown{0%{transform:translateY(-12px);opacity:0}100%{transform:translateY(0);opacity:1}}
@keyframes ring{0%,50%,100%{transform:rotate(0)}5%{transform:rotate(15deg)}10%{transform:rotate(-12deg)}15%{transform:rotate(10deg)}20%{transform:rotate(-8deg)}}
@keyframes glow{0%,100%{box-shadow:0 0 4px rgba(0,255,255,0.3)}50%{box-shadow:0 0 12px rgba(0,255,255,0.7)}}
@keyframes walk{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes marquee{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}
.marquee-container{overflow:hidden;white-space:nowrap}
.marquee-text{display:inline-block;animation:marquee 18s linear infinite}
*::-webkit-scrollbar{width:4px}
*::-webkit-scrollbar-track{background:#111}
*::-webkit-scrollbar-thumb{background:#0dd;border-radius:2px}
`;

// ══════════════════════════════════════
//  PNG Sprite System (Famicom-level)
// ══════════════════════════════════════
const Sprite = React.memo(({ src, size = 40, className = '', style = {} }) => (
  <img src={src} width={size} height={size} className={className}
    style={{ ...style, imageRendering: 'pixelated', objectFit: 'contain' }} draggable={false} />
));
const PLAYER_IMG = { down: '/sprites/player_down.png', up: '/sprites/player_up.png', left: '/sprites/player_left.png', right: '/sprites/player_right.png' };
const VEHICLE_IMG = { bike: '/sprites/bike.png', car: '/sprites/car.png', plane: '/sprites/plane.png', rocket: '/sprites/rocket.png' };
const BLDG_IMG = { home: '/sprites/home.png', bank: '/sprites/bank.png', school: '/sprites/school.png', shop: '/sprites/shop.png', stock: '/sprites/stock.png', station: '/sprites/station.png' };
const NPC_IMG = { warrior: '/sprites/npc_warrior.png', slime: '/sprites/npc_slime.png', witch: '/sprites/npc_witch.png' };
const TILE_IMG = { grass: '/sprites/grass.png', path: '/sprites/path.png', water: '/sprites/water.png', tree: '/sprites/tree.png', flower: '/sprites/flower.png', fence: '/sprites/fence.png', road: '/sprites/road.png', sand: '/sprites/sand.png', stone: '/sprites/stone.png', dark: '/sprites/dark.png', floor: '/sprites/floor.png', wall: '/sprites/wall.png', shelf: '/sprites/shelf.png', counter: '/sprites/counter.png', desk: '/sprites/desk.png', door: '/sprites/door.png', plant: '/sprites/plant.png', vending: '/sprites/vending.png', rug: '/sprites/rug.png' };

// ══════════════════════════════════════
//  Tile types & styles
// ══════════════════════════════════════
const T = { GRASS: 0, PATH: 1, WATER: 2, TREE: 3, FLOWER: 4, FENCE: 5, ROAD: 6, SAND: 7, STONE: 8, DARK: 9,
  FLOOR: 10, WALL: 11, SHELF: 12, COUNTER: 13, DESK: 14, DOOR: 15, PLANT: 16, VENDING: 17, RUG: 18 };
const TILE_STYLE = {
  [T.GRASS]:  { bg: '#4a7c3f', img: 'grass' },
  [T.PATH]:   { bg: '#c4a96a', img: 'path' },
  [T.WATER]:  { bg: '#3b6ea5', img: 'water' },
  [T.TREE]:   { bg: '#3d6b35', img: 'tree' },
  [T.FLOWER]: { bg: '#4a7c3f', img: 'flower' },
  [T.FENCE]:  { bg: '#8b7355', img: 'fence' },
  [T.ROAD]:   { bg: '#555', img: 'road' },
  [T.SAND]:   { bg: '#dcc27a', img: 'sand' },
  [T.STONE]:  { bg: '#888', img: 'stone' },
  [T.DARK]:   { bg: '#2a2a3e', img: 'dark' },
  [T.FLOOR]:  { bg: '#c8a868', img: 'floor' },
  [T.WALL]:   { bg: '#8a7a6a', img: 'wall' },
  [T.SHELF]:  { bg: '#7a5a2a', img: 'shelf' },
  [T.COUNTER]:{ bg: '#a08868', img: 'counter' },
  [T.DESK]:   { bg: '#b09868', img: 'desk' },
  [T.DOOR]:   { bg: '#9a7a4a', img: 'door' },
  [T.PLANT]:  { bg: '#c8a868', img: 'plant' },
  [T.VENDING]:{ bg: '#c8a868', img: 'vending' },
  [T.RUG]:    { bg: '#8b4040', img: 'rug' },
};
const WALKABLE = new Set([T.GRASS, T.PATH, T.ROAD, T.SAND, T.FLOWER, T.STONE, T.DARK, T.FLOOR, T.DOOR, T.RUG]);

// ══════════════════════════════════════
//  Interior maps (10×8 each)
// ══════════════════════════════════════
const INT_COLS = 10, INT_ROWS = 8;
const iW = T.WALL, iF = T.FLOOR, iS = T.SHELF, iC = T.COUNTER, iD = T.DESK, iDR = T.DOOR, iP = T.PLANT, iV = T.VENDING, iR = T.RUG;
const INTERIOR_MAPS = {
  // 銀行: カウンター奥に金庫棚、ロビーに観葉植物、ATMコーナー
  bank: [
    iW,iW,iW,iW,iW,iW,iW,iW,iW,iW,
    iW,iS,iS,iF,iF,iF,iF,iS,iS,iW,
    iW,iF,iF,iF,iP,iP,iF,iF,iF,iW,
    iW,iF,iC,iC,iC,iC,iC,iC,iF,iW,
    iW,iF,iF,iR,iR,iR,iR,iF,iF,iW,
    iW,iP,iF,iR,iR,iR,iR,iF,iP,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iV,iW,
    iW,iW,iW,iW,iDR,iDR,iW,iW,iW,iW,
  ],
  // 学校: 教壇+机4列、黒板(棚)、本棚、植物
  school: [
    iW,iW,iW,iW,iW,iW,iW,iW,iW,iW,
    iW,iS,iS,iS,iS,iS,iS,iS,iS,iW,
    iW,iF,iF,iF,iC,iC,iF,iF,iF,iW,
    iW,iF,iD,iF,iF,iF,iF,iD,iF,iW,
    iW,iF,iD,iF,iF,iF,iF,iD,iF,iW,
    iW,iF,iD,iF,iF,iF,iF,iD,iF,iW,
    iW,iP,iF,iF,iF,iF,iF,iF,iP,iW,
    iW,iW,iW,iW,iDR,iDR,iW,iW,iW,iW,
  ],
  // ショップ: 商品棚びっしり、中央通路、レジカウンター
  shop: [
    iW,iW,iW,iW,iW,iW,iW,iW,iW,iW,
    iW,iS,iF,iS,iF,iF,iS,iF,iS,iW,
    iW,iS,iF,iS,iF,iF,iS,iF,iS,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iF,iW,
    iW,iS,iF,iS,iF,iF,iS,iF,iS,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iF,iW,
    iW,iF,iF,iC,iC,iC,iC,iF,iV,iW,
    iW,iW,iW,iW,iDR,iDR,iW,iW,iW,iW,
  ],
  // 証券: モニター(机)並び、電光掲示板(棚)、商談カウンター
  stock: [
    iW,iW,iW,iW,iW,iW,iW,iW,iW,iW,
    iW,iS,iS,iS,iS,iS,iS,iS,iS,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iF,iW,
    iW,iD,iF,iD,iF,iF,iD,iF,iD,iW,
    iW,iF,iF,iF,iR,iR,iF,iF,iF,iW,
    iW,iF,iF,iC,iC,iC,iC,iF,iF,iW,
    iW,iP,iF,iF,iF,iF,iF,iF,iP,iW,
    iW,iW,iW,iW,iDR,iDR,iW,iW,iW,iW,
  ],
  // 自宅: ベッド(机)、本棚、ラグ、観葉植物、自販機(冷蔵庫)
  home: [
    iW,iW,iW,iW,iW,iW,iW,iW,iW,iW,
    iW,iD,iD,iF,iF,iF,iS,iS,iV,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iF,iW,
    iW,iF,iF,iR,iR,iR,iF,iF,iF,iW,
    iW,iF,iF,iR,iR,iR,iF,iD,iF,iW,
    iW,iP,iF,iF,iF,iF,iF,iF,iP,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iF,iW,
    iW,iW,iW,iW,iDR,iDR,iW,iW,iW,iW,
  ],
  // 駅: 改札(カウンター)、時刻表(棚)、ベンチ(机)、自販機
  station: [
    iW,iW,iW,iW,iW,iW,iW,iW,iW,iW,
    iW,iS,iF,iF,iF,iF,iF,iF,iS,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iF,iW,
    iW,iF,iC,iC,iF,iF,iC,iC,iF,iW,
    iW,iF,iF,iF,iF,iF,iF,iF,iF,iW,
    iW,iD,iF,iF,iR,iR,iF,iF,iD,iW,
    iW,iV,iF,iF,iF,iF,iF,iF,iP,iW,
    iW,iW,iW,iW,iDR,iDR,iW,iW,iW,iW,
  ],
};

// ══════════════════════════════════════
//  Map builder
// ══════════════════════════════════════
const COLS = 16, ROWS = 24;
const makeTiles = (base) => Array(ROWS * COLS).fill(base);
const setRect = (t, x1, y1, x2, y2, v) => { const n = [...t]; for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) n[y * COLS + x] = v; return n; };
const setTile = (t, x, y, v) => { const n = [...t]; n[y * COLS + x] = v; return n; };

// ═══ Town 0: はじまりのむら（丘と池のある村）═══
const town0Tiles = (() => {
  let t = makeTiles(T.GRASS);
  // 不規則な木の境界（上）
  t = setRect(t, 0, 0, 15, 0, T.TREE);
  t = setRect(t, 0, 1, 2, 1, T.TREE); t = setRect(t, 13, 1, 15, 1, T.TREE);
  // 左境界（凹凸）
  t = setRect(t, 0, 0, 0, 23, T.TREE);
  [3,4,8,9,15,16,20,21].forEach(y => { t[y * COLS + 1] = T.TREE; });
  // 右境界（凹凸）
  t = setRect(t, 15, 0, 15, 23, T.TREE);
  [2,3,7,8,14,15,19,20].forEach(y => { t[y * COLS + 14] = T.TREE; });
  // 下境界
  t = setRect(t, 0, 23, 15, 23, T.TREE);
  t = setRect(t, 0, 22, 3, 22, T.TREE); t = setRect(t, 12, 22, 15, 22, T.TREE);
  // メインの十字路
  t = setRect(t, 7, 2, 8, 21, T.PATH); // 縦の道
  t = setRect(t, 2, 12, 13, 12, T.PATH); // 横の道
  t = setRect(t, 2, 6, 6, 6, T.PATH); // 上の横道
  t = setRect(t, 9, 6, 13, 6, T.PATH);
  t = setRect(t, 2, 18, 6, 18, T.PATH); // 下の横道
  t = setRect(t, 9, 18, 13, 18, T.PATH);
  // 左上の池
  t = setRect(t, 3, 3, 5, 5, T.WATER);
  t[2 * COLS + 4] = T.WATER; t[6 * COLS + 4] = T.WATER;
  // 右下の花畑の丘
  t = setRect(t, 10, 19, 13, 21, T.FLOWER);
  t[19 * COLS + 9] = T.FLOWER; t[21 * COLS + 9] = T.FLOWER;
  // 散らばる花
  t[4 * COLS + 10] = T.FLOWER; t[4 * COLS + 11] = T.FLOWER;
  t[8 * COLS + 3] = T.FLOWER; t[16 * COLS + 3] = T.FLOWER;
  // 木々（内部の飾り）
  t[10 * COLS + 2] = T.TREE; t[10 * COLS + 13] = T.TREE;
  t[15 * COLS + 5] = T.TREE; t[15 * COLS + 10] = T.TREE;
  return t;
})();

// ═══ Town 1: なかまちシティ（川が蛇行する街）═══
const town1Tiles = (() => {
  let t = makeTiles(T.DARK);
  // 外周フェンス（不規則）
  t = setRect(t, 0, 0, 15, 0, T.FENCE); t = setRect(t, 0, 23, 15, 23, T.FENCE);
  t = setRect(t, 0, 0, 0, 23, T.FENCE); t = setRect(t, 15, 0, 15, 23, T.FENCE);
  t[12 * COLS + 0] = T.ROAD; t[12 * COLS + 15] = T.ROAD;
  // 道路グリッド
  t = setRect(t, 1, 4, 14, 4, T.ROAD);
  t = setRect(t, 1, 12, 14, 12, T.ROAD);
  t = setRect(t, 1, 20, 14, 20, T.ROAD);
  t = setRect(t, 3, 1, 3, 22, T.ROAD);
  t = setRect(t, 8, 1, 8, 22, T.ROAD);
  t = setRect(t, 13, 1, 13, 22, T.ROAD);
  // 蛇行する川
  t = setRect(t, 5, 1, 6, 3, T.WATER);
  t = setRect(t, 6, 4, 7, 7, T.WATER);
  t = setRect(t, 5, 8, 6, 11, T.WATER);
  t = setRect(t, 6, 13, 7, 16, T.WATER);
  t = setRect(t, 5, 17, 6, 19, T.WATER);
  t = setRect(t, 6, 20, 7, 22, T.WATER);
  // 橋（川を渡る道）
  [4, 12, 20].forEach(r => { t[r * COLS + 5] = T.ROAD; t[r * COLS + 6] = T.ROAD; t[r * COLS + 7] = T.ROAD; });
  // 歩道ブロック
  t = setRect(t, 1, 1, 2, 3, T.STONE); t = setRect(t, 1, 5, 2, 11, T.STONE);
  t = setRect(t, 9, 1, 12, 3, T.STONE); t = setRect(t, 9, 5, 12, 11, T.STONE);
  t = setRect(t, 1, 13, 2, 19, T.STONE); t = setRect(t, 1, 21, 2, 22, T.STONE);
  t = setRect(t, 9, 13, 12, 19, T.STONE); t = setRect(t, 9, 21, 12, 22, T.STONE);
  t = setRect(t, 14, 1, 14, 22, T.STONE);
  return t;
})();

// ═══ Town 2: おおえどメトロ（右側に海岸線）═══
const town2Tiles = (() => {
  let t = makeTiles(T.STONE);
  // 外周
  t = setRect(t, 0, 0, 15, 0, T.FENCE); t = setRect(t, 0, 23, 15, 23, T.FENCE);
  t = setRect(t, 0, 0, 0, 23, T.FENCE);
  // 右側海岸線（不規則）
  t = setRect(t, 14, 0, 15, 23, T.WATER);
  t = setRect(t, 13, 2, 13, 5, T.WATER);
  t = setRect(t, 13, 10, 13, 14, T.WATER);
  t = setRect(t, 13, 18, 13, 21, T.WATER);
  t = setRect(t, 12, 3, 12, 4, T.SAND); // 砂浜
  t = setRect(t, 12, 11, 12, 13, T.SAND);
  t = setRect(t, 12, 19, 12, 20, T.SAND);
  t[12 * COLS + 0] = T.ROAD;
  // 大通り
  t = setRect(t, 1, 4, 11, 4, T.ROAD); t = setRect(t, 1, 5, 11, 5, T.ROAD);
  t = setRect(t, 1, 12, 11, 12, T.ROAD); t = setRect(t, 1, 13, 11, 13, T.ROAD);
  t = setRect(t, 1, 20, 11, 20, T.ROAD);
  t = setRect(t, 3, 1, 3, 22, T.ROAD);
  t = setRect(t, 7, 1, 7, 22, T.ROAD);
  t = setRect(t, 11, 1, 11, 22, T.ROAD);
  return t;
})();

// ═══ Town 3: せかいとし（オアシス都市）═══
const town3Tiles = (() => {
  let t = makeTiles(T.SAND);
  // 周囲を木→砂のグラデーション
  t = setRect(t, 0, 0, 15, 1, T.TREE); t = setRect(t, 0, 22, 15, 23, T.TREE);
  t = setRect(t, 0, 0, 1, 23, T.TREE); t = setRect(t, 14, 0, 15, 23, T.TREE);
  // 内側は砂（一部木が突出）
  [5,6,17,18].forEach(y => { t[y * COLS + 2] = T.TREE; });
  [4,5,18,19].forEach(y => { t[y * COLS + 13] = T.TREE; });
  t[12 * COLS + 1] = T.ROAD; // 入口
  // 中央オアシス（大きな池）
  t = setRect(t, 6, 10, 9, 14, T.WATER);
  t[9 * COLS + 7] = T.WATER; t[9 * COLS + 8] = T.WATER;
  t[15 * COLS + 7] = T.WATER; t[15 * COLS + 8] = T.WATER;
  // オアシス周囲に花
  t[9 * COLS + 6] = T.FLOWER; t[9 * COLS + 9] = T.FLOWER;
  t[15 * COLS + 6] = T.FLOWER; t[15 * COLS + 9] = T.FLOWER;
  t[10 * COLS + 5] = T.FLOWER; t[14 * COLS + 5] = T.FLOWER;
  t[10 * COLS + 10] = T.FLOWER; t[14 * COLS + 10] = T.FLOWER;
  // 道路
  t = setRect(t, 3, 6, 12, 6, T.ROAD);
  t = setRect(t, 3, 18, 12, 18, T.ROAD);
  t = setRect(t, 7, 2, 8, 21, T.ROAD);
  t = setRect(t, 3, 3, 6, 3, T.PATH); t = setRect(t, 9, 3, 12, 3, T.PATH);
  t = setRect(t, 3, 21, 6, 21, T.PATH); t = setRect(t, 9, 21, 12, 21, T.PATH);
  t = setRect(t, 4, 2, 4, 5, T.ROAD); t = setRect(t, 11, 2, 11, 5, T.ROAD);
  t = setRect(t, 4, 15, 4, 21, T.ROAD); t = setRect(t, 11, 15, 11, 21, T.ROAD);
  return t;
})();

// ══════════════════════════════════════
//  Towns
// ══════════════════════════════════════
const NPC_TIPS = {
  warrior: [
    'おかねは「つかう・ためる・ふやす」の3つにわけるんだ！',
    'ぎんこうにあずけると「りし」がつくぞ！',
    'ぶっかがあがると、おなじお金でかえるものがへるんだ。',
    'ふくりはすごいぞ！10年で2ばいになることもある！',
    'まいつきコツコツためるのが、いちばんのちかみちだ！',
  ],
  slime: [
    'ぷるぷる〜♪ かぶはやすいときにかうのがコツだぷる！',
    'ぼくはPERが15いかのかぶがすきだぷる〜',
    'ぶんさんとうしってしってる？いろんなかぶをかうことだぷる！',
    'ナンピンってね、さがったらもっとかうことだぷる♪',
    'ROEがたかいかいしゃは、もうけじょうずだぷる〜',
  ],
  witch: [
    '72のほうそく、しってる？72÷りりつ＝2ばいになるねんすう！',
    'インフレのとき、げんきんだけもってるとそんするわ。',
    'ETFってね、たくさんのかぶをまとめてかえるしょうひんよ！',
    'さいけんはかぶよりリスクがひくいの。おぼえておいてね。',
    'じかそうがくは、かぶか×はっこうすう。かいしゃのおおきさよ！',
  ],
};
const TOWNS = [
  { id: 0, name: 'はじまりのむら', desc: 'のどかなむら。おかねのきほんをまなぼう！', tiles: town0Tiles, color: '#4a7c3f',
    buildings: [
      { type: 'home', x: 3, y: 4, emoji: '🏠', name: 'じぶんのいえ' },
      { type: 'bank', x: 10, y: 4, emoji: '🏦', name: 'ぎんこう' },
      { type: 'school', x: 3, y: 10, emoji: '🏫', name: 'がっこう' },
      { type: 'shop', x: 10, y: 10, emoji: '🛒', name: 'ショップ' },
      { type: 'stock', x: 3, y: 16, emoji: '📈', name: 'しょうけん' },
      { type: 'station', x: 10, y: 16, emoji: '🚉', name: 'えき' },
    ],
    npcs: [
      { type: 'warrior', x: 5, y: 8, name: 'センシくん' },
      { type: 'slime', x: 10, y: 14, name: 'ぷるお' },
    ],
    startPos: { x: 7, y: 12 }, stocks: ['candy', 'fish', 'pet', 'bank_s'],
    shopItems: ['toy1', 'toy2', 'toy3', 'toy4', 'food1', 'food2', 'int6', 'car1'],
    rewardMult: 1, unlockReq: null,
  },
  { id: 1, name: 'なかまちシティ', desc: 'にぎやかな町。ちゅうきゅうかぶがかえる！', tiles: town1Tiles, color: '#3a5fa0',
    buildings: [
      { type: 'bank', x: 5, y: 2, emoji: '🏦', name: 'なかまちぎんこう' },
      { type: 'school', x: 10, y: 2, emoji: '🏫', name: 'なかまち学園' },
      { type: 'stock', x: 10, y: 8, emoji: '📈', name: 'シティしょうけん' },
      { type: 'shop', x: 5, y: 15, emoji: '🛒', name: 'シティモール' },
      { type: 'home', x: 10, y: 15, emoji: '🏠', name: 'マンション' },
      { type: 'station', x: 5, y: 21, emoji: '🚉', name: 'シティえき' },
    ],
    npcs: [
      { type: 'slime', x: 10, y: 12, name: 'ぷるみ' },
      { type: 'witch', x: 5, y: 8, name: 'マジカ' },
    ],
    startPos: { x: 8, y: 12 }, stocks: ['candy', 'fish', 'pet', 'game', 'bank_s', 'insure', 'energy'],
    shopItems: ['toy1', 'toy2', 'toy3', 'food1', 'food2', 'int1', 'int2', 'int3', 'int4', 'int5', 'int6', 'car1', 'car2'],
    rewardMult: 2, unlockReq: { asset: 3000, vehicle: 'bike' },
  },
  { id: 2, name: 'おおえどメトロ', desc: 'だいとかい！こうがくなとうしができる！', tiles: town2Tiles, color: '#8a3fa0',
    buildings: [
      { type: 'bank', x: 5, y: 2, emoji: '🏦', name: 'メガバンク' },
      { type: 'stock', x: 9, y: 2, emoji: '📈', name: 'おおえどしょうけん' },
      { type: 'school', x: 5, y: 8, emoji: '🏫', name: 'おおえど大学' },
      { type: 'shop', x: 9, y: 8, emoji: '🛒', name: 'ひゃっかてん' },
      { type: 'home', x: 5, y: 16, emoji: '🏠', name: 'タワマン' },
      { type: 'station', x: 9, y: 16, emoji: '🚉', name: 'メトロえき' },
    ],
    npcs: [
      { type: 'warrior', x: 5, y: 12, name: 'ナイト' },
      { type: 'witch', x: 9, y: 12, name: 'ウィズ' },
    ],
    startPos: { x: 7, y: 12 }, stocks: ['candy', 'fish', 'pet', 'game', 'robo', 'ai', 'bank_s', 'insure', 'energy', 'resort'],
    shopItems: ['int1', 'int2', 'int3', 'int4', 'int5', 'int6', 'car1', 'car2', 'car3', 'house1', 'house2', 'land1'],
    rewardMult: 3, unlockReq: { asset: 15000, vehicle: 'car' },
  },
  { id: 3, name: 'せかいとし', desc: 'せかいのちゅうしん！ゆめのとうしができる！', tiles: town3Tiles, color: '#c4a020',
    buildings: [
      { type: 'bank', x: 5, y: 4, emoji: '🏦', name: 'ワールドバンク' },
      { type: 'stock', x: 10, y: 4, emoji: '📈', name: 'ワールドしょうけん' },
      { type: 'home', x: 5, y: 8, emoji: '🏠', name: 'ペントハウス' },
      { type: 'school', x: 5, y: 16, emoji: '🏫', name: 'せかい大学' },
      { type: 'shop', x: 10, y: 16, emoji: '🛒', name: 'せかいマーケット' },
      { type: 'station', x: 10, y: 20, emoji: '🚉', name: 'くうこう' },
    ],
    npcs: [
      { type: 'warrior', x: 8, y: 6, name: 'マスター' },
      { type: 'slime', x: 5, y: 20, name: 'キングぷる' },
      { type: 'witch', x: 10, y: 8, name: 'アーク' },
    ],
    startPos: { x: 7, y: 12 }, stocks: ['candy', 'fish', 'pet', 'game', 'robo', 'ai', 'bank_s', 'insure', 'space', 'energy', 'resort', 'crypto'],
    shopItems: ['int1', 'int2', 'int3', 'int4', 'int5', 'int6', 'car1', 'car2', 'car3', 'car4', 'house1', 'house2', 'house3', 'land1', 'land2', 'land3'],
    rewardMult: 5, unlockReq: { asset: 50000, vehicle: 'plane' },
  },
];

// ══════════════════════════════════════
//  Game data
// ══════════════════════════════════════
const QUIZZES = [
  { q: "おこづかいをもらったら、まず何をする？", a: ["つかう分・ためる分にわける", "ぜんぶつかう", "ぜんぶかくす"], c: 0, e: "「つかう」「ためる」「ふやす」にわけるのがコツ！" },
  { q: "ぎんこうにお金をあずけると？", a: ["すこしずつふえる", "へっていく", "かわらない"], c: 0, e: "『りし』というごほうびがもらえるよ！" },
  { q: "『とうし』ってどういういみ？", a: ["お金をつかってふやすこと", "お金をすてること", "お金をかりること"], c: 0, e: "かいしゃにお金をだして、いっしょにそだてること！" },
  { q: "かぶしき（かぶ）ってなに？", a: ["かいしゃの一部をもてるけん", "おかしのなまえ", "ゲームのアイテム"], c: 0, e: "かぶをかうと、かいしゃのオーナーになれる！" },
  { q: "100えんで買って120えんでうったら？", a: ["20えんのもうけ", "20えんのそん", "かわらない"], c: 0, e: "120-100＝20えん。これが『りえき』だよ！" },
  { q: "おかねをためるのにいちばんたいせつなことは？", a: ["まいにちすこしずつためる", "いちどにたくさんかせぐ", "ぜんぶつかわない"], c: 0, e: "コツコツためるのがちかみち！" },
  { q: "『ぶっか』がたかくなるってどういうこと？", a: ["モノのねだんがあがる", "お金がふえる", "おみせがへる"], c: 0, e: "おなじお金でかえるものがへるよ。" },
  { q: "クレジットカードでかいものすると？", a: ["あとではらう", "タダになる", "お金がふえる"], c: 0, e: "『かりたお金』。つかいすぎちゅうい！" },
  { q: "お金をかりたら『りし』をはらう。りしってなに？", a: ["レンタルりょうのようなもの", "ごほうび", "ばっきん"], c: 0, e: "お金のつかいちんをはらうんだ。" },
  { q: "100まんえんを年5%でとうし。1年後は？", a: ["105まんえん", "100まんえん", "95まんえん"], c: 0, e: "100万×1.05＝105万！" },
  { q: "1つのかぶにぜんぶかけるのは？", a: ["きけんなこと", "かしこいこと", "ふつうのこと"], c: 0, e: "『たまごは1つのかごに盛るな』！" },
  { q: "おみせやさんでもうけるには？", a: ["みんながほしいものをうる", "いちばんたかいものをうる", "タダであげる"], c: 0, e: "ほしいひとにとどけるのがきほん！" },
  { q: "『ふくり』ってどんなちから？", a: ["りえきにもりえきがつく", "2ばいになる", "そんをする"], c: 0, e: "ゆきだるまみたいにふえる！" },
  { q: "もしものためにお金をためることを？", a: ["ちょきん（ひじょうきん）", "むだづかい", "とうし"], c: 0, e: "もしものお金はだいじ！" },
  { q: "かぶのねだんが下がったとき、どうする？", a: ["あわてずようすをみる", "すぐぜんぶうる", "もっとたくさんかう"], c: 0, e: "あわてないことがたいせつ！" },
  // 株式指標クイズ
  { q: "PER（ピーイーアール）ってなに？", a: ["かぶかをりえきでわったもの", "かぶかをうりあげでわったもの", "かぶかのへんどうりつ"], c: 0, e: "PER＝株価÷EPS。『何年分のりえきで元がとれるか』をしめす！" },
  { q: "PERが10倍のかぶと30倍のかぶ。わりやすいのは？", a: ["PER10倍のほう", "PER30倍のほう", "おなじ"], c: 0, e: "PERがひくいほうが『わりやす』！10年分のりえきで元がとれる。" },
  { q: "EPSってなに？", a: ["1かぶあたりのりえき", "かぶかのへんどうりつ", "かいしゃのかり金"], c: 0, e: "EPS＝じゅんりえき÷はっこうかぶ数。かいしゃの『かせぐちから』！" },
  { q: "PBR（ピービーアール）ってなに？", a: ["かぶかをしさんでわったもの", "かぶかをうりあげでわったもの", "はいとうきんのわりあい"], c: 0, e: "PBR＝株価÷BPS。1倍いかなら『しさんよりやすい』かも！" },
  { q: "PBRが0.8倍のかぶは？", a: ["しさんよりやすくかえる", "しさんよりたかい", "ふつうのねだん"], c: 0, e: "PBR1倍いかは『かいしゃをバラバラにしたほうが高い』じょうたい！" },
  { q: "ROE（アールオーイー）ってなに？", a: ["しほんにたいするりえきのわりあい", "かぶかのへんどうりつ", "うりあげのしんちょうりつ"], c: 0, e: "ROE＝じゅんりえき÷じこしほん。たかいほどお金をじょうずにつかってる！" },
  { q: "ROE20%のかいしゃとROE5%のかいしゃ、すごいのは？", a: ["ROE20%のほう", "ROE5%のほう", "おなじ"], c: 0, e: "ROE20%はとてもゆうしゅう！10%いじょうがめやす。" },
  { q: "じかそうがくってなに？", a: ["かぶか×はっこうかぶ数", "かぶか÷りえき", "うりあげ×りえきりつ"], c: 0, e: "かいしゃの『ねだん』＝じかそうがく。おおきいほどだいきぎょう！" },
  { q: "はいとうりまわりってなに？", a: ["1年のはいとう÷かぶかの%", "かぶかのへんどうりつ", "かいしゃのしゃっきん"], c: 0, e: "はいとうりまわり3%なら、100万えんで年3万えんもらえる！" },
  { q: "かぶのリスクをはかるβ（ベータ）ってなに？", a: ["しじょうぜんたいとのれんどうせい", "かぶかのたかさ", "はいとうきんのおおさ"], c: 0, e: "β=1なら市場なみ。2ならしじょうの2ばいうごく！" },
  { q: "ぶんさんとうしのメリットは？", a: ["リスクをへらせる", "かならずもうかる", "ぜいきんがやすくなる"], c: 0, e: "いろんなかぶにわけることで、1つがさがっても他でカバー！" },
  { q: "『インデックスとうし』ってなに？", a: ["しじょうぜんたいにとうしする", "1つのかぶにしぼる", "がいこくのかぶだけかう"], c: 0, e: "日経平均やS&P500のようなしすうに連動させるとうしほう！" },
  { q: "『ナンピン』ってなに？", a: ["さがったときにかいまし", "あがったときにうる", "すべてのかぶをうる"], c: 0, e: "へいきんしゅとくかかくを下げる作戦。でもリスクも！" },
  { q: "『じゅうきゅう』でかぶがあがるのは？", a: ["かいたい人がおおいとき", "うりたい人がおおいとき", "だれもとりひきしないとき"], c: 0, e: "かいたい人＞うりたい人→かぶかUP！これがじゅうきゅうのほうそく。" },
  { q: "『ストップ高』ってなに？", a: ["1日のじょうげんまであがること", "かぶかがゼロになること", "とりひきがとまること"], c: 0, e: "あまりにも急にうごくのをふせぐしくみ。ぎゃくはストップ安！" },
];

const NEWS_POOL = [
  { text: "🍬 おかしカンパニーの新アメが大人気！", affects: 'candy', impact: 0.15, type: 'good' },
  { text: "🍬 おかしの原料がねあがり…", affects: 'candy', impact: -0.12, type: 'bad' },
  { text: "🎮 ゲームファクトリーの新作が大ヒット！", affects: 'game', impact: 0.20, type: 'good' },
  { text: "🎮 ゲームにバグ発生…", affects: 'game', impact: -0.10, type: 'bad' },
  { text: "🤖 ロボットラボが新型AIロボットを発表！", affects: 'robo', impact: 0.25, type: 'good' },
  { text: "🤖 ロボットのリコールが発生！", affects: 'robo', impact: -0.18, type: 'bad' },
  { text: "🚀 うちゅうぼうけんが月面基地に成功！", affects: 'space', impact: 0.30, type: 'good' },
  { text: "🚀 ロケット打ち上げが延期に…", affects: 'space', impact: -0.15, type: 'bad' },
  { text: "🐕 どうぶつえんにパンダがきた！", affects: 'pet', impact: 0.12, type: 'good' },
  { text: "🐟 おさかなマートが回転寿司と契約！", affects: 'fish', impact: 0.10, type: 'good' },
  { text: "📰 けいざい好調！かぶがUP！", affects: 'ALL', impact: 0.08, type: 'good' },
  { text: "📰 ふけいき…かぶがDOWN", affects: 'ALL', impact: -0.06, type: 'bad' },
];

const PAPA_CALLS = [
  { threshold: 500, msg: "パパだよ。500MMもたまったのか！\nえらいぞ！\n『まずためることが、とうしの第一歩だ』", gift: 100 },
  { threshold: 2000, msg: "パパだよ。なかなかやるな！\n『たまごは一つのカゴに盛るな』\nぶんさんとうしをおぼえよう。", gift: 200 },
  { threshold: 5000, msg: "パパだよ。5000MM！すごいぞ！\n『ふくり』のちからをしんじるんだ。", gift: 500 },
  { threshold: 10000, msg: "パパだよ。1まんMM…！\n『ながくもつことが、いちばんの\nとうしさくせん』だ。", gift: 1000 },
  { threshold: 25000, msg: "パパだよ。もうパパよりお金もちだな…\n『じぶんへのとうしが、いちばん\nリターンが大きい』", gift: 2000 },
  { threshold: 50000, msg: "パパだよ。5まんMM…！てんさいか？\n『おかねはどうぐだ。\nつかいかたしだいでせかいがかわる』", gift: 5000 },
  { threshold: 100000, msg: "パパだよ。10まんMM…！！\nもう何も教えることがないよ。\nほこりにおもう。", gift: 10000 },
];

// Sectors
const SECTORS = {
  life: { name: '生活', color: '#4ADE80', icon: '🛒' },
  tech: { name: 'テック', color: '#818CF8', icon: '💻' },
  finance: { name: '金融', color: '#FBBF24', icon: '🏦' },
  frontier: { name: 'フロンティア', color: '#F87171', icon: '🚀' },
};

const ALL_STOCKS = [
  // 生活（ディフェンシブ） - eps: 1株利益, bps: 1株純資産, shares: 発行株数(万株)
  { id: 'candy', name: 'おかしカンパニー', price: 100, history: [95, 98, 100], trend: 0.012, vol: 0.05, icon: IceCream, color: '#FF69B4', desc: 'あんてい', dividend: 0.012, sector: 'life', beta: 0.6, eps: 8, bps: 70, shares: 500 },
  { id: 'fish', name: 'おさかなマート', price: 80, history: [78, 79, 80], trend: 0.008, vol: 0.04, icon: Fish, color: '#4169E1', desc: 'はじめて向け', dividend: 0.018, sector: 'life', beta: 0.5, eps: 6, bps: 65, shares: 300 },
  { id: 'pet', name: 'どうぶつえん', price: 150, history: [145, 148, 150], trend: 0.01, vol: 0.05, icon: Dog, color: '#DEB887', desc: 'はいとう高い', dividend: 0.025, sector: 'life', beta: 0.7, eps: 12, bps: 100, shares: 400 },
  // テック
  { id: 'game', name: 'ゲームファクトリー', price: 250, history: [240, 245, 250], trend: 0.025, vol: 0.10, icon: Gamepad2, color: '#7B68EE', desc: 'せいちょう', dividend: 0.005, sector: 'tech', beta: 1.3, eps: 10, bps: 80, shares: 800 },
  { id: 'robo', name: 'ロボットラボ', price: 500, history: [480, 490, 500], trend: 0.035, vol: 0.14, icon: Zap, color: '#00CED1', desc: 'ハイリスク', dividend: 0, sector: 'tech', beta: 1.5, eps: 12, bps: 120, shares: 600 },
  { id: 'ai', name: 'AIラボ', price: 800, history: [750, 770, 800], trend: 0.04, vol: 0.18, icon: Cpu, color: '#A78BFA', desc: 'さいしんぎじゅつ', dividend: 0, sector: 'tech', beta: 1.8, eps: 15, bps: 150, shares: 1000 },
  // 金融
  { id: 'bank_s', name: 'まちのぎんこう', price: 200, history: [195, 198, 200], trend: 0.01, vol: 0.07, icon: Building2, color: '#FFD700', desc: 'きんゆう', dividend: 0.02, sector: 'finance', beta: 1.0, eps: 18, bps: 180, shares: 1200 },
  { id: 'insure', name: 'ほけんカンパニー', price: 300, history: [290, 295, 300], trend: 0.012, vol: 0.06, icon: Umbrella, color: '#38BDF8', desc: 'あんていはいとう', dividend: 0.022, sector: 'finance', beta: 0.9, eps: 22, bps: 200, shares: 900 },
  // フロンティア
  { id: 'space', name: 'うちゅうぼうけん', price: 1000, history: [950, 970, 1000], trend: 0.045, vol: 0.20, icon: Rocket, color: '#FF6347', desc: 'ゆめかぶ', dividend: 0, sector: 'frontier', beta: 2.0, eps: 5, bps: 200, shares: 2000 },
  { id: 'energy', name: 'エネルギーファーム', price: 400, history: [380, 390, 400], trend: 0.02, vol: 0.12, icon: Fuel, color: '#F97316', desc: 'しげんかぶ', dividend: 0.015, sector: 'frontier', beta: 1.4, eps: 25, bps: 250, shares: 700 },
  { id: 'resort', name: 'しまリゾート', price: 350, history: [340, 345, 350], trend: 0.018, vol: 0.09, icon: Palmtree, color: '#34D399', desc: 'かんこう', dividend: 0.01, sector: 'frontier', beta: 1.2, eps: 20, bps: 180, shares: 500 },
  { id: 'crypto', name: 'かそうコインしょ', price: 600, history: [550, 570, 600], trend: 0.05, vol: 0.25, icon: Bitcoin, color: '#F59E0B', desc: 'ちょうハイリスク', dividend: 0, sector: 'frontier', beta: 2.5, eps: 3, bps: 50, shares: 1500 },
];
// 株式指標の計算ヘルパー
const calcPER = (price, eps) => eps > 0 ? (price / eps).toFixed(1) : '—';
const calcPBR = (price, bps) => bps > 0 ? (price / bps).toFixed(2) : '—';
const calcROE = (eps, bps) => bps > 0 ? ((eps / bps) * 100).toFixed(1) : '—';
const calcMarketCap = (price, shares) => (price * shares / 10000).toFixed(1); // 億MM
const perLabel = (per) => { const n = parseFloat(per); if (isNaN(n)) return ''; return n < 10 ? '🟢わりやす' : n < 20 ? '🟡ふつう' : n < 40 ? '🟠たかめ' : '🔴わりだか'; };

// 景気サイクル
const ECONOMY_PHASES = [
  { id: 'expansion', name: 'かくちょう', icon: '📈', color: '#4ADE80', bias: 0.02, volMult: 1.0, sectorBonus: { tech: 0.015, frontier: 0.01 } },
  { id: 'bubble', name: 'バブル', icon: '🫧', color: '#FBBF24', bias: 0.04, volMult: 1.6, sectorBonus: { tech: 0.03, frontier: 0.025 } },
  { id: 'recession', name: 'こうたい', icon: '📉', color: '#F87171', bias: -0.025, volMult: 1.3, sectorBonus: { life: 0.015, finance: -0.02 } },
  { id: 'recovery', name: 'かいふく', icon: '🌱', color: '#38BDF8', bias: 0.01, volMult: 0.8, sectorBonus: { life: 0.01, finance: 0.015 } },
];

// 大型イベント
const MAJOR_EVENTS = [
  { id: 'lehman', name: 'リーマンショック！', desc: '大きなぎんこうがつぶれた！\nせかいじゅうがパニック！', icon: '💥', duration: 8, effects: { ALL: -0.06, finance: -0.12 }, phase: 'recession' },
  { id: 'ai_bubble', name: 'AIバブル到来！', desc: 'AIがすごすぎる！\nテックかぶがばくあがり！', icon: '🤖', duration: 10, effects: { tech: 0.08, ALL: 0.02 }, phase: 'bubble', aftermath: { tech: -0.10, ALL: -0.03, delay: 6 } },
  { id: 'pandemic', name: 'パンデミック発生！', desc: 'せかいじゅうでびょうきが\nひろがった…', icon: '🦠', duration: 12, effects: { life: -0.04, tech: 0.05, frontier: -0.06 }, phase: 'recession' },
  { id: 'crypto_boom', name: 'かそうつうかバブル！', desc: 'かそうコインのかかくが\nばくはつてきにあがった！', icon: '🪙', duration: 6, effects: { frontier: 0.10 }, targetStock: 'crypto', targetEffect: 0.15, aftermath: { frontier: -0.08, delay: 4 } },
  { id: 'war', name: 'せんそうリスク！', desc: 'せかいがきんちょう…\nエネルギーかかくがきゅうとう！', icon: '⚔️', duration: 8, effects: { ALL: -0.04, frontier: 0.03 }, targetStock: 'energy', targetEffect: 0.10 },
  { id: 'easing', name: 'きんゆうかんわ！', desc: 'ちゅうおうぎんこうが\nおかねをたくさんだした！', icon: '💰', duration: 6, effects: { ALL: 0.03, finance: 0.05 }, phase: 'expansion' },
  { id: 'earthquake', name: 'だいじしん発生！', desc: 'おおきなじしんがおきた…\nでもみんなでふっこう！', icon: '🌊', duration: 10, effects: { ALL: -0.05 }, aftermath: { ALL: 0.04, delay: 5 } },
  { id: 'expo', name: 'ばんぱくかいさい！', desc: 'せかいのおまつりがはじまった！\nかんこうきゃくがたくさん！', icon: '🎪', duration: 8, effects: { ALL: 0.02, frontier: 0.04 }, targetStock: 'resort', targetEffect: 0.08 },
];

// 実績
const ACHIEVEMENTS = [
  { id: 'first_stock', name: 'はじめてのかぶ', desc: 'はじめてかぶをかった', reward: 50, icon: '📈' },
  { id: 'diversify', name: 'ぶんさんとうし', desc: '3セクターにとうし', reward: 200, icon: '🎯' },
  { id: 'hold50', name: 'バイ&ホールド', desc: 'おなじかぶを50ターンもった', reward: 500, icon: '💎' },
  { id: 'tenbagger', name: 'テンバガー', desc: '1銘柄で10ばいのりえき', reward: 2000, icon: '🔥' },
  { id: 'crash_survivor', name: 'ぼうらくサバイバー', desc: 'ぼうらくでもうらなかった', reward: 1000, icon: '🛡️' },
  { id: 'asset_100k', name: '10まんMMたっせい', desc: 'そうしさん10まんMM', reward: 3000, icon: '💰' },
  { id: 'asset_500k', name: '50まんMMたっせい', desc: 'そうしさん50まんMM', reward: 10000, icon: '👑' },
  { id: 'interest_1k', name: 'ふくりのちから', desc: 'りしだけで1000MMかせいだ', reward: 500, icon: '🏦' },
  { id: 'dividend_5k', name: 'はいとう生活', desc: 'はいとうだけで5000MMかせいだ', reward: 1500, icon: '💵' },
  { id: 'quiz_master', name: 'クイズマスター', desc: 'クイズぜんもんせいかい', reward: 1000, icon: '🧠' },
  { id: 'all_towns', name: 'ぜんぶのまち', desc: '4つのまちをかいほう', reward: 2000, icon: '🗺️' },
  { id: 'castle', name: 'おしろオーナー', desc: 'おしろをかった', reward: 5000, icon: '🏰' },
  { id: 'short_master', name: 'からうりマスター', desc: 'からうりで1000MMかせいだ', reward: 1000, icon: '📉' },
  { id: 'limit_sniper', name: 'さしねスナイパー', desc: 'さしねちゅうもん10かいやくじょう', reward: 800, icon: '🎯' },
  { id: 'all_vehicles', name: 'ぜんのりもの', desc: 'すべてののりものをかった', reward: 1500, icon: '🚀' },
  { id: 'room_complete', name: 'マイルームかんせい', desc: 'マイルームをぜんぶうめた', reward: 1000, icon: '🏠' },
  { id: 'first_short', name: 'はじめてのからうり', desc: 'はじめてからうりした', reward: 100, icon: '📊' },
  { id: 'monthly_plus', name: 'げつかんプラス', desc: 'げつかんレポートでプラス', reward: 300, icon: '📋' },
  { id: 'all_sectors', name: 'ぜんセクターせいは', desc: '4セクターすべてにとうし', reward: 500, icon: '🌐' },
  { id: 'big_trade', name: 'ビッグトレード', desc: '1かいで10000MM以上のとりひき', reward: 1000, icon: '💎' },
];

const ALL_SHOP_ITEMS = [
  { id: 'toy1', name: 'ぬいぐるみ', price: 50, cat: 'おもちゃ', icon: Cat, color: '#FFB347', roomIcon: '🧸' },
  { id: 'toy2', name: 'ミニカー', price: 80, cat: 'おもちゃ', icon: Car, color: '#87CEEB', roomIcon: '🚗' },
  { id: 'toy3', name: 'ゲームソフト', price: 120, cat: 'おもちゃ', icon: Gamepad2, color: '#98FB98', roomIcon: '🎮' },
  { id: 'toy4', name: 'けんだま', price: 30, cat: 'おもちゃ', icon: Star, color: '#DDA0DD', roomIcon: '🏆' },
  { id: 'food1', name: 'ピザ', price: 40, cat: 'おもちゃ', icon: Pizza, color: '#FF6347', roomIcon: '🍕' },
  { id: 'food2', name: 'アイスクリーム', price: 25, cat: 'おもちゃ', icon: IceCream, color: '#FFB6C1', roomIcon: '🍦' },
  { id: 'int1', name: 'おしゃれランプ', price: 200, cat: 'インテリア', icon: Lamp, color: '#FFD700', roomIcon: '💡' },
  { id: 'int2', name: 'おおきなテレビ', price: 400, cat: 'インテリア', icon: Monitor, color: '#4169E1', roomIcon: '📺' },
  { id: 'int3', name: 'アート', price: 300, cat: 'インテリア', icon: Frame, color: '#DA70D6', roomIcon: '🖼️' },
  { id: 'int4', name: 'おんがくプレーヤー', price: 250, cat: 'インテリア', icon: Music, color: '#20B2AA', roomIcon: '🎵' },
  { id: 'int5', name: 'ソファ', price: 350, cat: 'インテリア', icon: Sofa, color: '#CD853F', roomIcon: '🛋️' },
  { id: 'int6', name: 'おはなばち', price: 150, cat: 'インテリア', icon: Flower2, color: '#FF69B4', roomIcon: '🌸' },
  { id: 'car1', name: 'じてんしゃ', price: 800, cat: 'のりもの', icon: Bike, color: '#32CD32', roomIcon: '🚲', vehicle: 'bike' },
  { id: 'car2', name: 'ファミリーカー', price: 3000, cat: 'のりもの', icon: Car, color: '#DC143C', roomIcon: '🚙', vehicle: 'car' },
  { id: 'car3', name: 'ひこうき', price: 8000, cat: 'のりもの', icon: Plane, color: '#1E90FF', roomIcon: '✈️', vehicle: 'plane' },
  { id: 'car4', name: 'ロケット', price: 20000, cat: 'のりもの', icon: Rocket, color: '#FF4500', roomIcon: '🚀', vehicle: 'rocket' },
  { id: 'house1', name: 'ちいさいおうち', price: 5000, cat: 'いえ', icon: Home, color: '#D2691E', roomIcon: '🏠' },
  { id: 'house2', name: 'おおきなおうち', price: 15000, cat: 'いえ', icon: Home, color: '#B22222', roomIcon: '🏡' },
  { id: 'house3', name: 'おしろ', price: 50000, cat: 'いえ', icon: Crown, color: '#FFD700', roomIcon: '🏰' },
  { id: 'land1', name: 'こうえんのとち', price: 8000, cat: 'とち', icon: TreePine, color: '#228B22', roomIcon: '🌳' },
  { id: 'land2', name: 'まちのとち', price: 20000, cat: 'とち', icon: Globe, color: '#4682B4', roomIcon: '🏙️' },
  { id: 'land3', name: 'しまのとち', price: 40000, cat: 'とち', icon: Sun, color: '#FF8C00', roomIcon: '🏝️' },
];

const TITLES = [
  { min: 0, title: 'おかねのたまご', color: '#9CA3AF' },
  { min: 500, title: 'おこづかいマスター', color: '#A3E635' },
  { min: 2000, title: 'ちょきんファイター', color: '#38BDF8' },
  { min: 5000, title: 'とうしかのたまご', color: '#818CF8' },
  { min: 10000, title: 'マネーウォリアー', color: '#F472B6' },
  { min: 25000, title: 'リッチキッズ', color: '#FB923C' },
  { min: 50000, title: 'おかねのけんじゃ', color: '#FBBF24' },
  { min: 100000, title: 'マネーレジェンド', color: '#F43F5E' },
];

// ══════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════
export default function MotherMoneyGame() {
  const [currentTown, setCurrentTown] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 4 });
  const [facing, setFacing] = useState('down');
  const [isWalking, setIsWalking] = useState(false);
  const [activeBuilding, setActiveBuilding] = useState(null);

  const [wallet, setWallet] = useState(300);
  const [bank, setBank] = useState(0);
  const [trustFund, setTrustFund] = useState(0);
  const [stocks, setStocks] = useState(ALL_STOCKS);
  const [portfolio, setPortfolio] = useState({});
  const [avgCost, setAvgCost] = useState({});
  const [inventory, setInventory] = useState([]);
  const [turn, setTurn] = useState(1);

  const [totalEarned, setTotalEarned] = useState(300);
  const [totalStockProfit, setTotalStockProfit] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [unlockedTowns, setUnlockedTowns] = useState(new Set([0]));

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState(null);
  const [usedQuizzes, setUsedQuizzes] = useState(new Set());

  const [miniGame, setMiniGame] = useState(null);
  const [mashCount, setMashCount] = useState(0);
  const [timingPos, setTimingPos] = useState(0);
  const timingDir = useRef(1);
  const [miniGameResult, setMiniGameResult] = useState(null);

  const [papaCall, setPapaCall] = useState(null);
  const [triggeredPapa, setTriggeredPapa] = useState(new Set());
  const [currentNews, setCurrentNews] = useState(null);

  const [roomItems, setRoomItems] = useState(Array(12).fill(null));
  const [placingItem, setPlacingItem] = useState(null);

  const [selectedStock, setSelectedStock] = useState(null);
  const [buyQty, setBuyQty] = useState(1);
  const [shopCat, setShopCat] = useState('おもちゃ');
  const [notification, setNotification] = useState(null);
  const [homeTab, setHomeTab] = useState('status');

  // 景気サイクル
  const [econPhase, setEconPhase] = useState(0); // index into ECONOMY_PHASES
  const [phaseTimer, setPhaseTimer] = useState(25); // turns until next phase
  // 大型イベント
  const [activeEvent, setActiveEvent] = useState(null); // { ...event, remaining }
  const [eventModal, setEventModal] = useState(null); // event to show in modal
  const [eventHistory, setEventHistory] = useState([]);
  const [usedEvents, setUsedEvents] = useState(new Set());
  // 指値注文
  const [limitOrders, setLimitOrders] = useState([]); // [{ id, stockId, type:'buy'|'sell', price, qty, created }]
  const [limitFills, setLimitFills] = useState(0);
  // 空売り
  const [shortPositions, setShortPositions] = useState({}); // { stockId: { qty, entryPrice } }
  const [totalShortProfit, setTotalShortProfit] = useState(0);
  // 実績
  const [achievements, setAchievements] = useState(new Set());
  // 月次レポート
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [lastMonthAssets, setLastMonthAssets] = useState(300);
  // 統計
  const [totalInterestEarned, setTotalInterestEarned] = useState(0);
  const [totalDividendEarned, setTotalDividendEarned] = useState(0);
  const [holdTurns, setHoldTurns] = useState({}); // { stockId: turnsHeld }
  const [hadCrash, setHadCrash] = useState(false); // survived crash tracking
  const [soldDuringCrash, setSoldDuringCrash] = useState(false);
  // 難易度
  const [difficulty, setDifficulty] = useState(null); // null = title screen
  // 証券タブ
  const [stockTab, setStockTab] = useState('list'); // 'list'|'orders'|'analysis'
  const [sectorFilter, setSectorFilter] = useState('all');
  // NPC
  const [npcDialog, setNpcDialog] = useState(null); // { name, type, tip }
  const [interiorMode, setInteriorMode] = useState(null); // { type, townId }
  const [interiorPos, setInteriorPos] = useState({ x: 4, y: 6 });
  const [searchedItems, setSearchedItems] = useState(new Set()); // "townId-type-x-y"

  // Derived
  const town = TOWNS[currentTown];
  const vehicle = useMemo(() => {
    if (inventory.some(i => i.vehicle === 'rocket')) return 'rocket';
    if (inventory.some(i => i.vehicle === 'plane')) return 'plane';
    if (inventory.some(i => i.vehicle === 'car')) return 'car';
    if (inventory.some(i => i.vehicle === 'bike')) return 'bike';
    return null;
  }, [inventory]);

  const playerEmoji = vehicle === 'rocket' ? '🚀' : vehicle === 'plane' ? '✈️' : vehicle === 'car' ? '🚗' : vehicle === 'bike' ? '🚲' : '🧑';
  const stockValue = useMemo(() => Object.entries(portfolio).reduce((s, [id, q]) => { const st = stocks.find(x => x.id === id); return s + (st ? st.price * q : 0); }, 0), [portfolio, stocks]);
  const itemValue = useMemo(() => inventory.reduce((s, i) => s + i.price, 0), [inventory]);
  const totalAssets = wallet + bank + trustFund + stockValue + itemValue;
  const currentTitle = useMemo(() => { let t = TITLES[0]; for (const ti of TITLES) if (totalAssets >= ti.min) t = ti; return t; }, [totalAssets]);

  const notify = useCallback((msg, type = 'info') => { setNotification({ msg, type }); setTimeout(() => setNotification(null), 2500); }, []);

  // Movement
  const movePlayer = useCallback((dx, dy) => {
    if (activeBuilding || papaCall) return;
    setFacing(dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up');
    setIsWalking(true); setTimeout(() => setIsWalking(false), 200);

    // Interior movement
    if (interiorMode) {
      const nx = interiorPos.x + dx, ny = interiorPos.y + dy;
      if (nx < 0 || nx >= INT_COLS || ny < 0 || ny >= INT_ROWS) return;
      const intMap = INTERIOR_MAPS[interiorMode.type];
      if (!intMap) return;
      const tile = intMap[ny * INT_COLS + nx];
      if (tile === T.FLOOR || tile === T.DOOR) setInteriorPos({ x: nx, y: ny });
      return;
    }

    const nx = playerPos.x + dx, ny = playerPos.y + dy;
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;
    const bldg = town.buildings.find(b => b.x === nx && b.y === ny);
    const npc = town.npcs?.find(n => n.x === nx && n.y === ny);
    if (bldg || npc || WALKABLE.has(town.tiles[ny * COLS + nx])) setPlayerPos({ x: nx, y: ny });
  }, [activeBuilding, papaCall, playerPos, town, interiorMode, interiorPos]);

  const handleInteract = useCallback(() => {
    if (activeBuilding) return;
    if (npcDialog) { setNpcDialog(null); return; }

    // Interior interaction
    if (interiorMode) {
      const intMap = INTERIOR_MAPS[interiorMode.type];
      if (!intMap) return;
      const tile = intMap[interiorPos.y * INT_COLS + interiorPos.x];
      // Door → exit
      if (tile === T.DOOR) {
        setInteriorMode(null);
        return;
      }
      // Check adjacent tiles for door/shelf/desk/counter
      const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
      for (const [ddx, ddy] of dirs) {
        const ax = interiorPos.x + ddx, ay = interiorPos.y + ddy;
        if (ax < 0 || ax >= INT_COLS || ay < 0 || ay >= INT_ROWS) continue;
        const adjTile = intMap[ay * INT_COLS + ax];
        if (adjTile === T.DOOR) {
          setInteriorMode(null);
          return;
        }
        if (adjTile === T.COUNTER) {
          // Open building UI
          setActiveBuilding(interiorMode.type);
          setSelectedStock(null); setBuyQty(1); setQuizResult(null);
          setMiniGame(null); setMiniGameResult(null); setPlacingItem(null);
          setHomeTab('status'); setShopCat('おもちゃ');
          return;
        }
        if (adjTile === T.SHELF || adjTile === T.DESK || adjTile === T.VENDING || adjTile === T.PLANT) {
          const key = `${interiorMode.townId}-${interiorMode.type}-${ax}-${ay}`;
          if (searchedItems.has(key)) {
            notify('もうしらべたよ！');
            return;
          }
          const coin = Math.floor(Math.random() * 46) + 5; // 5-50 MM
          setWallet(w => w + coin);
          setTotalEarned(te => te + coin);
          setSearchedItems(prev => new Set([...prev, key]));
          notify(`${coin} MM みつけた！`, 'success');
          return;
        }
      }
      return;
    }

    const npc = town.npcs?.find(n => n.x === playerPos.x && n.y === playerPos.y);
    if (npc) {
      const tips = NPC_TIPS[npc.type] || [];
      const tip = tips[Math.floor(Math.random() * tips.length)] || 'やあ！';
      setNpcDialog({ name: npc.name, type: npc.type, tip });
      return;
    }
    const bldg = town.buildings.find(b => b.x === playerPos.x && b.y === playerPos.y);
    if (bldg) {
      // Enter building interior
      setInteriorMode({ type: bldg.type, townId: currentTown });
      setInteriorPos({ x: 4, y: 6 }); // near door
      setFacing('up');
    }
  }, [activeBuilding, npcDialog, town, playerPos, interiorMode, interiorPos, searchedItems, currentTown, notify]);

  // Keyboard
  useEffect(() => {
    const h = (e) => {
      if (activeBuilding || papaCall) { if (e.key === 'Escape') { setActiveBuilding(null); } return; }
      if (e.key === 'Escape' && interiorMode) { setInteriorMode(null); return; }
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': movePlayer(0, -1); e.preventDefault(); break;
        case 'ArrowDown': case 's': case 'S': movePlayer(0, 1); e.preventDefault(); break;
        case 'ArrowLeft': case 'a': case 'A': movePlayer(-1, 0); e.preventDefault(); break;
        case 'ArrowRight': case 'd': case 'D': movePlayer(1, 0); e.preventDefault(); break;
        case 'Enter': case ' ': handleInteract(); e.preventDefault(); break;
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [movePlayer, activeBuilding, papaCall, handleInteract, interiorMode]);

  // Market tick (景気サイクル + セクター連動 + 大型イベント + 指値約定)
  useEffect(() => {
    if (difficulty === null) return;
    const diffMult = difficulty === 'hard' ? 1.5 : difficulty === 'easy' ? 0.6 : 1;
    const iv = setInterval(() => {
      setTurn(t => t + 1);

      // 景気サイクル進行
      setPhaseTimer(pt => {
        if (pt <= 1) {
          setEconPhase(p => (p + 1) % ECONOMY_PHASES.length);
          return 20 + Math.floor(Math.random() * 20);
        }
        return pt - 1;
      });

      // 大型イベント発火チェック
      const eventChance = difficulty === 'hard' ? 0.035 : 0.02;
      setActiveEvent(prev => {
        if (prev && prev.remaining > 1) return { ...prev, remaining: prev.remaining - 1 };
        if (prev && prev.remaining <= 1 && prev.aftermath && !prev.inAftermath) {
          return { ...prev, remaining: prev.aftermath.delay, inAftermath: true, effects: prev.aftermath };
        }
        if (prev && prev.remaining <= 1) {
          setHadCrash(false);
          return null;
        }
        if (Math.random() < eventChance) {
          const available = MAJOR_EVENTS.filter(e => !usedEvents.has(e.id));
          if (available.length > 0) {
            const ev = available[Math.floor(Math.random() * available.length)];
            setUsedEvents(p => new Set([...p, ev.id]));
            setEventHistory(h => [...h, { ...ev, turn }]);
            setEventModal(ev);
            if (ev.phase === 'recession') { setHadCrash(true); setSoldDuringCrash(false); }
            return { ...ev, remaining: ev.duration };
          }
        }
        return prev;
      });

      // ニュース
      const hasNews = Math.random() < 0.12;
      let news = null;
      if (hasNews) { news = NEWS_POOL[Math.floor(Math.random() * NEWS_POOL.length)]; setCurrentNews(news); }

      // 株価更新（景気+セクター+イベント）
      setStocks(prev => {
        const phase = ECONOMY_PHASES[econPhase];
        return prev.map(s => {
          let ch = s.trend + (Math.random() - 0.48) * s.vol * (phase.volMult || 1) * diffMult;
          // 景気バイアス（betaで感応度調整）
          ch += (phase.bias || 0) * (s.beta || 1);
          // セクターボーナス
          if (phase.sectorBonus && phase.sectorBonus[s.sector]) ch += phase.sectorBonus[s.sector];
          // ニュース
          if (news && (news.affects === 'ALL' || news.affects === s.id)) ch += news.impact;
          // 大型イベント
          if (activeEvent) {
            const eff = activeEvent.effects || {};
            if (eff.ALL) ch += eff.ALL;
            if (eff[s.sector]) ch += eff[s.sector];
            if (activeEvent.targetStock === s.id && activeEvent.targetEffect) ch += activeEvent.targetEffect;
          }
          const newPrice = Math.max(5, Math.round(s.price * (1 + ch)));
          return { ...s, price: newPrice, history: [...s.history.slice(-99), newPrice] };
        });
      });

      // 銀行利息
      setBank(p => {
        if (p > 0) {
          const interest = Math.floor(p * 0.003);
          if (interest > 0) setTotalInterestEarned(t => t + interest);
          return p + interest;
        }
        return p;
      });
      setTrustFund(p => p <= 0 ? p : Math.max(0, Math.floor(p * (1 + 0.015 + (Math.random() - 0.45) * 0.025))));

      // 指値注文の約定チェック
      setLimitOrders(prev => {
        const remaining = [];
        for (const order of prev) {
          const st = stocks.find(s => s.id === order.stockId);
          if (!st) { remaining.push(order); continue; }
          if (order.type === 'buy' && st.price <= order.price) {
            const cost = st.price * order.qty;
            setWallet(w => { if (w >= cost) { setPortfolio(p => ({ ...p, [order.stockId]: (p[order.stockId] || 0) + order.qty })); setLimitFills(f => f + 1); notify(`📋 さしね約定！ ${st.name} ${order.qty}かぶ かった`, 'success'); return w - cost; } remaining.push(order); return w; });
          } else if (order.type === 'sell' && st.price >= order.price) {
            const owned = portfolio[order.stockId] || 0;
            const q = Math.min(order.qty, owned);
            if (q > 0) { const rev = st.price * q; setWallet(w => w + rev); setPortfolio(p => ({ ...p, [order.stockId]: (p[order.stockId] || 0) - q })); setLimitFills(f => f + 1); notify(`📋 さしね約定！ ${st.name} ${q}かぶ うった`, 'success'); }
          } else { remaining.push(order); }
        }
        return remaining;
      });

      // 保有ターンカウント
      setHoldTurns(prev => {
        const n = { ...prev };
        for (const [sid, qty] of Object.entries(portfolio)) { if (qty > 0) n[sid] = (n[sid] || 0) + 1; }
        return n;
      });
    }, 3000);
    return () => clearInterval(iv);
  }, [difficulty, econPhase, activeEvent, portfolio, stocks, usedEvents]);

  // Dividends (毎40ターン = 月末)
  useEffect(() => {
    if (turn > 1 && turn % 40 === 0) {
      let d = 0;
      stocks.forEach(s => { const q = portfolio[s.id] || 0; if (q > 0 && s.dividend > 0) d += Math.floor(s.price * q * s.dividend * 4); });
      if (d > 0) { setWallet(w => w + d); setTotalEarned(t => t + d); setTotalDividendEarned(t => t + d); notify(`💰 げつまつはいとう +${d.toLocaleString()}MM！`, 'success'); }
      // 月次レポート
      const diff = totalAssets - lastMonthAssets;
      setMonthlyReport({ assets: totalAssets, diff, turn });
      setLastMonthAssets(totalAssets);
    }
  }, [turn]);

  // 空売りの含み損益計算
  const shortPnL = useMemo(() => {
    let total = 0;
    for (const [sid, pos] of Object.entries(shortPositions)) {
      if (pos.qty > 0) { const st = stocks.find(s => s.id === sid); if (st) total += (pos.entryPrice - st.price) * pos.qty; }
    }
    return total;
  }, [shortPositions, stocks]);

  // Papa
  useEffect(() => {
    for (const c of PAPA_CALLS) {
      if (totalAssets >= c.threshold && !triggeredPapa.has(c.threshold)) {
        setTriggeredPapa(p => new Set([...p, c.threshold]));
        setTimeout(() => setPapaCall(c), 500); break;
      }
    }
  }, [totalAssets, triggeredPapa]);

  // Unlock towns
  useEffect(() => {
    for (const t of TOWNS) {
      if (t.unlockReq && !unlockedTowns.has(t.id)) {
        const vReq = t.unlockReq.vehicle;
        const hasV = !vReq || (vReq === 'bike' && ['bike','car','plane','rocket'].includes(vehicle)) ||
          (vReq === 'car' && ['car','plane','rocket'].includes(vehicle)) ||
          (vReq === 'plane' && ['plane','rocket'].includes(vehicle));
        if (totalAssets >= t.unlockReq.asset && hasV) {
          setUnlockedTowns(p => new Set([...p, t.id]));
          notify(`🗺️ ${t.name} かいほう！`, 'success');
        }
      }
    }
  }, [totalAssets, vehicle, unlockedTowns, notify]);

  // Timing game
  useEffect(() => {
    if (miniGame !== 'timing') return;
    const iv = setInterval(() => {
      setTimingPos(p => { const n = p + timingDir.current * 4; if (n >= 100) { timingDir.current = -1; return 100; } if (n <= 0) { timingDir.current = 1; return 0; } return n; });
    }, 40);
    return () => clearInterval(iv);
  }, [miniGame]);

  // Handlers
  const mult = town.rewardMult;
  const handleQuizAnswer = (idx) => {
    const q = QUIZZES[quizIndex]; const ok = idx === q.c;
    const reward = Math.floor((ok ? 50 + Math.random() * 50 : 10) * mult);
    if (ok) setQuizCorrect(c => c + 1);
    setWallet(w => w + reward); setTotalEarned(t => t + reward);
    setQuizResult({ correct: ok, reward, explain: q.e });
    setUsedQuizzes(p => new Set([...p, quizIndex]));
  };
  const nextQuiz = () => {
    setQuizResult(null); let n = (quizIndex + 1) % QUIZZES.length; let t = 0;
    while (usedQuizzes.has(n) && t < QUIZZES.length) { n = (n + 1) % QUIZZES.length; t++; }
    if (t >= QUIZZES.length) setUsedQuizzes(new Set());
    setQuizIndex(n);
  };
  const startMash = () => { setMiniGame('mash'); setMashCount(0); setMiniGameResult(null); };
  const handleMash = () => { setMashCount(c => { if (c + 1 >= 20) { const r = Math.floor((40 + Math.random() * 60) * mult); setWallet(w => w + r); setTotalEarned(t => t + r); setMiniGameResult({ reward: r }); setMiniGame(null); return 0; } return c + 1; }); };
  const startTiming = () => { setMiniGame('timing'); setTimingPos(0); timingDir.current = 1; setMiniGameResult(null); };
  const handleTimingStop = () => { const d = Math.abs(timingPos - 50); const r = Math.floor((d < 3 ? 150 : d < 8 ? 100 : d < 15 ? 60 : d < 25 ? 35 : 15) * mult); setWallet(w => w + r); setTotalEarned(t => t + r); setMiniGameResult({ reward: r, accuracy: Math.max(0, 100 - d * 2) }); setMiniGame(null); };

  const depositBank = (a) => { const v = Math.min(a, wallet); if (v > 0) { setWallet(w => w - v); setBank(b => b + v); notify(`${v}MM あずけた！`); } };
  const withdrawBank = (a) => { const v = Math.min(a, bank); if (v > 0) { setBank(b => b - v); setWallet(w => w + v); notify(`${v}MM おろした！`); } };
  const investTrust = (a) => { const v = Math.min(a, wallet); if (v > 0) { setWallet(w => w - v); setTrustFund(t => t + v); notify(`${v}MM とうしんたくへ！`); } };
  const withdrawTrust = (a) => { const v = Math.min(a, trustFund); if (v > 0) { setTrustFund(t => t - v); setWallet(w => w + v); notify(`${v}MM もどした！`); } };

  const handleBuyStock = (sid, qty) => {
    const st = stocks.find(s => s.id === sid); const cost = st.price * qty;
    if (wallet < cost) { notify('お金がたりない！', 'error'); return; }
    const oq = portfolio[sid] || 0; const oa = avgCost[sid] || 0;
    setWallet(w => w - cost); setPortfolio(p => ({ ...p, [sid]: oq + qty }));
    setAvgCost(p => ({ ...p, [sid]: (oq + qty) > 0 ? (oa * oq + cost) / (oq + qty) : st.price }));
    notify(`${st.name} ${qty}かぶ かった！`);
    if (cost >= 10000) unlockAch('big_trade');
    unlockAch('first_stock');
  };
  const handleSellStock = (sid, qty) => {
    const st = stocks.find(s => s.id === sid); const owned = portfolio[sid] || 0;
    const q = Math.min(qty, owned); if (q <= 0) return;
    const rev = st.price * q; const profit = rev - (avgCost[sid] || st.price) * q;
    setWallet(w => w + rev); setPortfolio(p => ({ ...p, [sid]: p[sid] - q }));
    if (profit > 0) setTotalStockProfit(t => t + profit);
    if (rev >= 10000) unlockAch('big_trade');
    if (hadCrash) setSoldDuringCrash(true);
    notify(`${st.name} ${q}かぶ うった！ ${profit >= 0 ? '+' : ''}${Math.floor(profit)}`, profit >= 0 ? 'success' : 'error');
  };

  // 空売り
  const handleShortSell = (sid, qty) => {
    if (currentTown < 2) { notify('おおえどメトロ以降でかいほう！', 'error'); return; }
    const st = stocks.find(s => s.id === sid); const margin = st.price * qty;
    if (wallet < margin) { notify('しょうこきん（たんぽ）がたりない！', 'error'); return; }
    setWallet(w => w - margin);
    setShortPositions(p => {
      const prev = p[sid] || { qty: 0, entryPrice: 0 };
      const newQty = prev.qty + qty;
      const newEntry = newQty > 0 ? (prev.entryPrice * prev.qty + st.price * qty) / newQty : st.price;
      return { ...p, [sid]: { qty: newQty, entryPrice: newEntry, margin: (prev.margin || 0) + margin } };
    });
    unlockAch('first_short');
    notify(`${st.name} ${qty}かぶ からうり！`, 'success');
  };
  const handleCoverShort = (sid) => {
    const pos = shortPositions[sid]; if (!pos || pos.qty <= 0) return;
    const st = stocks.find(s => s.id === sid);
    const pnl = (pos.entryPrice - st.price) * pos.qty;
    const returned = (pos.margin || pos.entryPrice * pos.qty) + pnl;
    setWallet(w => w + Math.max(0, returned));
    if (pnl > 0) setTotalShortProfit(t => t + pnl);
    setShortPositions(p => { const n = { ...p }; delete n[sid]; return n; });
    notify(`からうり決済！ ${pnl >= 0 ? '+' : ''}${Math.floor(pnl)}MM`, pnl >= 0 ? 'success' : 'error');
  };

  // 指値注文
  const addLimitOrder = (stockId, type, price, qty) => {
    if (limitOrders.length >= 5) { notify('ちゅうもんは5けんまで！', 'error'); return; }
    setLimitOrders(p => [...p, { id: Date.now(), stockId, type, price, qty, created: turn }]);
    notify(`📋 さしね${type === 'buy' ? 'かい' : 'うり'} セット！`, 'success');
  };
  const cancelLimitOrder = (id) => { setLimitOrders(p => p.filter(o => o.id !== id)); notify('ちゅうもんキャンセル'); };

  // 実績解放
  const unlockAch = useCallback((id) => {
    setAchievements(prev => {
      if (prev.has(id)) return prev;
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        setWallet(w => w + ach.reward);
        setTotalEarned(t => t + ach.reward);
        notify(`🏆 じっせき「${ach.name}」たっせい！ +${ach.reward}MM`, 'success');
      }
      return new Set([...prev, id]);
    });
  }, [notify]);

  // 実績チェック
  useEffect(() => {
    // セクター分散
    const sectors = new Set(Object.entries(portfolio).filter(([, q]) => q > 0).map(([sid]) => ALL_STOCKS.find(s => s.id === sid)?.sector).filter(Boolean));
    if (sectors.size >= 3) unlockAch('diversify');
    if (sectors.size >= 4) unlockAch('all_sectors');
    // 長期保有
    for (const [, turns] of Object.entries(holdTurns)) { if (turns >= 50) { unlockAch('hold50'); break; } }
    // テンバガー
    for (const [sid, q] of Object.entries(portfolio)) {
      if (q > 0 && avgCost[sid]) { const st = stocks.find(s => s.id === sid); if (st && st.price >= avgCost[sid] * 10) unlockAch('tenbagger'); }
    }
    // 資産目標
    if (totalAssets >= 100000) unlockAch('asset_100k');
    if (totalAssets >= 500000) unlockAch('asset_500k');
    // 利息・配当
    if (totalInterestEarned >= 1000) unlockAch('interest_1k');
    if (totalDividendEarned >= 5000) unlockAch('dividend_5k');
    // クイズ
    if (quizCorrect >= QUIZZES.length) unlockAch('quiz_master');
    // 街
    if (unlockedTowns.size >= 4) unlockAch('all_towns');
    // おしろ
    if (inventory.some(i => i.id === 'house3')) unlockAch('castle');
    // のりもの
    if (['bike', 'car', 'plane', 'rocket'].every(v => inventory.some(i => i.vehicle === v))) unlockAch('all_vehicles');
    // マイルーム
    if (roomItems.every(r => r !== null)) unlockAch('room_complete');
    // 空売り
    if (totalShortProfit >= 1000) unlockAch('short_master');
    // 指値
    if (limitFills >= 10) unlockAch('limit_sniper');
    // 暴落サバイバー
    if (hadCrash && !soldDuringCrash && !activeEvent) unlockAch('crash_survivor');
    // 月次プラス
    if (monthlyReport && monthlyReport.diff > 0) unlockAch('monthly_plus');
  }, [turn, totalAssets, portfolio, holdTurns, totalInterestEarned, totalDividendEarned, quizCorrect, unlockedTowns, inventory, roomItems, totalShortProfit, limitFills, hadCrash, soldDuringCrash, activeEvent, monthlyReport, avgCost, stocks, unlockAch]);

  const buyItem = (item) => {
    if (wallet < item.price) { notify('お金がたりない！', 'error'); return; }
    setWallet(w => w - item.price);
    setInventory(inv => [...inv, { ...item, uid: Date.now() + Math.random() }]);
    notify(`${item.name} をかった！`, 'success');
  };

  const acceptPapaCall = () => { if (papaCall) { setWallet(w => w + papaCall.gift); setTotalEarned(t => t + papaCall.gift); notify(`パパから ${papaCall.gift}MM！`, 'success'); setPapaCall(null); } };
  const travelTo = (id) => { if (!unlockedTowns.has(id)) return; setActiveBuilding(null); setCurrentTown(id); setPlayerPos(TOWNS[id].startPos); notify(`${TOWNS[id].name} についた！`); };
  const placeInRoom = (idx) => { if (placingItem && !roomItems[idx]) { setRoomItems(p => { const n = [...p]; n[idx] = placingItem; return n; }); setPlacingItem(null); } };
  const removeFromRoom = (idx) => { if (roomItems[idx] && !placingItem) setRoomItems(p => { const n = [...p]; n[idx] = null; return n; }); };

  // UI helpers
  const Btn = ({ children, className = '', variant = 'default', ...p }) => {
    const v = { default: 'border-yellow-400/80 text-yellow-200 hover:bg-gray-700', primary: 'border-cyan-400 text-cyan-200 hover:bg-cyan-900/50', danger: 'border-red-400/80 text-red-300 hover:bg-red-900/30', success: 'border-green-400/80 text-green-300 hover:bg-green-900/30' };
    return <button className={`border-2 bg-gray-800 px-2 py-1 pixel text-xs active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${v[variant] || v.default} ${className}`} {...p}>{children}</button>;
  };
  const MiniChart = ({ history, color, w = 160, h = 50 }) => {
    if (history.length < 2) return null;
    const mn = Math.min(...history), mx = Math.max(...history), rg = mx - mn || 1;
    const toY = (v) => h - ((v - mn) / rg) * (h - 6) - 3;
    const toX = (i) => (i / (history.length - 1)) * w;
    const pts = history.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
    // 移動平均
    const ma = (period) => history.map((_, i) => { if (i < period - 1) return null; const sl = history.slice(i - period + 1, i + 1); return sl.reduce((a, b) => a + b, 0) / period; });
    const ma5 = ma(5), ma20 = ma(20);
    const maLine = (arr, col) => { const valid = arr.map((v, i) => v !== null ? `${toX(i)},${toY(v)}` : null).filter(Boolean); return valid.length > 1 ? <polyline points={valid.join(' ')} fill="none" stroke={col} strokeWidth="1" opacity="0.6" /> : null; };
    return (
      <div>
        <svg width={w} height={h}>
          <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
          {maLine(ma5, '#FBBF24')}
          {maLine(ma20, '#F87171')}
        </svg>
        <div className="flex gap-2 text-[9px] text-gray-500">
          <span>L:{mn}</span><span>H:{mx}</span>
          <span className="text-yellow-400/60">MA5</span><span className="text-red-400/60">MA20</span>
        </div>
      </div>
    );
  };
  const ProgressBar = ({ value, max, color = '#4ADE80', h = 6 }) => (
    <div className="bg-gray-700 rounded overflow-hidden" style={{ height: h }}><div className="h-full transition-all" style={{ width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: color }} /></div>
  );

  const townStocks = stocks.filter(s => town.stocks.includes(s.id));
  const townShopItems = ALL_SHOP_ITEMS.filter(i => town.shopItems.includes(i.id));
  const shopCats = [...new Set(townShopItems.map(i => i.cat))];
  const TILE_SIZE = 40;
  const mapScale = typeof window !== 'undefined' ? Math.min(1, window.innerWidth / (COLS * TILE_SIZE), window.innerHeight / (ROWS * TILE_SIZE)) : 1;

  // ══════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════
  // 難易度選択画面
  if (difficulty === null) {
    return (
      <div className="min-h-screen bg-gray-950 pixel text-white flex flex-col items-center justify-center" style={{ imageRendering: 'pixelated' }}>
        <style>{CSS}</style>
        <div className="text-3xl mb-2" style={{ animation: 'float 2s ease-in-out infinite' }}>💰</div>
        <h1 className="text-cyan-300 text-lg mb-1">MOTHER MONEY</h1>
        <p className="text-gray-500 text-xs mb-6">〜おかねのぼうけん〜</p>
        <div className="space-y-2 w-64">
          {[
            { id: 'easy', name: 'かんたん', desc: '初期500MM・ゆるい値動き', color: '#4ADE80', wallet: 500 },
            { id: 'normal', name: 'ふつう', desc: '初期300MM・スタンダード', color: '#38BDF8', wallet: 300 },
            { id: 'hard', name: 'ハード', desc: '初期100MM・激しい値動き', color: '#F87171', wallet: 100 },
          ].map(d => (
            <button key={d.id} className="w-full border-2 bg-gray-800 p-3 pixel cursor-pointer hover:bg-gray-700 active:scale-95 text-left" style={{ borderColor: d.color }}
              onClick={() => { setDifficulty(d.id); setWallet(d.wallet); setTotalEarned(d.wallet); setLastMonthAssets(d.wallet); }}>
              <div className="text-sm" style={{ color: d.color }}>{d.name}</div>
              <div className="text-[10px] text-gray-400">{d.desc}</div>
            </button>
          ))}
        </div>
        <div className="text-[10px] text-gray-700 mt-8">♪ MOTHER MONEY ♪</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-950 pixel text-white flex items-center justify-center overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <style>{CSS}</style>

      {/* HEADER (overlay) */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/85 backdrop-blur-sm px-3 py-1.5 flex items-center justify-between" style={{ paddingTop: 'max(6px, env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-2">
          <Coins size={14} className="text-yellow-400" />
          <span className="text-xs text-cyan-300">{town.name}</span>
          <span className="text-[10px] px-1 rounded" style={{ color: currentTitle.color, border: `1px solid ${currentTitle.color}44` }}>{currentTitle.title}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[10px]" style={{ color: ECONOMY_PHASES[econPhase]?.color }}>{ECONOMY_PHASES[econPhase]?.icon}</span>
          <span className="text-yellow-300">{wallet.toLocaleString()}</span>
          <span className="text-green-300/70">{totalAssets.toLocaleString()}</span>
          <span className="text-gray-600">T{turn}</span>
        </div>
      </div>

      {currentNews && (
        <div className={`fixed left-0 right-0 z-40 marquee-container text-xs py-0.5 px-2 ${currentNews.type === 'good' ? 'text-green-300 bg-green-950/70' : 'text-red-300 bg-red-950/70'}`} style={{ top: 'calc(36px + env(safe-area-inset-top))' }}>
          <span className="marquee-text">📰 {currentNews.text}</span>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div className={`fixed top-2 right-2 z-[100] px-3 py-1.5 border-2 text-xs pixel max-w-xs ${notification.type === 'error' ? 'border-red-400 bg-red-950' : notification.type === 'success' ? 'border-green-400 bg-green-950' : 'border-cyan-400 bg-cyan-950'}`}
          style={{ animation: 'slideDown 0.3s ease-out' }}>{notification.msg}</div>
      )}

      {/* PAPA */}
      {papaCall && (
        <div className="fixed inset-0 bg-black/85 z-[90] flex items-center justify-center p-4">
          <div className="border-4 border-yellow-300 bg-gray-900 p-4 max-w-sm w-full pixel" style={{ animation: 'pop 0.4s ease-out' }}>
            <div className="flex items-center gap-2 mb-2 border-b border-yellow-400/30 pb-2">
              <Phone className="text-yellow-300" style={{ animation: 'ring 1.5s ease-in-out infinite' }} size={18} />
              <span className="text-yellow-300 text-sm">パパからでんわ！</span>
            </div>
            <div className="bg-gray-800 border-2 border-cyan-400/40 p-3 mb-3 text-xs whitespace-pre-line">{papaCall.msg}</div>
            <div className="text-center">
              <div className="text-yellow-200 text-xs mb-2">🎁 {papaCall.gift.toLocaleString()}MM</div>
              <Btn variant="success" onClick={acceptPapaCall}>ありがとう、パパ！</Btn>
            </div>
          </div>
        </div>
      )}

      {/* NPC DIALOG */}
      {npcDialog && (
        <div className="fixed inset-0 bg-black/60 z-[90] flex items-end justify-center pb-8 px-4" onClick={() => setNpcDialog(null)}>
          <div className="border-4 border-yellow-400 bg-gray-900 p-4 max-w-sm w-full pixel" style={{ animation: 'pop 0.3s ease-out' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              {NPC_IMG[npcDialog.type] && <img src={NPC_IMG[npcDialog.type]} className="w-12 h-12" style={{ imageRendering: 'pixelated', objectFit: 'contain' }} />}
              <div className="flex-1">
                <div className="text-yellow-300 text-xs font-bold mb-1">{npcDialog.name}</div>
                <div className="text-white text-xs leading-relaxed">{npcDialog.tip}</div>
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="text-[10px] text-gray-400 border border-gray-600 px-3 py-1 cursor-pointer hover:bg-gray-800" onClick={() => setNpcDialog(null)}>とじる</button>
            </div>
          </div>
        </div>
      )}

      {/* MAJOR EVENT MODAL */}
      {eventModal && (
        <div className="fixed inset-0 bg-black/90 z-[95] flex items-center justify-center p-4">
          <div className="border-4 border-red-400 bg-gray-900 p-4 max-w-sm w-full pixel" style={{ animation: 'shake 0.5s ease-in-out, pop 0.4s ease-out' }}>
            <div className="text-center text-4xl mb-2" style={{ animation: 'float 1s ease-in-out infinite' }}>{eventModal.icon}</div>
            <div className="text-center text-red-300 text-sm mb-2 font-bold">{eventModal.name}</div>
            <div className="bg-gray-800 border-2 border-red-400/40 p-3 mb-3 text-xs whitespace-pre-line text-center">{eventModal.desc}</div>
            <div className="text-center text-[10px] text-gray-400 mb-2">（{eventModal.duration}ターンえいきょう）</div>
            <div className="text-center"><Btn variant="danger" onClick={() => setEventModal(null)}>わかった…！</Btn></div>
          </div>
        </div>
      )}

      {/* MONTHLY REPORT POPUP */}
      {monthlyReport && turn === monthlyReport.turn && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[85] bg-gray-900 border-2 border-cyan-400 p-2 pixel text-xs max-w-xs" style={{ animation: 'slideDown 0.3s ease-out' }}>
          <div className="text-cyan-300 mb-1">📋 げつかんレポート（{Math.floor(turn/40)}月目）</div>
          <div className={monthlyReport.diff >= 0 ? 'text-green-400' : 'text-red-400'}>{monthlyReport.diff >= 0 ? '📈 +' : '📉 '}{monthlyReport.diff.toLocaleString()} MM</div>
        </div>
      )}

      {/* MAP */}
      {interiorMode ? (
        /* Interior Map */
        (() => {
          const intMap = INTERIOR_MAPS[interiorMode.type];
          if (!intMap) return null;
          const intScale = typeof window !== 'undefined' ? Math.min(1, window.innerWidth / (INT_COLS * TILE_SIZE), window.innerHeight / (INT_ROWS * TILE_SIZE)) : 1;
          const bldgName = town.buildings.find(b => b.type === interiorMode.type)?.name || interiorMode.type;
          return <div style={{ transform: `scale(${intScale})`, transformOrigin: 'center center' }}>
            <div className="text-center text-cyan-300 text-xs pixel mb-1">{bldgName} のなか</div>
            <div className="relative bg-black" style={{ width: INT_COLS * TILE_SIZE, height: INT_ROWS * TILE_SIZE }}>
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${INT_COLS}, ${TILE_SIZE}px)`, gridTemplateRows: `repeat(${INT_ROWS}, ${TILE_SIZE}px)` }}>
                {intMap.map((tile, i) => {
                  const ts = TILE_STYLE[tile];
                  const x = i % INT_COLS, y = Math.floor(i / INT_COLS);
                  const key = `${interiorMode.townId}-${interiorMode.type}-${x}-${y}`;
                  const searched = searchedItems.has(key);
                  return <div key={i} className="flex items-center justify-center select-none" style={{ backgroundColor: ts.bg, opacity: (tile === T.SHELF || tile === T.DESK || tile === T.VENDING || tile === T.PLANT) && searched ? 0.5 : 1 }}>
                    {ts.img && TILE_IMG[ts.img] && <Sprite src={TILE_IMG[ts.img]} size={TILE_SIZE} />}
                  </div>;
                })}
              </div>
              <div className="absolute flex items-end justify-center transition-all duration-150 ease-out" style={{ left: interiorPos.x * TILE_SIZE - TILE_SIZE * 0.15, top: interiorPos.y * TILE_SIZE - TILE_SIZE * 0.3, width: TILE_SIZE * 1.3, height: TILE_SIZE * 1.3, zIndex: 20, animation: isWalking ? 'walk 0.2s ease-in-out' : 'none', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.8))' }}>
                <Sprite src={PLAYER_IMG[facing] || PLAYER_IMG.down} size={TILE_SIZE * 1.3} />
              </div>
              {/* Hint: on door tile */}
              {intMap[interiorPos.y * INT_COLS + interiorPos.x] === T.DOOR && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-300 text-[10px] px-2 py-0.5 border border-yellow-400/50 z-30" style={{ animation: 'blink 1.5s infinite' }}>Ⓐ でそとへ</div>
              )}
              {/* Hint: adjacent to shelf/desk/counter */}
              {(() => {
                const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
                for (const [ddx, ddy] of dirs) {
                  const ax = interiorPos.x + ddx, ay = interiorPos.y + ddy;
                  if (ax < 0 || ax >= INT_COLS || ay < 0 || ay >= INT_ROWS) continue;
                  const adj = intMap[ay * INT_COLS + ax];
                  if (adj === T.COUNTER) return <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 text-cyan-300 text-[10px] px-2 py-0.5 border border-cyan-400/50 z-30" style={{ animation: 'blink 1.5s infinite' }}>Ⓐ でつかう</div>;
                  if (adj === T.SHELF || adj === T.DESK || adj === T.VENDING || adj === T.PLANT) {
                    const key = `${interiorMode.townId}-${interiorMode.type}-${ax}-${ay}`;
                    if (!searchedItems.has(key)) return <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-300 text-[10px] px-2 py-0.5 border border-yellow-400/50 z-30" style={{ animation: 'blink 1.5s infinite' }}>Ⓐ でしらべる</div>;
                  }
                }
                return null;
              })()}
            </div>
          </div>;
        })()
      ) : (
        /* Outdoor Map */
        <div style={{ transform: `scale(${mapScale})`, transformOrigin: 'center center' }}>
        <div className="relative bg-black" style={{ width: COLS * TILE_SIZE, height: ROWS * TILE_SIZE }}>
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, ${TILE_SIZE}px)`, gridTemplateRows: `repeat(${ROWS}, ${TILE_SIZE}px)` }}>
            {town.tiles.map((tile, i) => {
              const ts = TILE_STYLE[tile];
              return <div key={i} className="flex items-center justify-center select-none" style={{ backgroundColor: ts.bg }}>
                {ts.img && TILE_IMG[ts.img] && <Sprite src={TILE_IMG[ts.img]} size={TILE_SIZE} />}
              </div>;
            })}
          </div>
          {town.buildings.map((b, i) => {
            const bSize = TILE_SIZE * 1.8;
            const bOffset = (bSize - TILE_SIZE) / 2;
            return <div key={i} className="absolute flex items-end justify-center" style={{ left: b.x * TILE_SIZE - bOffset, top: b.y * TILE_SIZE - (bSize - TILE_SIZE), width: bSize, height: bSize, zIndex: 10, filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.7))', animation: playerPos.x === b.x && playerPos.y === b.y ? 'float 1s ease-in-out infinite' : 'none' }}>
              {BLDG_IMG[b.type] ? <Sprite src={BLDG_IMG[b.type]} size={bSize} /> : <span style={{ fontSize: '20px' }}>{b.emoji}</span>}
            </div>;
          })}
          {(town.npcs || []).map((npc, i) => {
            const nSize = TILE_SIZE * 1.4;
            return <div key={'npc'+i} className="absolute flex items-end justify-center" style={{ left: npc.x * TILE_SIZE - (nSize - TILE_SIZE) / 2, top: npc.y * TILE_SIZE - (nSize - TILE_SIZE) * 0.8, width: nSize, height: nSize, zIndex: 15, filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.6))', animation: 'float 2s ease-in-out infinite' }}>
              {NPC_IMG[npc.type] && <Sprite src={NPC_IMG[npc.type]} size={nSize} />}
            </div>;
          })}
          <div className="absolute flex items-end justify-center transition-all duration-150 ease-out" style={{ left: playerPos.x * TILE_SIZE - TILE_SIZE * 0.15, top: playerPos.y * TILE_SIZE - TILE_SIZE * 0.3, width: TILE_SIZE * 1.3, height: TILE_SIZE * 1.3, zIndex: 20, animation: isWalking ? 'walk 0.2s ease-in-out' : 'none', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.8))' }}>
            {(() => {
              const src = vehicle ? VEHICLE_IMG[vehicle] : PLAYER_IMG[facing] || PLAYER_IMG.down;
              return <Sprite src={src} size={TILE_SIZE * 1.3} />;
            })()}
          </div>
          {town.npcs?.some(n => n.x === playerPos.x && n.y === playerPos.y) && !npcDialog && !activeBuilding && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-300 text-[10px] px-2 py-0.5 border border-yellow-400/50 z-30" style={{ animation: 'blink 1.5s infinite' }}>Enter / Ⓐ ではなす</div>
          )}
          {town.buildings.some(b => b.x === playerPos.x && b.y === playerPos.y) && !activeBuilding && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 text-cyan-300 text-[10px] px-2 py-0.5 border border-cyan-400/50 z-30" style={{ animation: 'blink 1.5s infinite' }}>Enter / Ⓐ で入る</div>
          )}
        </div>
        </div>
      )}

      {/* GAMEBOY CONTROLS (overlay on map) */}
      {!activeBuilding && !papaCall && (
        <div className="fixed left-0 right-0 z-30 flex items-end justify-between px-4 select-none pointer-events-none" style={{ bottom: 'max(16px, env(safe-area-inset-bottom))' }}>
          {/* D-PAD (left side) */}
          <div className="flex flex-col items-center gap-0 pointer-events-auto">
            <button className="w-12 h-12 bg-gray-800/80 border-2 border-gray-500/60 rounded-t-lg flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(0, -1)}><ChevronUp size={24} className="text-gray-200" /></button>
            <div className="flex gap-0">
              <button className="w-12 h-12 bg-gray-800/80 border-2 border-gray-500/60 rounded-l-lg flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(-1, 0)}><ChevronLeft size={24} className="text-gray-200" /></button>
              <div className="w-12 h-12 bg-gray-700/60 border-2 border-gray-500/40 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-gray-500/50" /></div>
              <button className="w-12 h-12 bg-gray-800/80 border-2 border-gray-500/60 rounded-r-lg flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(1, 0)}><ChevronRight size={24} className="text-gray-200" /></button>
            </div>
            <button className="w-12 h-12 bg-gray-800/80 border-2 border-gray-500/60 rounded-b-lg flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(0, 1)}><ChevronDown size={24} className="text-gray-200" /></button>
          </div>
          {/* A BUTTON (right side) */}
          <div className="pointer-events-auto mb-2">
            <button className="w-16 h-16 bg-red-700/80 border-3 border-red-400/70 rounded-full flex items-center justify-center active:bg-red-500 cursor-pointer text-lg text-white pixel shadow-lg" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)' }} onPointerDown={handleInteract}>A</button>
          </div>
        </div>
      )}

      {/* BUILDING MODAL */}
      {activeBuilding && (
        <div className="fixed inset-0 bg-black/80 z-[80] flex items-end sm:items-center justify-center p-2" onClick={() => setActiveBuilding(null)}>
          <div className="border-4 border-cyan-400 bg-gray-900 w-full max-w-lg max-h-[75vh] overflow-y-auto pixel p-3 relative" style={{ animation: 'slideUp 0.25s ease-out', boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer z-10" onClick={() => setActiveBuilding(null)}><X size={16} /></button>

            {/* BANK */}
            {activeBuilding === 'bank' && (
              <div className="space-y-3">
                <h2 className="text-cyan-300 text-sm flex items-center gap-1"><Landmark size={14} /> {town.buildings.find(b => b.type === 'bank')?.name}</h2>
                <div className="border-2 border-gray-700 p-2">
                  <div className="text-xs text-gray-400 mb-1">ぎんこう（りし 0.3%/ターン）── <span className="text-green-300">{bank.toLocaleString()} MM</span></div>
                  <div className="flex gap-1 flex-wrap mb-1">{[100, 500, 1000].map(a => <Btn key={a} onClick={() => depositBank(a)} disabled={wallet < a}>あずける{a}</Btn>)}<Btn onClick={() => depositBank(wallet)} disabled={wallet <= 0}>ぜんぶ</Btn></div>
                  <div className="flex gap-1 flex-wrap">{[100, 500].map(a => <Btn key={a} variant="danger" onClick={() => withdrawBank(a)} disabled={bank < a}>おろす{a}</Btn>)}<Btn variant="danger" onClick={() => withdrawBank(bank)} disabled={bank <= 0}>ぜんぶ</Btn></div>
                </div>
                <div className="border-2 border-gray-700 p-2">
                  <div className="text-xs text-gray-400 mb-1">とうしんたく（≈1.5%/ターン）── <span className="text-purple-300">{trustFund.toLocaleString()} MM</span></div>
                  <div className="flex gap-1 flex-wrap mb-1">{[100, 500, 1000].map(a => <Btn key={a} variant="primary" onClick={() => investTrust(a)} disabled={wallet < a}>とうし{a}</Btn>)}<Btn variant="primary" onClick={() => investTrust(wallet)} disabled={wallet <= 0}>ぜんぶ</Btn></div>
                  <div className="flex gap-1 flex-wrap">{[100, 500].map(a => <Btn key={a} variant="danger" onClick={() => withdrawTrust(a)} disabled={trustFund < a}>もどす{a}</Btn>)}<Btn variant="danger" onClick={() => withdrawTrust(trustFund)} disabled={trustFund <= 0}>ぜんぶ</Btn></div>
                </div>
              </div>
            )}

            {/* STOCK - 3タブ制 */}
            {activeBuilding === 'stock' && (() => {
              const phase = ECONOMY_PHASES[econPhase];
              const filteredStocks = sectorFilter === 'all' ? townStocks : townStocks.filter(s => s.sector === sectorFilter);
              // ポートフォリオ分析
              const sectorAlloc = {};
              for (const [sid, q] of Object.entries(portfolio)) {
                if (q > 0) { const st = stocks.find(s => s.id === sid); if (st) { sectorAlloc[st.sector] = (sectorAlloc[st.sector] || 0) + st.price * q; } }
              }
              const totalStockVal = Object.values(sectorAlloc).reduce((a, b) => a + b, 0);
              const unrealizedPnL = Object.entries(portfolio).reduce((sum, [sid, q]) => {
                if (q <= 0) return sum; const st = stocks.find(s => s.id === sid); return sum + (st ? (st.price - (avgCost[sid] || st.price)) * q : 0);
              }, 0);
              // 集中度チェック
              const maxConc = totalStockVal > 0 ? Math.max(...Object.values(sectorAlloc)) / totalStockVal : 0;
              return (
              <div>
                <h2 className="text-cyan-300 text-sm flex items-center gap-1 mb-1"><TrendingUp size={14} /> {town.buildings.find(b => b.type === 'stock')?.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] px-1 py-0.5 rounded" style={{ color: phase.color, border: `1px solid ${phase.color}66`, background: `${phase.color}15` }}>{phase.icon} {phase.name}</span>
                  {activeEvent && <span className="text-[10px] text-red-300 animate-pulse">{activeEvent.icon} {activeEvent.name}</span>}
                </div>
                <div className="flex gap-0.5 mb-2">{[{ id: 'list', l: '📈銘柄' }, { id: 'orders', l: '📋注文' }, { id: 'analysis', l: '📊分析' }].map(t => <button key={t.id} className={`text-xs px-2 py-1 border cursor-pointer pixel ${stockTab === t.id ? 'border-yellow-400 text-yellow-200' : 'border-gray-600 text-gray-500'}`} onClick={() => setStockTab(t.id)}>{t.l}</button>)}</div>

                {stockTab === 'list' && (<div>
                  <div className="flex gap-0.5 mb-1.5 flex-wrap">
                    <button className={`text-[10px] px-1 py-0.5 border cursor-pointer ${sectorFilter === 'all' ? 'border-cyan-400 text-cyan-300' : 'border-gray-700 text-gray-500'}`} onClick={() => setSectorFilter('all')}>ぜんぶ</button>
                    {Object.entries(SECTORS).map(([k, v]) => <button key={k} className={`text-[10px] px-1 py-0.5 border cursor-pointer ${sectorFilter === k ? 'border-cyan-400 text-cyan-300' : 'border-gray-700 text-gray-500'}`} onClick={() => setSectorFilter(k)}>{v.icon}{v.name}</button>)}
                  </div>
                  <div className="space-y-1.5">
                    {filteredStocks.map(st => {
                      const Icon = st.icon; const prev = st.history.length > 1 ? st.history[st.history.length - 2] : st.price;
                      const diff = st.price - prev; const pct = prev > 0 ? ((diff / prev) * 100).toFixed(1) : '0';
                      const owned = portfolio[st.id] || 0; const isOpen = selectedStock === st.id;
                      const shortPos = shortPositions[st.id];
                      return (
                        <div key={st.id} className={`bg-gray-800/80 border p-2 cursor-pointer ${isOpen ? 'border-cyan-400' : 'border-gray-700 hover:border-gray-500'}`}
                          onClick={() => { setSelectedStock(isOpen ? null : st.id); setBuyQty(1); }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5"><Icon size={16} style={{ color: st.color }} /><div><div className="text-xs">{st.name} <span className="text-[9px]" style={{ color: SECTORS[st.sector]?.color }}>{SECTORS[st.sector]?.icon}</span> {st.dividend > 0 && <span className="text-green-400 text-[9px]">配当{(st.dividend*100).toFixed(1)}%</span>}</div><div className="text-[10px] text-gray-500">{st.desc}{owned > 0 && ` ×${owned}`}{shortPos?.qty > 0 && <span className="text-red-400"> 空${shortPos.qty}</span>}</div></div></div>
                            <div className="text-right"><div className="text-sm" style={{ color: diff > 0 ? '#4ADE80' : diff < 0 ? '#F87171' : '#9CA3AF' }}>{st.price.toLocaleString()}</div><div className="text-[10px]" style={{ color: diff > 0 ? '#4ADE80' : diff < 0 ? '#F87171' : '#6B7280' }}>{diff > 0 ? '+' : ''}{pct}%</div></div>
                          </div>
                          {isOpen && (
                            <div className="mt-2 pt-2 border-t border-gray-700" onClick={e => e.stopPropagation()}>
                              <MiniChart history={st.history} color={st.color} />
                              {/* 株式指標パネル */}
                              <div className="grid grid-cols-3 gap-0.5 mt-1.5 mb-1.5">
                                <div className="bg-gray-900 border border-gray-700 px-1 py-0.5 text-center"><div className="text-[8px] text-gray-500">PER</div><div className="text-[10px] text-cyan-300">{calcPER(st.price, st.eps)}倍</div><div className="text-[7px]">{perLabel(calcPER(st.price, st.eps))}</div></div>
                                <div className="bg-gray-900 border border-gray-700 px-1 py-0.5 text-center"><div className="text-[8px] text-gray-500">PBR</div><div className="text-[10px] text-cyan-300">{calcPBR(st.price, st.bps)}倍</div></div>
                                <div className="bg-gray-900 border border-gray-700 px-1 py-0.5 text-center"><div className="text-[8px] text-gray-500">ROE</div><div className="text-[10px] text-cyan-300">{calcROE(st.eps, st.bps)}%</div></div>
                                <div className="bg-gray-900 border border-gray-700 px-1 py-0.5 text-center"><div className="text-[8px] text-gray-500">EPS</div><div className="text-[10px] text-yellow-300">{st.eps} MM</div></div>
                                <div className="bg-gray-900 border border-gray-700 px-1 py-0.5 text-center"><div className="text-[8px] text-gray-500">BPS</div><div className="text-[10px] text-yellow-300">{st.bps} MM</div></div>
                                <div className="bg-gray-900 border border-gray-700 px-1 py-0.5 text-center"><div className="text-[8px] text-gray-500">じかそうがく</div><div className="text-[10px] text-yellow-300">{calcMarketCap(st.price, st.shares)}億</div></div>
                              </div>
                              <div className="flex items-center gap-1 mt-1 text-xs">{[1, 5, 10, 50].map(n => <button key={n} className={`px-1.5 py-0.5 border cursor-pointer ${buyQty === n ? 'border-yellow-400 text-yellow-200' : 'border-gray-600 text-gray-500'}`} onClick={() => setBuyQty(n)}>{n}</button>)}</div>
                              <div className="flex gap-1 mt-1 flex-wrap">
                                <Btn variant="success" onClick={() => handleBuyStock(st.id, buyQty)} disabled={wallet < st.price * buyQty}>かう（{(st.price * buyQty).toLocaleString()}）</Btn>
                                <Btn variant="danger" onClick={() => handleSellStock(st.id, buyQty)} disabled={owned < buyQty}>うる</Btn>
                                {owned > 0 && <Btn variant="danger" onClick={() => handleSellStock(st.id, owned)}>ぜんぶ</Btn>}
                              </div>
                              {currentTown >= 2 && <div className="flex gap-1 mt-1">
                                <Btn onClick={() => handleShortSell(st.id, buyQty)} disabled={wallet < st.price * buyQty}>📉からうり</Btn>
                                {shortPos?.qty > 0 && <Btn variant="success" onClick={() => handleCoverShort(st.id)}>決済（{Math.floor((shortPos.entryPrice - st.price) * shortPos.qty)}）</Btn>}
                              </div>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>)}

                {stockTab === 'orders' && (<div className="space-y-2">
                  <div className="text-xs text-gray-400">さしねちゅうもん（{limitOrders.length}/5）</div>
                  {limitOrders.length > 0 ? limitOrders.map(o => {
                    const st = stocks.find(s => s.id === o.stockId);
                    return <div key={o.id} className="flex items-center justify-between bg-gray-800 border border-gray-700 p-1.5 text-xs">
                      <span>{st?.name} {o.type === 'buy' ? '🟢かい' : '🔴うり'} {o.qty}かぶ @{o.price}</span>
                      <button className="text-red-400 border border-red-400/50 px-1 cursor-pointer text-[10px]" onClick={() => cancelLimitOrder(o.id)}>×</button>
                    </div>;
                  }) : <div className="text-xs text-gray-600 text-center py-4">ちゅうもんはありません</div>}
                  <div className="border-t border-gray-700 pt-2">
                    <div className="text-xs text-gray-400 mb-1">あたらしいさしね</div>
                    {selectedStock ? (() => {
                      const st = stocks.find(s => s.id === selectedStock);
                      return <div className="space-y-1">
                        <div className="text-xs">{st?.name}（いまの価格: {st?.price}）</div>
                        <div className="flex gap-1">
                          <Btn variant="success" onClick={() => addLimitOrder(selectedStock, 'buy', Math.floor(st.price * 0.9), buyQty)}>{Math.floor(st.price * 0.9)}以下でかう</Btn>
                          <Btn variant="danger" onClick={() => addLimitOrder(selectedStock, 'sell', Math.floor(st.price * 1.1), buyQty)}>{Math.floor(st.price * 1.1)}以上でうる</Btn>
                        </div>
                      </div>;
                    })() : <div className="text-[10px] text-gray-500">銘柄タブでかぶをえらんでね</div>}
                  </div>
                </div>)}

                {stockTab === 'analysis' && (<div className="space-y-2">
                  <div className="text-xs text-gray-400">ポートフォリオぶんせき</div>
                  {totalStockVal > 0 ? (<>
                    <div className="flex h-3 rounded overflow-hidden">{Object.entries(sectorAlloc).map(([sec, val]) => <div key={sec} style={{ width: `${(val / totalStockVal) * 100}%`, backgroundColor: SECTORS[sec]?.color }} title={`${SECTORS[sec]?.name}: ${Math.round((val / totalStockVal) * 100)}%`} />)}</div>
                    <div className="flex flex-wrap gap-1 text-[10px]">{Object.entries(sectorAlloc).map(([sec, val]) => <span key={sec} style={{ color: SECTORS[sec]?.color }}>{SECTORS[sec]?.icon}{Math.round((val / totalStockVal) * 100)}%</span>)}</div>
                    {maxConc > 0.5 && <div className="text-xs text-yellow-300 bg-yellow-900/20 border border-yellow-400/30 p-1">⚠️ しゅうちゅうしすぎ！ぶんさんしよう！</div>}
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className="bg-gray-800 border border-gray-700 p-1.5"><div className="text-gray-500 text-[10px]">ふくみそんえき</div><div className={unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}>{unrealizedPnL >= 0 ? '+' : ''}{Math.floor(unrealizedPnL).toLocaleString()}</div></div>
                      <div className="bg-gray-800 border border-gray-700 p-1.5"><div className="text-gray-500 text-[10px]">かくていりえき</div><div className="text-green-300">{Math.floor(totalStockProfit).toLocaleString()}</div></div>
                      <div className="bg-gray-800 border border-gray-700 p-1.5"><div className="text-gray-500 text-[10px]">からうりそんえき</div><div className={shortPnL >= 0 ? 'text-green-400' : 'text-red-400'}>{Math.floor(shortPnL).toLocaleString()}</div></div>
                      <div className="bg-gray-800 border border-gray-700 p-1.5"><div className="text-gray-500 text-[10px]">はいとうるいけい</div><div className="text-yellow-300">{totalDividendEarned.toLocaleString()}</div></div>
                    </div>
                  </>) : <div className="text-xs text-gray-600 text-center py-4">まだかぶをもっていません</div>}
                </div>)}
              </div>
              );
            })()}

            {/* SCHOOL */}
            {activeBuilding === 'school' && (
              <div className="space-y-3">
                <h2 className="text-cyan-300 text-sm flex items-center gap-1"><BookOpen size={14} /> {town.buildings.find(b => b.type === 'school')?.name}（×{mult}）</h2>
                <div className="border-2 border-gray-700 p-2">
                  <div className="text-xs text-gray-400 mb-1">📖 マネークイズ（{quizIndex + 1}/{QUIZZES.length}）</div>
                  {!quizResult ? (
                    <><div className="bg-gray-800 border border-cyan-400/30 p-2 mb-2 text-xs">{QUIZZES[quizIndex].q}</div>
                    <div className="space-y-1">{QUIZZES[quizIndex].a.map((a, i) => <button key={i} className="w-full text-left border border-gray-600 bg-gray-800 px-2 py-1.5 text-xs pixel hover:border-yellow-400 cursor-pointer" onClick={() => handleQuizAnswer(i)}><span className="text-cyan-400">{['Ａ','Ｂ','Ｃ'][i]}</span> {a}</button>)}</div></>
                  ) : (
                    <div style={{ animation: 'pop 0.3s ease-out' }}>
                      <div className={`text-center text-lg mb-1 ${quizResult.correct ? 'text-green-300' : 'text-red-300'}`}>{quizResult.correct ? '⭕ せいかい！' : '❌ ざんねん…'}</div>
                      <div className="bg-gray-800 border border-gray-600 p-2 mb-1 text-xs">💡 {quizResult.explain}</div>
                      <div className="text-yellow-300 text-center text-sm mb-1">+{quizResult.reward} MM</div>
                      <div className="text-center"><Btn onClick={nextQuiz}>つぎのもんだい</Btn></div>
                    </div>
                  )}
                </div>
                <div className="border-2 border-gray-700 p-2">
                  <div className="text-xs text-gray-400 mb-1">⚡ ミニバイト</div>
                  {!miniGame && !miniGameResult && <div className="flex gap-1"><Btn onClick={startMash}>🔨 れんだ！</Btn><Btn onClick={startTiming}>🎯 タイミング！</Btn></div>}
                  {miniGame === 'mash' && <div className="text-center"><ProgressBar value={mashCount} max={20} color="#FBBF24" h={8} /><div className="text-xs text-gray-400 mt-0.5 mb-1">{mashCount}/20</div><button className="border-4 border-yellow-300 bg-red-800 text-white px-6 py-3 text-lg pixel cursor-pointer active:scale-90" onClick={handleMash}>おせ！！</button></div>}
                  {miniGame === 'timing' && <div className="text-center"><div className="bg-gray-800 border-2 border-gray-600 h-8 relative mx-4 mb-1"><div className="absolute top-0 bottom-0 left-[42%] w-[16%] bg-green-800/40" /><div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-green-400/50" /><div className="absolute top-1 bottom-1 w-3 bg-yellow-300 rounded-sm" style={{ left: `calc(${timingPos}% - 6px)` }} /></div><Btn variant="primary" onClick={handleTimingStop}>ストップ！</Btn></div>}
                  {miniGameResult && <div className="text-center" style={{ animation: 'pop 0.3s ease-out' }}><div className="text-yellow-300 text-sm mb-1">+{miniGameResult.reward} MM！</div>{miniGameResult.accuracy !== undefined && <div className="text-xs text-gray-400 mb-1">せいかくど: {Math.round(miniGameResult.accuracy)}%</div>}<Btn onClick={() => setMiniGameResult(null)}>もういちど</Btn></div>}
                </div>
              </div>
            )}

            {/* SHOP */}
            {activeBuilding === 'shop' && (
              <div>
                <h2 className="text-cyan-300 text-sm flex items-center gap-1 mb-2"><ShoppingBag size={14} /> {town.buildings.find(b => b.type === 'shop')?.name}</h2>
                <div className="flex gap-0.5 mb-2 flex-wrap">{shopCats.map(c => <button key={c} className={`text-xs px-1.5 py-0.5 border cursor-pointer pixel ${shopCat === c ? 'border-yellow-400 text-yellow-200' : 'border-gray-600 text-gray-500'}`} onClick={() => setShopCat(c)}>{c}</button>)}</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {townShopItems.filter(i => i.cat === shopCat).map(item => {
                    const Icon = item.icon; const owned = inventory.filter(inv => inv.id === item.id).length;
                    const canBuy = wallet >= item.price;
                    const vUnlock = item.vehicle === 'bike' ? 'なかまちシティ' : item.vehicle === 'car' ? 'おおえどメトロ' : item.vehicle === 'plane' ? 'せかいとし' : null;
                    return (
                      <div key={item.id} className={`bg-gray-800 border p-1.5 flex flex-col items-center ${canBuy ? 'border-gray-600' : 'border-gray-700 opacity-50'}`}>
                        <Icon size={22} style={{ color: item.color, animation: 'float 3s ease-in-out infinite' }} />
                        <div className="text-xs mt-0.5">{item.name}</div>
                        <div className="text-yellow-300 text-[10px]">{item.price.toLocaleString()} MM</div>
                        {vUnlock && <div className="text-[9px] text-cyan-400">→{vUnlock}</div>}
                        {owned > 0 && <div className="text-[10px] text-green-400">×{owned}</div>}
                        <Btn className="mt-0.5 text-[10px] px-1.5 py-0.5" onClick={() => buyItem(item)} disabled={!canBuy}>かう</Btn>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* HOME */}
            {activeBuilding === 'home' && (
              <div>
                <h2 className="text-cyan-300 text-sm flex items-center gap-1 mb-2"><Home size={14} /> {town.buildings.find(b => b.type === 'home')?.name}</h2>
                <div className="flex gap-0.5 mb-2">{[{ id: 'status', l: '📊ステータス' }, { id: 'room', l: '🏠マイルーム' }, { id: 'achieve', l: '🏆きろく' }].map(t => <button key={t.id} className={`text-xs px-2 py-1 border cursor-pointer pixel ${homeTab === t.id ? 'border-yellow-400 text-yellow-200' : 'border-gray-600 text-gray-500'}`} onClick={() => setHomeTab(t.id)}>{t.l}</button>)}</div>

                {homeTab === 'status' && (
                  <div className="space-y-2">
                    <div className="text-center"><span className="text-xs px-2 py-0.5" style={{ color: currentTitle.color }}>{currentTitle.title}</span></div>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[{ l: 'さいふ', v: wallet, c: '#FBBF24' }, { l: 'ぎんこう', v: bank, c: '#4ADE80' }, { l: 'しんたく', v: trustFund, c: '#A78BFA' }, { l: 'かぶ', v: stockValue, c: '#38BDF8' }].map(x => (
                        <div key={x.l} className="bg-gray-800 border border-gray-700 p-1.5"><div className="text-gray-500 text-[10px]">{x.l}</div><div style={{ color: x.c }}>{x.v.toLocaleString()}</div></div>
                      ))}
                    </div>
                    <div className="text-center border-t border-gray-700 pt-1"><span className="text-gray-400 text-xs">そうしさん </span><span className="text-cyan-300">{totalAssets.toLocaleString()} MM</span></div>
                    {Object.entries(portfolio).some(([, q]) => q > 0) && (
                      <div className="border border-gray-700 p-1.5 text-xs"><div className="text-gray-400 mb-1">もっているかぶ</div>
                        {stocks.filter(s => portfolio[s.id] > 0).map(s => { const Icon = s.icon; const q = portfolio[s.id]; const pr = (s.price - (avgCost[s.id] || s.price)) * q; return (
                          <div key={s.id} className="flex items-center justify-between py-0.5"><span className="flex items-center gap-1"><Icon size={10} style={{ color: s.color }} />{s.name} ×{q}</span><span className={pr >= 0 ? 'text-green-400' : 'text-red-400'}>{pr >= 0 ? '+' : ''}{Math.floor(pr).toLocaleString()}</span></div>
                        ); })}
                      </div>
                    )}
                    {inventory.length > 0 && <div className="border border-gray-700 p-1.5"><div className="text-xs text-gray-400 mb-1">もちもの ({inventory.length}こ)</div><div className="flex flex-wrap gap-0.5">{inventory.map((it, i) => <span key={i} className="text-sm" title={it.name}>{it.roomIcon || '📦'}</span>)}</div></div>}
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      <div className="bg-gray-800 p-1 border border-gray-700 text-center"><div className="text-gray-500">クイズ</div><div className="text-cyan-300">{quizCorrect}問</div></div>
                      <div className="bg-gray-800 p-1 border border-gray-700 text-center"><div className="text-gray-500">のりもの</div><div className="text-green-300">{playerEmoji}</div></div>
                      <div className="bg-gray-800 p-1 border border-gray-700 text-center"><div className="text-gray-500">まち</div><div className="text-yellow-300">{unlockedTowns.size}/{TOWNS.length}</div></div>
                    </div>
                  </div>
                )}

                {homeTab === 'room' && (
                  <div className="space-y-2">
                    {placingItem && <div className="text-xs text-yellow-200 bg-yellow-900/20 border border-yellow-400/30 p-1 flex items-center justify-between"><span>「{placingItem.name}」をおくばしょをえらんでね</span><button className="text-red-300 border border-red-400/50 px-1 text-[10px] cursor-pointer" onClick={() => setPlacingItem(null)}>×</button></div>}
                    <div className="border-2 border-cyan-400/40 p-1.5 bg-gray-800"><div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>{roomItems.map((it, i) => <div key={i} className={`aspect-square flex items-center justify-center cursor-pointer text-lg border ${it ? 'border-yellow-400/40 bg-gray-700/60' : placingItem ? 'border-dashed border-green-400/40 hover:bg-green-900/20' : 'border-gray-700/20'}`} onClick={() => { if (placingItem && !it) placeInRoom(i); else if (it && !placingItem) removeFromRoom(i); }}>{it ? it.roomIcon || '📦' : ''}</div>)}</div></div>
                    {inventory.length > 0 && <div className="flex flex-wrap gap-1">{inventory.map((it, i) => { const placed = roomItems.some(r => r && r.uid === it.uid); return <button key={i} className={`border p-1 flex flex-col items-center text-[10px] cursor-pointer ${placed ? 'border-green-400/40 opacity-50' : 'border-gray-600 hover:border-yellow-400'}`} onClick={() => !placed && setPlacingItem(it)} disabled={placed}><span className="text-sm">{it.roomIcon || '📦'}</span><span>{it.name}</span>{placed && <span className="text-green-400">✓</span>}</button>; })}</div>}
                  </div>
                )}

                {homeTab === 'achieve' && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">しょうごう</div>
                    <div className="space-y-0.5">{TITLES.map((t, i) => <div key={i} className="flex items-center gap-1 text-xs"><span className={totalAssets >= t.min ? '' : 'opacity-30'}>{totalAssets >= t.min ? '★' : '☆'}</span><span style={{ color: totalAssets >= t.min ? t.color : '#4B5563' }}>{totalAssets >= t.min ? t.title : '？？？'}</span><span className="text-gray-600 ml-auto">{t.min.toLocaleString()}</span></div>)}</div>
                    <div className="border-t border-gray-700 pt-2">
                      <div className="text-xs text-gray-400 mb-1">じっせき（{achievements.size}/{ACHIEVEMENTS.length}）</div>
                      <div className="grid grid-cols-2 gap-1">
                        {ACHIEVEMENTS.map(a => {
                          const done = achievements.has(a.id);
                          return <div key={a.id} className={`text-[10px] p-1 border ${done ? 'border-yellow-400/50 bg-yellow-900/10' : 'border-gray-700/50 opacity-40'}`}>
                            <span>{a.icon} {done ? a.name : '？？？'}</span>
                            {done && <span className="text-yellow-400 ml-1">+{a.reward}</span>}
                          </div>;
                        })}
                      </div>
                    </div>
                    {monthlyReport && (
                      <div className="border-t border-gray-700 pt-2">
                        <div className="text-xs text-gray-400 mb-1">📋 げつかんレポート</div>
                        <div className="bg-gray-800 border border-gray-700 p-2 text-xs">
                          <div>そうしさん: {monthlyReport.assets.toLocaleString()} MM</div>
                          <div className={monthlyReport.diff >= 0 ? 'text-green-400' : 'text-red-400'}>ぜんげつひ: {monthlyReport.diff >= 0 ? '+' : ''}{monthlyReport.diff.toLocaleString()} MM</div>
                        </div>
                      </div>
                    )}
                    <div className="border-t border-gray-700 pt-2 grid grid-cols-2 gap-1 text-[10px]">
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">そうかせぎ</span> <span className="text-yellow-300">{totalEarned.toLocaleString()}</span></div>
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">かぶりえき</span> <span className="text-green-300">{Math.floor(totalStockProfit).toLocaleString()}</span></div>
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">はいとう</span> <span className="text-cyan-300">{totalDividendEarned.toLocaleString()}</span></div>
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">ターン</span> <span className="text-gray-300">{turn}（{Math.floor(turn/40)}月）</span></div>
                    </div>
                    {eventHistory.length > 0 && (
                      <div className="border-t border-gray-700 pt-2">
                        <div className="text-xs text-gray-400 mb-1">📰 イベントれきし</div>
                        {eventHistory.slice(-5).reverse().map((e, i) => <div key={i} className="text-[10px] text-gray-500">{e.icon} T{e.turn} {e.name}</div>)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STATION */}
            {activeBuilding === 'station' && (
              <div>
                <h2 className="text-cyan-300 text-sm flex items-center gap-1 mb-2">🚉 {town.buildings.find(b => b.type === 'station')?.name}</h2>
                <p className="text-xs text-gray-400 mb-2">どこにいく？</p>
                <div className="space-y-1.5">
                  {TOWNS.map(t => {
                    const unlocked = unlockedTowns.has(t.id); const isCur = t.id === currentTown; const req = t.unlockReq;
                    return (
                      <div key={t.id} className={`border p-2 ${isCur ? 'border-cyan-400 bg-cyan-900/20' : unlocked ? 'border-gray-600 bg-gray-800 hover:border-yellow-400 cursor-pointer' : 'border-gray-700 bg-gray-800/50 opacity-50'}`}
                        onClick={() => !isCur && unlocked && travelTo(t.id)}>
                        <div className="flex items-center justify-between">
                          <div><div className="text-xs">{isCur && '📍'}{unlocked ? t.name : '？？？'}</div>{unlocked && <div className="text-[10px] text-gray-500">{t.desc}</div>}</div>
                          {!unlocked && req && <div className="text-[10px] text-gray-500 text-right"><div>💰{req.asset.toLocaleString()}</div><div>🚗{req.vehicle === 'bike' ? 'じてんしゃ' : req.vehicle === 'car' ? 'くるま' : 'ひこうき'}</div></div>}
                          {unlocked && !isCur && <span className="text-yellow-300 text-xs">→いく</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="text-center text-[10px] text-gray-700 mt-3 mb-4 pixel">♪ MOTHER MONEY ～おかねのぼうけん～ ♪</div>
    </div>
  );
}
