const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const OUT = path.join(__dirname, 'public', 'sprites');
fs.mkdirSync(OUT, { recursive: true });

// ── driwatatsu-manager pixel art data ──
// Converted from CSS box-shadow format to 2D color arrays
const _ = null; // transparent
function dk(h, n = 40) { return '#' + [1,3,5].map(i => Math.max(0, parseInt(h.slice(i, i+2), 16) - n).toString(16).padStart(2,'0')).join(''); }
function lt(h, n = 30) { return '#' + [1,3,5].map(i => Math.min(255, parseInt(h.slice(i, i+2), 16) + n).toString(16).padStart(2,'0')).join(''); }

// ═══ Player: 正面キャラ 12x14 ═══
function buildFrontChar(hair, shirt) {
  const O='#282830';
  const H=hair, Hd=dk(hair,30), Hl=lt(hair,20);
  const T=shirt, Td=dk(shirt,30), Tl=lt(shirt,20);
  const K='#f0c890', Kd='#dab878';
  const Ew='#f0f0f0', Ep='#282830';
  const Mo='#d08070';
  const P='#2a3a5a', Sh='#3a3028';
  return [
    [_,_,_,_,O,O,O,O,_,_,_,_],
    [_,_,_,O,Hl,H,H,Hl,O,_,_,_],
    [_,_,O,H,H,H,H,H,H,O,_,_],
    [_,_,O,H,Hl,H,H,Hl,H,O,_,_],
    [_,_,O,Ew,Ep,K,K,Ew,Ep,O,_,_],
    [_,_,O,K,K,Kd,Kd,K,K,O,_,_],
    [_,_,_,O,K,Mo,Mo,K,O,_,_,_],
    [_,_,_,_,O,K,K,O,_,_,_,_],
    [_,_,O,Tl,T,T,T,T,Tl,O,_,_],
    [_,O,K,T,Td,T,T,Td,T,K,O,_],
    [_,_,O,O,T,T,T,T,O,O,_,_],
    [_,_,_,O,P,P,P,P,O,_,_,_],
    [_,_,_,O,P,_,_,P,O,_,_,_],
    [_,_,_,O,Sh,_,_,Sh,O,_,_,_],
  ];
}

// ═══ Walk down frame 0 ═══
function buildWalkDown0(hair, shirt) {
  const O='#282830';
  const H=hair, Hd=dk(hair,30), Hl=lt(hair,20);
  const T=shirt, Td=dk(shirt,30), Tl=lt(shirt,20);
  const K='#f0c890', Kd='#dab878';
  const Ew='#f0f0f0', Ep='#282830';
  const Mo='#d08070';
  const P='#2a3a5a', Sh='#3a3028';
  return [
    [_,_,_,_,O,O,O,O,_,_,_,_],
    [_,_,_,O,Hl,H,H,Hl,O,_,_,_],
    [_,_,O,H,H,H,H,H,H,O,_,_],
    [_,_,O,H,Hl,H,H,Hl,H,O,_,_],
    [_,_,O,Ew,Ep,K,K,Ew,Ep,O,_,_],
    [_,_,O,K,K,Kd,Kd,K,K,O,_,_],
    [_,_,_,O,K,Mo,Mo,K,O,_,_,_],
    [_,_,_,_,O,K,K,O,_,_,_,_],
    [_,_,O,Tl,T,T,T,T,Tl,O,_,_],
    [_,O,K,T,Td,T,T,Td,T,K,O,_],
    [_,_,O,O,T,T,T,T,O,O,_,_],
    [_,_,_,O,P,P,P,P,O,_,_,_],
    [_,_,O,Sh,O,_,_,O,P,O,_,_],
    [_,_,_,O,_,_,_,_,O,Sh,O,_],
  ];
}

// ═══ Back character 12x12 ═══
function buildBackChar(hair, shirt) {
  const O='#282830';
  const H=hair, Hd=dk(hair,30), Hl=lt(hair,20);
  const T=shirt, Td=dk(shirt,30);
  const K='#f0c890';
  return [
    [_,_,_,_,O,O,O,O,_,_,_,_],
    [_,_,_,O,Hl,H,H,Hl,O,_,_,_],
    [_,_,O,H,H,Hd,Hd,H,H,O,_,_],
    [_,_,O,Hd,H,H,H,H,Hd,O,_,_],
    [_,_,O,H,H,Hd,Hd,H,H,O,_,_],
    [_,_,_,O,O,K,K,O,O,_,_,_],
    [_,_,O,T,T,T,T,T,T,O,_,_],
    [_,O,K,T,Td,T,T,Td,T,K,O,_],
    [_,_,O,O,T,T,T,T,O,O,_,_],
    [_,_,_,O,T,Td,Td,T,O,_,_,_],
    [_,_,_,O,Td,_,_,Td,O,_,_,_],
    [_,_,_,O,O,_,_,O,O,_,_,_],
  ];
}

