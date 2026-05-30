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
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';

// ══════════════════════════════════════
//  CSS
// ══════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
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
//  Tile types & styles
// ══════════════════════════════════════
const T = { GRASS: 0, PATH: 1, WATER: 2, TREE: 3, FLOWER: 4, FENCE: 5, ROAD: 6, SAND: 7, STONE: 8, DARK: 9 };
const TILE_STYLE = {
  [T.GRASS]:  { bg: '#4a7c3f', emoji: '' },
  [T.PATH]:   { bg: '#c4a96a', emoji: '' },
  [T.WATER]:  { bg: '#3b6ea5', emoji: '〜' },
  [T.TREE]:   { bg: '#3d6b35', emoji: '🌲' },
  [T.FLOWER]: { bg: '#4a7c3f', emoji: '🌸' },
  [T.FENCE]:  { bg: '#8b7355', emoji: '▪' },
  [T.ROAD]:   { bg: '#555', emoji: '' },
  [T.SAND]:   { bg: '#dcc27a', emoji: '' },
  [T.STONE]:  { bg: '#888', emoji: '' },
  [T.DARK]:   { bg: '#2a2a3e', emoji: '' },
};
const WALKABLE = new Set([T.GRASS, T.PATH, T.ROAD, T.SAND, T.FLOWER, T.STONE, T.DARK]);

// ══════════════════════════════════════
//  Map builder
// ══════════════════════════════════════
const COLS = 12, ROWS = 9;
const makeTiles = (base) => Array(ROWS * COLS).fill(base);
const setRect = (t, x1, y1, x2, y2, v) => { const n = [...t]; for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) n[y * COLS + x] = v; return n; };

const town0Tiles = (() => {
  let t = makeTiles(T.GRASS);
  t = setRect(t, 1, 4, 10, 4, T.PATH);
  t = setRect(t, 5, 1, 5, 7, T.PATH);
  t = setRect(t, 3, 2, 3, 6, T.PATH);
  t = setRect(t, 8, 2, 8, 6, T.PATH);
  for (let c = 0; c < COLS; c++) { t[c] = T.TREE; t[(ROWS - 1) * COLS + c] = T.TREE; }
  for (let r = 0; r < ROWS; r++) { t[r * COLS] = T.TREE; t[r * COLS + COLS - 1] = T.TREE; }
  t[4 * COLS + COLS - 1] = T.ROAD;
  t = setRect(t, 9, 6, 10, 7, T.WATER);
  t[2 * COLS + 2] = T.FLOWER; t[6 * COLS + 2] = T.FLOWER; t[2 * COLS + 10] = T.FLOWER;
  return t;
})();

const town1Tiles = (() => {
  let t = makeTiles(T.DARK);
  t = setRect(t, 0, 4, 11, 4, T.ROAD);
  t = setRect(t, 5, 0, 5, 8, T.ROAD);
  t = setRect(t, 2, 2, 9, 6, T.STONE);
  t = setRect(t, 3, 3, 8, 5, T.PATH);
  for (let c = 0; c < COLS; c++) { t[c] = T.FENCE; t[(ROWS - 1) * COLS + c] = T.FENCE; }
  for (let r = 0; r < ROWS; r++) { t[r * COLS] = T.FENCE; t[r * COLS + COLS - 1] = T.FENCE; }
  t[4 * COLS] = T.ROAD; t[4 * COLS + COLS - 1] = T.ROAD;
  return t;
})();

const town2Tiles = (() => {
  let t = makeTiles(T.STONE);
  t = setRect(t, 0, 4, 11, 4, T.ROAD);
  t = setRect(t, 3, 0, 3, 8, T.ROAD); t = setRect(t, 8, 0, 8, 8, T.ROAD);
  t = setRect(t, 0, 2, 11, 2, T.ROAD); t = setRect(t, 0, 6, 11, 6, T.ROAD);
  for (let c = 0; c < COLS; c++) { t[c] = T.FENCE; t[(ROWS - 1) * COLS + c] = T.FENCE; }
  for (let r = 0; r < ROWS; r++) { t[r * COLS] = T.FENCE; t[r * COLS + COLS - 1] = T.FENCE; }
  t[4 * COLS] = T.ROAD; t[4 * COLS + COLS - 1] = T.ROAD;
  return t;
})();