// ═══ Manager (suit) 14x16 ═══
function buildManagerChar() {
  const O='#282830';
  const H='#282828', Hl='#383838', Hll='#484848';
  const T='#1a1a3a', Td='#101028', Tl='#2a2a4a';
  const K='#f0c890', Kd='#dab878', Kl='#f8d8a8';
  const Ew='#f0f0f0', Ep='#282830';
  const Mo='#d08070';
  const Tie='#a03030', Tied='#802020';
  const P='#1a1a2a';
  return [
    [_,_,_,_,_,O,O,O,O,_,_,_,_,_],
    [_,_,_,_,O,Hl,Hll,Hll,Hl,O,_,_,_,_],
    [_,_,_,O,H,H,H,H,H,H,O,_,_,_],
    [_,_,O,H,Hl,H,H,H,H,Hl,H,O,_,_],
    [_,_,O,K,Ew,Ep,K,K,Ew,Ep,K,O,_,_],
    [_,_,O,Kl,K,K,Kd,Kd,K,K,Kl,O,_,_],
    [_,_,_,O,K,K,Mo,Mo,K,K,O,_,_,_],
    [_,_,_,_,O,O,K,K,O,O,_,_,_,_],
    [_,_,_,_,_,O,Kl,Kl,O,_,_,_,_,_],
    [_,_,O,Tl,T,T,Tie,Tie,T,T,Tl,O,_,_],
    [_,O,K,T,Td,T,Tied,Tied,T,Td,T,K,O,_],
    [_,_,O,O,T,T,Tie,Tie,T,T,O,O,_,_],
    [_,_,_,O,T,T,T,T,T,T,O,_,_,_],
    [_,_,_,O,P,P,P,P,P,P,O,_,_,_],
    [_,_,_,O,P,_,_,_,_,P,O,_,_,_],
    [_,_,_,O,O,_,_,_,_,O,O,_,_,_],
  ];
}

// ═══ Objects ═══
function buildCat() {
  const O='#282830';
  const F='#e0a040',Fd='#c08030',Fl='#f0b850';
  const Ey='#50a848',N='#e07070';
  const Wh='#f0e8d8';
  return [
    [_,O,O,_,_,_,_,O,O,_],
    [O,Fl,F,O,_,_,O,F,Fl,O],
    [O,F,F,F,O,O,F,F,F,O],
    [O,Ey,O,F,F,F,F,O,Ey,O],
    [O,F,F,N,F,F,N,F,F,O],
    [O,Wh,F,F,F,F,F,F,Wh,O],
    [_,O,Fd,F,F,F,F,Fd,O,_],
    [_,_,O,O,Fd,Fd,O,O,_,_],
    [_,_,_,O,_,_,O,_,_,_],
  ];
}

function buildPlant() {
  const L='#389038',Ld='#287028',Ll='#50b050',Lll='#68c868',S='#604828',P='#a06838',Pd='#805028',Pl='#c08850';
  return [[_,_,_,Lll,Lll,_,_,_],[_,_,Lll,Ll,Ll,Lll,_,_],[_,Lll,Ll,L,L,Ll,Lll,_],[Lll,L,Ld,L,L,Ld,L,Lll],[_,Ld,L,L,L,L,Ld,_],[_,_,_,S,S,_,_,_],[_,_,Pd,Pl,Pl,Pd,_,_],[_,_,P,P,P,P,_,_]];
}

function buildVending() {
  const M='#3848a0', Md='#283878', Ml='#4858b0';
  const G='#1a1a20';
  const Cn='#e04040', Cn2='#40a040', Cn3='#e0a020', Cn4='#4080d0';
  const Sl='#c0c0c8';
  return [
    [Md,M,Ml,Ml,Ml,Ml,Ml,Ml,M,Md],
    [M,G,Cn,Cn,Cn2,Cn2,Cn3,Cn3,G,M],
    [M,G,Cn,Cn,Cn2,Cn2,Cn3,Cn3,G,M],
    [M,G,Cn4,Cn4,Cn,Cn,Cn2,Cn2,G,M],
    [M,G,Cn4,Cn4,Cn,Cn,Cn2,Cn2,G,M],
    [M,Ml,Ml,Ml,Ml,Ml,Ml,Ml,Ml,M],
    [M,M,M,M,M,M,M,M,M,M],
    [M,Sl,Sl,Sl,Sl,Sl,Sl,Sl,Sl,M],
    [Md,Md,_,_,_,_,_,_,Md,Md],
  ];
}

function buildBookshelf() {
  const W='#7a5a2a',Wd='#5a3a1a',Wl='#9a7a4a';
  const B1='#c04040',B2='#4060c0',B3='#40a050',B4='#d0a030',B5='#8040a0',B6='#d07040';
  return [
    [Wd,W,W,W,W,W,W,W,W,W,W,Wd],
    [W,B1,B1,B2,B3,B3,B4,B5,B5,B6,B6,W],
    [W,B1,B1,B2,B3,B3,B4,B5,B5,B6,B6,W],
    [Wd,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wd],
    [W,B4,B6,B6,B1,B2,B2,B5,B3,B1,B4,W],
    [W,B4,B6,B6,B1,B2,B2,B5,B3,B1,B4,W],
    [Wd,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wl,Wd],
    [W,B2,B5,B3,B6,B4,B1,B1,B6,B2,B3,W],
    [W,B2,B5,B3,B6,B4,B1,B1,B6,B2,B3,W],
    [Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd],
  ];
}

// ── Tile-style sprites ──
function buildGrassTile() {
  const G='#4a8c3f',Gd='#3a7c2f',Gl='#5a9c4f',Gll='#6aac5f';
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      const r = Math.random();
      row.push(r < 0.15 ? Gll : r < 0.35 ? Gl : r < 0.7 ? G : Gd);
    }
    rows.push(row);
  }
  return rows;
}

function buildPathTile() {
  const P='#c4a86a',Pd='#b49858',Pl='#d4b87a',Pll='#dcc88a';
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      const r = Math.random();
      row.push(r < 0.2 ? Pll : r < 0.5 ? Pl : r < 0.8 ? P : Pd);
    }
    rows.push(row);
  }
  return rows;
}

function buildWaterTile() {
  const W='#3b6ea5',Wd='#2b5e95',Wl='#4b7eb5',Wll='#5b8ec5';
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      const r = Math.random();
      row.push(r < 0.15 ? Wll : r < 0.4 ? Wl : r < 0.7 ? W : Wd);
    }
    rows.push(row);
  }
  return rows;
}

function buildTreeSprite() {
  const O='#282830';
  const L='#389038',Ld='#287028',Ll='#50b050',Lll='#68c868';
  const T='#8a6838',Td='#6a4818';
  return [
    [_,_,_,_,Lll,Lll,Lll,_,_,_,_],
    [_,_,_,Lll,Ll,L,Ll,Lll,_,_,_],
    [_,_,Lll,Ll,L,Ld,L,Ll,Lll,_,_],
    [_,Lll,L,Ld,L,L,L,Ld,L,Lll,_],
    [Lll,L,L,L,Ld,L,Ld,L,L,L,Lll],
    [_,Ld,L,Ld,L,L,L,Ld,L,Ld,_],
    [_,_,Ld,L,L,Ld,L,L,Ld,_,_],
    [_,_,_,_,_,T,T,_,_,_,_],
    [_,_,_,_,_,Td,Td,_,_,_,_],
    [_,_,_,_,Td,Td,Td,Td,_,_,_],
  ];
}

function buildFenceTile() {
  const W='#9a7a4a',Wd='#7a5a2a',Wl='#ba9a6a';
  const G='#4a8c3f',Gd='#3a7c2f';
  return [
    [G,G,Wl,G,G,Wl,G,G],
    [G,G,W,G,G,W,G,G],
    [Wd,Wd,W,Wd,Wd,W,Wd,Wd],
    [G,G,W,G,G,W,G,G],
    [Wd,Wd,W,Wd,Wd,W,Wd,Wd],
    [Gd,Gd,Wd,Gd,Gd,Wd,Gd,Gd],
    [Gd,Gd,Wd,Gd,Gd,Wd,Gd,Gd],
    [G,G,Wd,G,G,Wd,G,G],
  ];
}