const town3Tiles = (() => {
  let t = makeTiles(T.SAND);
  t = setRect(t, 0, 4, 11, 4, T.ROAD);
  t = setRect(t, 5, 0, 6, 8, T.ROAD);
  t = setRect(t, 1, 1, 10, 1, T.ROAD); t = setRect(t, 1, 7, 10, 7, T.ROAD);
  t = setRect(t, 2, 2, 4, 3, T.PATH); t = setRect(t, 7, 2, 9, 3, T.PATH);
  t = setRect(t, 2, 5, 4, 6, T.PATH); t = setRect(t, 7, 5, 9, 6, T.PATH);
  for (let c = 0; c < COLS; c++) { t[c] = T.WATER; t[(ROWS - 1) * COLS + c] = T.WATER; }
  for (let r = 0; r < ROWS; r++) { t[r * COLS] = T.WATER; t[r * COLS + COLS - 1] = T.WATER; }
  t[4 * COLS] = T.ROAD;
  return t;
})();

// ══════════════════════════════════════
//  Towns
// ══════════════════════════════════════
const TOWNS = [
  { id: 0, name: 'はじまりのむら', desc: 'のどかなむら。おかねのきほんをまなぼう！', tiles: town0Tiles, color: '#4a7c3f',
    buildings: [
      { type: 'home', x: 3, y: 2, emoji: '🏠', name: 'じぶんのいえ' },
      { type: 'bank', x: 5, y: 2, emoji: '🏦', name: 'ぎんこう' },
      { type: 'school', x: 8, y: 2, emoji: '🏫', name: 'がっこう' },
      { type: 'shop', x: 3, y: 6, emoji: '🛒', name: 'ショップ' },
      { type: 'stock', x: 5, y: 6, emoji: '📈', name: 'しょうけん' },
      { type: 'station', x: 8, y: 6, emoji: '🚉', name: 'えき' },
    ],
    startPos: { x: 5, y: 4 }, stocks: ['candy', 'fish', 'pet'],
    shopItems: ['toy1', 'toy2', 'toy3', 'toy4', 'food1', 'food2', 'int6', 'car1'],
    rewardMult: 1, unlockReq: null,
  },
  { id: 1, name: 'なかまちシティ', desc: 'にぎやかな町。ちゅうきゅうかぶがかえる！', tiles: town1Tiles, color: '#3a5fa0',
    buildings: [
      { type: 'bank', x: 3, y: 3, emoji: '🏦', name: 'なかまちぎんこう' },
      { type: 'school', x: 5, y: 3, emoji: '🏫', name: 'なかまち学園' },
      { type: 'stock', x: 7, y: 3, emoji: '📈', name: 'シティしょうけん' },
      { type: 'shop', x: 4, y: 5, emoji: '🛒', name: 'シティモール' },
      { type: 'home', x: 6, y: 5, emoji: '🏠', name: 'マンション' },
      { type: 'station', x: 8, y: 5, emoji: '🚉', name: 'シティえき' },
    ],
    startPos: { x: 5, y: 4 }, stocks: ['candy', 'fish', 'pet', 'game'],
    shopItems: ['toy1', 'toy2', 'toy3', 'food1', 'food2', 'int1', 'int2', 'int3', 'int4', 'int5', 'int6', 'car1', 'car2'],
    rewardMult: 2, unlockReq: { asset: 3000, vehicle: 'bike' },
  },
  { id: 2, name: 'おおえどメトロ', desc: 'だいとかい！こうがくなとうしができる！', tiles: town2Tiles, color: '#8a3fa0',
    buildings: [
      { type: 'bank', x: 4, y: 3, emoji: '🏦', name: 'メガバンク' },
      { type: 'stock', x: 6, y: 3, emoji: '📈', name: 'おおえどしょうけん' },
      { type: 'school', x: 4, y: 5, emoji: '🏫', name: 'おおえど大学' },
      { type: 'shop', x: 6, y: 5, emoji: '🛒', name: 'ひゃっかてん' },
      { type: 'home', x: 9, y: 3, emoji: '🏠', name: 'タワマン' },
      { type: 'station', x: 9, y: 5, emoji: '🚉', name: 'メトロえき' },
    ],
    startPos: { x: 5, y: 4 }, stocks: ['candy', 'fish', 'pet', 'game', 'robo'],
    shopItems: ['int1', 'int2', 'int3', 'int4', 'int5', 'int6', 'car1', 'car2', 'car3', 'house1', 'house2', 'land1'],
    rewardMult: 3, unlockReq: { asset: 15000, vehicle: 'car' },
  },
  { id: 3, name: 'せかいとし', desc: 'せかいのちゅうしん！ゆめのとうしができる！', tiles: town3Tiles, color: '#c4a020',
    buildings: [
      { type: 'bank', x: 3, y: 2, emoji: '🏦', name: 'ワールドバンク' },
      { type: 'stock', x: 8, y: 2, emoji: '📈', name: 'ワールドしょうけん' },
      { type: 'school', x: 3, y: 5, emoji: '🏫', name: 'せかい大学' },
      { type: 'shop', x: 8, y: 5, emoji: '🛒', name: 'せかいマーケット' },
      { type: 'home', x: 3, y: 3, emoji: '🏠', name: 'ペントハウス' },
      { type: 'station', x: 8, y: 6, emoji: '🚉', name: 'くうこう' },
    ],
    startPos: { x: 5, y: 4 }, stocks: ['candy', 'fish', 'pet', 'game', 'robo', 'space'],
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

const ALL_STOCKS = [
  { id: 'candy', name: 'おかしカンパニー', price: 100, history: [95, 98, 100], trend: 0.015, vol: 0.06, icon: IceCream, color: '#FF69B4', desc: 'あんてい', dividend: 0.01 },
  { id: 'fish', name: 'おさかなマート', price: 80, history: [78, 79, 80], trend: 0.008, vol: 0.04, icon: Fish, color: '#4169E1', desc: 'はじめて向け', dividend: 0.015 },
  { id: 'pet', name: 'どうぶつえん', price: 150, history: [145, 148, 150], trend: 0.01, vol: 0.05, icon: Dog, color: '#DEB887', desc: 'はいとう高い', dividend: 0.02 },
  { id: 'game', name: 'ゲームファクトリー', price: 250, history: [240, 245, 250], trend: 0.025, vol: 0.10, icon: Gamepad2, color: '#7B68EE', desc: 'せいちょう', dividend: 0.005 },
  { id: 'robo', name: 'ロボットラボ', price: 500, history: [480, 490, 500], trend: 0.035, vol: 0.14, icon: Zap, color: '#00CED1', desc: 'ハイリスク', dividend: 0 },
  { id: 'space', name: 'うちゅうぼうけん', price: 1000, history: [950, 970, 1000], trend: 0.045, vol: 0.20, icon: Rocket, color: '#FF6347', desc: 'ゆめかぶ', dividend: 0 },
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
    const nx = playerPos.x + dx, ny = playerPos.y + dy;
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;
    const bldg = town.buildings.find(b => b.x === nx && b.y === ny);
    if (bldg || WALKABLE.has(town.tiles[ny * COLS + nx])) setPlayerPos({ x: nx, y: ny });
  }, [activeBuilding, papaCall, playerPos, town]);

  const handleInteract = useCallback(() => {
    if (activeBuilding) return;
    const bldg = town.buildings.find(b => b.x === playerPos.x && b.y === playerPos.y);
    if (bldg) {
      setActiveBuilding(bldg.type);
      setSelectedStock(null); setBuyQty(1); setQuizResult(null);
      setMiniGame(null); setMiniGameResult(null); setPlacingItem(null);
      setHomeTab('status'); setShopCat('おもちゃ');
    }
  }, [activeBuilding, town, playerPos]);

  // Keyboard
  useEffect(() => {
    const h = (e) => {
      if (activeBuilding || papaCall) { if (e.key === 'Escape') { setActiveBuilding(null); } return; }
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
  }, [movePlayer, activeBuilding, papaCall, handleInteract]);

  // Market tick
  useEffect(() => {
    const iv = setInterval(() => {
      setTurn(t => t + 1);
      const hasNews = Math.random() < 0.12;
      let news = null;
      if (hasNews) { news = NEWS_POOL[Math.floor(Math.random() * NEWS_POOL.length)]; setCurrentNews(news); }
      setStocks(prev => prev.map(s => {
        let ch = s.trend + (Math.random() - 0.48) * s.vol;
        if (news && (news.affects === 'ALL' || news.affects === s.id)) ch += news.impact;
        return { ...s, price: Math.max(10, Math.round(s.price * (1 + ch))), history: [...s.history.slice(-29), Math.max(10, Math.round(s.price * (1 + ch)))] };
      }));
      setBank(p => p > 0 ? Math.floor(p * 1.003) : p);
      setTrustFund(p => p <= 0 ? p : Math.max(0, Math.floor(p * (1 + 0.015 + (Math.random() - 0.45) * 0.025))));
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  // Dividends
  useEffect(() => {
    if (turn > 1 && turn % 10 === 0) {
      let d = 0;
      stocks.forEach(s => { const q = portfolio[s.id] || 0; if (q > 0 && s.dividend > 0) d += Math.floor(s.price * q * s.dividend); });
      if (d > 0) { setWallet(w => w + d); setTotalEarned(t => t + d); notify(`💰 はいとう +${d.toLocaleString()}MM！`, 'success'); }
    }
  }, [turn]);

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
  };
  const handleSellStock = (sid, qty) => {
    const st = stocks.find(s => s.id === sid); const owned = portfolio[sid] || 0;
    const q = Math.min(qty, owned); if (q <= 0) return;
    const rev = st.price * q; const profit = rev - (avgCost[sid] || st.price) * q;
    setWallet(w => w + rev); setPortfolio(p => ({ ...p, [sid]: p[sid] - q }));
    if (profit > 0) setTotalStockProfit(t => t + profit);
    notify(`${st.name} ${q}かぶ うった！ ${profit >= 0 ? '+' : ''}${Math.floor(profit)}`, profit >= 0 ? 'success' : 'error');
  };

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
  const MiniChart = ({ history, color, w = 120, h = 30 }) => {
    if (history.length < 2) return null;
    const mn = Math.min(...history), mx = Math.max(...history), rg = mx - mn || 1;
    const pts = history.map((v, i) => `${(i / (history.length - 1)) * w},${h - ((v - mn) / rg) * (h - 4) - 2}`).join(' ');
    return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="2" /></svg>;
  };
  const ProgressBar = ({ value, max, color = '#4ADE80', h = 6 }) => (
    <div className="bg-gray-700 rounded overflow-hidden" style={{ height: h }}><div className="h-full transition-all" style={{ width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: color }} /></div>
  );

  const townStocks = stocks.filter(s => town.stocks.includes(s.id));
  const townShopItems = ALL_SHOP_ITEMS.filter(i => town.shopItems.includes(i.id));
  const shopCats = [...new Set(townShopItems.map(i => i.cat))];
  const TILE_SIZE = 36;

  // ══════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-950 pixel text-white flex flex-col items-center" style={{ imageRendering: 'pixelated' }}>
      <style>{CSS}</style>

      {/* HEADER */}
      <div className="w-full max-w-lg bg-gray-900 border-b-2 border-cyan-400/50 px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins size={14} className="text-yellow-400" />
          <span className="text-xs text-cyan-300">{town.name}</span>
          <span className="text-[10px] px-1 rounded" style={{ color: currentTitle.color, border: `1px solid ${currentTitle.color}44` }}>{currentTitle.title}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-yellow-300">{wallet.toLocaleString()}</span>
          <span className="text-green-300/70">{totalAssets.toLocaleString()}</span>
          <span className="text-gray-600">T{turn}</span>
        </div>
      </div>

      {currentNews && (
        <div className={`w-full max-w-lg marquee-container text-xs py-0.5 px-2 ${currentNews.type === 'good' ? 'text-green-300 bg-green-950/50' : 'text-red-300 bg-red-950/50'}`}>
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

      {/* MAP */}
      <div className="relative mt-1 border-4 border-cyan-400/60 bg-black" style={{ width: COLS * TILE_SIZE, height: ROWS * TILE_SIZE }}>
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, ${TILE_SIZE}px)`, gridTemplateRows: `repeat(${ROWS}, ${TILE_SIZE}px)` }}>
          {town.tiles.map((tile, i) => {
            const ts = TILE_STYLE[tile];
            return <div key={i} className="flex items-center justify-center text-xs select-none" style={{ backgroundColor: ts.bg, fontSize: tile === T.TREE ? '14px' : '10px', color: 'rgba(255,255,255,0.3)' }}>{ts.emoji}</div>;
          })}
        </div>
        {town.buildings.map((b, i) => (
          <div key={i} className="absolute flex items-center justify-center" style={{ left: b.x * TILE_SIZE, top: b.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE, fontSize: '20px', zIndex: 10, filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.7))', animation: playerPos.x === b.x && playerPos.y === b.y ? 'float 1s ease-in-out infinite' : 'none' }}>{b.emoji}</div>
        ))}
        <div className="absolute flex items-center justify-center transition-all duration-150 ease-out" style={{ left: playerPos.x * TILE_SIZE, top: playerPos.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE, fontSize: '20px', zIndex: 20, transform: `scaleX(${facing === 'left' ? -1 : 1})`, animation: isWalking ? 'walk 0.2s ease-in-out' : 'none', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.8))' }}>{playerEmoji}</div>
        {town.buildings.some(b => b.x === playerPos.x && b.y === playerPos.y) && !activeBuilding && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 text-cyan-300 text-[10px] px-2 py-0.5 border border-cyan-400/50 z-30" style={{ animation: 'blink 1.5s infinite' }}>Enter / Ⓐ で入る</div>
        )}
      </div>

      {/* D-PAD */}
      <div className="mt-2 flex flex-col items-center gap-0.5 select-none">
        <button className="w-11 h-11 bg-gray-800 border-2 border-gray-600 rounded flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(0, -1)}><ChevronUp size={22} className="text-gray-300" /></button>
        <div className="flex gap-0.5">
          <button className="w-11 h-11 bg-gray-800 border-2 border-gray-600 rounded flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(-1, 0)}><ChevronLeft size={22} className="text-gray-300" /></button>
          <button className="w-11 h-11 bg-yellow-800 border-2 border-yellow-500 rounded flex items-center justify-center active:bg-yellow-600 cursor-pointer text-sm text-yellow-200 pixel" onPointerDown={handleInteract}>Ⓐ</button>
          <button className="w-11 h-11 bg-gray-800 border-2 border-gray-600 rounded flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(1, 0)}><ChevronRight size={22} className="text-gray-300" /></button>
        </div>
        <button className="w-11 h-11 bg-gray-800 border-2 border-gray-600 rounded flex items-center justify-center active:bg-gray-600 cursor-pointer" onPointerDown={() => movePlayer(0, 1)}><ChevronDown size={22} className="text-gray-300" /></button>
      </div>

      {(() => { const b = town.buildings.find(b => b.x === playerPos.x && b.y === playerPos.y); return b && !activeBuilding ? <div className="text-xs text-cyan-300 mt-1">{b.emoji} {b.name}</div> : null; })()}

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

            {/* STOCK */}
            {activeBuilding === 'stock' && (
              <div>
                <h2 className="text-cyan-300 text-sm flex items-center gap-1 mb-2"><TrendingUp size={14} /> {town.buildings.find(b => b.type === 'stock')?.name}</h2>
                <p className="text-[10px] text-gray-500 mb-2">{townStocks.length}しゅるい｜報酬 ×{mult}</p>
                <div className="space-y-1.5">
                  {townStocks.map(st => {
                    const Icon = st.icon; const prev = st.history.length > 1 ? st.history[st.history.length - 2] : st.price;
                    const diff = st.price - prev; const pct = prev > 0 ? ((diff / prev) * 100).toFixed(1) : '0';
                    const owned = portfolio[st.id] || 0; const isOpen = selectedStock === st.id;
                    return (
                      <div key={st.id} className={`bg-gray-800/80 border p-2 cursor-pointer ${isOpen ? 'border-cyan-400' : 'border-gray-700 hover:border-gray-500'}`}
                        onClick={() => { setSelectedStock(isOpen ? null : st.id); setBuyQty(1); }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5"><Icon size={16} style={{ color: st.color }} /><div><div className="text-xs">{st.name} {st.dividend > 0 && <span className="text-green-400 text-[9px]">配当</span>}</div><div className="text-[10px] text-gray-500">{st.desc}{owned > 0 && ` ×${owned}`}</div></div></div>
                          <div className="text-right"><div className="text-sm" style={{ color: diff > 0 ? '#4ADE80' : diff < 0 ? '#F87171' : '#9CA3AF' }}>{st.price.toLocaleString()}</div><div className="text-[10px]" style={{ color: diff > 0 ? '#4ADE80' : diff < 0 ? '#F87171' : '#6B7280' }}>{diff > 0 ? '+' : ''}{pct}%</div></div>
                        </div>
                        {isOpen && (
                          <div className="mt-2 pt-2 border-t border-gray-700" onClick={e => e.stopPropagation()}>
                            <MiniChart history={st.history} color={st.color} />
                            <div className="flex items-center gap-1 mt-1 text-xs">{[1, 5, 10, 50].map(n => <button key={n} className={`px-1.5 py-0.5 border cursor-pointer ${buyQty === n ? 'border-yellow-400 text-yellow-200' : 'border-gray-600 text-gray-500'}`} onClick={() => setBuyQty(n)}>{n}</button>)}</div>
                            <div className="flex gap-1 mt-1">
                              <Btn variant="success" onClick={() => handleBuyStock(st.id, buyQty)} disabled={wallet < st.price * buyQty}>かう（{(st.price * buyQty).toLocaleString()}）</Btn>
                              <Btn variant="danger" onClick={() => handleSellStock(st.id, buyQty)} disabled={owned < buyQty}>うる</Btn>
                              {owned > 0 && <Btn variant="danger" onClick={() => handleSellStock(st.id, owned)}>ぜんぶ</Btn>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
                    <div className="space-y-0.5">{TITLES.map((t, i) => <div key={i} className="flex items-center gap-1 text-xs"><span className={totalAssets >= t.min ? '' : 'opacity-30'}>{totalAssets >= t.min ? '★' : '☆'}</span><span style={{ color: totalAssets >= t.min ? t.color : '#4B5563' }}>{totalAssets >= t.min ? t.title : '？？？'}</span><span className="text-gray-600 ml-auto">{t.min.toLocaleString()}</span></div>)}</div>
                    <div className="border-t border-gray-700 pt-2 grid grid-cols-2 gap-1 text-[10px]">
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">そうかせぎ</span> <span className="text-yellow-300">{totalEarned.toLocaleString()}</span></div>
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">かぶりえき</span> <span className="text-green-300">{Math.floor(totalStockProfit).toLocaleString()}</span></div>
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">もちもの</span> <span className="text-orange-300">{inventory.length}こ</span></div>
                      <div className="bg-gray-800 p-1 border border-gray-700"><span className="text-gray-500">ターン</span> <span className="text-gray-300">{turn}</span></div>
                    </div>
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