function buildRoadTile() {
  const R='#555555',Rd='#444444',Rl='#666666';
  const Y='#e0c030',Yd='#c0a020';
  return [
    [Rd,R,R,Rl,Rl,R,R,Rd],
    [R,R,Rl,Y,Y,Rl,R,R],
    [R,R,Rl,Yd,Yd,Rl,R,R],
    [R,Rl,R,R,R,R,Rl,R],
    [R,Rl,R,R,R,R,Rl,R],
    [R,R,Rl,Y,Y,Rl,R,R],
    [R,R,Rl,Yd,Yd,Rl,R,R],
    [Rd,R,R,Rl,Rl,R,R,Rd],
  ];
}

function buildSandTile() {
  const S='#dcc27a',Sd='#ccb26a',Sl='#ecd28a',Sll='#fce29a';
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      const r = Math.random();
      row.push(r < 0.1 ? Sll : r < 0.3 ? Sl : r < 0.7 ? S : Sd);
    }
    rows.push(row);
  }
  return rows;
}

function buildFlowerTile() {
  const G='#4a8c3f',Gd='#3a7c2f',Gl='#5a9c4f';
  const F1='#e04040',F2='#e0e040',F3='#e040e0',F4='#4040e0';
  const flowers = [F1,F2,F3,F4];
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      if ((x+y)%3===0 && Math.random()<0.4) row.push(flowers[Math.floor(Math.random()*4)]);
      else row.push(Math.random() < 0.5 ? G : Math.random() < 0.5 ? Gl : Gd);
    }
    rows.push(row);
  }
  return rows;
}

// ── Interior tiles ──
function buildFloorTile() {
  const F='#c8a868',Fd='#b89858',Fl='#d8b878',Fll='#e0c888';
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      // wooden plank pattern
      if (y % 4 === 0) row.push(Fd);
      else { const r = Math.random(); row.push(r < 0.2 ? Fll : r < 0.5 ? Fl : r < 0.8 ? F : Fd); }
    }
    rows.push(row);
  }
  return rows;
}

function buildWallTile() {
  const W='#8a7a6a',Wd='#6a5a4a',Wl='#a09080',Wll='#b0a090';
  return [
    [Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd],
    [W,W,Wl,W,W,Wl,W,W],
    [W,Wl,Wll,Wl,W,Wll,Wl,W],
    [W,W,Wl,W,W,Wl,W,W],
    [Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd],
    [Wl,W,W,Wl,Wl,W,W,Wl],
    [Wll,Wl,W,Wll,Wll,Wl,W,Wll],
    [Wl,W,W,Wl,Wl,W,W,Wl],
  ];
}

function buildShelfSprite() {
  const W='#7a5a2a',Wd='#5a3a1a',Wl='#9a7a4a';
  const B1='#c04040',B2='#4060c0',B3='#40a050',B4='#d0a030';
  return [
    [Wd,W,W,W,W,W,W,Wd],
    [W,B1,B2,B3,B4,B1,B2,W],
    [W,B1,B2,B3,B4,B1,B2,W],
    [Wd,Wl,Wl,Wl,Wl,Wl,Wl,Wd],
    [W,B3,B4,B1,B2,B3,B4,W],
    [W,B3,B4,B1,B2,B3,B4,W],
    [Wd,Wl,Wl,Wl,Wl,Wl,Wl,Wd],
    [Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd],
  ];
}

function buildCounterSprite() {
  const W='#a08868',Wd='#806848',Wl='#c0a888';
  const T='#d0c0a0';
  return [
    [Wd,Wl,T,T,T,T,Wl,Wd],
    [Wd,W,T,T,T,T,W,Wd],
    [W,W,W,W,W,W,W,W],
    [W,Wd,Wd,W,W,Wd,Wd,W],
    [W,Wd,Wd,W,W,Wd,Wd,W],
    [W,W,W,W,W,W,W,W],
    [Wd,W,W,W,W,W,W,Wd],
    [Wd,Wd,Wd,Wd,Wd,Wd,Wd,Wd],
  ];
}

function buildDeskSprite() {
  const W='#b09868',Wd='#907848',Wl='#d0b888';
  const P='#f0e8d0';
  return [
    [Wd,Wl,Wl,Wl,Wl,Wl,Wl,Wd],
    [W,P,P,P,P,P,P,W],
    [W,W,W,W,W,W,W,W],
    [W,Wd,_,_,_,_,Wd,W],
    [W,Wd,_,_,_,_,Wd,W],
    [W,Wd,_,_,_,_,Wd,W],
    [W,W,_,_,_,_,W,W],
    [Wd,Wd,_,_,_,_,Wd,Wd],
  ];
}

function buildDoorSprite() {
  const D='#9a7a4a',Dd='#7a5a2a',Dl='#ba9a6a';
  const K='#e0c030';
  const F='#c8a868';
  return [
    [Dd,Dd,Dd,Dd,Dd,Dd,Dd,Dd],
    [Dd,D,D,Dl,Dl,D,D,Dd],
    [Dd,D,D,Dl,Dl,D,D,Dd],
    [Dd,D,D,D,D,D,D,Dd],
    [Dd,D,D,D,K,D,D,Dd],
    [Dd,D,D,D,D,D,D,Dd],
    [Dd,D,D,Dl,Dl,D,D,Dd],
    [F,F,F,F,F,F,F,F],
  ];
}

function buildPlantSprite() {
  const L='#389038',Ld='#287028',Ll='#50b050',Lll='#68c868';
  const P='#a06838',Pd='#805028';
  return [
    [_,_,_,Lll,Lll,_,_,_],
    [_,_,Lll,Ll,Ll,Lll,_,_],
    [_,Lll,Ll,L,L,Ll,Lll,_],
    [Lll,L,Ld,L,L,Ld,L,Lll],
    [_,Ld,L,L,L,L,Ld,_],
    [_,_,_,Ld,Ld,_,_,_],
    [_,_,Pd,P,P,Pd,_,_],
    [_,_,P,P,P,P,_,_],
  ];
}

function buildVendingSprite() {
  const M='#3848a0',Md='#283878',Ml='#4858b0';
  const G='#1a1a20';
  const Cn='#e04040',Cn2='#40a040',Cn3='#e0a020',Cn4='#4080d0';
  const Sl='#c0c0c8';
  return [
    [Md,M,Ml,Ml,Ml,Ml,M,Md],
    [M,G,Cn,Cn2,Cn2,Cn3,G,M],
    [M,G,Cn,Cn2,Cn2,Cn3,G,M],
    [M,G,Cn4,Cn,Cn,Cn2,G,M],
    [M,Ml,Ml,Ml,Ml,Ml,Ml,M],
    [M,M,M,M,M,M,M,M],
    [M,Sl,Sl,Sl,Sl,Sl,Sl,M],
    [Md,Md,_,_,_,_,Md,Md],
  ];
}

function buildRugSprite() {
  const R='#8b4040',Rd='#6b2020',Rl='#ab6060',Rll='#cb8080';
  const G='#c8a030',Gd='#a88020';
  return [
    [Gd,G,G,G,G,G,G,Gd],
    [G,Rl,R,R,R,R,Rl,G],
    [G,R,Rd,R,R,Rd,R,G],
    [G,R,R,Rll,Rll,R,R,G],
    [G,R,R,Rll,Rll,R,R,G],
    [G,R,Rd,R,R,Rd,R,G],
    [G,Rl,R,R,R,R,Rl,G],
    [Gd,G,G,G,G,G,G,Gd],
  ];
}

// ── Buildings ──
function buildHouse() {
  const O='#282830';
  const R='#c04040',Rd='#a03030',Rl='#d85050';
  const W='#e8d8b8',Wd='#d0c0a0',Wl='#f0e8d0';
  const D='#7a5a2a',Dd='#5a3a1a';
  const Wi='#88c0e8',Wid='#6098c0';
  return [
    [_,_,_,_,_,O,O,_,_,_,_,_],
    [_,_,_,_,O,Rl,R,O,_,_,_,_],
    [_,_,_,O,R,R,R,R,O,_,_,_],
    [_,_,O,Rd,R,R,R,R,Rd,O,_,_],
    [_,O,Rd,R,R,R,R,R,R,Rd,O,_],
    [O,Rd,R,R,R,R,R,R,R,R,Rd,O],
    [O,Wl,W,W,W,W,W,W,W,W,Wl,O],
    [O,W,Wi,Wid,W,D,D,W,Wi,Wid,W,O],
    [O,W,Wid,Wi,W,Dd,Dd,W,Wid,Wi,W,O],
    [O,Wd,W,W,W,D,D,W,W,W,Wd,O],
    [O,O,O,O,O,O,O,O,O,O,O,O],
  ];
}

function buildBank() {
  const O='#282830';
  const W='#d0c8b0',Wd='#b0a890',Wl='#e0d8c0';
  const P='#a0a0a8',Pd='#808088',Pl='#c0c0c8';
  const R='#4a4a5a';
  return [
    [_,_,_,_,O,O,O,O,_,_,_,_],
    [_,_,_,O,Pl,P,P,Pl,O,_,_,_],
    [_,_,O,P,Pd,P,P,Pd,P,O,_,_],
    [_,O,O,O,O,O,O,O,O,O,O,_],
    [_,O,Pl,P,Pl,W,W,Pl,P,Pl,O,_],
    [_,O,P,Pd,P,Wd,Wd,P,Pd,P,O,_],
    [_,O,P,Pd,P,Wd,Wd,P,Pd,P,O,_],
    [_,O,P,Pd,P,W,W,P,Pd,P,O,_],
    [_,O,Pl,P,R,R,R,R,P,Pl,O,_],
    [_,O,O,O,O,O,O,O,O,O,O,_],
  ];
}

function buildSchool() {
  const O='#282830';
  const W='#c8b888',Wd='#a89868',Wl='#d8c898';
  const Rf='#885838',Rfd='#684018';
  const Wi='#88c0e8',Wid='#6098c0';
  const Cl='#f0e8d0',Cld='#d8d0b8';
  return [
    [_,_,_,_,_,O,O,_,_,_,_,_],
    [_,_,_,_,O,Cl,Cld,O,_,_,_,_],
    [_,_,_,_,O,Cld,Cl,O,_,_,_,_],
    [_,_,O,O,O,O,O,O,O,O,_,_],
    [_,_,O,Rf,Rfd,Rf,Rf,Rfd,Rf,O,_,_],
    [_,O,Rfd,Rf,Rf,Rf,Rf,Rf,Rf,Rfd,O,_],
    [O,O,Wl,W,W,W,W,W,W,Wl,O,O],
    [O,W,Wi,Wid,W,W,W,Wi,Wid,W,W,O],
    [O,W,Wid,Wi,Wd,Wd,Wd,Wid,Wi,W,W,O],
    [O,Wd,W,W,W,O,O,W,W,W,Wd,O],
    [O,O,O,O,O,O,O,O,O,O,O,O],
  ];
}

function buildShop() {
  const O='#282830';
  const W='#c8a868',Wd='#a88848',Wl='#d8b878';
  const Aw='#e04040',Awd='#c03030',Awl='#f0f0f0';
  const Wi='#88c0e8';
  return [
    [_,O,O,O,O,O,O,O,O,O,O,_],
    [O,Awl,Aw,Awl,Aw,Awl,Aw,Awl,Aw,Awl,Aw,O],
    [O,Aw,Awd,Aw,Awd,Aw,Awd,Aw,Awd,Aw,Awd,O],
    [O,O,O,O,O,O,O,O,O,O,O,O],
    [O,Wl,W,Wi,Wi,W,W,Wi,Wi,W,Wl,O],
    [O,W,Wd,Wi,Wi,Wd,Wd,Wi,Wi,Wd,W,O],
    [O,W,W,W,W,O,O,W,W,W,W,O],
    [O,O,O,O,O,O,O,O,O,O,O,O],
  ];
}

function buildStock() {
  const O='#282830';
  const W='#5a6a7a',Wd='#4a5a6a',Wl='#6a7a8a';
  const G='#40c040',R='#c04040';
  const Sc='#2a3a4a';
  return [
    [_,O,O,O,O,O,O,O,O,O,O,O,O,_],
    [O,Wl,W,W,W,W,W,W,W,W,W,W,Wl,O],
    [O,W,Sc,Sc,Sc,Sc,Sc,Sc,Sc,Sc,Sc,W,W,O],
    [O,W,Sc,G,G,R,Sc,G,R,R,Sc,W,W,O],
    [O,W,Sc,G,R,R,Sc,G,G,R,Sc,W,W,O],
    [O,W,Sc,Sc,Sc,Sc,Sc,Sc,Sc,Sc,Sc,W,W,O],
    [O,Wd,W,W,W,W,W,W,W,W,W,W,Wd,O],
    [O,W,W,W,W,O,O,O,W,W,W,W,W,O],
    [O,O,O,O,O,O,_,O,O,O,O,O,O,O],
  ];
}

function buildStation() {
  const O='#282830';
  const W='#b0a088',Wd='#908068',Wl='#c0b098';
  const Rf='#885838',Rfd='#684018';
  const Rl='#808080',Rld='#606060';
  return [
    [_,_,_,_,O,O,O,O,O,O,_,_,_,_],
    [_,_,_,O,Rf,Rfd,Rf,Rf,Rfd,Rf,O,_,_,_],
    [_,_,O,Rf,Rf,Rf,Rf,Rf,Rf,Rf,Rf,O,_,_],
    [_,O,O,O,O,O,O,O,O,O,O,O,O,_],
    [O,Wl,W,W,W,W,O,O,W,W,W,W,Wl,O],
    [O,W,Wd,W,Wd,W,O,O,W,Wd,W,Wd,W,O],
    [O,W,W,W,W,W,O,O,W,W,W,W,W,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O],
    [_,_,Rl,Rld,Rl,_,_,_,_,Rl,Rld,Rl,_,_],
  ];
}

// ── Convert pixel array to PNG ──
async function arrayToPng(rows, name, scale = 8) {
  const h = rows.length;
  const w = rows[0].length;
  const img = new Jimp(w * scale, h * scale);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const color = rows[y][x];
      if (!color) continue;
      const r = parseInt(color.slice(1,3), 16);
      const g = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      const c = Jimp.rgbaToInt(r, g, b, 255);
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          img.setPixelColor(c, x * scale + sx, y * scale + sy);
        }
      }
    }
  }

  const outPath = path.join(OUT, `${name}.png`);
  await img.writeAsync(outPath);
  console.log(`✓ ${name} (${w*scale}×${h*scale})`);
}

async function main() {
  console.log('Generating Pokemon-style sprites from driwatatsu-manager...\n');

  // Player (purple hair, green hoodie - matching the girl character concept)
  const HAIR = '#8848a0';
  const SHIRT = '#48a068';

  await arrayToPng(buildFrontChar(HAIR, SHIRT), 'player_down', 8);
  await arrayToPng(buildBackChar(HAIR, SHIRT), 'player_up', 8);
  // Mirror for left/right
  const rightData = buildWalkDown0(HAIR, SHIRT);
  await arrayToPng(rightData, 'player_right', 8);
  const leftData = rightData.map(row => [...row].reverse());
  await arrayToPng(leftData, 'player_left', 8);

  // NPCs
  await arrayToPng(buildManagerChar(), 'npc_warrior', 8);  // Manager as "warrior" NPC
  await arrayToPng(buildFrontChar('#e04040', '#4060c0'), 'npc_witch', 8);  // Red hair blue outfit
  await arrayToPng(buildCat(), 'npc_slime', 10); // Cat replaces slime

  // Tiles
  await arrayToPng(buildGrassTile(), 'grass', 10);
  await arrayToPng(buildPathTile(), 'path', 10);
  await arrayToPng(buildWaterTile(), 'water', 10);
  await arrayToPng(buildTreeSprite(), 'tree', 8);
  await arrayToPng(buildFenceTile(), 'fence', 10);
  await arrayToPng(buildRoadTile(), 'road', 10);
  await arrayToPng(buildSandTile(), 'sand', 10);
  await arrayToPng(buildFlowerTile(), 'flower', 10);

  // Interior tiles
  await arrayToPng(buildFloorTile(), 'floor', 10);
  await arrayToPng(buildWallTile(), 'wall', 10);
  await arrayToPng(buildShelfSprite(), 'shelf', 10);
  await arrayToPng(buildCounterSprite(), 'counter', 10);
  await arrayToPng(buildDeskSprite(), 'desk', 10);
  await arrayToPng(buildDoorSprite(), 'door', 10);
  await arrayToPng(buildPlantSprite(), 'plant', 10);
  await arrayToPng(buildVendingSprite(), 'vending', 10);
  await arrayToPng(buildRugSprite(), 'rug', 10);

  // Buildings
  await arrayToPng(buildHouse(), 'home', 8);
  await arrayToPng(buildBank(), 'bank', 8);
  await arrayToPng(buildSchool(), 'school', 8);
  await arrayToPng(buildShop(), 'shop', 8);
  await arrayToPng(buildStock(), 'stock', 8);
  await arrayToPng(buildStation(), 'station', 8);

  console.log('\nDone! All sprites generated from driwatatsu-manager pixel art.');
}

main().catch(console.error);
